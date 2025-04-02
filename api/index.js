const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Import Routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");

dotenv.config(); // Load environment variables

const app = express();

// ✅ Enable CORS
app.use(cors({
  origin: "http://localhost:3000", // Allow frontend requests
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));

// ✅ Middleware
app.use(express.json());

// ✅ Ensure Images Folder Exists
const uploadDir = path.join(__dirname, "images");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("✅ 'images' directory created");
}

// ✅ Serve Images Properly
app.use("/images", express.static(uploadDir));

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Multer Storage Configuration (Fix Filename Formatting)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // ✅ Save files in 'images' folder
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}${file.originalname.replace(/\s+/g, "")}`; // ✅ Use backticks here
    cb(null, filename);
  },
});

const upload = multer({ storage });

// ✅ Upload Route (Ensuring Correct Filename Storage)
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const savedFilename = req.file.filename;
    console.log("✅ File uploaded:", savedFilename);

    // ✅ Return correct filename (Ensuring same filename is stored in MongoDB)
    res.status(200).json({ filename: savedFilename, message: "File uploaded successfully" });
  } catch (err) {
    console.error("❌ Upload Error:", err);
    res.status(500).json({ error: "Error uploading file" });
  }
});

// ✅ API Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

// ✅ Contact Form Submission Route
const Contact = require("./models/Contact"); // Import Contact model

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // ✅ Validate Request
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // ✅ Save message to MongoDB
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    console.log("✅ Contact message saved:", newContact);
    res.status(201).json({ message: "Message received! We will contact you soon." });
  } catch (err) {
    console.error("❌ Contact Form Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Default Route
app.get("/", (req, res) => {
  res.send("Welcome to Bloggers Nook API 🚀");
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend is running on port ${PORT}`); // ✅ Fixed backticks here
});

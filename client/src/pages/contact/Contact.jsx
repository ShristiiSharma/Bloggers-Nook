import { useState } from "react";
import axios from "axios";
import "./contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/contact", formData);
      setSuccess(res.data.message);
      setFormData({ name: "", email: "", message: "" }); // Clear form after submission
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error("❌ Contact Form Error:", err);
    }
  };

  return (
    <div className="contact-page"> {/* ✅ Full-screen wrapper */}
      <div className="contact">
        <h2>Contact Us</h2>
        <br></br>
        <p>Have questions? We'd love to hear from you!</p>

        {success && <p className="success">{success}</p>}
        {error && <p className="error">{error}</p>}

        <br></br>

        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
          <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}

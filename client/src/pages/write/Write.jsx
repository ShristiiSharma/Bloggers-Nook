import { useState, useContext } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // Stores uploaded image URL
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;

      try {
        await axios.post("http://localhost:5000/api/upload", data); // ✅ Uploading file
        setImageUrl(`http://localhost:5000/images/${filename}`); // ✅ Set uploaded image URL
      } catch (err) {
        console.error("Error uploading file:", err);
      }
    }

    try {
      const res = await axios.post("http://localhost:5000/api/posts", newPost);
      // ✅ Creating post
      window.location.replace("/post/" + res.data._id);
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  return (
    <div className="write">
      {/* ✅ Display Image Preview or Uploaded Image */}
      {file && (
        <img
          className="writeImg"
          src={imageUrl || URL.createObjectURL(file)}
          alt="Uploaded Preview"
        />
      )}

      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fa-solid fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => {
              setFile(e.target.files[0]);
              setImageUrl(null); // Reset uploaded image URL
            }}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}

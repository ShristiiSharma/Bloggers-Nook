import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import axios from "axios";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";


export default function Settings() {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [imageUrl, setImageUrl] = useState("");


  const {user, dispatch} = useContext(Context);
  const PF = "http://localhost:5000/images/"

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type:"UPDATE_START"})
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;

      try {
        await axios.post("http://localhost:5000/api/upload", data); // ✅ Uploading file
        setImageUrl(`http://localhost:5000/images/${filename}`); // ✅ Set uploaded image URL
      } catch (err) {
        console.error("Error uploading file:", err);
      }
    }

    try {
      const res= await axios.put("http://localhost:5000/api/users/" +user._id, updatedUser);
      setSuccess(true);
      dispatch({type:"UPDATE_SUCCESS",payload: res.data})
      // ✅ Creating post
      //window.location.replace("/post/" + res.data._id);
    } catch (err) {
      dispatch({type:"UPDATE_FAILURE"})
      console.error("Error creating post:", err);
    }
  };

  return (
    <div className="settings">
        <div className="settingsWrapper">
            <div className="settingsTitle">
                <span className="settingsUpdateTitle">Update your Account</span>
                <span className="settingsDeleteTitle">Delete Account</span>
            </div>
            <form className="settingsForm" onSubmit={handleSubmit}>
              <label> Profile Picture</label>
              <div className="settingsPP">
                <img 
                  src={imageUrl ||file ? URL.createObjectURL(file):PF + user.profilePic}
                  alt=""
                />
                <label htmlFor="fileInput">
                  <i className="settingsPPIcon fa-regular fa-circle-user"></i>
                </label>
                <input type="file"
                 id="fileInput" 
                 style={{display:"none"}}
                 onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <label>Username</label>
              <input type="text" placeholder={user.username} onChange={e=>setUsername(e.target.value)}/>
              <label>Email</label>
              <input type="email" placeholder={user.email}  onChange={e=>setEmail(e.target.value)}/>
              <label>Password</label>
              <input type="password"  onChange={e=>setPassword(e.target.value)}/>
              <button className="settingsSubmit" type="submit">Update</button>
              {success && (
                <span style={{ color: "green" , textAlign:"center" , marginTop:"20px"}}>Profile has been updated...</span>
              )}
              
            </form>
        </div>
        <Sidebar/>
    </div>
  )
}

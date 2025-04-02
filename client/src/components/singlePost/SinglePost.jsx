import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import { Context } from "../../context/Context";
import axios from "axios";
import "./singlePost.css";
import {Link} from "react-router-dom"

export default function SinglePost() {
  const { postId } = useParams(); // ✅ Extract post ID from URL
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [updateMode, setUpdateMode] = useState(false)



  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${postId}`);
        setPost(res.data);
        setTitle(res.data.title)
        setDesc(res.data.desc)
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to load post. Please try again.");
      }
    };
    fetchPost();
  }, [postId]);

  if (error) return <p className="error-message">{error}</p>;
  if (!post) return <p>Loading post...</p>;

  const handleDelete = async()=> {
    try{
      await axios.delete(`http://localhost:5000/api/posts/${post._id}` , {
        data: { username: user.username },
      });
      window.location.replace("/");
    }catch (err) {}
  };

  const handleUpdate = async ()=>{
    try{
      await axios.put(`http://localhost:5000/api/posts/${post._id}` , {
          username: user.username , title , desc,
      });
      //window.location.reload();
      setUpdateMode(false)
    }catch (err) {}
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        
        {post.photo && (
          <img src={`${PF}${post.photo}`} alt="Post" className="singlePostImg" />
        )} 
        {updateMode ? (
          <input type="text"
           value={title}
           className="singlePostTitleInput" 
           autoFocus
           onChange={(e)=>setTitle(e.target.value)}
          />
        ) : (

          <h1 className="singlePostTitle">
          {title}
          {post.username === user?.username && (
            <div className="singlePostEdit">
              <i className="singlePostIcon fa-regular fa-pen-to-square" onClick={()=>setUpdateMode(true)}></i>
              <i className="singlePostIcon fa-regular fa-trash-can" onClick={handleDelete}></i>
          </div>
          )}
        </h1>

        )}

        {/* ✅ Display post author and date dynamically */}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
            <b>{post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea className="singlePostDescInput" value={desc} onChange={(e)=>setDesc(e.target.value)}/> 
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
        {updateMode && (
        <button className="singlePostButton" onClick={handleUpdate}>
          Update
        </button>
        )}
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import axios from "axios";
import {useLocation} from "react-router";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // ✅ Added loading state
  const {search}  = useLocation();
  


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/posts"+search, {
          withCredentials: true, // ✅ Ensures cross-origin requests work correctly
        });
        console.log("Fetched posts:", res.data);
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts. Please try again.");
      } finally {
        setLoading(false); // ✅ Stop loading when request completes
      }
    };
    fetchPosts();
  }, [search]);

  return (
    <>
      <Header />
      <div className="home">
        {loading ? (
          <p className="loading-message">Loading posts...</p> // ✅ Show loading message
        ) : error ? (
          <p className="error-message">{error}</p> // ✅ Show error message if request fails
        ) : (
          <Posts posts={posts} />
        )}
        <Sidebar />
      </div>
    </>
  );
}

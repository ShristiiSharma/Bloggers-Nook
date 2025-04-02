import Post from "../post/Post";
import "./posts.css";

export default function Posts({ posts }) {
  return (
    <div className="posts">
      {posts?.length > 0 ? (
        posts.map((p) => <Post key={p._id} post={p} />) // ✅ Added key prop
      ) : (
        <p>No posts available</p> // ✅ Added fallback message
      )}
    </div>
  );
}

import { Link } from "react-router-dom";
import { useRef, useContext } from "react"; // ✅ Import useRef and useContext
import "./login.css"
import axios from "axios"; // ✅ Import axios
import { Context } from "../../context/Context"; // ✅ Import Context (Ensure correct path)

export default function Login() {

 const userRef = useRef()
 const passwordRef = useRef();
 const { dispatch, isFetching } = useContext(Context)

 const handleSubmit = async (e)=>{
  e.preventDefault();
  dispatch({type: "LOGIN_START"});
  try{
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      username: userRef.current.value,
      password: passwordRef.current.value,
    });
    dispatch({type: "LOGIN_SUCCESS", payload: res.data });

  }catch(err){
   dispatch({ type: "LOGIN_FAILURE" });
  }
};

  return (
    <div className="login">
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleSubmit}>
            <label>Username</label>
            <input type="text" className="loginInput" placeholder="Enter your username..." ref={userRef}/>
            <label>Password</label>
            <input type="password" className="loginInput" placeholder="Enter your password..."  ref={passwordRef}/>
            <button className="loginButton" type="submit" disabled={isFetching}>
               Login
            </button>
        </form>
        <button className="loginRegisterButton">
          <Link className ="link" to="/register">Register</Link>
        </button>
    </div>
  )
}

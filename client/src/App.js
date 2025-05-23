import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import About from "./pages/about/About"; /* ✅ Import About Page */
import Contact from "./pages/contact/Contact"; /* ✅ Import Contact Page */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context);

  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:postId" element={<Single />} />
        <Route path="/write" element={user ? <Write /> : <Register />} />
        <Route path="/settings" element={user ? <Settings /> : <Register />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/contact" element={<Contact />} />  {/* ✅ Contact Page Route */}
        <Route path="/about" element={<About />} />  {/* ✅ About Page Route */}
      </Routes>
    </Router>
  );
}

export default App;

import "./sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      {/* About Me Section */}
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img 
          src="https://www.profilebakery.com/wp-content/uploads/2023/04/AI-Profile-Picture-400x400.jpg"
          alt="Profile"
        />
        <p>
          <br/>
          <br/>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur ipsum sit, 
          tempora dignissimos officiis voluptate dolore. Mollitia asperiores, nulla.
        </p>
      </div>

      {/* Social Media Section */}
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fa-brands fa-square-facebook"></i>
          <i className="sidebarIcon fa-brands fa-square-twitter"></i>
          <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
          <i className="sidebarIcon fa-brands fa-square-instagram"></i>
        </div>
      </div>
    </div>
  );
}

import { useContext, useState, useEffect } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useNotificationStore } from "../../lib/notificationStore";

function Navbar() {
  const [open, setOpen] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const fetch = useNotificationStore((state) => state.fetch);
  const number = useNotificationStore((state) => state.number);

  // Fetch notifications only if the user is logged in
  useEffect(() => {
    if (currentUser) {
      fetch();
    }
  }, [currentUser, fetch]);

  return (
    <nav>
      <div className="left">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="Logo" />
          <span>RealEstate</span>
        </Link>
        <Link to="/">Home</Link>
        <Link to="/AboutUs">About</Link> {/* Corrected links */}
        <Link to="/ContactUs">Contact</Link>
        {/* <Link to="/agents">Agents</Link> */}
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img src={currentUser.avatar || "/noavatar.jpg"} alt="User Avatar" />
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profile">
              {number > 0 && <div className="notification">{number}</div>}
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <Link to="/login">Sign in</Link> {/* Changed from href to Link */}
            <Link to="/register" className="register">
              Sign up
            </Link>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt="Menu"
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <Link to="/">Home</Link>
          <Link to="/AboutUs">About</Link>
          <Link to="/ContactUs">Contact</Link>
          {/* <Link to="/agents">Agents</Link> */}
          {!currentUser && (
            <>
              <Link to="/login">Sign in</Link>
              <Link to="/register">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

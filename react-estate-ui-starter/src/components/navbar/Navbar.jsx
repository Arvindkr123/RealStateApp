import { useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/Auth.Context";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { currentUser } = useAuthContext();
  //console.log(currentUser);
  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo.png" alt="logo" />
          <span>LamaEstate</span>
        </a>
        <a href="/">Home</a>
        <a href="/">About</a>
        <a href="/">Contact</a>
        <a href="/">Agents</a>
      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img src={currentUser.avatar || "/favicon.png"} alt="" />
            <span>{currentUser?.username}</span>
            <Link className="profile" to={"/profile"}>
              <div className="notification">3</div>
              Profile
            </Link>
          </div>
        ) : (
          <>
            <Link to="/login">Sign in</Link>
            <Link to="/register" className="signup">
              Sign up
            </Link>
          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt="menu image"
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/">Home</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <a href="/">Agents</a>
          <a href="/">Sign in</a>
          <a href="/">Sign up</a>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;

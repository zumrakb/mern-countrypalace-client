import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.svg";
import "./Navbar.css";
import NavbarBackground from "../assets/NavbarBackground.jpg"
import { getLoginUserAvatar } from "../Flags";
import logoutIcon from "../assets/powerOff.svg"
const Navbar = () => {
  const isLogin = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation()
  const isHomePage = location.pathname === "/" || location.pathname === "/create";
  const [isOpen, setOpen] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <header className="navbar">
      <div className="nav-container">
      {isHomePage && <img className="container" src={NavbarBackground} alt="" /> }
      <Link style={{ textDecoration: "none", color: "#2978b5" }} to={"/"}>
        <div className="left">
          <img src={Logo} alt="logo"></img>
          <span>Country Palace</span>
        </div>
      </Link>
        {isLogin && <div onClick={() => setOpen(prev => !prev)} className="right">
          <img className="avatar" src={getLoginUserAvatar("asdasdas")} alt="" />
          {/* <span>Zumra Kucubezirci</span> */}
          {isOpen && <div onClick={handleLogout} className="logout-container">
            <img className="p" src={logoutIcon} alt=""></img>
          </div>}
    </div>}
      </div>
    </header>
  );
};

export default Navbar;

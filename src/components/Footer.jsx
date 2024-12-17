import React from "react";
import "./Footer.css"

const Footer = () => {
  const isLogin = localStorage.getItem("token");
  return (
    isLogin !== null &&
    <footer>
      Made by Zümra.
    </footer>
  );
};

export default Footer;

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import "./FormComponent.css";
import formLogo from "../assets/FormLogo.svg";

const FormComponent = ({
  name,
  handleName,
  secondpassword,
  handleRepeatPasswordChange,
  handleSignup,
  username,
  handleUsernameChange,
  password,
  handlePasswordChange,
  handleLogin,
  isValidEmail, // Email validation state
}) => {
  const location = useLocation();
  const isSignup = "/login" !== location.pathname;
  const showName = isSignup ? "Sign up" : "Login";

  return (
    <div style={{ height: `${isSignup ? "51%" : "35%"}` }} className="form">
      <div className="formContent">
        <div className="form-header">
          <h1>{showName}</h1>
          <img src={formLogo} alt="logo" />
        </div>

        {isSignup && (
          <div className="labelinput">
            <input
              className="userinput"
              type="text"
              value={name}
              onChange={handleName}
              placeholder="Name"
            />
          </div>
        )}
        <div className="labelinput" style={{ position: "relative" }}>
          <input
            className="userinput"
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Email"
          />
          {/* Email Validation Icons */}
          {username && (
            <span
              className="email-icon"
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              {isValidEmail ? (
                <AiOutlineCheck color="green" size={20} />
              ) : (
                <AiOutlineClose color="red" size={20} />
              )}
            </span>
          )}
        </div>

        <div className="labelinput">
          <input
            className="userinput"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
          />
        </div>
        {isSignup && (
          <input
            className="userinput"
            type="password"
            value={secondpassword}
            onChange={handleRepeatPasswordChange}
            placeholder="Confirm Password"
          />
        )}

        {isSignup ? (
          <button type="button" onClick={handleSignup}>
            Sign Up
          </button>
        ) : (
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        )}
      </div>

      <div
        style={{ bottom: `${!isSignup ? "-100px" : "-120px"}` }}
        className="formMessage"
      >
        {isSignup ? (
          <span className="account">
            Already have an account?{" "}
            <Link className="link" to={"/login"}>
              Login
            </Link>
          </span>
        ) : (
          <span className="account">
            Don't have an account?{" "}
            <Link className="link" to={"/signup"}>
              Signup
            </Link>
          </span>
        )}
      </div>
    </div>
  );
};

export default FormComponent;

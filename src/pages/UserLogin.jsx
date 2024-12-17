import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormComponent from "../components/FormComponent";
import "./UserLogin.css";

const LoginPage = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const Navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const checkEmailInDatabase = async (email) => {
    try {
      if (!email) {
        setIsValidEmail(false);
        return;
      }
      const response = await axios.post(`${apiUrl}/api/auth/check-email`, {
        email,
      });
      setIsValidEmail(response.data.exists);
    } catch (error) {
      console.error("Error checking email:", error.message);
      setIsValidEmail(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      checkEmailInDatabase(username);
    }, 500);
    return () => clearTimeout(timer);
  }, [username]);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${apiUrl}/api/auth/login`, {
        email: username,
        password: password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);
      Navigate("/");
    } catch (error) {
      setUser({});
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div className="userloginpage">
      <FormComponent
        username={username}
        password={password}
        handleLogin={handleLogin}
        handlePasswordChange={handlePasswordChange}
        handleUsernameChange={handleUsernameChange}
        isValidEmail={isValidEmail}
      />
    </div>
  );
};

export default LoginPage;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FormComponent from "../components/FormComponent";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [secondpassword, setSecondPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);

  const Navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    validateEmail(e.target.value);
  };

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleRepeatPasswordChange = (e) => setSecondPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  // Email validation
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(regex.test(email));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) Navigate("/");
  }, [Navigate]);

  async function handleSignup() {
    try {
      if (password !== secondpassword) {
        console.error("Passwords do not match");
        return;
      }

      await axios.post(`${apiUrl}/api/auth/register`, {
        email: username,
        password: password,
        name: name,
      });

      Navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error.message);
    }
  }

  return (
    <div className="userloginpage">
      <FormComponent
        name={name}
        handleName={handleName}
        username={username}
        password={password}
        isValidEmail={isValidEmail}
        handleSignup={handleSignup}
        handlePasswordChange={handlePasswordChange}
        handleUsernameChange={handleUsernameChange}
        handleRepeatPasswordChange={handleRepeatPasswordChange}
      />
    </div>
  );
};

export default SignupPage;

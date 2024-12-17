import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { flags } from "../Flags";
import axios from "axios";
import "./Creation.css";

const Creation = () => {
  const Navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageLink, setimageLink] = useState("");
  const isLogin = localStorage.getItem("token");
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    if (!isLogin) Navigate("/login");
  }, [isLogin, Navigate]);

  function handleInput(e) {
    setTitle(e.target.value);
  }
  function handleTextarea(e) {
    setDescription(e.target.value);
  }
  function handleImg(link) {
    setimageLink(link);
  }

  async function creationSubmit() {
    try {
      const body = {
        title: title,
        description: description,
        imageLink: imageLink, // Send the image link to the backend
      };

      if (title === "" || description === "" || imageLink === "") return;

      const token = localStorage.getItem("token");

      await axios.post(`${apiUrl}/api/blogs`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      Navigate("/"); // Redirect after successful creation
    } catch (error) {
      console.error("Blog creation failed:", error.message);
    }
  }

  return (
    <div className="creationPage">
      <div className="creationTitle">
        {" "}
        <h2 className="creationTitleh2">Choose Your Country</h2>
        <hr className="hr" />
      </div>

      <div className="flagList">
        {flags.map((flag, id) => (
          <div
            key={id} // Add the key here to avoid the warning
            className="box"
            onClick={() => {
              handleImg(flag.link);
            }}
            style={{
              backgroundImage: `url(${flag.banner})`,
              backgroundSize: "cover",
              border: imageLink === flag.link ? "4px solid #49b5bc" : "none",
              borderRadius: "8px",
            }}
          >
            <img className="flagSvg" src={flag.link} alt={flag.name} />
            <h2 className="boxName">{flag.name}</h2>
          </div>
        ))}
      </div>

      <div className="creationForm">
        <div className="group">
          <input
            className="creationInput"
            type="text"
            placeholder="Choose Title"
            onChange={handleInput}
          />
          <hr className="hr" />
        </div>

        <div className="group">
          <h2 className="textareaWrite">Write Your Blog</h2>
          {/* <hr className="hr" /> */}
        </div>

        <div className="textareaButton">
          <textarea
            className="creationTextarea"
            name="textarea"
            id="textArea"
            cols="30"
            rows="10"
            placeholder="Tell us about this country."
            onChange={handleTextarea}
          ></textarea>
          <button onClick={creationSubmit} className="creationSubmit">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Creation;

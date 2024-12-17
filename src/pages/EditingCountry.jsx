import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./EditingCountry.css";
import { getCountryBanner } from "../Flags";

const EditingCountry = () => {
  const Navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageLink, setImageLink] = useState("");
  const isLogin = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  // Submit edited country information
  async function editingSubmit() {
    try {
      setLoading(true);
      const newBody = { title, description, imageLink };
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("Token is missing!");
        return;
      }

      const response = await axios.put(
        `http://localhost:5000/api/blogs/${id}`,
        newBody,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Blog updated successfully:", response.data);
      Navigate(`/blog/${id}`);
    } catch (error) {
      console.error("Blog update failed:", error);
    } finally {
      setLoading(false);
    }
  }

  // Handle input changes
  function handleInput(e) {
    setTitle(e.target.value);
  }
  function handleTextarea(e) {
    setDescription(e.target.value);
  }

  useEffect(() => {
    if (isLogin) {
      async function fetchCountry() {
        const token = localStorage.getItem("token");
        const resp = await axios.get(`http://localhost:5000/api/blogs/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const countryInfo = resp.data;
        setTitle(countryInfo.title);
        setDescription(countryInfo.description);
        setImageLink(countryInfo.imageLink);
        setLoading(false);
      }
      fetchCountry();
    } else {
      Navigate("/login");
    }
  }, [id, isLogin, Navigate]);

  return (
    <div className="editingPage">
      {!loading && (
        <div className="banner">
          <img
            className="banner-image"
            src={getCountryBanner(imageLink)}
            alt=""
          />
          <div className="createdBy">
            <div className="left">
              <div className="left-container">
                <input
                  className="creationInput selectedCountryName"
                  type="text"
                  placeholder="Edit the country name."
                  onChange={handleInput}
                  value={title}
                />
                <hr />
              </div>

              <img
                className="selectedCountryFlag"
                src={imageLink}
                alt="flagofcountry"
              />
            </div>
          </div>
        </div>
      )}
      <div className="main-content">
        <textarea
          placeholder="Edit the description."
          className="editingTextarea"
          name="textarea"
          id="textArea"
          cols="30"
          rows="10"
          onChange={handleTextarea}
          value={description}
        ></textarea>
        <div className="right-content">
          <button onClick={editingSubmit} className="editingSubmit">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditingCountry;

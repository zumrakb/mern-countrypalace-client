import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { getCountryBanner, getRandomAvatar } from "../Flags"; // Use getRandomAvatar instead
import editIcon from "../assets/editIcon.svg";
import deleteIcon from "../assets/deleteIcon.svg";
import "./SelectedCountry.css";

const SelectedCountry = () => {
  const Navigate = useNavigate();
  const { id } = useParams(); // Extract the blog ID from the URL
  const [data, setData] = useState({}); // State for blog data
  const [loading, setLoading] = useState(true); // Loading state
  const [userId, setUserId] = useState(null); // State to store logged-in user's ID
  const isLogin = localStorage.getItem("token");

  const apiUrl = process.env.REACT_APP_API_URL;

  // Decode JWT to get the logged-in user's ID
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
      setUserId(decodedToken.id); // Extract user ID from token
    }
  }, []);

  // Navigate to Edit Page
  function goEditingCountry() {
    Navigate(`/blog/${id}/edit`);
  }

  // Delete Blog
  async function goHome() {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${apiUrl}/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Navigate("/"); // Redirect to the home page after deletion
    } catch (error) {
      console.error("Blog deletion failed:", error.message);
    }
  }

  // Fetch Blog Details
  useEffect(() => {
    if (isLogin) {
      async function fetchCountry() {
        try {
          const token = localStorage.getItem("token");
          const resp = await axios.get(`${apiUrl}/api/blogs/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setData(resp.data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching blog:", error);
          setLoading(false);
        }
      }
      fetchCountry();
    } else {
      Navigate("/login");
      setLoading(true);
    }
  }, [id, isLogin, Navigate]);

  if (!id) {
    console.error("No ID provided");
    return;
  }

  return (
    <div className="selectedCountryPage">
      {/* Render the blog content only when not loading */}
      {!loading && (
        <div className="banner">
          <img
            className="banner-image"
            src={getCountryBanner(data?.imageLink)} // Get banner for the country
            alt="banner"
          />
          <div className="createdBy">
            <div className="left">
              <div className="left-container">
                <h1 className="selectedCountryName">{data?.title}</h1>
                <hr />
              </div>
              <img
                className="selectedCountryFlag"
                src={data?.imageLink}
                alt="flag"
              />
            </div>
            <div className="right">
              {data?.createdBy && (
                <div className="createdByUser">
                  <img
                    className="avatar"
                    src={getRandomAvatar()} // Random avatar for user
                    alt="user-avatar"
                  />
                  <span>{data?.createdBy?.name}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="main-content">
        <p className="selectedCountryDescription">{data?.description}</p>

        {/* Conditional Rendering: Edit and Delete Buttons for Blog Owner */}
        {data?.createdBy?._id === userId && (
          <div className="selectedCountryPageButtons">
            <div className="icons">
              <div className="iconBackground">
                <img
                  className="icon"
                  src={editIcon}
                  onClick={goEditingCountry}
                  alt="Edit"
                />
              </div>
              <div className="iconBackground">
                <img
                  className="icon"
                  src={deleteIcon}
                  onClick={goHome}
                  alt="Delete"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectedCountry;

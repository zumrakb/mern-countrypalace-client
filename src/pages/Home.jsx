import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import CardComponent from "../components/CardComponent";
import axios from "axios";
import "./Home.css";
const Home = () => {
  const Navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      Navigate("/login");
      return;
    }

    async function fetchCountries() {
      const authString = `Bearer ${token}`;
      try {
        const resp = await axios.get("http://localhost:5000/api/blogs", {
          headers: { Authorization: authString },
        });
        setData(resp.data);
      } catch (err) {
        logout();
      }
    }

    fetchCountries();

    function logout() {
      localStorage.removeItem("token");
      Navigate("/login");
    }
  }, [Navigate]);

  function createButton() {
    Navigate("/create");
  }

  return (
    <div className="homePage">
      <div className="creationTitle">
        <h2 className="creationTitleh2">Explore Your Country</h2>
        <hr className="hr" />
      </div>
      {data.length !== 0 ? (
        <div className="cards">
          {data.map((d) => {
            return (
              <CardComponent
                key={d._id} // Use _id instead of id for the key and in props
                id={d._id} // Pass _id to the CardComponent
                imageLink={d.imageLink}
                title={d.title}
                createdBy={d.createdBy ? d.createdBy.name : "Unknown"}
              />
            );
          })}
        </div>
      ) : (
        <h1 className="message">Create your first blog!</h1>
      )}

      <div className="buttonshome">
        <button className="homePageButton" onClick={createButton}>
          <span>Create blog</span>+
        </button>
        {/* <button className="homePageButton" onClick={logout}>
          Logout
        </button> */}
      </div>
    </div>
  );
};

export default Home;

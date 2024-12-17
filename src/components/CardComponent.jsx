import "../App.css";
import { useNavigate } from "react-router-dom";
import "./CardComponent.css";
import { getCountryBanner, getRandomAvatar } from "../Flags";

const CardComponent = (props) => {
  const Navigate = useNavigate();

  function goToBlog() {
    console.log("id", props.id);
    Navigate(`/blog/${props.id}`);
  }

  const countryBanner = props.imageLink
    ? getCountryBanner(props.imageLink)
    : "defaultBanner";

  return (
    <div className="cardComponent" onClick={goToBlog}>
      <img
        className="background-image"
        src={countryBanner}
        alt="Country Banner"
      />
      <div className="cardTop">
        <h1 className="cardTitle">{props.title || "Untitled"}</h1>{" "}
        {/* Fallback for title */}
        <img className="cardFlag" src={props.imageLink} alt="flag" />
      </div>

      <div className="cardBottom">
        <img className="user-avatar" src={getRandomAvatar()} alt="avatar" />
        <p>{props.createdBy || "Unknown"}</p>
      </div>
    </div>
  );
};

export default CardComponent;

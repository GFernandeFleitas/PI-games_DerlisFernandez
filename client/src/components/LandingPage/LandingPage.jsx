import { Link } from "react-router-dom";
import controllerImage from "/controller.png";
import style from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <div className={style.landingPageContainer}>
      <img
        className={style.controllerImage}
        src={controllerImage}
        alt="CONTROLLER IMAGE"
      />
      <h3>WELCOME TO MY VIDEOGAMES PROJECT</h3>

      <Link className={style.linkButtonContainer} to={"/home"}>
        <button className={style.allGamesButton}>HOME PAGE ▶️ </button>
      </Link>
    </div>
  );
};

export default LandingPage;

/* eslint-disable react/prop-types */
import style from "./VideogameCard.module.css";
import { Link } from "react-router-dom";

const VideogameCard = (props) => {
  const { id, name, background_image, genres } = props.videogame;

  return (
    <div className={style.cardContainer}>
      <img className={style.videogameImage} src={background_image} alt={name} />
      <div className={style.cardContent}>
        <h5 className={style.videogameTitle}>{name}</h5>
        <div className={style.genreContainer}>
          <div>
            <p className={style.videogameGenres}>
              <b>Genres: </b>
            </p>
          </div>

          <div className={style.listOfGenres}>
            {genres.map((g, index) => (
              <span key={index + 1}>{g} </span>
            ))}
          </div>
        </div>
      </div>
      <Link to={`/home/detail_videogame/${id}`}>
        <button className="Link">Details</button>
      </Link>
    </div>
  );
};

export default VideogameCard;

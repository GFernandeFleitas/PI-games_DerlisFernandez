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
            <Link
              className={style.linkToTheDetail}
              to={`/home/detail_videogame/${id}`}
            >
              <button className={style.detailButton}>Details</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideogameCard;

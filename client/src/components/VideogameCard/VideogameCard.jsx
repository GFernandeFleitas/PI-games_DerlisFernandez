/* eslint-disable react/prop-types */
import style from "./VideogameCard.module.css";

const VideogameCard = (props) => {
  const { name, background_image, genres } = props.videogame;

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
    </div>
  );
};

export default VideogameCard;

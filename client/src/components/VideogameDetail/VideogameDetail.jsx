/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getVieogameDetailById } from "../../store/actions";
import { useEffect } from "react";
import style from "./VideogameDetail.module.css";
import LoadingPage from "../LoadingPage/LoadingPage";

const VideogameDetail = (props) => {
  const dispatch = useDispatch();
  const { idVideogame } = useParams();

  useEffect(() => {
    dispatch(getVieogameDetailById(idVideogame));
  }, []);

  const videogameDetails = useSelector((state) => state.videogameForDetailCard);

  console.log(videogameDetails);

  const {
    name,
    background_image,
    description,
    platforms,
    rating,
    released,
    genres,
  } = videogameDetails;

  return String(videogameDetails.id) === String(idVideogame) ? (
    <div className={style.detailMainContainer}>
      <img className={style.imageTage} src={background_image} alt={name} />
      <div>
        <h3>{name.toUpperCase()}</h3>
      </div>
      <h3 className={style.title}>GAME DESCRIPTION</h3>
      <div
        className={style.description}
        style={{ textAlign: "justify", padding: "15px" }}
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <h3 className={style.title}>
        THIS GAME IS AVAILABLE IN THE NEXT PLATFORMS
      </h3>
      <div>
        {platforms.map((platform, index) => (
          <span className={style.platformTag} key={index + 1}>
            {platform}
          </span>
        ))}
      </div>
      <h3 className={style.title}>GENRES</h3>
      <div>
        {genres.map((genre, index) => (
          <span className={style.genreTag} key={index + 1}>
            {genre}
          </span>
        ))}
      </div>
      <h3 className={style.title}>RATING</h3>
      <span className={style.ratingTag}>{rating}</span>
      <h3 className={style.title}>RELEASE DATE</h3>
      <span className={style.releaseDateTag}>{released}</span>
    </div>
  ) : (
    <LoadingPage />
  );
};

export default VideogameDetail;

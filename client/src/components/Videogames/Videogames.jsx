import VideogameCard from "../VideogameCard/VideogameCard";
import { useSelector } from "react-redux";
import style from "./Videogames.module.css";
import LoadingPage from "../LoadingPage/LoadingPage";

const Videogames = () => {
  const allVideogames = useSelector((state) => state.allVideogames);

  return allVideogames.apigames && allVideogames.dbvideogames ? (
    <div className={style.videogamesCardContainer}>
      {allVideogames.apigames.map((game) => (
        <VideogameCard videogame={game} key={game.id} />
      ))}
    </div>
  ) : (
    <LoadingPage />
  );
};
export default Videogames;

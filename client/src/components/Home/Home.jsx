import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import style from "./Home.module.css";
import VideogameCard from "../VideogameCard/VideogameCard";
import NavBar from "../NavBar/NavBar";
import { searchGamesByName } from "../../store/actions";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      // Anything in here is fired on component unmount.
      dispatch(searchGamesByName(""));
    };
  }, []);
  const allVideogames = useSelector((state) => state.allVideogames);

  const numberOfGamesPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);
  const [dataOrigin, setDataOrigin] = useState("API");

  const startIndex = (currentPage - 1) * numberOfGamesPerPage;
  const endIndex = startIndex + numberOfGamesPerPage;

  const totalPages =
    dataOrigin === "API"
      ? Math.ceil(allVideogames.apigames.length / numberOfGamesPerPage)
      : Math.ceil(allVideogames.dbvideogames.length / numberOfGamesPerPage);

  const showPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const containerKey = `container-${currentPage}`;

  const renderPage = () => {
    switch (dataOrigin) {
      case "API":
        return allVideogames.apigames
          .slice(startIndex, endIndex)
          .map((videogame) => {
            return <VideogameCard key={videogame.id} videogame={videogame} />;
          });

      case "DB":
        return allVideogames.dbvideogames
          .slice(startIndex, endIndex)
          .map((videogame) => {
            return <VideogameCard key={videogame.id} videogame={videogame} />;
          });

      default:
        return null;
    }
  };

  return (
    <>
      <NavBar setCurrentPage={setCurrentPage} setDataOrigin={setDataOrigin} />
      <div key={containerKey} className={style.container}>
        <div className={style.videogamesCardContainer}>{renderPage()}</div>

        <button
          title={currentPage !== 1 ? "Go to the previous page" : "🚫"}
          className={style.navigationButtonPrevious}
          onClick={showPreviousPage}
          disabled={currentPage === 1}
        >
          {"◀️ Previous Page"}
        </button>

        <span>{`Page ${currentPage} of ${totalPages}`}</span>

        <button
          title={currentPage !== totalPages ? "Go to the next page" : "🚫"}
          className={style.navigationButtonNext}
          onClick={showNextPage}
          disabled={currentPage === totalPages}
        >
          {"Next Page ▶️"}
        </button>
      </div>
    </>
  );
};

export default Home;

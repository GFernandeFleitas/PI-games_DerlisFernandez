import { useSelector } from "react-redux";
import { useState } from "react";
import style from "./SearchGames.module.css";
import VideogameCard from "../VideogameCard/VideogameCard";
import SearchBar from "./SearchBar/SearchBar";
import GameNotFound from "./GameNotFound/GameNotFound";

const SearchGames = () => {
  const searchedVideogames = useSelector((state) => state.searchedVideogames);
  console.log(searchedVideogames);

  const numberOfGamesPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);
  const [dataOrigin, setDataOrigin] = useState("API");
  const [userUsedSearch, setUserUsedSearch] = useState(false);

  const startIndex = (currentPage - 1) * numberOfGamesPerPage;
  const endIndex = startIndex + numberOfGamesPerPage;

  // const totalPages =
  //   dataOrigin === "API"
  //     ? Math.ceil(searchedVideogames.apigames.length / numberOfGamesPerPage)
  //     : Math.ceil(
  //         searchedVideogames.dbvideogames.length / numberOfGamesPerPage
  //       );

  // const showPreviousPage = () => {
  //   setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // };

  // const showNextPage = () => {
  //   setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // };

  const containerKey = `container-${currentPage}`;

  const renderPage = () => {
    switch (dataOrigin) {
      case "API":
        return searchedVideogames.apigames
          .slice(startIndex, endIndex)
          .map((videogame) => {
            return <VideogameCard key={videogame.id} videogame={videogame} />;
          });

      case "DB":
        return searchedVideogames.dbvideogames
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
      <SearchBar
        setCurrentPage={setCurrentPage}
        setDataOrigin={setDataOrigin}
        setUserUsedSearch={setUserUsedSearch}
      />
      <div key={containerKey} className={style.container}>
        {searchedVideogames.apigames.length ||
        searchedVideogames.dbvideogames.length ? (
          <>
            <div className={style.videogamesCardContainer}>{renderPage()}</div>
          </>
        ) : !userUsedSearch ? (
          <>
            <h3>TRY SEARCHING A GAME</h3>
          </>
        ) : (
          <GameNotFound />
        )}

        {/* <button
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
        </button> */}
      </div>
    </>
  );
};

export default SearchGames;

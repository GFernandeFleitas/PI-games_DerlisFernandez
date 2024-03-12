/* eslint-disable react/prop-types */
import style from "./SearchBar.module.css";
import controllerImage from "/controller.png";
import { useDispatch, useSelector } from "react-redux";
// import GenresFilter from "./GenresFilter/GenresFilter";
import { searchGamesByName } from "../../../store/actions";
import { useEffect } from "react";

import { useState } from "react";
import { Link } from "react-router-dom";

const SearchBar = (props) => {
  const { setUserUsedSearch } = props;
  const dispatch = useDispatch();

  const { setDataOrigin, setCurrentPage } = props;
  // const [currentFilter, setCurrentFilter] = useState("NONE");]
  const [searchWord, setSearchWord] = useState("");

  const handleDataOriginSelection = (event) => {
    setDataOrigin(event.target.value);
    setCurrentPage(1);
  };

  // const handleDataOrderSelection = (event) => {
  //   setCurrentFilter(event.target.value);
  //   switch (event.target.value) {
  //     case "ASC-DESC":
  //       dispatch(orderVideogamesAsc());
  //       break;
  //     case "DESC-ASC":
  //       dispatch(orderVideogamesDesc());
  //       break;

  //     case "DESC-ASC-RATING":
  //       dispatch(orderVideogamesDesRating());
  //       break;

  //     case "ASC-DESC-RATING":
  //       dispatch(orderVideogamesAscRating());
  //       break;

  //     case "NONE":
  //       dispatch(resetVideogamesData(originalData));
  //       break;

  //     default:
  //       null;
  //   }
  // };

  const handleSearchWordEdition = (event) => {
    console.log(event.target.value);
    setSearchWord(event.target.value);
    if (!event.target.value) {
      setUserUsedSearch(false);
    }
  };

  const handleSearchRequest = () => {
    dispatch(searchGamesByName(searchWord));
    setUserUsedSearch(true);
  };

  return (
    <div className={style.navBarContainer}>
      <div className={style.logoContainer}>
        <img
          className={style.controllerLogo}
          src={controllerImage}
          alt="Controller"
        />
      </div>
      <div className={style.titleContainer}>
        <p className={style.mainTitle}>VIDEOGAMES</p>
        <p className={style.subTitle}>Project 🕹️</p>
      </div>

      <div className={style.filterDataOriginContainer}>
        <label className={style.navBarLabels} htmlFor="DataOrigin">
          DATA ORIGIN
        </label>
        <select
          onChange={handleDataOriginSelection}
          name="DataOrigin"
          id="DataOrigin"
        >
          <option value="API">API</option>

          <option value="DB">DATABASE</option>
        </select>
      </div>

      {/* <div className={style.sortingDataSelect}>
        <label className={style.navBarLabels} htmlFor="DataOrigin">
          DATA ORDER
        </label>
        <select
          // onChange={handleDataOrderSelection}
          name="dataOrder"
          id="dataOrder"
          value={currentFilter}
        >
          <option value="NONE">NONE</option>
          <option value="ASC-DESC">ALPHABETIC: ASC-DESC ORDER</option>
          <option value="DESC-ASC">ALPHABETIC: DESC-ASC ORDER</option>
          <option value="ASC-DESC-RATING">RATING: ASC-DESC ORDER</option>
          <option value="DESC-ASC-RATING">RATING: DESC-ASC ORDER</option>
        </select>
      </div> */}

      {/* <div className={style.sortingDataSelect}>
        <GenresFilter
          currentFilter={currentFilter}
          setCurrentFilter={setCurrentFilter}
        />
      </div> */}

      <div className={style.searchBarContainer}>
        <input
          onChange={handleSearchWordEdition}
          className={style.searchBar}
          type="text"
          placeholder="Search a videogame 🔍"
          value={searchWord}
        />
        <button onClick={handleSearchRequest} className={style.searchButton}>
          SEARCH
        </button>
      </div>

      <div className={style.sortingDataSelect}>
        <Link to="/home">
          <span className={style.createButton}> ⬅️ GO BACK HOME</span>
        </Link>
      </div>
    </div>
  );
};

export default SearchBar;

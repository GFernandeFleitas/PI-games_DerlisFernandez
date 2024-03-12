/* eslint-disable react/prop-types */
import style from "./GenresFilter.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterByGenreId } from "../../../store/actions";

const GenresFilter = (props) => {
  const { currentFilter, setCurrentFilter, setCurrentPage } = props;

  const dispatch = useDispatch();
  const allGenres = useSelector((state) => state.allGenres);
  const [genresForFilter, setGenresForFilter] = useState([]);

  const handleGenreSelection = (event) => {
    console.log(event.target.checked);
    if (event.target.checked) {
      setGenresForFilter([...genresForFilter, event.target.value]);
      dispatch(filterByGenreId([...genresForFilter, event.target.value]));
    } else {
      setGenresForFilter(
        [...genresForFilter].filter((genre) => genre !== event.target.value)
      );
      dispatch(
        filterByGenreId(
          [...genresForFilter].filter((genre) => genre !== event.target.value)
        )
      );
      if (
        [...genresForFilter].filter((genre) => genre !== event.target.value)
          .length === 0
      ) {
        setCurrentFilter("NONE");
      }
    }
    setCurrentPage(1);
  };

  return (
    <div className={style.dropdownContainer}>
      <span>GENRES</span>
      <div className={style.dropdownContent}>
        {allGenres.map((genre, index) => (
          <div className={style.optionBox} key={index + 1}>
            <input
              onClick={handleGenreSelection}
              type="checkbox"
              id={genre.id}
              name={genre.name}
              value={genre.name}
            />
            <label htmlFor={genre.name}> {genre.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenresFilter;

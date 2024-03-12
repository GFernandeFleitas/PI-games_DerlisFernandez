import style from "./CreateVideogameForm.module.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import validation from "./validation";
import { createVideogame } from "../../store/actions";
import { Link } from "react-router-dom";

const CreateVideogameForm = () => {
  const dispatch = useDispatch();

  const formStateDefault = {
    name: "",
    description: "",
    platforms: [],
    background_image: "",
    released: "",
    rating: 0,
    genres: [],
  };
  const defaultErrorState = {
    name: "",
    description: "",
    platforms: "",
    background_image: "",
    released: "",
    rating: "",
    genres: "",
  };
  const optionsForPlatform = [
    "PS4",
    "PS3",
    "PS5",
    "PS2",
    "NINTENDO",
    "XBOX",
    "PC",
  ];
  const allGenres = useSelector((state) => state.allGenres);

  const [successMessage, setSuccessMessage] = useState(null);

  const [platformOptions, setPlatformOptions] = useState(optionsForPlatform);

  const [formData, setFormData] = useState(formStateDefault);

  const [errors, setErrors] = useState(defaultErrorState);

  //SELECTION AND REMOTION OF PLATFORMS

  const handlePlatformSearch = (event) => {
    if (event.target.value === "") {
      setPlatformOptions(
        optionsForPlatform.filter(
          (option) => !formData.platforms.includes(option)
        )
      );
    } else {
      setPlatformOptions(
        platformOptions.filter((option) =>
          option
            .toLocaleLowerCase()
            .includes(event.target.value.toLocaleLowerCase())
        )
      );
    }
  };

  const handlePlatformSelection = (event) => {
    const addedOption = event.target.id;

    if (!formData.platforms.includes(addedOption)) {
      setFormData({
        ...formData,
        platforms: [...formData.platforms, addedOption],
      });
      validation(
        {
          ...formData,
          platforms: [...formData.platforms, addedOption],
        },
        errors,
        setErrors
      );
      setPlatformOptions(
        [...platformOptions].filter((option) => option !== addedOption)
      );
    }
  };

  const handleRemoveSelectedPlatform = (event) => {
    event.preventDefault();
    const value = event.target.attributes.value.value;
    console.log(value);
    setFormData({
      ...formData,
      platforms: [...formData.platforms].filter((option) => option !== value),
    });
    validation(
      {
        ...formData,
        platforms: [...formData.platforms].filter((option) => option !== value),
      },
      errors,
      setErrors
    );
    setPlatformOptions([...platformOptions, value]);
  };

  // HANDLE COMMON EDITIONS

  const hadleDirectSimpleEdition = (event) => {
    switch (event.target.name) {
      case "name":
        setFormData({
          ...formData,
          name: event.target.value,
        });
        validation(
          {
            ...formData,
            name: event.target.value,
          },
          errors,
          setErrors
        );
        break;

      case "background_image":
        setFormData({
          ...formData,
          background_image: event.target.value,
        });
        validation(
          {
            ...formData,
            background_image: event.target.value,
          },
          errors,
          setErrors
        );
        break;
      case "description":
        setFormData({
          ...formData,
          description: event.target.value,
        });

        validation(
          {
            ...formData,
            description: event.target.value,
          },
          errors,
          setErrors
        );
        break;

      case "released":
        setFormData({
          ...formData,
          released: event.target.value,
        });
        validation(
          {
            ...formData,
            released: event.target.value,
          },
          errors,
          setErrors
        );
        break;

      case "rating":
        setFormData({
          ...formData,
          rating: event.target.value,
        });
        validation(
          {
            ...formData,
            rating: event.target.value,
          },
          errors,
          setErrors
        );
        break;

      default:
        null;
    }
  };

  //HANDLE GENRE SELECTION

  const handleGenreSelection = (event) => {
    if (event.target.checked) {
      setFormData({
        ...formData,
        genres: [...formData.genres, Number(event.target.id)],
      });
      validation(
        {
          ...formData,
          genres: [...formData.genres, Number(event.target.id)],
        },
        errors,
        setErrors
      );
    } else {
      setFormData({
        ...formData,
        genres: [...formData.genres].filter(
          (genre) => genre !== Number(event.target.id)
        ),
      });
      validation(
        {
          ...formData,
          genres: [...formData.genres].filter(
            (genre) => genre !== Number(event.target.id)
          ),
        },
        errors,
        setErrors
      );
    }
  };

  const activeteSubmitButton = (errors, formData) => {
    const thereAreNoErrors =
      errors.name === "" &&
      errors.description === "" &&
      errors.platforms === "" &&
      errors.background_image === "" &&
      errors.released === "" &&
      errors.rating === "" &&
      errors.genres === "";

    const thereIsDataForCreatingTheGame =
      formData.name !== "" &&
      formData.description !== "" &&
      formData.platforms.length !== 0 &&
      formData.background_image !== "" &&
      formData.released !== "" &&
      formData.rating !== 0 &&
      formData.genres.length !== 0;

    return !(thereAreNoErrors && thereIsDataForCreatingTheGame);
  };

  //HANDLE FORM SUBMITION
  const handleFormSubmission = (event) => {
    event.preventDefault();
    dispatch(createVideogame(formData));
    setSuccessMessage("El juego se ha creado correctamente");
    setTimeout(() => {
      setSuccessMessage(null);
      document.getElementById("createVideogameFORM").reset();
      setFormData(formStateDefault);
      setErrors(defaultErrorState);
    }, 5000);
  };

  return (
    <div className={style.mainContainerForm}>
      <form id="createVideogameFORM" action="submit">
        <div className={style.formRow}>
          <label className={style.formLabel} htmlFor="name">
            Videogame Name
          </label>
          <input
            onChange={hadleDirectSimpleEdition}
            className={style.formInputText}
            id="name"
            name="name"
            type="text"
            autoComplete="off"
            value={formData.name}
          />
          <span className={style.errorMessage}>{errors.name}</span>
        </div>
        <div className={style.formRow}>
          <label className={style.formLabel} htmlFor="background_image">
            Image&#39;S URL
          </label>
          <input
            onChange={hadleDirectSimpleEdition}
            className={style.formInputText}
            id="background_image"
            name="background_image"
            type="text"
            autoComplete="off"
            value={formData.background_image}
          />
          <span className={style.errorMessage}>{errors.background_image}</span>
        </div>
        <div className={style.formRow}>
          <label className={style.formLabel} htmlFor="platforms">
            Platforms
          </label>
          <span className={style.errorMessage}>{errors.platforms}</span>
          <div
            className={
              formData.platforms.length
                ? style.selectedPlatfromsBox
                : style.selectedPlatformOptionEmpty
            }
          >
            {formData.platforms.map((platform, index) => (
              <li
                className={style.selectedPlatformOption}
                id={platform}
                key={index + 1}
              >
                <button
                  className={style.eliminateSelectedPlatform}
                  onClick={handleRemoveSelectedPlatform}
                  value={platform}
                >
                  X
                </button>{" "}
                {platform}{" "}
              </li>
            ))}
          </div>
          <ul className={style.formInputTextSearchList}>
            <li className={style.internalInputOption}>
              <label htmlFor="searchPlatformOptions">
                {" "}
                Search Platform options
              </label>
              <input
                id="searchPlatformOptions"
                type="text"
                onChange={handlePlatformSearch}
              />
            </li>
            <hr />
            {platformOptions.map((platform, index) => (
              <li
                className={style.foundPlatforms}
                onClick={handlePlatformSelection}
                id={platform}
                key={index + 1}
                value={platform}
              >
                {platform}
              </li>
            ))}
          </ul>
        </div>
        <div className={style.formRow}>
          <label className={style.formLabel} htmlFor="description">
            Videogame Description
          </label>
          <textarea
            rows="5"
            cols="60"
            className={style.formInputText}
            id="description"
            name="description"
            type="text"
            autoComplete="off"
            onChange={hadleDirectSimpleEdition}
            value={formData.description}
          />
          <span className={style.errorMessage}>{errors.description}</span>
        </div>
        <div className={style.formRow}>
          <label className={style.formLabel} htmlFor="released">
            Release Date
          </label>
          <input
            className={style.formInputText}
            id="released"
            name="released"
            type="date"
            autoComplete="off"
            value={formData.released}
            onChange={hadleDirectSimpleEdition}
          />
          <span className={style.errorMessage}>{errors.released}</span>
        </div>
        <div className={style.formRow}>
          <label className={style.formLabel} htmlFor="rating">
            Rating
          </label>
          <input
            className={style.formInputText}
            id="rating"
            name="rating"
            type="number"
            autoComplete="off"
            value={formData.rating}
            onChange={hadleDirectSimpleEdition}
            step=".01"
          />
          <span className={style.errorMessage}>{errors.rating}</span>
        </div>

        <div className={style.formRow}>
          <label className={style.formLabel} htmlFor="genres">
            Genres
          </label>
          <span className={style.errorMessage}>{errors.genres}</span>
          <div className={style.genresBox}>
            {allGenres.map((genre, index) => (
              <div className={style.optionBox} key={index + 1}>
                <input
                  onChange={handleGenreSelection}
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

        <div className={style.formRowSubmit}>
          <Link to={"/home"}>
            <button className={style.goBackHomeButton}>⬅️ GO BACK HOME</button>
          </Link>
          <button
            className={style.createGameButton}
            disabled={activeteSubmitButton(errors, formData)}
            onClick={handleFormSubmission}
          >
            CREATE NEW GAME
          </button>
        </div>
        <span className={style.succesAlert}>{successMessage}</span>
      </form>
    </div>
  );
};

export default CreateVideogameForm;

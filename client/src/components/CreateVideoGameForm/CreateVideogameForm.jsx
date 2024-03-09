import style from "./CreateVideogameForm.module.css";
import { useState } from "react";

const CreateVideogameForm = () => {
  const optionsForPlatform = ["PS4", "PS5", "XBOX"];

  const [platformOptions, setPlatformOptions] = useState(optionsForPlatform);
  const [selectedPlatformOptions, setSelectedPlatformOptions] = useState([
    "PS4",
  ]);

  const handlePlatformSearch = (event) => {
    setPlatformOptions(
      optionsForPlatform.filter((option) =>
        option
          .toLocaleLowerCase()
          .includes(event.target.value.toLocaleLowerCase())
      )
    );
  };

  const handlePlatformSelection = (event) => {
    const addedOption = event.target.id;

    if (!selectedPlatformOptions.includes(addedOption)) {
      setSelectedPlatformOptions([...selectedPlatformOptions, addedOption]);
    }
  };

  const handleRemoveSelectedPlatform = (event) => {
    const value = event.target.attributes.value.value;
    console.log(value);
    setSelectedPlatformOptions(
      [...selectedPlatformOptions].filter((option) => option !== value)
    );
    console.log(
      [...selectedPlatformOptions].filter((option) => option !== value)
    );
  };

  return (
    <div>
      <form action="submit">
        <div className={style.formRow}>
          <label className={style.formLabel} htmlFor="name">
            Videogame Name
          </label>
          <input
            className={style.formInputText}
            id="name"
            type="text"
            autoComplete="off"
          />
        </div>
        <div className={style.formRow}>
          <label className={style.formLabel} htmlFor="videogame_url">
            Image&#39;S URL
          </label>
          <input
            className={style.formInputText}
            id="videogame_url"
            type="text"
            autoComplete="off"
          />
        </div>
        <div className={style.formRow}>
          <label className={style.formLabel} htmlFor="name">
            Platforms
          </label>
          <ul className={style.formInputTextSearchList}>
            {selectedPlatformOptions.map((platform, index) => (
              <li
                className={style.selectedPlatformOption}
                id={platform}
                key={index + 1}
              >
                <span
                  className={style.eliminateSelectedPlatform}
                  onClick={handleRemoveSelectedPlatform}
                  value={platform}
                >
                  x
                </span>{" "}
                {platform}{" "}
              </li>
            ))}
            <li className={style.internalInputOption}>
              <input type="text" onChange={handlePlatformSearch} />
            </li>
            {platformOptions.map((platform, index) => (
              <li
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
      </form>
    </div>
  );
};

export default CreateVideogameForm;

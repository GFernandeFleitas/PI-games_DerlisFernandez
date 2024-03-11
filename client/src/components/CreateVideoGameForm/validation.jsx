// function validURL(str) {
//   var pattern = new RegExp(
//     "^(https?:\\/\\/)?" + // protocol
//       "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
//       "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
//       "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
//       "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
//       "(\\#[-a-z\\d_]*)?$",
//     "i"
//   ); // fragment locator
//   return !!pattern.test(str);
// }

const validation = (formData, errors, setErrors) => {
  let allValidationErrors = errors;
  console.log(!formData.background_image.includes("https://"));

  //Validating Name field

  if (!formData.name) {
    allValidationErrors.name = "You must provide a name for the videogame";
  } else if (formData.name.length < 5) {
    allValidationErrors.name =
      "The name for the game must be at least five characters long";
  } else {
    allValidationErrors.name = "";
  }

  //Validating Game's IMAGE URL

  if (!formData.background_image) {
    allValidationErrors.background_image =
      "You must provide an URL for the game's image";
  } else if (
    formData.background_image.includes("https://") ||
    formData.background_image.includes("http://")
  ) {
    allValidationErrors.background_image = "";
  } else {
    allValidationErrors.background_image = "It must be a valid URL";
  }

  //Validating Platform selection

  if (!formData.platforms.length) {
    allValidationErrors.platforms =
      "You must select at least one platform for the game";
  } else {
    allValidationErrors.platforms = "";
  }

  //Validation description field

  if (!formData.description) {
    allValidationErrors.description =
      "You must provide a description for the game";
  } else if (formData.description.length < 10) {
    allValidationErrors.description =
      "The game's description must be at least 10 characters long";
  } else {
    allValidationErrors.description = "";
  }

  //Validation Release date

  if (!formData.released) {
    allValidationErrors.released = "You must select a released date";
  } else {
    allValidationErrors.released = "";
  }

  //Validating rate

  if (!formData.rating) {
    allValidationErrors.rating = "The rating for the game is required";
  } else if (!/^[1-5]$/.test(formData.rating)) {
    allValidationErrors.rating =
      "The rating for the game must be a number between 1 and 5";
  } else {
    allValidationErrors.rating = "";
  }

  //Validating Genra Selection

  if (!formData.genres.length) {
    allValidationErrors.genres =
      "You must select at least one genre for the game";
  } else {
    allValidationErrors.genres = "";
  }

  console.log(allValidationErrors);

  setErrors(allValidationErrors);
};

export default validation;

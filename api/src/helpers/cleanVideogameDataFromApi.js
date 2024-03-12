const cleanVideogameDataFromApi = (videogameObject) => {
  const {
    id,
    name,
    description,
    platforms,
    background_image,
    rating,
    released,
    genres,
  } = videogameObject;

  return {
    id,
    name,
    description,
    platforms: !platforms
      ? []
      : platforms.map((platform) => platform.platform.name),
    background_image,
    rating,
    released,
    genres: !genres ? [] : genres.map((genre) => genre.name),
  };
};

module.exports = cleanVideogameDataFromApi;

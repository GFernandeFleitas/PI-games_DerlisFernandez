const { Videogame } = require("../db.js");

const createVideoGame = async (
  name,
  description,
  platforms,
  background_image,
  released,
  rating,
  genre
) => {
  const newVideogame = await Videogame.create({
    name,
    description,
    platforms,
    background_image,
    released,
    rating,
  });

  await newVideogame.setGenres(genre);
  return newVideogame;
};

const postVideogame = async (req, res) => {
  const {
    name,
    description,
    platforms,
    background_image,
    released,
    rating,
    genre,
  } = req.body;

  const isValidGenre =
    Array.isArray(genre) && genre.every((element) => Number.isInteger(element));
  if (!isValidGenre) {
    return res
      .status(400)
      .json({ error: "Invalid genre field. Must contain only integers." });
  }

  try {
    if (
      !name ||
      !description ||
      !platforms ||
      !background_image ||
      !released ||
      !rating ||
      !genre
    )
      throw Error("Missing data");

    const newVideoGame = await createVideoGame(
      name,
      description,
      platforms,
      background_image,
      released,
      rating,
      genre
    );

    res.status(201).json(newVideoGame);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = postVideogame;

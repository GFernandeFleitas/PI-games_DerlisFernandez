const { Videogame, Genre } = require("../db.js");

const createVideoGame = async (
  name,
  description,
  platforms,
  background_image,
  released,
  rating,
  genres
) => {
  const newVideogame = await Videogame.create({
    name,
    description,
    platforms,
    background_image,
    released,
    rating,
  });

  await newVideogame.setGenres(genres);

  const createdVideogame = await Videogame.findByPk(newVideogame.id, {
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  let responseObject = {};

  if (createdVideogame) {
    console.log(createdVideogame.dataValues.genres);
    let auxGenres = createdVideogame.dataValues.genres.map((g) => g.name);
    responseObject = {
      ...createdVideogame.dataValues,
      genres: auxGenres,
    };
  }

  return responseObject;
};

const postVideogame = async (req, res) => {
  const {
    name,
    description,
    platforms,
    background_image,
    released,
    rating,
    genres,
  } = req.body;

  const isValidGenre =
    Array.isArray(genres) &&
    genres.every((element) => Number.isInteger(element));
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
      !genres
    )
      throw Error("Missing data");

    const newVideoGame = await createVideoGame(
      name,
      description,
      platforms,
      background_image,
      released,
      rating,
      genres
    );

    res.status(201).json(newVideoGame);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = postVideogame;

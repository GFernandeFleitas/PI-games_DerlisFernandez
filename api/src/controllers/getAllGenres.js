require("dotenv").config();
const axios = require("axios");

const { API_KEY, VIDEOGAMES_GENRES_ENDPOINT } = process.env;

const { Genre } = require("../db.js");

const getAllGenres = async (req, res) => {
  try {
    const genresDb = await Genre.findAll();
    if (genresDb.length) return res.json(genresDb);

    const response = await axios.get(
      `${VIDEOGAMES_GENRES_ENDPOINT}?key=${API_KEY}`
    );
    const genres = response.data.results;

    genres.forEach(async (g) => {
      await Genre.findOrCreate({
        where: {
          id: g.id,
          name: g.name,
        },
      });
    });

    const genresREADY = genres.map((game) => {
      return {
        id: game.id,
        name: game.name,
      };
    });
    res.json(genresREADY);
  } catch (err) {
    return console.log(err);
  }
};

module.exports = getAllGenres;

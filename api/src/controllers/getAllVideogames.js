const axios = require("axios");
require("dotenv").config();

const { API_KEY, ALL_VIDEOGAMES_ENDOPOINT } = process.env;

// const { Dog } = require("../db.js");

const getAllVideogames = async (req, res) => {
  try {
    const response = await axios(`${ALL_VIDEOGAMES_ENDOPOINT}?key=${API_KEY}`);

    let allVideogames = [];

    response.data.results.map((videogames) => {
      const {
        id,
        name,
        description,
        platforms,
        background_image,
        rating,
        released,
      } = videogames;

      allVideogames.push({
        id,
        name,
        description,
        platforms,
        background_image,
        rating,
        released,
      });
    });

    return allVideogames.length
      ? res.status(200).json({ games: allVideogames })
      : res.status(404).send("Not Found");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getAllVideogames;

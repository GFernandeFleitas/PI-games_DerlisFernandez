const axios = require("axios");
require("dotenv").config();
const { Op } = require("sequelize");
const cleanVideogameDataFromApi = require("../helpers/cleanVideogameDataFromApi.js");

const { API_KEY, ALL_VIDEOGAMES_ENDOPOINT } = process.env;

const { Videogame, Genre } = require("../db.js");

const searchGamesByName = async (req, res) => {
  const { name } = req.query;
  try {
    //get the first response from the API
    const response = await axios(
      `${ALL_VIDEOGAMES_ENDOPOINT}?search=${name}&key=${API_KEY}`
    );

    if (!response.data.count)
      return res.status(204).json(`Game: "${req.query.name}" NOT FOUND`);

    const gamesFound = response.data.results.map((videogame) => {
      return cleanVideogameDataFromApi(videogame);
    });

    const dbVideogames = await Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      limit: 15,
    });

    const filteredDBgames = dbVideogames.filter((game) => {
      return game.name.toLowerCase().includes(name.toLowerCase());
    });

    return gamesFound.length && filteredDBgames.length >= 0
      ? res.status(200).json({
          apigames: [...gamesFound].slice(0, 15),
          dbvideogames: [...filteredDBgames].slice(0, 15),
        })
      : res.status(404).send("Not Found");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = searchGamesByName;

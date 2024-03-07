const axios = require("axios");
require("dotenv").config();
const cleanVideogameDataFromApi = require("../helpers/cleanVideogameDataFromApi.js");

const { API_KEY, ALL_VIDEOGAMES_ENDOPOINT } = process.env;

const { Videogame, Genre } = require("../db.js");

const searchGameById = async (req, res) => {
  const { id } = req.params;

  try {
    //get the first response from the API
    let gamesFound = [];
    let dbVideogames = [];

    if (id.length < 10) {
      const response = await axios(
        `${ALL_VIDEOGAMES_ENDOPOINT}/${id}?key=${API_KEY}`
      );

      gamesFound = [response.data].map((videogame) => {
        return cleanVideogameDataFromApi(videogame);
      });

      if (gamesFound.length) {
        res.status(200).json(...gamesFound);
      } else {
        res.status(404).json({ error: `Game with ID ${id} does not exist` });
      }
    } else {
      dbVideogames = await Videogame.findByPk(id, {
        include: {
          model: Genre,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      });

      let responseObject = {};

      if (dbVideogames) {
        console.log(dbVideogames.dataValues.genres);
        let auxGenres = dbVideogames.dataValues.genres.map((g) => g.name);
        responseObject = {
          ...dbVideogames.dataValues,
          genres: auxGenres,
        };
      }

      !dbVideogames
        ? res.status(404).json({ error: `Game with ID ${id} does not exist` })
        : res.status(200).json(responseObject);
    }
  } catch (error) {
    if (error.hasOwnProperty("response")) {
      res.status(404).json({ error: `Game with ID ${id} does not exist` });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = searchGameById;

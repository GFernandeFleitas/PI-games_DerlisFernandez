const axios = require("axios");
require("dotenv").config();
const { Op } = require("sequelize");
const cleanVideogameDataFromApi = require("../helpers/cleanVideogameDataFromApi.js");

const { API_KEY, ALL_VIDEOGAMES_ENDOPOINT } = process.env;

const { Videogame, Genre } = require("../db.js");

const searchGamesByName = async (req, res) => {
  const { name } = req.query;
  try {
    if (!name) {
      return res.status(200).json({ apigames: [], dbvideogames: [] });
    }
    //get the first response from the API
    const response = await axios(
      `${ALL_VIDEOGAMES_ENDOPOINT}?search=${name}&key=${API_KEY}`
    );

    // if (!response.data.count)
    //   return res.status(204).json(`Game: "${req.query.name}" NOT FOUND`);

    const gamesFound =
      response.data.count === 0
        ? []
        : response.data.results.map((videogame) => {
            return cleanVideogameDataFromApi(videogame);
          });

    const dbVideogames = await Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },

      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },

      limit: 15,
    });

    let responseDbVideogames = [];

    dbVideogames.map((game) => {
      responseDbVideogames.push({
        ...game.toJSON(),
        genres: game.genres.map((g) => g.name),
      });
    });

    // const filteredDBgames = dbVideogames.filter((game) => {
    //   return game.name.toLowerCase().includes(name.toLowerCase());
    // });

    return gamesFound.length >= 0 && responseDbVideogames.length >= 0
      ? res.status(200).json({
          apigames: [...gamesFound].slice(0, 15),
          dbvideogames: [...responseDbVideogames].slice(0, 15),
        })
      : res.status(404).send("Not Found");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = searchGamesByName;

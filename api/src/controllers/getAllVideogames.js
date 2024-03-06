const axios = require("axios");
require("dotenv").config();
const cleanVideogameDataFromApi = require("../helpers/cleanVideogameDataFromApi.js");

const { API_KEY, ALL_VIDEOGAMES_ENDOPOINT } = process.env;

const { Videogame, Genre } = require("../db.js");

const getAllVideogames = async (req, res) => {
  try {
    //get the first response from the API
    let response = await axios(`${ALL_VIDEOGAMES_ENDOPOINT}?key=${API_KEY}`);

    let allVideogames = []; // this variable will store the first 100 games obtain from the database
    let pageNumber = 0; // this variable will count the page number for the attribute next in the response

    // mapping the response and formatting it so it just contains the relevant data in the final response.

    while (pageNumber < 5) {
      pageNumber++;

      response.data.results.map((videogame) => {
        allVideogames.push(cleanVideogameDataFromApi(videogame));
      });

      response = await axios.get(response.data.next);
    }

    let query = {
      include: {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    };

    //

    const dbVideogames = await Videogame.findAll(query);

    return allVideogames.length && dbVideogames.length >= 0
      ? res
          .status(200)
          .json({ apigames: allVideogames, dbvideogames: dbVideogames })
      : res.status(404).send("Not Found");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getAllVideogames;

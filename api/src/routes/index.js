const { Router } = require("express");
const allVideogames = require("../controllers/getAllVideogames.js");
const allGenres = require("../controllers/getAllGenres.js");
const searchGamesByName = require("../controllers/searchGamesByName.js");
const searchGamesById = require("../controllers/searchGamesById.js");
const createVideogame = require("../controllers/createVideogame.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get("/videogames", allVideogames);
router.get("/genres", allGenres);
router.get("/videogames/name", searchGamesByName);
router.get("/videogames/:id", searchGamesById);
router.post("/videogames", createVideogame);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;

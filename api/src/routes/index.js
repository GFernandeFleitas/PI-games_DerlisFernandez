const { Router } = require("express");
const allVideogames = require("../controllers/getAllVideogames.js");
const allGenres = require("../controllers/getAllGenres.js");
const searchGamesByName = require("../controllers/searchGamesByName.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get("/videogames", allVideogames);
router.get("/genres", allGenres);
router.get("/videogames/name", searchGamesByName);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;

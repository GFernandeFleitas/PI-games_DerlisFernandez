const { Router } = require("express");
const allVideogames = require("../controllers/getAllVideogames.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get("/allVideogames", allVideogames);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;

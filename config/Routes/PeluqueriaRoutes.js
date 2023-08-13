const express = require('express');
const router = express.Router();

const {
  getPeluquerias,
  getPeluqueria,
  getPeluqueriasUsuario,
  postPeluqueria,
  putPeluqueria,
  deletePeluqueria,
} = require('../controllers/PeluqueriaControllers');
const { authenticateToken, verifyOwnership } = require('../middlewares');

router
  .route('/Peluquerias')
  .get(getPeluquerias)
  .post(authenticateToken, postPeluqueria)
  .get(authenticateToken, getPeluqueriasUsuario);

router
  .route('/Peluquerias/:peluqueriaId')
  .get(getPeluqueria)
  .put(authenticateToken, verifyOwnership, putPeluqueria)
  .delete(authenticateToken, verifyOwnership, deletePeluqueria);

module.exports = router;
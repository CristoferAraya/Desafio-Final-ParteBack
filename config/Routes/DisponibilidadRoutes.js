const express = require('express');
const router = express.Router();
const { authenticateToken, verifyOwnership } = require('../middlewares');
const {
  postDisponibilidad,
  putDisponibilidad,
  deleteDisponibilidad,
  getDisponibilidadPeluqueria,
} = require('../controllers/DisponibilidadControllers');

router
  .route('/Peluquerias/:peluqueriaId/Disponibilidad')
  .get(getDisponibilidadPeluqueria)
  .post(authenticateToken, verifyOwnership, postDisponibilidad);

router
  .route('/Peluquerias/:peluqueriaId/Disponibilidad/:disponibilidadId')
  .put(authenticateToken, verifyOwnership, putDisponibilidad)
  .delete(authenticateToken, verifyOwnership, deleteDisponibilidad);

module.exports = router;
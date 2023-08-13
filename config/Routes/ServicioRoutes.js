const express = require('express');
const router = express.Router();
const { authenticateToken, verifyOwnership } = require('../middlewares');
const {
  postServicio,
  putServicio,
  deleteServicio,
  getServicios,
  getServicioById,
} = require('../controllers/servicioControllers');

router
  .route('/servicios/:servicioId')
  .get(getServicioById)
  .put(authenticateToken, putServicio);

router
  .route('/peluqueria/:peluqueriaId/servicios')
  .get(getServicios)
  .post(authenticateToken, postServicio);

router
  .route('/peluqueria/:peluqueriaId/servicios/:servicioId')
  .delete(authenticateToken, verifyOwnership, deleteServicio);

module.exports = router;
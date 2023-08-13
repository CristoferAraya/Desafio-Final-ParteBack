const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares');
const {
  postCita,
  putCita,
  deleteCita,
  getCitasUsuario,
  getCitasPeluqueria,
} = require('../controllers/CitasController');

router.route('/Citas').get(authenticateToken, getCitasUsuario);
router
  .route('/peluquerias/:peluqueriaId/citas')
  .get(getCitasPeluqueria)
  .post(authenticateToken, postCita);
router
  .route('/peluquerias/:peluqueriaId/citas/:citaId')
  .put(authenticateToken, putCita)
  .delete(authenticateToken, deleteCita);

module.exports = router;
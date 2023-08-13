const express = require('express');
const router = express.Router();
const {
  postComentario,
  putComentario,
  deleteComentario,
  getComentariosPeluqueria,
  getComentariosUsuario,
  getAllComentarios,
} = require('../controllers/ComentarioControllers');

const { authenticateToken } = require('../middlewares');

router
  .route('/Comentarios')
  .get(getAllComentarios)
  .get(authenticateToken, getComentariosUsuario);

router
  .route('/peluquerias/:peluqueriaId/comentarios')
  .get(getComentariosPeluqueria)
  .post(authenticateToken, postComentario);

router
  .route('/peluquerias/:comentarioId/comentarios')
  .put(authenticateToken, putComentario)
  .delete(authenticateToken, deleteComentario);

module.exports = router;
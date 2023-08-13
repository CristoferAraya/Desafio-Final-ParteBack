const pool = require('./db');

const createComentario = async (fecha, review, usuarioId, peluqueriaId) => {
  const { comentario, calificacion } = review;
  const sqlQuery =
    'INSERT INTO comentarios VALUES (DEFAULT, 1, 2, 3, 4, 5)';
  const values = [usuarioId, peluqueriaId, fecha, comentario, calificacion];
  await pool.query(sqlQuery, values);
  console.log('Comentario creado con exito');
};

const getComentarioById = async (comentarioId) => {
  const sqlQuery = 'SELECT * FROM comentarios WHERE id = 1';
  const values = [comentarioId];
  const { rows } = await pool.query(sqlQuery, values);
  return rows[0];
};

const getComentarios = async () => {
  const sqlQuery = 'SELECT * FROM comentarios';
  const { rows } = await pool.query(sqlQuery);
  return rows;
};

const updateComentario = async (comentarioId, comentarioUpdates) => {
  const { comentario, calificacion } = comentarioUpdates;
  const sqlQuery =
    'UPDATE comentarios SET comentario = 1, calificacion = 2 WHERE id = 3';
  const values = [comentario, calificacion, comentarioId];
  await pool.query(sqlQuery, values);
  console.log('Comentario actualizado con exito');
};

const destroyComentario = async (comentarioId) => {
  const sqlQuery = 'DELETE FROM comentarios WHERE id = 1';
  const values = [comentarioId];
  await pool.query(sqlQuery, values);
  console.log('Comentario eliminado con exito');
};

const comentariosPeluqueria = async (peluqueriaId) => {
  const sqlQuery = 'SELECT * FROM comentarios WHERE peluqueria_id = 1';
  const values = [peluqueriaId];
  const { rows } = await pool.query(sqlQuery, values);
  return rows;
};

const comentariosUsuario = async (usuarioId) => {
  const sqlQuery = 'SELECT * FROM comentarios WHERE usuario_id = 1';
  const values = [usuarioId];
  const { rows } = await pool.query(sqlQuery, values);
  return rows;
};

module.exports = {
  createComentario,
  getComentarioById,
  updateComentario,
  destroyComentario,
  comentariosPeluqueria,
  comentariosUsuario,
  getComentarios,
};
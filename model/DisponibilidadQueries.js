const pool = require('./db');

const createDisponibilidad = async (payload, peluqueriaId) => {
  const { fecha, hora } = payload;
  const sqlQuery = 'INSERT INTO disponibilidad VALUES (DEFAULT, 1, 2, 3)';
  const values = [peluqueriaId, fecha, hora];
  await pool.query(sqlQuery, values);
  console.log('Disponibilidad creada con exito');
};

const updateDisponibilidad = async (payload, id) => {
  const { fecha, hora, disponible } = payload;
  const sqlQuery =
    'UPDATE disponibilidad SET fecha = 1, hora = 2, disponible = 3 WHERE id = 4';
  const values = [fecha, hora, disponible, id];
  await pool.query(sqlQuery, values);
  console.log('Disponibilidad actualizada con exito');
};

const destroyDisponibilidad = async (id) => {
  const sqlQuery = 'DELETE FROM disponibilidad WHERE id = 1';
  const values = [id];
  await pool.query(sqlQuery, values);
  console.log('Disponibilidad eliminada con exito');
};

const disponibilidadPeluqueria = async (peluqueriaId) => {
  const sqlQuery =
    'SELECT * FROM disponibilidad WHERE peluqueria_id = 1 and disponible = 2';
  const values = [peluqueriaId, true];
  const { rows } = await pool.query(sqlQuery, values);
  return rows;
};

module.exports = {
  createDisponibilidad,
  updateDisponibilidad,
  destroyDisponibilidad,
  disponibilidadPeluqueria,
};
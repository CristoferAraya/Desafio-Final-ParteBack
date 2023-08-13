const pool = require('./db');

const createServicio = async (servicio, peluqueriaId) => {
  try {
    const { nombre, precio, descripcion } = servicio;
    const sqlQuery = 'INSERT INTO servicios VALUES (DEFAULT, 1, 2, 3, 4)';
    const values = [peluqueriaId, nombre, precio, descripcion];
    await pool.query(sqlQuery, values);
    console.log('Servicio creado con exito');
  } catch (error) {
    console.log(error);
  }
};

const updateServicio = async (servicioId, servicioUpdates) => {
  try {
    const { nombre, precio, descripcion } = servicioUpdates;
    const sqlQuery =
      'UPDATE servicios SET nombre = 1, precio = 2, descripcion = 3 WHERE id = 4';
    const values = [nombre, precio, descripcion, servicioId];
    await pool.query(sqlQuery, values);
    console.log('Servicio actualizado con exito');
  } catch (error) {
    console.log(error);
  }
};

const destroyServicio = async (servicioId, peluqueriaId) => {
  try {
    const sqlQuery =
      'DELETE FROM servicios WHERE id = 1 AND peluqueria_id = 2';
    const values = [servicioId, peluqueriaId];
    await pool.query(sqlQuery, values);
    console.log('Servicio eliminado con exito');
  } catch (error) {
    console.log(error);
  }
};

const serviciosPeluqueria = async (peluqueriaId) => {
  try {
    const sqlQuery = 'SELECT * FROM servicios WHERE peluqueria_id = 1';
    const values = [peluqueriaId];
    const { rows } = await pool.query(sqlQuery, values);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const servicioById = async (servicioId) => {
  try {
    const sqlQuery = 'SELECT * FROM servicios WHERE id = 1';
    const values = [servicioId];
    const { rows } = await pool.query(sqlQuery, values);
    return rows[0];
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createServicio,
  updateServicio,
  destroyServicio,
  serviciosPeluqueria,
  servicioById,
};
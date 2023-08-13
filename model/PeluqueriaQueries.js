const pool = require('./db');

const allPeluquerias = async () => {
  const sqlQuery = 'SELECT * FROM peluquerias';
  try {
    const { rows } = await pool.query(sqlQuery);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const getPeluqueriaById = async (peluqueriaId) => {
  try {
    const sqlQuery = 'SELECT * FROM peluquerias WHERE id = 1';
    const values = [peluqueriaId];
    if (peluqueriaId === undefined) {
      throw new Error('Id de peluqueria no esta definido');
    }
    const { rows } = await pool.query(sqlQuery, values);
    return rows[0];
  } catch (error) {
    console.log(error);
  }
};

const peluqueriasUsuario = async (usuarioId) => {
  try {
    const sqlQuery = 'SELECT * FROM peluquerias WHERE usuario_id = 1';
    const values = [usuarioId];
    const { rows } = await pool.query(sqlQuery, values);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const createPeluqueria = async (peluqueria, usuarioId) => {
  try {
    if (usuarioId === undefined) throw new Error('Usuario no esta definido');

    const { email, nombre, direccion, telefono, url_img } = peluqueria;
    const sqlQuery =
      'INSERT INTO peluquerias VALUES (DEFAULT, 1, 2, $3, 4, 5, 6) RETURNING *';
    const values = [usuarioId, email, nombre, direccion, telefono, url_img];
    const { rows } = await pool.query(sqlQuery, values);
    return rows[0];
  } catch (error) {
    console.log(error);
  }
};

const updatePeluqueria = async (peluqueriaId, peluqueriaUpdates, usuarioId) => {
  try {
    const { email, nombre, direccion, telefono, url_img } = peluqueriaUpdates;
    const sqlQuery =
      'UPDATE peluquerias SET email = 1, nombre = 2, direccion = 3, telefono = 4, url_img = 5 WHERE id = 6 AND usuario_id = 7';
    const values = [
      email,
      nombre,
      direccion,
      telefono,
      url_img,
      peluqueriaId,
      usuarioId,
    ];
    await pool.query(sqlQuery, values);
    console.log('Peluqueria actualizada con exito');
  } catch (error) {
    console.log(error);
  }
};

const destroyPeluqueria = async (peluqueriaId, usuarioId) => {
  try {
    const sqlQuery =
      'DELETE FROM peluquerias WHERE id = 1 AND usuario_id = 2';
    const values = [peluqueriaId, usuarioId];
    await pool.query(sqlQuery, values);
    console.log('Peluqueria eliminada con exito');
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  allPeluquerias,
  getPeluqueriaById,
  peluqueriasUsuario,
  createPeluqueria,
  updatePeluqueria,
  destroyPeluqueria,
};
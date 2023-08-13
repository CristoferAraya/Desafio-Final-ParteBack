const moment = require('moment');
const pool = require('./db');

const getCitaById = async (citaId) => {
  try {
    const sqlQuery = 'SELECT * FROM citas WHERE id = 1';
    const values = [citaId];
    const { rows } = await pool.query(sqlQuery, values);
    return rows[0];
  } catch (error) {
    console.log(error);
  }
};

const createCita = async (cita, peluqueriaId, usuarioId) => {
  try {
    const { fecha, hora, monto } = cita;
    const sqlQuery = 'INSERT INTO citas VALUES (DEFAULT, 1, 2, 3, 4, 5)';
    const values = [peluqueriaId, usuarioId, fecha, hora, monto];
    await pool.query(sqlQuery, values);
    console.log('Cita creada con exito');
  } catch (error) {
    console.log(error);
  }
};

const updateCita = async (citaId, citaUpdates) => {
  try {
    const { fecha, hora, peluquero_id, activa } = citaUpdates;
    const sqlQuery =
      'UPDATE citas SET fecha = 1, hora = 2, peluquero_id = 3, activa = 4 WHERE id = 5';
    const values = [fecha, hora, peluquero_id, activa, citaId];
    await pool.query(sqlQuery, values);
    console.log('Cita actualizada co exito');
  } catch (error) {
    console.log(error);
  }
};

const destroyCita = async (citaId) => {
  try {
    const sqlQuery = 'DELETE FROM citas WHERE id = 1';
    const values = [citaId];
    await pool.query(sqlQuery, values);
    console.log('Cita eliminada con exito');
  } catch (error) {
    console.log(error);
  }
};

const citasUsuario = async (usuarioId) => {
  try {
    const sqlQuery = `
    SELECT c.*, p.nombre, p.direccion, p.telefono, p.email, p.url_img
    FROM citas c
    INNER JOIN peluquerias p ON c.peluqueria_id = p.id
    WHERE c.usuario_id = 1
    `;
    const values = [usuarioId];
    const { rows } = await pool.query(sqlQuery, values);

    const citasFormateadas = rows.map((cita) => {
      const fechaFormateada = moment(cita.fecha).format('DD-MM-YYYY');
      const horaFormateada = moment(cita.hora, 'HH:mm:ss').format('HH:mm');
      return {
        ...cita,
        fecha: fechaFormateada,
        hora: horaFormateada,
      };
    });
    return citasFormateadas;
  } catch (error) {
    console.log(error);
  }
};

const citasPeluqueria = async (peluqueriaId) => {
  try {
    const sqlQuery = 'SELECT * FROM citas WHERE peluqueria_id = 1';
    const values = [peluqueriaId];
    const { rows } = await pool.query(sqlQuery, values);

    const citasFormateadas = rows.map((cita) => {
      const fechaFormateada = moment(cita.fecha).format('DD-MM-YYYY');
      const horaFormateada = moment(cita.hora, 'HH:mm:ss').format('HH:mm');
      return { ...cita, fecha: fechaFormateada, hora: horaFormateada };
    });
    return citasFormateadas;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getCitaById,
  createCita,
  updateCita,
  destroyCita,
  citasUsuario,
  citasPeluqueria,
};
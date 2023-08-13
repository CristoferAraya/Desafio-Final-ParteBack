const {
    getCitaById,
    createCita,
    updateCita,
    destroyCita,
    citasUsuario,
    citasPeluqueria,
  } = require('../models/queries');
  
  const postCita = async (req, res) => {
    try {
      const cita = req.body;
      const { peluqueriaId } = req.params;
      const usuarioId = req.user.id;
      await createCita(cita, peluqueriaId, usuarioId);
      res.status(201).send('Cita creada con exito');
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Se a producido un error al intentar crear la cita');
    }
  };
  
  const putCita = async (req, res) => {
    try {
      const { citaId } = req.params;
      const citaUpdates = req.body;
      const usuarioId = req.user.id;
      const citaBd = await getCitaById(citaId);
  
      if (!citaBd) {
        return res.status(404).send('No se a podido encontrar la cita');
      }
  
      if (citaBd.usuario_id !== usuarioId) {
        return res
          .status(403)
          .send('No tienes los permisos necesarios para realizar esta acción');
      }
  
      await updateCita(citaId, citaUpdates);
      res.status(200).send('Cita actualizada con exito');
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Se a producido un error al intentar actualizar la cita');
    }
  };
  
  const deleteCita = async (req, res) => {
    try {
      const { citaId } = req.params;
      const usuarioId = req.user.id;
      const citaBd = await getCitaById(citaId);
  
      if (!citaBd) {
        return res.status(404).send('No se a podido encontrar la cita');
      }
  
      if (citaBd.usuario_id !== usuarioId) {
        return res
          .status(403)
          .send('No tienes los  permisos para necesarios para realizar esta acción');
      }
  
      await destroyCita(citaId);
      res.status(200).send('Cita eliminada con exito');
    } catch (error) {
      console.log(error.message);
  
      res.status(500).send('Se a producido un error al intentar  eliminar la cita');
    }
  };
  
  const getCitasUsuario = async (req, res) => {
    try {
      const usuarioId = req.user.id;
      const citas = await citasUsuario(usuarioId);
      res.status(200).json(citas);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Se a producido un error al intentar obtener las citas');
    }
  };
  
  const getCitasPeluqueria = async (req, res) => {
    try {
      const { peluqueriaId } = req.params;
      const citas = await citasPeluqueria(peluqueriaId);
      res.status(200).json(citas);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Se a producido un error al intentar obtener las citas');
    }
  };
  
  module.exports = {
    postCita,
    putCita,
    deleteCita,
    getCitasUsuario,
    getCitasPeluqueria,
  };
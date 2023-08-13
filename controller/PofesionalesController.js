const {
    getPeluqueriaById,
    createProfesionales,
    updateProfesionales,
    destroyProfesionales,
    profesionalesPeluqueria,
    getProfesionalesById,
  } = require('../models/queries');
  
  const postProfesionales = async (req, res) => {
    const profesionales = req.body;
    const { peluqueriaId } = req.params;
    const peluqueriaBd = await getPeluqueriaById(peluqueriaId);
  
    try {
      if (!peluqueriaBd || peluqueriaBd.usuario_id !== req.user.id) {
        return res
          .status(403)
          .send('No tienes permisos para crear este profesional');
      }
  
      await createProfesionales(peluquero, peluqueriaId);
      res.status(201).send('Profesional creado');
    } catch (error) {
      console.log(error);
      res.status(500).send('Error al crear el profesional');
    }
  };
  
  const putProfesionales = async (req, res) => {
    const { peluqueriaId, profesionalesId } = req.params;
    const profesionalesUpdates = req.body;
  
    try {
      await updateProfesionales(profesionalesId, profesionalesUpdates, peluqueriaId);
      res.status(200).send('Profesional actualizado');
    } catch (error) {
      console.log(error);
      res.status(500).send('Error al actualizar el profersional');
    }
  };
  
  const deleteProfesionales = async (req, res) => {
    const { peluqueriaId, profesionalesId } = req.params;
    const usuarioId = req.user.id;
    const peluqueriaBd = await getPeluqueriaById(peluqueriaId);
    const profesionalesBd = await getProfesionalesById(profesionalesId);
  
    try {
      if (!peluqueriaBd || peluqueriaBd.usuario_id !== usuarioId) {
        return res
          .status(403)
          .send('No tienes permisos para eliminar este profesional');
      }
  
      if (!profesionalesBd || profesionalesBd.peluqueria_id !== peluqueriaId) {
        return res.status(404).send('No existe el profesional');
      }
  
      await destroyProfesionales(profesionalesId, peluqueriaId);
      res.status(200).send('Profesional eliminado');
    } catch (error) {
      console.log(error);
      res.status(500).send('Error al eliminar al profesional');
    }
  };
  
  const getProfesionalesById = async (req, res) => {
    const { peluqueriaId } = req.params;
  
    try {
      const peluqueriaBd = await getPeluqueriaById(peluqueriaId);
  
      if (!peluqueriaBd) {
        return res.status(404).send('No existe la peluquería');
      }
  
      const profesionales = await profesionalesPeluqueria(peluqueriaId);
      res.status(200).json(profesionales);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error al obtener los profesionales');
    }
  };
  
  module.exports = {
    postPeluquero,
    putPeluquero,
    deletePeluquero,
    getPeluqueros,
  };
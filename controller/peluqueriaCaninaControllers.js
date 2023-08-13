const {
    allPeluquerias,
    peluqueriasUsuario,
    getPeluqueriaById,
    createPeluqueria,
    updatePeluqueria,
    destroyPeluqueria,
  } = require('../models/queries');
  
  const getPeluquerias = async (req, res) => {
    try {
      const peluquerias = await allPeluquerias();
      res.json(peluquerias);
    } catch (error) {
      console.log(error);
      res.status(500).send('Se a producido un error al obtener las peluquerias');
    }
  };
  
  const getPeluqueriasUsuario = async (req, res) => {
    try {
      const usuarioId = req.user.id;
      const peluquerias = await peluqueriasUsuario(usuarioId);
      res.json(peluquerias);
    } catch (error) {
      console.log(error);
      res.status(500).send('Se a producido un error al obtener las peluquerias');
    }
  };
  
  const getPeluqueria = async (req, res) => {
    try {
      const { peluqueriaId } = req.params;
      const peluqueria = await getPeluqueriaById(peluqueriaId);
  
      if (!peluqueria) {
        return res.status(404).send('No se a podido encontrar la peluqueria ');
      }
  
      res.json(peluqueria);
    } catch (error) {
      console.log(error);
      res.status(500).send('Se a producido un error al obtener la peluqueria');
    }
  };
  
  const postPeluqueria = async (req, res) => {
    try {
      const peluqueria = req.body;
      const usuarioId = req.user.id;
  
      const nuevaPeluqueria = await createPeluqueria(peluqueria, usuarioId);

      const peluqueriaCreada = await getPeluqueriaById(nuevaPeluqueria.id);
      res.status(201).json(peluqueriaCreada);
    } catch (error) {
      console.log(error);
      res.status(500).send('Se a producido un error al crear la peluqueria');
    }
  };
  
  const putPeluqueria = async (req, res) => {
    try {
      const { peluqueriaId } = req.params;
      const peluqueriaUpdates = req.body;
      const usuarioId = req.user.id;
  
      const peluqueriaBd = await getPeluqueriaById(peluqueriaId);
  
      if (!peluqueriaBd) {
        return res.status(404).send('No se a podido encontrar la peluqueria');
      }
  
      await updatePeluqueria(peluqueriaId, peluqueriaUpdates, usuarioId);
  
      res.status(200).send('Peluqueria actualizada con exito');
    } catch (error) {
      console.log(error);
      res.status(500).send('Se a producido un error al actualizar la peluqueria');
    }
  };
  
  const deletePeluqueria = async (req, res) => {
    try {
      const { peluqueriaId } = req.params;
      const usuarioId = req.user.id;
  
      const peluqueriaBd = await getPeluqueriaById(peluqueriaId);
  
      if (!peluqueriaBd) {
        return res.status(404).send('No se a podido encontrar la peluqeria');
      }
  
      await destroyPeluqueria(peluqueriaId, usuarioId);
  
      res.status(200).send('Peluqueria eliminada con exito');
    } catch (error) {
      console.log(error);
      res.status(500).send('Se a producido un error al intentar eliminar la peluqueria');
    }
  };
  
  module.exports = {
    getPeluquerias,
    getPeluqueria,
    getPeluqueriasUsuario,
    postPeluqueria,
    putPeluqueria,
    deletePeluqueria,
  };
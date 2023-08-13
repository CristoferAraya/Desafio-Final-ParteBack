const {
  createComentario,
  updateComentario,
  getComentarioById,
  destroyComentario,
  comentariosPeluqueria,
  comentariosUsuario,
  getComentarios,
} = require('../models/queries');

const postComentario = async (req, res) => {
  const review = req.body;
  const { peluqueriaId } = req.params;
  const usuarioId = req.user.id;
  const fecha = new Date();

  try {
    await createComentario(fecha, review, usuarioId, peluqueriaId);
    res.status(201).send('Comentario creado');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al crear el comentario');
  }
};

const putComentario = async (req, res) => {
  const { comentarioId } = req.params;
  const comentarioUpdates = req.body;
  const usuarioId = req.user.id;

  try {
    const comentarioBd = await getComentarioById(comentarioId);

    if (!comentarioBd) {
      return res.status(404).send('No se a encontrado el comentario');
    }

    if (comentarioBd.usuario_id !== usuarioId) {
      return res
        .status(403)
        .send('No tienes los permisos para poder actualizar el comentario');
    }

    await updateComentario(comentarioId, comentarioUpdates);

    res.status(200).send('Comentario actualizado con exito');
  } catch (error) {
    console.log(error);
    res.status(500).send('Se a producido un error al intentar actualizar el comentario');
  }
};

const deleteComentario = async (req, res) => {
  const { comentarioId } = req.params;
  const usuarioId = req.user.id;

  try {
    const comentarioBd = await getComentarioById(comentarioId);

    if (!comentarioBd) {
      return res.status(404).send('No se a encontrado el comentario');
    }

    if (comentarioBd.usuario_id !== usuarioId) {
      return res
        .status(403)
        .send('No tienes los permisos necesarios para poder eliminar el comentario');
    }

    await destroyComentario(comentarioId);

    res.status(200).send('Comentario exitosamente eliminado');
  } catch (error) {
    console.log(error);
    res.status(500).send('Se a producido un error al intentar eliminar el comentario');
  }
};

const getComentariosPeluqueria = async (req, res) => {
  const { peluqueriaId } = req.params;

  try {
    const comentarios = await comentariosPeluqueria(peluqueriaId);

    res.status(200).json(comentarios);
  } catch (error) {
    console.log(error);
    res.status(500).send('Se a producido un error al intentar obtener los comentarios');
  }
};

const getComentariosUsuario = async (req, res) => {
  const usuarioId = req.user.id;

  try {
    const comentarios = await comentariosUsuario(usuarioId);

    res.status(200).json(comentarios);
  } catch (error) {
    console.log(error);
    res.status(500).send('Se a producido un error al intentar obtener los comentarios');
  }
};

const getAllComentarios = async (req, res) => {
  try {
    const comentarios = await getComentarios();

    res.status(200).json(comentarios);
  } catch (error) {
    console.log(error);
    res.status(500).send('A ocurrido un error al intentar obtener los comentarios');
  }
};

module.exports = {
  postComentario,
  putComentario,
  deleteComentario,
  getComentariosPeluqueria,
  getComentariosUsuario,
  getAllComentarios,
}
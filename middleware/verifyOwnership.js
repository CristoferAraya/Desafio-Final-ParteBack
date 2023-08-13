const { getPeluqueriaById } = require('../models/peluqueriaQueries');

const verifyOwnership = async (req, res, next) => {
  const { peluqueriaId } = req.params;
  const { id: usuarioId } = req.user;

  try {
    const peluqueriaBd = await getPeluqueriaById(peluqueriaId);

    if (!peluqueriaBd || peluqueriaBd.usuario_id !== usuarioId) {
      return res
        .status(403)
        .send('No tienes permisos para realizar esta acción');
    }
    next();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send('Error al verificar la pertenencia de la peluquería al usuario');
  }
};

module.exports = verifyOwnership;
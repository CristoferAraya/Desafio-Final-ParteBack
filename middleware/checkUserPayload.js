const checkUserPayload = (req, res, next) => {
    const { email, nombre, apellidos,mascota, telefono, clave } = req.body;
    if (!email || !nombre || !apellidos ||!mascota|| !telefono || !clave) {
      return res.status(400).send('Faltan campos');
    }
    next();
  };
  
  module.exports = checkUserPayload;
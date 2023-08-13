const express = require ('express');
const router = express.Router ();
const {
   postProfesionales,
   putProfesionales,
   deleteProfesioneles,
   getProfesioneles,
}  = require('../controller/Profesionalescontroller');

const { autenticateToken, verifyOwnership}= require('../middleware');

router
  .route('/peluqueria/:peluqueriaId/preofesionales')
  .get(getProfesioneles)
  .post(autenticateToken,verifyOwnership,postProfesionales);

router
  .route('/peluqueria/:peluqueriaId/Profesionales/:profesionalesId')
  .put(autenticateToken,verifyOwnership,putProfesionales)
  .delete(autenticateToken,verifyOwnership,deleteProfesioneles);

  module.exports= router;

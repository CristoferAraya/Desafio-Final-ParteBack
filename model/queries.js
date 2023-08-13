const usuariosQueries = require('./usuariosQueries');
const peluqueriaQueries = require('./peluqueriaQueries');
const ServicioQueries = require('./servicioQueries');
const ProfesionalesQueries = require('./profesionalesQueries');
const ComentarioQueries = require('./comentarioQueries');
const CitasQueries = require('./citasQueries');
const DisponibilidadQueries = require('./disponibilidadQueries');

module.exports = {
  ...usuariosQueries,
  ...peluqueriaQueries,
  ...ServicioQueries,
  ...ProfesionalesQueries,
  ...ComentarioQueries,
  ...CitasQueries,
  ...DisponibilidadQueries,
};
// CONEXION LOCAL ****************************

const { createPool } = require("mysql2/promise");

const pool = createPool({
    host: '10.5.167.136',
    user: 'root',
    password: "Torax2023.,",
    database: 'diego'
});

// CONEXION PRODUCCION (WEB)***************************

/*const { createPool } = require("mysql2/promise");

const pool = createPool({
    host: 'dpg-cj56r8hitvpc73aac2o0-a.oregon-postgres.render.com',
    user: 'usuario1',
    password: "93VFwWHEV1iaSC3BbH092wXAUxL3eDNZ.,",
    database: 'final_517z'
});
*/

module.exports = pool;


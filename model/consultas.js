const pool = require('../config/conexion');


const get_usuario_model = async () => {
    console.log("paso por el modelo");
    try {
        const query = "SELECT * FROM USUARIO limit 10";
        console.log(query);
        const [rows] = await pool.query(query);
        console.log(rows);
        return rows;
    } catch (error) {
        console.log(error);
    }
};

const get_last_id = async () => {
    try {
        const query = "SELECT id_usuario FROM USUARIO ORDER BY id_usuario DESC LIMIT 1";
        const [rows] = await pool.query(query);
        return rows[0].id_usuario;
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

const registrar_usuario = async (usuario) => {
    const query =
        "INSERT INTO USUARIO (id_usuario, nombre_usuario, apellido, nombre_mascota, telefono, email, contraseña) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [usuario.id, usuario.nombre, usuario.apellido, usuario.mascota, usuario.telefono, usuario.email, usuario.pass_encrip];

    try {
        const result = await pool.query(query, values);
        return result.rows;
    } catch (error) {
        console.log(error)
    }
};


const obtener_usuario = async (email) => {
    const query = "SELECT * FROM USUARIO WHERE email = '" + email + "' limit 1;";
    console.log("modelo:" + query);
    try {
        const [result] = await pool.query(query);
        return result[0];
    } catch (error) {
        console.log(error);
        // Handle the error based on your specific requirement
        // Example: throw new Error('Internal Server Error');
    }
};



module.exports = {
    get_usuario_model,
    registrar_usuario,
    obtener_usuario,
    get_last_id
};
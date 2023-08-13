const {
    get_usuario_model,
    registrar_usuario,
    obtener_usuario,
    get_last_id
} = require("../model/consultas");

const bcrypt = require("bcrypt");

const get_usuario_controller = async (req, res) => {
    console.log("paso por el controlador");
    try {
        const usuarios = await get_usuario_model();
        return usuarios;
    } catch (error) {
        console.log(error);
    }
};


const get_usuario_by_email_c = async (email) => {
    try {
        console.log(email);
        const usuario = await obtener_usuario(email);

        return usuario.length === 0 ? false : true;

    } catch (error) {
        // Manejar el error adecuadamente
    }
}

const crear_usuario_c = async (nombre, apellido, mascota, telefono, email, contraseña) => {
    console.log("entro a la creacion");
    try {
        const pass_encrip = await bcrypt.hash(contraseña, 10);
        const id = await get_last_id() + 1;

        const usuario = {
            id,
            nombre,
            apellido,
            mascota,
            telefono,
            email,
            pass_encrip
        };

        console.log(usuario)
        const newUsuario = registrar_usuario(usuario);

        console.log(newUsuario);

        return newUsuario ? true : false;
    } catch (error) {
        console.log(error);
    }
};

const login_c = async (email, contraseña) => {    
    try {
        const usuario = await obtener_usuario(email);
        if (usuario.length === 0) {
            return false;
        } else {
            return match = await bcrypt.compare(contraseña, usuario.contraseña);
        }
    } catch (error) {
        console.log(error);
    }
};



module.exports = {
    get_usuario_controller,
    get_usuario_by_email_c,
    crear_usuario_c,
    login_c
};

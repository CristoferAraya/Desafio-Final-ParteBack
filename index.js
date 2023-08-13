const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const checkUserPayload = require('./middleware/checkUserPayload');
const authenticateToken = require('./middleware/authenticationToken');
require("dotenv").config();

const { 
    get_usuario_controller,
    get_usuario_by_email_c, 
    crear_usuario_c,
    login_c
} = require("./controller/usuarios");


const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log("SERVER ON", PORT));
app.use(cors());
app.use(express.json());

app.get("/pruebas", async (req, res) => {
    try {
        //controlador
        const usuarios = await get_usuario_controller();
        res.json(usuarios);

    } catch (error) {
    
    }
});

app.post("/usuarios", async (req, res) => {
    try {
    
        const {nombre, apellido, nombreMascota, telefono, email, contraseña } = req.body;
        console.log(req.body);

        // Validar contenido de las variables
        if (!nombre || !apellido || !nombreMascota || !telefono || !email || !contraseña) {
            console.log("paso1");
            return res.status(400).json({ message: "Faltan datos" });
        }

        //validando correo
        if (!email.includes("@") && !email.includes(".")) {
            console.log("paso2");
            return res.status(400).json({ message: "Email invalido" });
        }
    
        // Verificar si el usuario ya existe
        const existingUsuario = await get_usuario_by_email_c(email);
    
        if (existingUsuario) {
            console.log("paso3");
            return res.status(400).json({ message: "Usuario ya existe" });
        } else {
            console.log("paso4");
            const newUsuario = crear_usuario_c(nombre, apellido, nombreMascota, telefono, email, contraseña);
            if (newUsuario) {
                console.log("paso5");
                return res.status(200).json({ message: "Usuario creado" });
            } else {
                console.log("paso6");
                return res.status(500).json({ message: "Error al crear usuario" });
            }
        }
    } catch (error) {
        res.status(500).send(error);
    }
});



app.post("/login", async (req, res) => {
    console.log(req.body)
    const { email, contraseña } = req.body;
    
    // Validar contenido de las variables
    if (!email || !contraseña) {
        return res.status(400).json({ message: "Faltan datos" });
    }
    
    //validacion de correo
    if (!email.includes("@") && !email.includes(".")) {
        return res.status(400).json({ message: "Email invalido" });
    }

    // Verificar si el usuario ya existe
    const login = await login_c(email, contraseña);
    console.log(login)
    if(login){
        return res.status(200).json({ message: "Login OK" });
    }else{
        return res.status(400).json({ message: "Usuario o contraseña incorrectos"});
    }


});





// //MD
// const valida_credenciales = (req, res, next) => {
//     const { email, password, rol, lenguage } = req.body;
//     if (!email || !password || !rol || !lenguage) {
//         return res.status(400).json({ message: "Faltan datos" });
//     }
//     next();
// };
// const valida_credencialesIni = (req, res, next) => {
//     const { email, password } = req.body;
//     if (!email || !password) {
//         return res.status(400).json({ message: "Faltan datos" });
//     }
//     next();
// };
// const token_valido = (req, res, next) => {
//     const Authorization = req.header("Authorization");
//     const token = Authorization.split("Bearer ")[1];
//     if (!token) {
//         return res.status(401).json({ message: "No hay token!" });
//     }
//     jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ message: "Token inválido" });
//         }
//         req.email = decoded;
//         next();
//     });
// };
// const qweryVal = (req, res, next) => {
//     next();
// };
// //EP

// app.post("/usuarios", valida_credenciales, async (req, res) => {
//     try {
//         const usuario = req.body;
//         await registrar_usuario(usuario);
//         res.send("User registrado OK");
//     } catch (error) {
//         res.status(500).send(error);
//     }
// });

// app.post("/login", valida_credencialesIni, async (req, res) => {
//     const { email, password } = req.body;
//     const usuario = await obtener_usuario(email);
//     if (!usuario) {
//         return res.status(401).json({ message: "Password invalida" });
//     }
//     const pass_valida = await bcrypt.compare(password, usuario.password);
//     if (!pass_valida) {
//         return res.status(401).json({ message: "Password invalida" });
//     }
//     const token = jwt.sign({ email: usuario.email }, process.env.SECRET_KEY);
//     res.send(token);
// });

// app.get("/usuarios", token_valido, async (req, res) => {
//     const { email } = req.email;
//     const usuario = await obtener_usuario(email);
//     if (!usuario) {
//         return res.status(404).json({ message: "Usuario no valido" });
//     }
//     const noPassUser = { email: usuario.email, rol: usuario.rol, lenguage: usuario.lenguage }
//     res.json(noPassUser);
// });

// app.use(qweryVal);
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ message: "Problemas en el Server" });
// });
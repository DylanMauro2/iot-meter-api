import { Router } from "express";
import { pool } from "../db.js";
import { TOKEN_SECRET_KEY } from "../config.js";
import jwt from "jsonwebtoken"
import { verifySession } from "../middlewares/authCliente.js";

const usuarioRoutes = Router()

usuarioRoutes.post("/auth/login", async (req, res) => {
    const { email, contrasena } = req.body
    const {rows, rowCount} = await pool.query(`SELECT * FROM usuario WHERE email='${email}' AND contrasena='${contrasena}';`)
    if (rowCount === 0) {
        return res.json({error: "El usuario no existe"})
    }

    const usuario = rows[0]
    
    const payload = {
      usuarioId: usuario.usuario_id,
      nombre: usuario.nombre,
      email: usuario.email
    }
    
    console.log(usuario)

    const token = await crearToken(payload)

    res.cookie("token", token)

    res.status(200).json({
      message: "Usuario logeado exitosamente"
    })
})

usuarioRoutes.post("/auth/register", async (req, res) => {
    try {
        const {nombre, email, contrasena} = req.body

        const response = await pool.query(`INSERT INTO usuario (nombre, contrasena, email) VALUES ('${nombre}', '${contrasena}', '${email}');`)

        console.log(response)

        const payload = {
          usuarioId: usuario.usuario_id,
          nombre: usuario.nombre,
          email: usuario.email
        }

        const token = await crearToken(payload)

        res.cookie("token", token)

        res.status(201).json({
          message: "Usuario registrado exitosamente"
        })
    } catch(e) {
        console.error(e)
    }
})

usuarioRoutes.get("/usuarios/:id", verifySession, async (req, res) => {
    const { id } = req.params
    const response = await pool.query(`SELECT * FROM usuario WHERE usuario_id=${id};`)
    console.log(response)
    res.send(response)
})

usuarioRoutes.get("/usuarios", async (req, res) => {
    const response = await pool.query("SELECT * FROM usuario;")
    console.log(response.rows)
    res.send(response.rows)
})

usuarioRoutes.put("/usuarios/:id/editar", async (req, res) => {
    const { id } = req.params;
    const { nombre, email, contrasena } = req.body;
  
    try {

      const fields = [];

      let query = 'UPDATE usuario SET ';
  
      if (nombre) {
        fields.push(`nombre = '${nombre}'`);
      }
  
      if (contrasena) {
        fields.push(`email = '${email}'`);
      }

      if (contrasena) {
        fields.push(`contrasena = '${contrasena}'`);
      }
  
      if (fields.length === 0) {
        return res.status(400).json({ error: 'No se proporcionaron campos para actualizar' });
      }
  
      query += fields.join(', ') + ' WHERE usuario_id = ' + id;
  
      const result = await pool.query(query);
  
      res.json({ message: 'Usuario actualizado exitosamente', result });
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      res.status(500).json({ error: 'Ocurrió un error al actualizar el usuario' });
    }
})

export function crearToken(payload) {
  return new Promise ((resolve, reject) => {
    jwt.sign(payload, TOKEN_SECRET_KEY, { expiresIn: "1d" }, (err, token) => {
      if (err) reject(err)
      resolve(token)
    })
  })
}

export default usuarioRoutes
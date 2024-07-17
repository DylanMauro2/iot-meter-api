import { Router } from "express";
import { pool } from "../db.js";

const usuarioRoutes = Router()

usuarioRoutes.post("/auth/login", async (req, res) => {
    const {body} = req
    const {rows, rowCount} = await pool.query(`SELECT * FROM usuario WHERE email='${body.email}' AND contrasena='${body.contrasena}';`)
    if (rowCount === 0) {
        return res.json({error: "El usuario no existe"})
    }
    
    console.log(rows)

    res.send("logando usuario")
})

usuarioRoutes.post("/auth/register", async (req, res) => {
    try {
        const {body} = req
        console.log(body)
        const response = await pool.query(`INSERT INTO usuario (nombre, contrasena, email) VALUES ('${body.nombre}', '${body.contrasena}', '${body.email}');`)
        console.log(response)
        res.send("registrando usuario")
    } catch(e) {
        console.error(e)
    }
})

usuarioRoutes.get("/usuarios/:id", async (req, res) => {
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
    const { nombre, contrasena } = req.body;
  
    try {

      const fields = [];

      let query = 'UPDATE usuario SET ';
  
      if (nombre) {
        fields.push(`nombre = '${nombre}'`);
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

export default usuarioRoutes
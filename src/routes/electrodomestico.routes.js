import { Router } from "express";
import { pool } from "../db.js";

const electrodomesticoRoutes = Router()

electrodomesticoRoutes.get("/electrodomesticos", async (req, res) => {
    try {
        const query = "SELECT * FROM electrodomestico"
        const response = await pool.query(query)

        console.log(response)

        res.status(200).json(response)

    } catch (error) {
        console.log(error)
    }
})

electrodomesticoRoutes.get("/electrodomesticos/:id", async (req, res) => {
    try {
        const { id } = req.params
        const query = `SELECT * FROM electrodomestico WHERE electrodomestico_id = ${id}`
        const response = await pool.query(query)

        console.log("obteniendo dispositivo")

        res.status(200).json(response.rows[0])

    } catch (error) {
        console.log(error)
    }
})

electrodomesticoRoutes.post("/electrodomesticos/crear", async (req, res) => {
    try {
        const { 
            nombre, 
            usuarioId, 
            amperajeNominal, 
            potenciaNominal,
        } = req.body
    
        if (!usuarioId) {
            return res.status(400).json({
                error: "No se entrego un id de usuario"
            })
        }

        const query = `INSERT INTO electrodomestico (nombre, usuario_id, amperaje_nominal, potencia_nominal, voltaje_nominal) VALUES ('${nombre}','${usuarioId}','${amperajeNominal}','${potenciaNominal}',${220})`
    
        const response = await pool.query(query)
        
        console.log(response)
    
        res.status(201).json({ message: "Electrodomestico creado exitosamente" })

    } catch (e) {
        console.error(e)
    }
})

electrodomesticoRoutes.put("/electrodomesticos/:id/editar", async (req, res) => {
    try {
        const { 
            nombre, 
            usuarioId, 
            amperajeNominal, 
            potenciaNominal,
        } = req.body
        
        const { id } = req.params
    
        if (!usuarioId) {
            return res.status(400).json({
                error: "No se entrego un id de usuario"
            })
        }

        const fields = [];

        let query = 'UPDATE usuario SET ';
  
        if (nombre) {
            fields.push(`nombre = '${nombre}'`);
        }
  
        if (amperajeNominal) {
            fields.push(`amperaje_nominal = '${amperajeNominal}'`);
        }

        if (potenciaNominal) {
            fields.push(`potencia_nominal = '${potenciaNominal}'`);
        }
  
        if (fields.length === 0) {
            return res.status(400).json({ error: 'No se proporcionaron campos para actualizar' });
        }
  
        query += fields.join(', ') + ' WHERE electrodomestico_id = ' + id;
    
        const response = await pool.query(query)
        
        console.log(response)
    
        res.status(200).json({ message: "Electrodomestico actualizado correctamente" })
        
    } catch (e) {
        console.error(e)
    }
})

electrodomesticoRoutes.post("/electrodomesticos/usuario/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const query = `SELECT * FROM electrodomestico WHERE usuario_id=${id}`;
        const response = await pool.query(query)
        res.status(200).json(response.rows)
    } catch (e) {
        console.error(e)
    }
})

electrodomesticoRoutes.delete("/electrodomesticos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const query = `DELETE FROM electrodomestico WHERE electrodomestico_id=${id}`;

        const response = await pool.query(query)

        res.status(200).json({message: "Electrodomesticos eliminado exitosamente"})
    } catch (e) {
        console.error(e)
    }
})

export default electrodomesticoRoutes;
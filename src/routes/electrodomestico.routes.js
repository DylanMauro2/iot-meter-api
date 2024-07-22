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

electrodomesticoRoutes.post("/electrodomesticos/usuario", async (req, res) => {
    try {
        const { usuarioId } = req.body;
        const query = `SELECT * FROM electrodomestico WHERE usuario_id=${usuarioId}`;
        const response = await pool.query(query)
        res.status(200).json(response)
    } catch (e) {
        console.error(e)
    }
})

export default electrodomesticoRoutes;
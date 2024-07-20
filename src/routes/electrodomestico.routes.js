import { response, Router } from "express";
import { pool } from "../db";

const electrodomesticoRoutes = Router()

electrodomesticoRoutes.get("/electrodomesticos", async (req, res) => {
    res.send("obteniendo electrodomesticos")
})

electrodomesticoRoutes.post("/electrodomesticos/crear", async (req, res) => {
    try {
        const { 
            nombre, 
            usuarioId, 
            voltajeNominal, 
            amperajeNominal, 
            potenciaNominal,
        } = req.body
    
        if (!usuarioId) {
            return res.status(400).json({
                error: "No se entrego un id de usuario"
            })
        }

        const query = `INSERT INTO electrodomestico (nombre, usuario_id, voltaje_nominal, amperaje_nominal, potencia_nominal) VALUES ('${nombre}','${usuarioId}','${voltajeNominal}','${amperajeNominal}','${potenciaNominal}')`
    
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
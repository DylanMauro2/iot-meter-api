import { Router } from "express";
import { pool } from "../db.js";

const medicionRoutes = Router()

medicionRoutes.get("/mediciones/electrodomestico/:id", async (req, res) => {
    try {
        const { id } = req.params
        const query = `SELECT * FROM medicion WHERE electrodomestico_id=${id}`
        const response = await pool.query(query)

        console.log(response)

        res.status(200).json(response)

    } catch (error) {
        console.log(error)
    }
})

medicionRoutes.post("/mediciones/crear", async (req, res) => {
    try {
        const { 
            electrodomesticoId, 
            corriente, 
            potencia,
        } = req.body
    
        if (!electrodomesticoId) {
            return res.status(400).json({
                error: "No se entrego un id de electrodomestico"
            })
        }

        const query = `INSERT INTO medicion (electrodomestico_id, corriente, potencia, voltaje) VALUES ('${electrodomesticoId}','${corriente}','${potencia}', 220)`
    
        const response = await pool.query(query)
        
        console.log(response)
    
        res.status(201).json({ message: "Medicición creada exitosamente" })

    } catch (e) {
        console.error(e)
    }
})

export default medicionRoutes;


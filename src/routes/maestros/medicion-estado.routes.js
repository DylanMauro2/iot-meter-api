import { Router } from "express";
import { pool } from "../../db";

const medicionEstadoRoutes = Router()

medicionEstadoRoutes.get("/medicion-estado", async (req, res) => {
    try {
        const query = "SELECT * FROM medicion_estado"
        const response = await pool.query(query)

        console.log(response)

        res.status(200).json(response)

    } catch (error) {
        console.log(error)
    }
})
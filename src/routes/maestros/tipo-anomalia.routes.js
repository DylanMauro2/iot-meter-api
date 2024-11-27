import { Router } from "express";
import { pool } from "../../db";

const tipoAnomaliaRoutes = Router()

tipoAnomaliaRoutes.get("/tipo-anomalia", async (req, res) => {
    try {
        const query = "SELECT * FROM tipo_anomalia"
        const response = await pool.query(query)

        console.log(response)

        res.status(200).json(response)

    } catch (error) {
        console.log(error)
    }
})
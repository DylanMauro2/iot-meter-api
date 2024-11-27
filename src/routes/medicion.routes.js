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
            amperaje, 
            potencia,
        } = req.body

        console.log(req.body)
    
        if (!electrodomesticoId) {
            return res.status(400).json({
                error: "No se entrego un id de electrodomestico"
            })
        }

        const electrodomesticoQuery = `SELECT * FROM electrodomestico WHERE electrodomestico_id = ${electrodomesticoId}`
        
        const { rows, rowCount } = await pool.query(electrodomesticoQuery)

        const electrodomestico = rows[0]

        if (rowCount === 0) throw new Error("No se encontro el electrodomestico")

        const {rows: estados} = await pool.query("SELECT * FROM medicion_estado")

        // Evaluar el umbral del amperaje y watts
        const evaluar = (valor, umbralMin, umbralMax) => {
            if (umbralMin < valor && valor < umbralMax) {
                const totalUmbral = umbralMax - umbralMin
                const actual = valor - umbralMin
                const porcentaje = actual / totalUmbral
                console.log({porcentaje})
                if (porcentaje > 0 && porcentaje < 1/3) {
                    return estados[2]
                }
                if (porcentaje >= 1/3 && porcentaje < 2/3) {
                    return estados[1]
                }
                if (porcentaje >= 2/3 && porcentaje < 1) {
                    return estados[0]
                }
            } else {
                // se envia a crear una anomalia asociada a la medicion con su tipo de anomalía
                const 
                return
            }
        }

        const medicionEstadoPotencia = evaluar(potencia, electrodomestico.umbral_potencia_min, electrodomestico.umbral_potencia_max);
        const medicionEstadoAmperaje = evaluar(amperaje, electrodomestico.umbral_amperaje_min, electrodomestico.umbral_amperaje_max);

        // Comprobar que si el id es menor se escoge el de mayor incidencia para la medicion
        const medicionEstado = medicionEstadoPotencia.medicion_estado_id < medicionEstadoAmperaje.medicion_estado_id ? medicionEstadoPotencia : medicionEstadoAmperaje


        const query = `INSERT INTO medicion (electrodomestico_id, medicion_estado_id, amperaje, potencia) VALUES ('${electrodomesticoId}','${medicionEstado.medicion_estado_id}','${amperaje}','${potencia}')`
    
        const response = await pool.query(query)
        
        console.log(response)
    
        res.status(201).json(response)

    } catch (e) {
        console.error(e)
    }
})

export default medicionRoutes;


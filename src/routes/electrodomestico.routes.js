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
        const {rows } = response

        console.log("obteniendo dispositivo")

        console.log(response.rows)

        if (rows.length > 0) {
            const electrodomestico = rows[0];
            const mappedData = {
                id: electrodomestico.electrodomestico_id,
                usuarioId: electrodomestico.usuario_id,
                nombre: electrodomestico.nombre,
                descripcion: electrodomestico.descripcion,
                marca: electrodomestico.marca,
                modelo: electrodomestico.modelo,
                amperajeNominal: electrodomestico.amperaje_nominal,
                voltajeNominal: electrodomestico.voltaje_nominal,
                potenciaNominal: electrodomestico.potencia_nominal,
                umbralAmperajeMin: electrodomestico.umbral_amperaje_min,
                umbralAmperajeMax: electrodomestico.umbral_amperaje_max,
                umbralVoltajeMin: electrodomestico.umbral_voltaje_min,
                umbralVoltajeMax: electrodomestico.umbral_voltaje_max,
                umbralPotenciaMin: electrodomestico.umbral_potencia_min,
                umbralPotenciaMax: electrodomestico.umbral_potencia_max,
                createdAt: electrodomestico.created_at,
                updatedAt: electrodomestico.updated_at
            }
            res.status(200).json(mappedData)
        }


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
            umbralAmperajeMax,
            umbralAmperajeMin,
            umbralPotenciaMax,
            umbralPotenciaMin,
            descripcion
        } = req.body

        console.log(req.body)
        
        const { id } = req.params
    
        if (!id) {
            return res.status(400).json({
                error: "No se entrego un id de electrodomestico"
            })
        }

        const fields = [];

        let query = 'UPDATE electrodomestico SET ';
  
        if (nombre) {
            fields.push(`nombre = '${nombre}'`);
        }
  
        if (amperajeNominal) {
            fields.push(`amperaje_nominal = '${amperajeNominal}'`);
        }

        if (potenciaNominal) {
            fields.push(`potencia_nominal = '${potenciaNominal}'`);
        }

        if (umbralAmperajeMax) {
            fields.push(`umbral_amperaje_max = '${umbralAmperajeMax}'`);
        }

        if (umbralAmperajeMin) {
            fields.push(`umbral_amperaje_min = '${umbralAmperajeMin}'`);
        }

        if (umbralPotenciaMax) {
            fields.push(`umbral_potencia_max = '${umbralPotenciaMax}'`);
        }

        if (umbralPotenciaMin) {
            fields.push(`umbral_potencia_min = '${umbralPotenciaMin}'`);
        }

        if (descripcion) {
            fields.push(`descripcion = '${descripcion}'`);
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
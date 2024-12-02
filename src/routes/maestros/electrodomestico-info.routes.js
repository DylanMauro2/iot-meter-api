import { Router } from "express";
import { pool } from "../../db.js";

const electrodomesticoInfoRoutes = Router()

electrodomesticoInfoRoutes.get("/electrodomesticos-info", async (req, res) => {
    try {
        const query = "SELECT * FROM electrodomestico_info"
        const response = await pool.query(query)

        const { rows } = response

        console.log(response)

        if (rows.length > 0) {
          const mappedData = rows.map(electrodomesticoInfo => ({
              id: electrodomesticoInfo.electrodomestico_info_id,
              nombre: electrodomesticoInfo.nombre,
              amperajeNominal: electrodomesticoInfo.amperaje_nominal,
              voltajeNominal: electrodomesticoInfo.voltaje_nominal,
              potenciaNominal: electrodomesticoInfo.potencia_nominal,
              umbralAmperajeMin: electrodomesticoInfo.umbral_amperaje_min,
              umbralAmperajeMax: electrodomesticoInfo.umbral_amperaje_max,
              umbralVoltajeMin: electrodomesticoInfo.umbral_voltaje_min,
              umbralVoltajeMax: electrodomesticoInfo.umbral_voltaje_max,
              umbralPotenciaMin: electrodomesticoInfo.umbral_potencia_min,
              umbralPotenciaMax: electrodomesticoInfo.umbral_potencia_max,
          }))

          console.log(mappedData)
          
          res.status(200).json(mappedData)
      }
    } catch (error) {
        console.log(error)
    }
})

export default electrodomesticoInfoRoutes;

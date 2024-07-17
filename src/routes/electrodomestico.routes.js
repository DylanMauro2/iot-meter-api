import { Router } from "express";

const electrodomesticoRoutes = Router()

electrodomesticoRoutes.get("/electrodomesticos", async (req, res) => {
    res.send("obteniendo electrodomesticos")
})

electrodomesticoRoutes.post("/electrodomesticos/crear", async (req, res) => {
    const { 
        nombre, 
        usuarioId, 
        voltajeNominal, 
        amperajeNominal, 
        potenciaNominal,
    } = req.body
    const { id } = req.params;

    const query = `INSERT INTO electrodomestico (nombre, usuario_id, voltaje_nominal, amperaje_nominal, potencia_nominal) VALUES ('${nombre}','${usuarioId}','${voltajeNominal}','${amperajeNominal}','${potenciaNominal}')`

    console.log(query)

    res.send(query);
})

electrodomesticoRoutes.get("/electrodomesticos", async (req, res) => {
    res.send("obteniendo electrodomesticos");
})
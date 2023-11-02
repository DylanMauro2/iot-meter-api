import { Router } from "express"
import { registrarCliente, loginCliente, perfilCliente } from "../controllers/client.controllers.js"
import { authCliente } from "../middlewares/authCliente.js"

const clientRoutes = Router()

clientRoutes.post("/api/client-login", loginCliente)

clientRoutes.post("/api/client-register", registrarCliente)

clientRoutes.get("/api/client-profile", authCliente, perfilCliente)


export default clientRoutes
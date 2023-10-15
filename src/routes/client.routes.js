import { Router } from "express"
import { registrarCliente, loginCliente } from "../controllers/client.controllers.js"

const clientRoutes = Router()

clientRoutes.post("/api/client-login", loginCliente)

clientRoutes.post("/api/client-register", registrarCliente)

export default clientRoutes
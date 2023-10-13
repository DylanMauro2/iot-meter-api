import { Router } from "express"
import { registrarCliente } from "../controllers/client.controllers.js"

const clientRoutes = Router()

//clientRoutes.get("/api/client-login", loginCliente)

clientRoutes.post("/api/client-register", registrarCliente)

export default clientRoutes
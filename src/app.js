import express from "express"
import clientRoutes from "./routes/client.routes.js"
import { connectDB } from "./db.js"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

connectDB()

app.use(clientRoutes)

app.get("/", (req, res) => {
  res.send("hola mundo")
})



export default app;
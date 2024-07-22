import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

import usuarioRoutes from "./routes/usuario.routes.js"
import medicionRoutes from "./routes/medicion.routes.js"
import electrodomesticoRoutes from "./routes/electrodomestico.routes.js"


const app = express()

app.use(cors({ credentials: true }))
app.use(express.json())
app.use(cookieParser())


app.use(usuarioRoutes)
app.use(electrodomesticoRoutes)
app.use(medicionRoutes)

app.get("/", (req, res) => {
  res.send("hola mundo")
})

app.listen(3000, () => {
  console.log("server listen on port 3000")
})


export default app;
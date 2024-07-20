import express from "express"
import usuarioRoutes from "./routes/usuario.routes.js"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()

app.use(cors({ credentials: true }))
app.use(express.json())
app.use(cookieParser())


app.use(usuarioRoutes)

app.get("/", (req, res) => {
  res.send("hola mundo")
})

app.listen(3000, () => {
  console.log("server listen on port 3000")
})


export default app;
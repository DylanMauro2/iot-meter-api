import express from "express"
import usuarioRoutes from "./routes/usuario.routes.js"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()

app.use(cors({ credentials: true }))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended:true }))


app.use(usuarioRoutes)

app.get("/", (req, res) => {
  res.send("hola mundo")
})

app.listen(8080, () => {
  console.log("server listen on port 8080")
})


export default app;
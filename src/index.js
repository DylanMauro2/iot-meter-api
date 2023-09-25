import app from "./app.js"
import { Server as SocketServer } from "socket.io"
import http from "http"
import { connectDB } from "./db.js"

const server = http.createServer(app)
const httpServer = server.listen(3000)
const io = new SocketServer(httpServer, {
  cors: {
    origin: "*"
  }
})

connectDB()

io.on('connection', socket => {
  console.log("usuario conectado")

  /* setInterval(() => {
    const valor = 250  + Math.random(10) * 100;
    socket.emit("dato", valor)
  }, 1000)*/

  socket.on("mensaje", mensaje => {
    console.log(mensaje)
  })

  socket.on("disconnect", () => {
    console.log("Usuario desconectado")
  })
})

console.log("server listen on port 3000")
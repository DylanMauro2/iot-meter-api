import app from "./app.js"
import { Server as SocketServer } from "socket.io"
import http from "http"
import { connectDB } from "./db.js"
import Data from "./models/Data.js"
import { TOKEN_SECRET_KEY } from "./config.js"
import jwt from "jsonwebtoken"

const testUserId = "654e80c61586b27ef3c95714"

const server = http.createServer(app)
const httpServer = server.listen(3000)
const io = new SocketServer(httpServer, {
  cors: {
    origin: "*",
    credentials:true
  }
})

connectDB()


io.on('connection', socket => {
  console.log("usuario conectado:", socket.id)

  socket.on("mensaje", mensaje => {
    console.log(mensaje)
  })

  socket.on("client:solicitarDatos",  (token) => {
    jwt.verify(token, TOKEN_SECRET_KEY, async (err, decoded) => {
      if (err) {
        console.error('Error al decifrar el token:', err);
      } else {
        let hoy = new Date()
        hoy.setMinutes(hoy.getMinutes() - 5)
        const datos = await Data.find({
          userId: {
            "$eq": decoded.id            
          },
          createdAt: {
            "$gte": hoy
          }
        })

        const totalMes = await Data.find({
          userId: {
            "$eq": decoded.id
          },
          createdAt: {
            "$lt": new Date()
          }
        })

        socket.emit("server:enviarDatos", datos)
      }
    });
  })

  socket.on("disconnect", () => {
    console.log("Usuario desconectado")
  })
})

function generarData() {
  setInterval(async () => {
    const watts = 25  + Math.random(10) * 10;
    const voltaje = 15  + Math.random(10) * 5;
    const amperaje = 1  + Math.random(10) * 0.5;
    const newData = new Data({
      voltaje,
      amperaje,
      watts,
      userId: testUserId
    })
    await newData.save()
  }, 5000)
}

generarData()





console.log("server listen on port 3000")
//  id del usuario de prueba: 654e80c61586b27ef3c95714 
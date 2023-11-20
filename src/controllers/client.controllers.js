import Cliente from "../models/Client.js"
import jwt from "jsonwebtoken"
import { TOKEN_SECRET_KEY } from "../config.js"

export const registrarCliente = async (req, res) => {
  const { nombreUsuario, contraseña, email } = req.body
  
  console.log(req.body)
  const cliente = new Cliente({
     nombreUsuario:nombreUsuario,
     contraseña:contraseña,
     email:email
   })
   await cliente.save()
   
  return res.json({
    message: "El cliente fue registrado exitosamente"
    }).status(201)
}

export const loginCliente = async (req, res) => {
  try {
    const {nombreUsuario, contraseña} = req.body
    const cliente = await Cliente.findOne({
      nombreUsuario: {
        "$eq": nombreUsuario
      },
      contraseña: {
        "$eq": contraseña
      }
    })
  
    if (!cliente) return res.status(400).json({ error: "Credenciales invalidas"})
    if (cliente.contraseña !== contraseña) return res.status(400).json({ error: "Credenciales invalidas"})   
    const token = await crearToken({
      id:cliente._id,
      nombre: cliente.nombreUsuario
    })
    res.cookie("token", token)
    return res.status(201).json({
      token
    })
  } catch (error) {
    console.log(error)
  }
     
}

export const perfilCliente = async (req, res) => {
  const {id} = req.user
  const clienteEncontrado = await Cliente.findById(id)
  res.json(clienteEncontrado)
}

export function crearToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, TOKEN_SECRET_KEY, {expiresIn:"1d"}, (err, token) => {
      if (err) reject(err)
      resolve(token)
    })
  })
}
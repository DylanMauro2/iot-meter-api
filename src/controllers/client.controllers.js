import Client from "../models/Client.js"

export const registrarCliente = async (req, res) => {
  const { nombreUsuario, contraseña, email } = req.body
  
  console.log(req.body)
  const client = new Client({
     nombreUsuario:nombreUsuario,
     contraseña:contraseña,
     email:email
   })
   await client.save()
   
  return res.json({
    message: "El cliente fue registrado exitosamente"
    }).status(201)
}
/*
export const loginCliente = async (req, res) => {
  const { id } = req.params.id
  console.log(id)
  return res.json({"el id es ": id})
}
*/ 
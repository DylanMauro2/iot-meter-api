import Cliente from "../models/Client.js"

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
  const {nombreUsuario, contraseña} = req.body
  const cliente = await Cliente.find({
    nombreUsuario: {
      "$eq": nombreUsuario
    },
    contraseña: {
      "$eq": contraseña
    }
  })
  cliente.length !== 0 
  ?  res.json({token:"valido"})
  :  res.json({error: "el cliente ingresado es invalido o no existe"}) 
  
}

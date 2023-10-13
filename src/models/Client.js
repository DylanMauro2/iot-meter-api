import { Schema, model } from "mongoose";

const clientEsquema = new Schema({
  nombreUsuario: { 
    type: String,
    required: true
  },
  contraseña: {
    type: String,
    required:true
  },
  email: {
    type: String,
    required:true
  }
})

export default model("Cliente", clientEsquema, "cliente")
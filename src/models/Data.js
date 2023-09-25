import { Schema, model } from "mongoose"

const Data = new Schema({
  voltaje: {
    type: Number,
    required: true
  },
  amperaje: {
    type: Number,
    required: true
  },
  watts: {
    type: Number,
    required: true
  }, 
}, { 
  timestamp: true
})

export default model("Data", Data, "pruebaiot")
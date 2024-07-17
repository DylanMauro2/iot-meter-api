import pkg from "pg"

const {Pool} = pkg

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "password",
  database:"iot-meter",
  port:"5432",
})


import jwt from "jsonwebtoken"
import { TOKEN_SECRET_KEY } from "../config.js"

export const verifySession = (req, res, next) => {
  const {token} = req.cookies
  if (!token) {
    return res.status(400).json({ err: "No token"})
  }     

  jwt.verify(token, TOKEN_SECRET_KEY, (err, user) => {
    if (err) return res.status(400).json({error: "token no valido"})
    req.user = user
    next()
  })
}
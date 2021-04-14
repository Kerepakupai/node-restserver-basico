const { response } = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')
const generarJWT = require('../helpers/generar-jwt')

const login = async (req, res = response) => {
  const { correo, password } = req.body

  try {
    const usuario = await Usuario.findOne({ correo })
    if (!usuario) {
      return res.status(400).json({
        msg: 'Usuario / Contraseña incorrectos'
      })
    }

    if (!usuario.estado) {
      return res.status(400).json({
        msg: 'Usuario / Contraseña incorrectos'
      })
    }

    const validPassword = bcryptjs.compareSync(password, usuario.password)
    if (!validPassword) {
      return res.status(400).json({
        msg: 'Usuario / Contraseña incorrectos'
      })
    }

    const token = await generarJWT(usuario.id)

    res.json({
      usuario,
      token
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      msg: 'Contacte al administrador'
    })
  }
}

module.exports = {
  login
}

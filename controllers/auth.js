const { response } = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')
const generarJWT = require('../helpers/generar-jwt')
const { googleVerify } = require('../helpers/google-verify')

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

const googleSignin = async (req, res = response) => {
  const { id_token: idToken } = req.body

  try {
    const { correo, nombre, img } = await googleVerify(idToken)

    let usuario = await Usuario.findOne({ correo })

    if (!usuario) {
      const data = {
        nombre,
        correo,
        password: ':P',
        img,
        google: true
      }
      usuario = new Usuario(data)
      await usuario.save()
    }

    if (!usuario.estado) {
      return res.status(401).json({
        msg: 'Contacte con el administrador, usuario bloqueado'
      })
    }

    const token = await generarJWT(usuario.id)

    res.json({
      usuario,
      token
    })
  } catch (error) {
    res.status(400).json({
      msg: 'Token de Google invalido'
    })
  }
}

module.exports = {
  login,
  googleSignin
}

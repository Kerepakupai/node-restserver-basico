const { response } = require('express')
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')

const usuariosGet = async (req, res = response) => {
  // const { q, nombre = 'No name', apiKey } = req.query
  const { limite = 5, desde = 0 } = req.query
  const query = { estado: true }

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
      .limit(Number(limite))
      .skip(Number(desde))
  ])

  res.json({
    total,
    usuarios
  })
}

const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body
  const usuario = new Usuario({
    nombre, correo, password, rol
  })

  // encriptar contraseña
  const salt = bcryptjs.genSaltSync(10)
  usuario.password = bcryptjs.hashSync(password, salt)

  await usuario.save()

  res.json(usuario)
}

const usuariosPut = async (req, res = response) => {
  const { id } = req.params
  const { _id, password, google, ...usuario } = req.body

  // validar contra base de datos
  if (password) {
    const salt = bcryptjs.genSaltSync(10)
    usuario.password = bcryptjs.hashSync(password, salt)
  }

  const usuarioDB = await Usuario.findByIdAndUpdate(id, usuario)

  res.json(usuarioDB)
}

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params

  // borrado fisico
  // const usuario = await Usuario.findByIdAndDelete(id)
  try {
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false })

    res.json(usuario)
  } catch (error) {
    console.log('No se puedo borrar el usuario')
    res.status(500).send({
      msg: 'Error borrando usuario'
    })
  }
}

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete
}

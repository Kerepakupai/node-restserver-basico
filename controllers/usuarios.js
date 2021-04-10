const { response } = require('express')

const usuariosGet = (req, res = response) => {
  const { q, nombre = 'No name', apiKey } = req.query

  res.json({
    message: 'get API',
    q,
    nombre,
    apiKey
  })
}

const usuariosPost = (req, res = response) => {
  const { nombre, edad } = req.body

  res.json({
    message: 'post API',
    nombre,
    edad
  })
}

const usuariosPut = (req, res = response) => {
  const { id } = req.params

  res.json({
    message: 'put API',
    id
  })
}

const usuariosDelete = (req, res = response) => {
  res.json({
    message: 'delete API'
  })
}

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete
}

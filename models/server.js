const express = require('express')
const cors = require('cors')

class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT

    // Usuarios
    this.usuariosURI = '/api/usuarios'
    this.usuariosRoutes = require('../routes/usuarios')

    this.middlewares()

    this.routes()
  }

  middlewares () {
    this.app.use(cors())

    this.app.use(express.json())

    this.app.use(express.static('public'))
  }

  routes () {
    // Usuarios
    this.app.use(this.usuariosURI, this.usuariosRoutes)
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log(`Servidor escuchando en http://localhost:${this.port}`)
    })
  }
}

module.exports = Server

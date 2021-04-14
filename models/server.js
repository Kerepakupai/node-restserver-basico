const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../db/config')

class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT

    // Usuarios
    this.usuariosURI = '/api/usuarios'
    this.authURI = '/api/auth'

    // Conectar a base de datos
    this.conectarDB()

    this.middlewares()

    this.routes()
  }

  async conectarDB () {
    await dbConnection()
  }

  middlewares () {
    this.app.use(cors())

    this.app.use(express.json())

    this.app.use(express.static('public'))
  }

  routes () {
    this.app.use(this.authURI, require('../routes/auth'))
    this.app.use(this.usuariosURI, require('../routes/usuarios'))
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log(`Servidor escuchando en http://localhost:${this.port}`)
    })
  }
}

module.exports = Server

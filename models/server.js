const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')

const { dbConnection } = require('../db/config')

class Server {
  constructor () {
    this.app = express()
    this.port = process.env.PORT

    // Usuarios
    this.paths = {
      auth: '/api/auth',
      buscar: '/api/buscar',
      categorias: '/api/categorias',
      productos: '/api/productos',
      usuarios: '/api/usuarios',
      uploads: '/api/uploads'
    }

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

    this.app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/',
      createParentPath: true
    }))
  }

  routes () {
    this.app.use(this.paths.auth, require('../routes/auth'))
    this.app.use(this.paths.buscar, require('../routes/buscar'))
    this.app.use(this.paths.categorias, require('../routes/categorias'))
    this.app.use(this.paths.productos, require('../routes/productos'))
    this.app.use(this.paths.usuarios, require('../routes/usuarios'))
    this.app.use(this.paths.uploads, require('../routes/uploads'))
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log(`Servidor escuchando en http://localhost:${this.port}`)
    })
  }
}

module.exports = Server

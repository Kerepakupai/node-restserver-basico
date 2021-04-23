const path = require('path')
const fs = require('fs')

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const { response } = require('express')
const { subirArchivo } = require('../helpers')
const { Usuario, Producto } = require('../models')

const cargarArchivo = async (req, res = response) => {
  try {
    const nombre = await subirArchivo(req.files, undefined, 'imgs')
    res.json({
      nombre
    })
  } catch (err) {
    res.status(400).json({
      msg: err.message
    })
  }
}

const actualizarImagen = async (req, res = response) => {
  const { id, coleccion } = req.params

  let modelo

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id)

      if (!modelo) {
        return res.status(400).json({
          msg: `No existe usuario con el id ${id}`
        })
      }

      break

    case 'productos':
      modelo = await Producto.findById(id)

      if (!modelo) {
        return res.status(400).json({
          msg: `No existe producto con el id ${id}`
        })
      }

      break

    default:
      return res.status(500).json({
        msg: 'Se me olvido validar esto'
      })
  }

  // Limpiar imagenes previas
  if (modelo.img) {
    const pathImage = path.join(__dirname, '../uploads', coleccion, modelo.img)
    if (fs.existsSync(pathImage)) {
      fs.unlinkSync(pathImage)
    }
  }

  const nombre = await subirArchivo(req.files, undefined, coleccion)
  modelo.img = nombre

  await modelo.save()

  res.json(modelo)
}

const actualizarImagenCloudinary = async (req, res = response) => {
  const { id, coleccion } = req.params

  let modelo

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id)

      if (!modelo) {
        return res.status(400).json({
          msg: `No existe usuario con el id ${id}`
        })
      }

      break

    case 'productos':
      modelo = await Producto.findById(id)

      if (!modelo) {
        return res.status(400).json({
          msg: `No existe producto con el id ${id}`
        })
      }

      break

    default:
      return res.status(500).json({
        msg: 'Se me olvido validar esto'
      })
  }

  // Limpiar imagenes previas
  if (modelo.img) {
    const nombreArr = modelo.img.split('/')
    const nombre = nombreArr[nombreArr.length - 1]
    const publicId = nombre.split('.')[0]

    cloudinary.uploader.destroy(publicId)
  }

  const { tempFilePath } = req.files.archivo
  const { secure_url: secureUrl } = await cloudinary.uploader.upload(tempFilePath)

  modelo.img = secureUrl
  await modelo.save()

  res.json(modelo)
}

const mostrarImagen = async (req, res = response) => {
  const { id, coleccion } = req.params

  let modelo

  switch (coleccion) {
    case 'usuarios':
      modelo = await Usuario.findById(id)

      if (!modelo) {
        return res.status(400).json({
          msg: `No existe usuario con el id ${id}`
        })
      }

      break

    case 'productos':
      modelo = await Producto.findById(id)

      if (!modelo) {
        return res.status(400).json({
          msg: `No existe producto con el id ${id}`
        })
      }

      break

    default:
      return res.status(500).json({
        msg: 'Se me olvido validar esto'
      })
  }

  // Limpiar imagenes previas
  if (modelo.img) {
    const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img)
    if (fs.existsSync(pathImagen)) {
      return res.sendFile(pathImagen)
    }
  }

  const noImagePath = path.join(__dirname, '../assets/no-image.jpg')
  res.sendFile(noImagePath)
}

module.exports = {
  cargarArchivo,
  actualizarImagen,
  mostrarImagen,
  actualizarImagenCloudinary
}

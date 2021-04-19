const { Categoria, Role, Usuario, Producto } = require('../models')

const esRoleValido = async (rol = '') => {
  const existeRol = await Role.findOne({ rol })

  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la BD`)
  }
}

const emailExiste = async (correo = '') => {
  const existeEmail = await Usuario.findOne({ correo })

  if (existeEmail) {
    throw new Error(`El correo: ${correo} ya esta registrado`)
  }
}

const usuarioExiste = async (id) => {
  const existeUsuario = await Usuario.findById(id)

  if (!existeUsuario) {
    throw new Error(`No existe usuario con el ID ${id}`)
  }
}

const existeCategoria = async (id) => {
  const categoria = await Categoria.findById(id)

  if (!categoria) {
    throw new Error(`No existe categoria con el ID ${id}`)
  }
}

const existeProducto = async (id) => {
  const producto = await Producto.findById(id)

  if (!producto) {
    throw new Error(`No existe Producto con el ID ${id}`)
  }
}

module.exports = {
  esRoleValido,
  emailExiste,
  usuarioExiste,
  existeCategoria,
  existeProducto
}

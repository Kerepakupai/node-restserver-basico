const { Router } = require('express')
const { check } = require('express-validator')
const {
  crearProducto,
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  borrarProducto
} = require('../controllers/productos')

const { existeCategoria, existeProducto } = require('../helpers/db-validators')
const { validarJWT, validarCampos, esAdminRol } = require('../middlewares')

const router = Router()

router.get('/', obtenerProductos)

router.get('/:id', [
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom(existeProducto),
  validarCampos
], obtenerProducto)

router.post('/', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('categoria', 'No es un ID valido').isMongoId(),
  check('categoria').custom(existeCategoria),
  validarCampos
], crearProducto)

// Actualizar Producto - privado - cualquier persona con un token valido
router.put('/:id', [
  validarJWT,
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom(existeProducto),
  validarCampos
], actualizarProducto)

// Borrar Producto - Admin
router.delete('/:id', [
  validarJWT,
  esAdminRol,
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom(existeProducto),
  validarCampos
], borrarProducto)

module.exports = router

const { Router } = require('express')
const { check } = require('express-validator')
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias')
const { existeCategoria } = require('../helpers/db-validators')
const { validarJWT, validarCampos, esAdminRol } = require('../middlewares')

const router = Router()

router.get('/', obtenerCategorias)

router.get('/:id', [
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom(existeCategoria),
  validarCampos
], obtenerCategoria)

router.post('/', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  validarCampos
], crearCategoria)

// Actualizar categoria - privado - cualquier persona con un token valido
router.put('/:id', [
  validarJWT,
  check('id', 'No es un id valido').isMongoId(),
  check('nombre', 'El nombre de la categoria es obligatorio').not().isEmpty(),
  check('id').custom(existeCategoria),
  validarCampos
], actualizarCategoria)

// Borrar categoria - Admin
router.delete('/:id', [
  validarJWT,
  esAdminRol,
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom(existeCategoria),
  validarCampos
], borrarCategoria)

module.exports = router

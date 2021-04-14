const { Router } = require('express')
const { check } = require('express-validator')

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios')
const { esRoleValido, emailExiste, usuarioExiste } = require('../helpers/db-validators')

const { validarCampos, validarJWT, esAdminRol, tieneRol } = require('../middlewares')

const router = Router()

router.get('/', usuariosGet)

router.post('/', [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password es obligatorio').isLength({ min: 6 }),
  check('correo', 'El correo no es valido').isEmail(),
  check('correo').custom(emailExiste),
  // check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('rol').custom(esRoleValido),
  validarCampos
], usuariosPost)

router.put('/:id', [
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(usuarioExiste),
  check('rol').custom(esRoleValido),
  validarCampos
],
usuariosPut)

router.delete('/:id', [
  validarJWT,
  // esAdminRol,
  tieneRol('ADMIN_ROLE', 'VENTAS_ROLE'),
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(usuarioExiste),
  validarCampos
],
usuariosDelete)

module.exports = router

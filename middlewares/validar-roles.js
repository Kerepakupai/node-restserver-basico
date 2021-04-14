const { request, response } = require('express')

const esAdminRol = (req = request, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: 'Se quiere validar el rol sin validar el token'
    })
  }
  const { rol, nombre } = req.usuario

  if (rol !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `${nombre} no es administrador`
    })
  }

  next()
}

const tieneRol = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        msg: 'Se quiere validar el rol sin validar el token'
      })
    }

    if (!roles.includes(req.usuario.rol)) {
      return res.status(401).json({
        msg: `No tiene permisos para ejecutar esta accion [${roles}]`
      })
    }

    next()
  }
}

module.exports = {
  esAdminRol,
  tieneRol
}

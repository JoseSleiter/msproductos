const crypto = require('crypto');

/**
 * Enviar la respuesta ERROR del servidor
 * 
 * @param {*} res parametro de respuesta del servidor
 * @param {*} message mensaje de error
 * @param {*} code cogido de error HTTP
 * @param {*} err error detallado
 */
function errorResponse(res, message, code, err = null){
    res.status(code).send({
        success: false,
        message,
        errors: err,
        code: code,
        data : {}
    });
}

/**
 * Enviar la respuesta SUCCESS del servidor
 * 
 * @param {*} res parametro de respuesta del servidor
 * @param {*} message mensaje
 * @param {*} code cogido HTTP
 * @param {*} data datos obtenidos de la peticion
 */
function successResponse(res, message, code = 200, data = null){
    res.status(code).send({
        success: true,
        message,
        data 
    });
}

module.exports = {
    errorResponse,
    successResponse
}
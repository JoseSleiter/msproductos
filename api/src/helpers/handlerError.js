const { AssertionError } = require('assert');
const { MongoError } = require('mongodb');
const { errorResponse } = require('./apiResponse')

/**
 * Funcion para manejar errores generales
 * @return HTTP_SERVER_ERROR 500
 */
function clientErrorHandler(err, req, res, next) {
    let code = err.statusCode || 500
    let message = err.message || "Oops! Error in clientErrorHandler"
    console.log( err.constructor.name )

    return errorResponse(res, message, code, err)
}

/**
 * Funcion para manejar errores de Assertion
 * @return HTTP_Assertion_ERROR 400
 */
function handleAssertionError(err, req, res, next) {
    let message = err.message || "Oops! Error in handleAssertionError"
    let code = err.statusCode || 400
    console.log("a", err.constructor.name )

    if (err instanceof AssertionError)
        return errorResponse(res, message, code, err)
    next(err)
}

/**
 * Funcion para manejar errores de Assertion
 * @return HTTP_Assertion_ERROR 503
 */
function handleDatabaseError(err, req, res, next) {
    let message = err.message || "Oops! Error in handleDatabaseError"
    let code = err.statusCode || 503
    console.log("b", err.constructor.name )

    if (err instanceof MongoError)
        return errorResponse(res, message, code, err)
    next(err)
}

/**
 * Funcion para manejar errores de Validations
 * @return HTTP_Validations_ERROR 422
 */
function handleValidationsError(err, req, res, next) {
    let message = err.message || "Oops! Error in handleValidationsError"
    let code = err.statusCode || 422
    console.log("c", err.constructor.name )

    if ( err.constructor.name === 'MongooseError')
        return errorResponse(res, message, code, err)
    next(err)
}

/**
 * Funcion que va en todas las Routes
 * 
 * @param {*} fn funcion para manejar catch
 */
function asyncMiddleware(fn){
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next))
        .catch(next);
    }
};

module.exports = {
    clientErrorHandler, 
    handleAssertionError,
    handleDatabaseError,
    handleValidationsError,
    asyncMiddleware
}
const express = require('express');
const app = express();
var {...handler} = require('./helpers/handlerError')

// Middleware
app.use( express.urlencoded({extended: false}))
app.use( express.json())
app.set('json spaces', 2)

// Routes
app.use('/api/', require('./routes/products'));

// Handling Errors
app.use(handler.handleAssertionError); // 400
app.use(handler.handleDatabaseError); // 503
app.use(handler.handleValidationsError); // 422
app.use(handler.clientErrorHandler) // 500

module.exports = app;
const express = require('express');
const products = express.Router();
const ctrProducts = require('../controllers/controllerProducts')
const {asyncMiddleware} = require('../helpers/handlerError')

products
.get('/products', asyncMiddleware(ctrProducts.index) )
.get('/products/:id', asyncMiddleware(ctrProducts.show))
.post('/products', asyncMiddleware(ctrProducts.store))
.post('/products/remove', asyncMiddleware(ctrProducts.remove))


module.exports = products;
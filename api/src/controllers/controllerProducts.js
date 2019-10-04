'use strict'
const ObjectID = require('mongodb').ObjectID;   
const {successResponse} = require('../helpers/apiResponse')
const Producto = require('../models/Product')

class controllerProducts{

    /**
     * @method GET
     * @param void
     */
    static async index(req, res){
        let resp = await Producto.getAll()
        successResponse(res, "Success", 200, resp)
    }

    /**
     * @method GET
     * @param ObjectId Id de la Store a solicitar
     */
    static async show(req, res){
        let id = req.params.id;
        let resp = await Producto.get(id)
        successResponse(res, "Success", 200, resp)
    }

    /**
     * Almacena la Store
     * 
     * @method POST
     * @param Direccion Models
     */
    static async store(req, res){
        let {products} = req.body     
        let newProducts;

        Promise.all(
            products.map( async (product) =>{
                let newProduct =  await Producto.create(product)
                newProducts.push(newProduct)
            })
        )

        // Success
        successResponse(res, "Succes store products", 201, newProducts)
    }
}

module.exports = controllerProducts;
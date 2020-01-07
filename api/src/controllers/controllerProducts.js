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
     * Almacena los productos
     * 
     * @method POST
     */
    static async store(req, res){
        let {products} = req.body     
        let newProducts = [];


        await Promise.all(

            // product exits            
            products.map( async (product) =>{
                let lastProduct;
                console.log(product)

                // check exits of product
                lastProduct = await Producto.find({code : product.code})
                
                console.log(lastProduct)
                console.log(!lastProduct)

                // product not exits
                if(lastProduct.length == 0){      
                    let newProduct =  await Producto.create(product)                   
                    newProducts.push(newProduct)                                     
                
                // product exits
                }else{                     
                    await Producto.setQuantity(lastProduct[0], product.quantity)   
                    newProducts.push(lastProduct[0])                                     
 
                }                
            })
        )

        // Success
        successResponse(res, "Succes store products", 201, newProducts)
    }


    /**
     * Disminuye los productos
     * 
     * @method POST
     */
    static async remove(req, res){
        let {products} = req.body     
        let newProducts = [];
        let newProduct
        console.log("pidiendo....")
        // product exits
        await Promise.all(

            // product exits
             
            products.map( async (product) =>{
                let lastProduct;
                // check exits of product
                lastProduct = await Producto.get(product.code)
                
                // product exits
                newProduct = await Producto.setQuantity(lastProduct, product.quantity, "dismi") 
                console.log("haciendo....")
                // let newProduct =  await Producto.create(product)
                newProducts.push(newProduct)
            })
        )
            console.log("se hizo....")
        // Success
        successResponse(res, "Succes store products", 201, newProducts)
    }
}

module.exports = controllerProducts;
const mongoose = require('mongoose')
const ObjectID = require('mongodb').ObjectID
const crypto = require('crypto');

const schema = new mongoose.Schema({
    code:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },    
    category:{
        type: String,
        required: false,
        default: "Medicamento"  
    }, 
    imagePath:{
        type: String,
        required: false,
        default: "img/product/default.png"  
    },
    prices:{
        type: Number,
        required: true
    },    
    quantity:{
        type: Number,
        default: 0,
        required: true
    }
})

schema.statics = {
    /**
     * return all produts
     * @param {*} id ObjectID 
     */
    getAll(){
        return this.find().then((products) => {
            if (products) 
                return products;            
          const err = {message:"Not exits products", statusCode: 404};
          return Promise.reject( err)
        });

    },
    /**
     * get one products to ID
     * @param {*} id ObjectID 
     */
    get(id){
        return this.findOne({code : id}).then((products) => {
            if (products) 
                return products;            
          const err = {message:"Not exits products", statusCode: 404};
          return Promise.reject( err)
        });

    },
    /**
     * Update product data
     * @param {*} product Currently product
     */
    async setQuantity(product, quantity, type = "plus"){
        let newQuantity;
        switch (type) {
            case "plus":
                    newQuantity = product.quantity + quantity
                break;
        
            case "dismi":
                    newQuantity = product.quantity - quantity
                break;
            default:
                    newQuantity = product.quantity + quantity
                break;
        }

        await this.model('products').findOneAndUpdate(
            { _id: product._id }, 
            { quantity: newQuantity },
            {new: true}
        ).then((product) =>{
            if(product)
                return product;
            const err = {message:`Not exits product ${product.code}`, statusCode: 404};
            return Promise.reject( err)     
        });
        // return this.quantity += quantity;
        // return this.findOneAndUpdate({_id: ObjectID(id)}, this.quantity, {new: true}).then((product) =>{
        //     if(product)
        //         return product;
        //     const err = {message:"Not exits product", statusCode: 404};
        //     return Promise.reject( err)     
        // })        
    }
} 


module.exports = mongoose.model('products', schema)
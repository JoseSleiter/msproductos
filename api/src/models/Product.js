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
        default: "img/default.png"  
    },
    prices:{
        type: Float,
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
        return this.findOne({_id : id}).then((products) => {
            if (products) 
                return products;            
          const err = {message:"Not exits products", statusCode: 404};
          return Promise.reject( err)
        });

    }
} 


module.exports = mongoose.model('products', schema)
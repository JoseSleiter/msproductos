'use strict'

require('./src/config/config')
const mongoose = require('mongoose')
const app = require('./src/app')
// const app = require('express')();

// app.get('/', function(req, res){
//     console.log("hola")
// })

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

mongoose.connect(  process.env.DATABASE_URL, {useNewUrlParser: true})
.then(()=>{
    console.log(`La conexión a la base de datos local se ha realizado correctamente `)        

    app.listen(process.env.PORT, () => {
        console.log("esto esta en el puerto %d-%s", process.env.PORT, "msclientes")
    })
})
.catch(err => console.log(err))
'use strict'
import mongoose from "mongoose";
import { SimpleConsoleLogger } from "typeorm/logger/SimpleConsoleLogger.js";
import config from './config.js';
//Conection to MongoDB
mongoose.set('strictQuery', false);
(async ()=>{
    try {
        const db = await mongoose.connect(config.mongodbURL,{
            useUnifiedTopology: true, 
            useNewUrlParser: true
        });
        console.log("Database connected to: ",db.connection.name);
    } catch (err) {
        console.log(err);
    }
})();
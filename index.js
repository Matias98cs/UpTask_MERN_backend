import express from 'express';
import conectarDB from './config/db.js';
import dotenv from 'dotenv'

const app = express()
dotenv.config()
conectarDB()
app.listen(4000, () => {
    console.log(`Servidor corriendo en el puerto 4000`)
})
import express from 'express';
import conectarDB from './config/db.js';
import dotenv from 'dotenv'
import usuariosRoutes from './routes/usuariosRoutes.js'

const app = express()
dotenv.config()
conectarDB()

//Routing
app.use('/api/usuarios', usuariosRoutes)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})
const express = require('express')
const app = express()
const PORT = 3004
const productos = require('../data/productos.json')
const opers = require('./operaciones/opers')
app.use(express.json())

app.get('/productos/all', (_, res) => {
    res.status(200).json(productos)
})

app.get('/producto', (req, res) => {
    const { attr, value, op } = req.query
    const respuesta = productos.filter(
        p => opers[op](p[attr], value)
    )
    res.status(200).json(respuesta)
})
app.get('/productos/:id', (req, res) => {
    const id = req.params.id
    if (isNaN(id)) {
        res.status(400).json({ mensaje: "Error el id debe ser un número" })
        return
    }
    const producto = productos.find(p => p.id === Number(id))
    if (producto)
        res.status(200).json(producto)
    else
        res.status(404).json({ mensaje: `El alumno con id ${id} no se encontro` })
})



app.listen(PORT, () => {
    console.log(`App corriendo en el puerto ${PORT}`)
})
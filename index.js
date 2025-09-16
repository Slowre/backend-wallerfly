import express from 'express'

const app = express()

const PORT = 3030

app.post('/api/evento/', (req, res) => {
    res.send('crear')
})
app.get('/api/evento/', (req, res) => {
    res.send('listar')
})
app.get('/api/evento/:id', (req, res) => {
    res.send('obtener por id')
})
app.put('/api/evento/:id', (req, res) => {
    res.send('actualizar')
})
app.delete('/api/evento/:id', (req, res) => {
    res.send('eliminar')
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
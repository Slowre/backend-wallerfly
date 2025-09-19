import express from 'express'

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    if (req.body) {
        console.log(`${JSON.stringify(req.body, null, 2)}`)
    }
    next()
})

const PORT = 3030

let eventos =
    [
        {
            name: "nachos",
            description: "comida",
            amount: 50,
            date: "2025-07-20",
            type: "Egreso",
            id: "8cc9d81e-53cc-4c35-886e-5535e8a6766f"
        },
        {
            name: "Conciento",
            description: "",
            amount: 40,
            date: "2025-07-16",
            type: "Egreso",
            id: "3a79b226-a888-479b-a3ee-9f46190f8d66"
        },
        {
            name: "sueldo 1",
            description: "",
            amount: 1000,
            date: "2025-07-31",
            type: "Ingreso",
            id: "04e7d798-7e7a-4cc0-acad-c4dbc3a73e5b"
        },
        {
            name: "Ventas",
            description: "",
            amount: 100,
            date: "2025-07-10",
            type: "Ingreso",
            id: "da7686a9-7664-4f2c-a7a0-3ccff21579ef"
        },
        {
            name: "Compra",
            description: "",
            amount: 50,
            date: "2025-07-22",
            type: "Egreso",
            id: "ea7712e7-9ff1-4798-8b35-31307729b213"
        },
        {
            name: "Arriendo",
            description: "",
            amount: 100,
            date: "2025-08-06",
            type: "Egreso",
            id: "742e58b6-e530-42bd-9ff5-3d9e511b0e4d"
        }
    ]

app.post('/api/eventos/', (req, res) => {
    const { name, description, amount, date, type, id } = req.body
    const newEvento = { name, description, amount, date, type, id }
    eventos.push(newEvento)
    res.json({ code: 'OK', message: 'Evento creado excitosamente!', data: { evento: newEvento } })
})

app.get('/api/eventos/', (req, res) => {
    res.json({ code: 'OK', message: 'Eventos disponibles', data: { eventos } })
})


app.get('/api/eventos/query/', (req, res) => {
    const id = req.query.id
    console.log(id)
    if (!id) {
        return res.status(400).json({ code: 'PF', message: 'El ID de evento es requerido!' })
    }
    const evento = eventos.find((e) => e.id == id)
    if (!evento) {
        return res.status(404).json({ code: 'NF', message: 'Evento no encontrado!' })
    }

    res.json({ code: 'OK', message: 'Eventos disponibles', data: { evento } })
})

app.put('/api/eventos/:id', (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).json({ code: 'PF', message: 'El ID de evento es requerido!' })
    }
    const evento = eventos.find((e) => e.id == id)
    if (evento) {
        const { name, description, amount, date, type } = req.body
        evento.amount = amount
        evento.date = date
        evento.description = description
        evento.name = name
        evento.type = type
        res.json({ code: 'OK', message: 'Evento actualizado exitosamente!', data: { evento } })
        return
    }
    res.status(404).json({ code: 'NF', message: 'Evento no encontrado!' })
})

app.delete('/api/eventos/:id', (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).json({ code: 'PF', message: 'El ID de evento es requerido!' })
    }
    const evento = eventos.find((e) => e.id == id)
    if (evento) {
        eventos = eventos.filter((e) => e.id != evento.id)
        return res.json({ code: 'OK', message: 'Evento eliminado!', data: { evento } })
    }
    res.status(404).json({ code: 'PF', message: 'Evento no encontrado!' })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
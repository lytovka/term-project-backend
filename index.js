const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let points = [
    {
        id: 1,
        type: "green",
        longitute: "73",
        latitude: "43"
    },
    {
        id: 2,
        type: "red",
        longitute: "22",
        latitude: "34"
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Hop hey la la ley</h1>')
})

app.get('/points', (req, res) => {
    res.json(points)
})

app.get('/points/:id', (request, response) => {
    const id = Number(request.params.id)
    const point = points.find(point => point.id === id)
    if (point) {
        response.json(point);
    }
    response.status(404).end();
})

const generateId = () => {
    const maxId = points.length > 0
        ? Math.max(...points.map(n => n.id))
        : 0
    return maxId + 1
}

app.post('/points', (request, response) => {
    const body = request.body;

    if (!(body.type) && !(body.latitude) && !(body.longitude)) {
        return response.status(400).json({
            error: "missing content"
        })
    }

    const point = {
        type: body.type,
        longitude: body.longitude,
        latitude: body.latitude,
        date: new Date(),
        id: generateId(),
    }

    points = points.concat(point);
    response.json(point);

})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
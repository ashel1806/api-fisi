require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT

let courses = [
  {
    "id": 1,
    "nombre" : "Mate Discreta",
    "profesor": "Moquillaza",
    "ciclo": 4,
    "creditos": 3
  },
  {
    "id": 2,
    "nombre" : "Sistemas Digitales",
    "profesor": "Fermin",
    "ciclo": 4,
    "creditos": 3
  },
  {
    "id": 3,
    "nombre" : "Algoritmica 2",
    "profesor": "Cabrera",
    "ciclo": 4,
    "creditos": 4
  },
  {
    "id": 4,
    "nombre" : "Probabilidades",
    "profesor": "Gatorate",
    "ciclo": 4,
    "creditos": 3
  },
  {
    "id": 5,
    "nombre" : "Emprendimiento e Innovación",
    "profesor": "Machado",
    "ciclo": 4,
    "creditos": 3
  },
  {
    "id": 6,
    "nombre" : "Procesos Software",
    "profesor": "Pantoja",
    "ciclo": 4,
    "creditos": 3
  },
  {
    "id": 7,
    "nombre" : "Contabilidad",
    "profesor": "Fausto",
    "ciclo": 4,
    "creditos": 3
  }
]

app.use(cors())
app.use(express.json())

const generateId = () => {
  const maxId = courses.length > 0
    ? Math.max(...courses.map(x => x.id))
    : 0

  return maxId + 1
}

app.get('/', (req, res) => {
  res.send('<h1>FISI - API</h1>' + 
  '<a href="/api/cursos">Ver Cursos</a>')
})

app.get('/api/cursos', (req, res) => {
  if (courses) {
    res.json(courses)
  } else {
    res.status(404).end()
  }
})

app.get('/api/cursos/:id', (req, res) => {
  const id = Number(req.params.id)
  const course = courses.find(curso => curso.id === id)

  if (course) {
    res.json(course)
  } else {
    res.status(404).end()
  }
})

app.post('/api/cursos', (req, res) => {
  const body = req.body
  const { nombre, profesor } = body
  
  if (!nombre || !profesor) {
    return res.status(404).json({
      error: "nombre or profesor missing"
    })
  }

  const course = {
    id: generateId(),
    nombre: body.nombre,
    profesor: body.profesor,
    ciclo: body.ciclo,
    creditos: body.creditos
  }

  courses = courses.concat(course)

  res.json(course)
})

app.listen(port, () => {
  console.log(`Server running at port: ${port}`)
})
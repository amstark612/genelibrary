import express from 'express'
import sqlite3 from 'sqlite3'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import cors from 'cors'
import history from 'connect-history-api-fallback'

const app = express()
app.use(cors())

const port = process.env.PORT || 8081
const __dirname = dirname(fileURLToPath(import.meta.url).replace('server', ''))
const db = new sqlite3.Database('genes.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message)
  } else {
    console.log('Connected to the database.')
    db.run(`CREATE TABLE IF NOT EXISTS genes (
      id INTEGER PRIMARY KEY,
      gene TEXT,
      temp37_effect_size REAL,
      temp37_fdr REAL
    )`)
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

app.get('/api/genes', (_, res) => {
  console.log('ENDPOINT: api/genes')
  db.all('SELECT * FROM genes', (err, rows) => {
    if (err) {
      res.status(500).json({ error: `Internal server error ${err.message}` })
    } else {
      res.json(JSON.stringify(rows))
    }
  })
})

app.get('/api/search', (req, res) => {
  const identifier = req.query.identifier
  console.log(`ENDPOINT: api/search?identifier=${identifier}`)

  // change this to ilike
  db.all("SELECT * FROM genes WHERE gene LIKE '%' || ? || '%'", identifier, (err, rows) => {
    if (err) {
      res.status(500).json({ error: `Internal server error ${err.message}` })
    } else if (!rows) {
      res.status(404).json({ error: 'Gene not found' })
    } else {
      res.json(JSON.stringify(rows))
    }
  })
})

app.get('*', (_, res) => {
  console.log('ENDPOINT: catch all')
  try {
    res.sendFile(__dirname + '/dist/index.html')
  } catch (error) {
    res.json({ success: false, message: "Something went wrong" })
  }
})

app.use(history())
app.use(express.static(__dirname + '/dist'))
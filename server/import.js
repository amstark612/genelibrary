import fs from 'fs'
import csv from 'fast-csv'
import sqlite3 from 'sqlite3'

const FILEPATH = 'data/example_data.csv'

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

    const stream = fs.createReadStream(FILEPATH)
    csv
      .parseStream(stream, { headers: true })
      .on('error', (error) => console.error(error))
      .on('data', (row) => {
        console.log(row)
        db.run(
          'INSERT INTO genes(gene, temp37_effect_size, temp37_fdr) VALUES (?, ?, ?)',
          [row.Gene, row.Temp37_effect_size, row.Temp37_fdr],
          (err) => {
            if (err) {
              console.error(err.message)
            } else {
              console.log(`${row.Gene} inserted successfully.`)
            }
          }
        );
      })
      .on('end', () => {
        console.log('Closing connection.')
        db.close()
      })
  }
})

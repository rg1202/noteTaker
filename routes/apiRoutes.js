const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const { v4: uuidv4 } = require('uuid')


// reads the database file and parses the data
router.get('/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
        if (err) throw err
        res.json(JSON.parse(data))
    })
})

//  posts new data into the database from user input
router.post('/notes', (req, res) => {
    const newNote = { ...req.body, id: uuidv4() }
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
        if (err) throw err
        const notes = JSON.parse(data)
        notes.push(newNote)
        fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes), (err) => {
        if (err) throw err
        res.json(newNote)
        })
    })
})

// finds each notes specific ID and allows the user to delete it.
router.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
        if (err) throw err
        let notes = JSON.parse(data)
        notes = notes.filter(note => note.id !== noteId)
        fs.writeFile(path.join(__dirname, '../db/db.json'), JSON.stringify(notes), (err) => {
        if (err) throw err
        res.json({ msg: 'Note deleted successfully' })
        })
    })
})
  module.exports = router
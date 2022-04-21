/* =========================================================================
 * Module Imports && Configuration
 * ========================================================================= */

const fs = require('fs');
// const util = require('util');
const notes = require('express').Router();
const jsonDb = require('../db/db.json');

notes.get('/', (req,res) => {
    console.info(`${req.method} request for db.json received at /api/notes`);
    res.json(jsonDb);
});

notes.post('/', (req,res) => {
    console.info(`${req.method} request for adding a new note received at /api/notes`);

    const { title , text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text
        };
    };

    fs.readFile(jsonDb, (err, data) => {
        if (err) {
            console.error(err);
          } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
          };
    });
});

module.exports = notes;
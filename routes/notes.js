/* =========================================================================
 * Module Imports && Configuration
 * ========================================================================= */

const fs = require('fs'); // file system
const notes = require('express').Router();  // use 'notes' as a router
const jsonDb = require('../db/db.json');  // this is the file we want to work with
const { nanoid } = require('nanoid'); // random id generator
// const util = require('util'); // LATEST CHANGE

notes.get('/', (req,res) => {
    console.info(`${req.method} request for db.json received at /api/notes`);
    res.json(jsonDb);
});

/*notes.get('/', (req,res) => {
    util.promisify(fs.readFile('../db/db.json', 'utf8', () => {
        console.info(`${req.method} request for db.json received at /api/notes`);
    }).then((data) => res.json(JSON.parse(data))));
    // res.json(jsonDb);
}); */

notes.post('/', (req,res) => {
    console.info(`${req.method} request for adding a new note received at /api/notes`);

    const { title , text } = req.body; // object destructuring from the request

    if (title && text) { // if the formatting is valid...
        const newNote = { // pull the info from the input
            title,
            text,
            id: nanoid() // random id generator
        }; 
        
        console.info(`The input title is: ${title} \n and \n the input text is: ${text}`);
        
        fs.readFile('./db/db.json', 'utf8', (err, data) => { // open the current JSON faux database
            if (err) {
                console.error(err); // if we get an error display it
              } else {
                const parsedData = JSON.parse(data); // turn our current JSON into an object
                parsedData.push(newNote); // ad the newest info we just got from the user to the array
                fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, 4), (err) =>
                err ? console.error(err) : console.info(`\nData added!`)
                );
              };
        });

        res.json('Roger that, we have made contact.');
    } else {
        res.error('Oh no something went wrong.');
    };

});

notes.delete('/:id', (req, res) => {
    console.info(`${req.method} request for removing a note received at /api/notes/${req.params.id}`);

    const thisNote = req.params.id;
    fs.readFile('./db/db.json', 'utf8', (err, data) => { // open the current JSON faux database
        if (err) {
            console.error(err); // if we get an error display it
          } else {
            const parsedData = JSON.parse(data); // turn our current JSON into an object
            parsedData.splice(parsedData.findIndex(function(i){
                return i.id === thisNote;
            }), 1);
            fs.writeFile('./db/db.json', JSON.stringify(parsedData, null, 4), (err) =>
            err ? console.error(err) : console.info(`\nData deleted!`)
            );
          };
    });
});

module.exports = notes;
/* =========================================================================
 * Module Imports && Configuration
 * ========================================================================= */

// const nodemon = require('nodemon');
const express = require('express');
const fs = require('fs');
const path = require('path');
const api = require('./routes/index.js');

// port initialization
const PORT = process.env.port || 3001;
// express set up
const app = express();

/* =========================================================================
 * Middleware
 * ========================================================================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static('public'));

/* =========================================================================
 * HTTP Methods on home page
 * ========================================================================= */

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () => {
    console.info(`server live and listening at http://localhost:${PORT}`);
});
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

app.use(express.static(path.resolve(__dirname,'..','build')));
app.use(express.static(path.resolve(__dirname,'..','public')));
app.get('/songs.json', (req, res) => {
    res.json(require('./songs.json'))
});

module.exports = app;
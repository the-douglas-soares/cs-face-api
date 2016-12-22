const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));
app.use(express.static('client'));
app.use(bodyParser.json());

app.use(require('./routes'));

app.listen(3000);

module.exports = app;

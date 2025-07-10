const express = require('express');
const endpoints = require('./routes/endpoints')
const port =  3000;

const app = express();

app.use(express.json());
app.use(endpoints);

app.listen(port, () => {console.log(`Server listening on port ${port}`)});

const express = require('express');
const app = express();

const PORT =  3000;

app.get('/todo', (req, res) => {
    res.json({"nodes": "hello world"});
    res.end();
})

app.listen(PORT, () => {console.log(`Server listening on port ${PORT}`)});

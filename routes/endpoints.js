const express = require('express');
const router = express.Router();

router.get('/todo', (req,res)=>{
    res.json({nodes: "hello world"});
    res.end();
})

module.exports = router;
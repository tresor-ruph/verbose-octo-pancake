const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname,'build')));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

app.get("/api/test", (req, res)=> {
    return res.send("hello world !");
})

app.listen(3000, () => {
    console.log('the server is running');
});

module.exports = app;
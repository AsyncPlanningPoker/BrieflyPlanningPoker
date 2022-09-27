const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('./dist'));

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname,'/dist/index.html'));
});

console.log(8)
console.log(process.env.PORT)
app.listen(process.env.PORT || 8080, '186.220.198.126');
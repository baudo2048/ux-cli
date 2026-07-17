const express = require('express');
const http = require('http')
const path = require('path')

const app = express();
const server = http.createServer(app)

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname));

server.listen(process.env.PORT || 3000, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});

app.get('/', (req, res)=> {
    res.sendFile(path.join(`${__dirname}/dist/index.html`));
} )

app.post('/json', (req, res, next)=>{
    console.log('json rest ' + path.join(__dirname,'services',`${req.body.meta.serviceName}.script.js`))
    res.setHeader('Content-Type', 'application/json');
    require(path.join(__dirname,'services',`${req.body.meta.serviceName}.script.js`))(app, req, res, next, __dirname)
})
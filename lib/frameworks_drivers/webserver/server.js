const express = require('express');
const bodyParser = require('body-parser');

module.exports = function createServer(){
    const app = express();

    const port = 20201;
    
    app.use(bodyParser.json());

    app.use('/api', require('./oauth/index'))
    
    app.use('/', require('./users'))

    app.use('/', require('./tracking'))

    app.get('/hello', (req, res, next) => { res.send("Hello World") } )

    return {
        start(){
            app.listen(port, () => {
                console.log("Server start at port " + port);
            })
        }
    }
}

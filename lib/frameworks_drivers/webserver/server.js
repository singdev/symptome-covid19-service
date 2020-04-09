const express = require('express');

module.exports = function createServer(){
    const app = express();

    const port = 20201;
    
    app.use('/api', require('./oauth/index'))
    
    app.use('/', require('./users'))

    return {
        start(){
            app.listen(port, () => {
                console.log("Server start at port " + port);
            })
        }
    }
}

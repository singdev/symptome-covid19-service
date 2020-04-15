const mongoose = require('mongoose');

module.exports = (dbName) => {
    mongoose.connect('mongodb://mongo:27017/' + dbName, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })

    mongoose.connection.on('error', (err) => {
        throw new Error(err.toString());
    })
}


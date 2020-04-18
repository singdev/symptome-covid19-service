const mongoose = require('mongoose');

module.exports = (dbName) => {
    console.log('Connexion avec mongoDB');
    mongoose.connect('mongodb://mongo:27017/' + dbName, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })

    mongoose.connection.on('error', (err) => {
        console.log(err);
    })

    mongoose.connection.on('open', () => {
        console.log("Connexion avec MongoDB ouverte");
    })
}


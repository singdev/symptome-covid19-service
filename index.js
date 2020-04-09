const createServer = require('./lib/frameworks_drivers/webserver/server');
const MongoDB = require('./lib/frameworks_drivers/database/MongoDB');

MongoDB('symptomecovid19');

const server =  createServer();

server.start();
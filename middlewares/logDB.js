const  fs = require('fs');

const logDB = (request, response, next) => {
    fs.appendFileSync("logDB.txt", "Foi criado um registro pela URL: " + request.url);
    next();
};

module.exports = logDB;
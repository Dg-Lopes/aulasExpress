const  fs = require('fs');

const logSite = (request, response, next) => {
    fs.appendFileSync("log.txt", "O usuário entrou na URL: " + request.url);
    next();
};

module.exports = logSite;
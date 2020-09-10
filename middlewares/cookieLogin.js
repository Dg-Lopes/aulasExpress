const fs = require('fs');
const path = require('path');

const cookieLogin = (request, response, next) => {
    if (request.cookies.logado !== undefined && request.session.usuario == null) {
        let email = request.cookies.logado;

        let usuario = JSON.parse(fs.readFileSync(path.join("usuarios.json"), {encoding: "utf-8"}));

        if (usuario.email == email) {
            request.session.usuario = usuario;
        }
    }
    next();
};

module.exports = cookieLogin;
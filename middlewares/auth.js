const auth = (request, response, next) => {
    if (typeof (request.session.usuario) != "undefined") {
        return next();
    } else {
        return response.send("Você precisa está logado para ter acesso!");
    }
};

module.exports = auth;
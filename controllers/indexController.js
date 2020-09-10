const  indexController = {
    viewContato: (request, response) => {
        let {nome, idade} = request.query;
        // response.send(`Olá ${nome} você tem ${idade} anos`);
        response.render("contato", {nomeUsuario:nome});
    },
    confirmarcontato: (request, response) => {
        let {nome, email} =request.query;
        response.send(`Recebido com sucesso as informações do usuário nome: ${nome} email: ${email}`);
    }

};

module.exports = indexController;
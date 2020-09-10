const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const {check, validationResult, body} = require('express-validator');

const usuarioJson = path.join("usuarios.json");

const usuarioController = {
    //Exibir formulário de registro
    registroForm: (request, response) => {
        response.render("registroUsuarios");
    },
    salvarForm: (request, response) => {
        let listaDeErrors = validationResult(request);

        if (listaDeErrors.isEmpty()) {
            let {nome, email, senha} = request.body;
            let {files} = request;
            let senhaC = bcrypt.hashSync(senha, 10);
            let usuario = JSON.stringify({nome, email, senha: senhaC, avatar: files[0].originalname});

            fs.writeFileSync(usuarioJson, usuario);
            response.send("Usuário cadastrado com sucesso");
        } else {
            return response.render("registroUsuarios", {errors: listaDeErrors.errors});
        }
    },

    //Exibir formulário de login
    loginForm: (request, response) => {
        response.render("login");
    },
    logarUsuario: (request, response) => {
        let {email, senha, logado} = request.body;
        let usuarioSalvo = fs.readFileSync(usuarioJson, {encoding: "utf-8"});
        usuarioSalvo = JSON.parse(usuarioSalvo);

        if (email !== usuarioSalvo.email) {
            return response.send("Usuário invalido");
        }

        if (!bcrypt.compareSync(senha, usuarioSalvo.senha)) {
            return response.send("Senha invalida");
        }

        request.session.usuario = usuarioSalvo;

        if (logado != undefined) {
            response.cookie("logado", usuarioSalvo.email, {maxAge: 600000});
        }

        response.redirect("/produtos");
    }
};

module.exports = usuarioController;
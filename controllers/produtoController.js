const fs = require('fs');
const path = require('path');

const pordutosJson = path.join("produtos.json");

const produtoController = {
    viewForm: (request, response) => {
        return response.render("produtos");
    },
    salvarForm: (request, response) => {
        // console.log(request.body)
        let {nomeProduto, precoProduto} = request.body;
        //SALVA NO BANCO

        // response.send(`O produto ${nomeProduto} com o valor de: ${precoProduto} foi criado com sucesso`);
        let dadosJson = JSON.stringify([{nome:nomeProduto, preco:precoProduto}]);
        fs.appendFileSync(pordutosJson, dadosJson);
        response.redirect("/produtos/sucesso");
    },
    sucesso: (request, response) => {
        return response.render("sucesso");
    },
    viewAttForm: (request, response) => {
        let {id} = request.params;
        // let produtos = [
        //     {
        //         id: 1,
        //         nome: "Produto X",
        //         preco: 10
        //     },
        //     {
        //         id: 2,
        //         nome: "Produto Y",
        //         preco: 30
        //     }
        // ];
        response.render("editarProdutos", {produto: produtos[id]});

    },
    editar: (request, response) => {
        let {nomeProduto, precoProduto} = request.body;
        response.send(`Você editou o produto: ${nomeProduto}`);
    },
    listarProdutos: (request, response) => {
        let produtos = fs.readFileSync(pordutosJson, {encoding: "utf-8"});
        produtos = JSON.parse(produtos);
        response.render("listaProdutos", {listaProdutos: produtos, usuario: request.session.usuario});
    },
    deletarProduto: (request, response) => {
        let {id} = request.params;
        response.send(`Estou deletando o produto com o id: ${id}`)
    }
}

module.exports = produtoController;
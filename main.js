const fs = require('fs');
const path = require('path');
const  bcrypt = require('bcrypt');

const caminhoArquivo = path.join("prova.txt");

// Parte 1: escrever em arquivos

// const users = [
//     {
//         nome: "Douglas",
//         age: 18,
//         email: "dg@gmami.com"
//
//     },
//     {
//         nome: "Maria",
//         age: 38,
//         email: "sadfa@gmami.com"
//     }
// ]

// const viraJson = JSON.stringify(users);

// O fs.writeFileSync sobrescreve um dado que foi enviado anteriormente
// fs.write(caminhoArquivo, viraJson);

// fs.appendFileSync(caminhoArquivo, "Novo salve");

 

//Parte 2:Leitura de arquivo

// const conteudo = fs.readFileSync(caminhoArquivo, {encoding: "utf-8"});
// console.log(conteudo);


//Part 3: Hashing

let hash = bcrypt.hashSync("1234", 10);
console.log(bcrypt.compareSync("dg132", hash)); //false
console.log(bcrypt.compareSync("1234", hash)); //true
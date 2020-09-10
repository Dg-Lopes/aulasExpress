const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const logDBmiddleware = require('../middlewares/logDB');
const { check, validationResult, body } = require('express-validator');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, path.join('uploads'));
    },
    filename: (request, file, cb) => {
        cb(null, file.originalname);
        // cb(null, file.fieldname + '-' + Date.now());
    }
});

const upload = multer({ storage: storage });

const usuarioController = require('../controllers/usuarioController');

/* GET users listing. */
router.get("/criar", usuarioController.registroForm);
router.post("/criar", upload.any(), logDBmiddleware, [
    check("nome").isLength({ min: 3 }).withMessage("O nome do usuário tem que conter no mínimo 3 caracteres"),
    check("email").isEmail().withMessage("Digite um e-mail válido!"),
    check("senha").isLength({ min: 6 }).withMessage("A senha tem que conter no mínimo 6 caracteres"),
    body("email").custom((email) => {
        const usuario = JSON.parse(fs.readFileSync("usuarios.json"));

        return usuario.email != email;
    }).withMessage("Usuário já existe")
], usuarioController.salvarForm);

router.get("/login", usuarioController.loginForm);
router.post("/login", usuarioController.logarUsuario);

module.exports = router;
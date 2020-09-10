const express = require('express');
const router = express.Router();
const indexController = require("../controllers/indexController");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get("/contato",indexController.viewContato);
router.get("/confirmarcontato", indexController.confirmarcontato);

module.exports = router;

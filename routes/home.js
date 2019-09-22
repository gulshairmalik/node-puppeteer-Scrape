const express = require('express');
const router = express.Router();

//Controllers
var HomeController =  require('../Controllers/HomeController');

//Get Request to '/'
router.get('/',HomeController.getHome);

//Exporting Router Object to server
module.exports = router;

const express = require('express');
const router = express.Router();

//Controllers
var MiamiController =  require('../Controllers/MiamiController');

//Get Request to '/miami/getPDF'
router.get('/getPDF',MiamiController.getPDF);

//Get Request to '/miami/getCSV'
router.get('/getCSV',MiamiController.getCSV);

//Exporting Router Object to server
module.exports = router;

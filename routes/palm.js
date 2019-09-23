const express = require('express');
const router = express.Router();

//Controllers
var PalmController =  require('../Controllers/PalmController');

//Get Request to '/palm/getPDF'
router.get('/getPDF',PalmController.getPDF);

//Get Request to '/palm/getCSV'
router.get('/getCSV',PalmController.getCSV);

//Exporting Router Object to server
module.exports = router;

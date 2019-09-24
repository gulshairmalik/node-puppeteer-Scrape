const express = require('express');
const router = express.Router();

//Controllers
var PalmController =  require('../Controllers/PalmController');

//Get Request to '/palm/getPDF'
router.get('/getPDF',PalmController.getPDF);

//Get Request to '/palm/getCSV'
router.get('/getCSV',PalmController.getCSV);

//Get Request to '/palm/getTaxPDF'
router.get('/getTaxPDF',PalmController.getTaxPDF);

//Get Request to '/palm/getTaxCSV'
router.get('/getTaxCSV',PalmController.getTaxCSV);

//Exporting Router Object to server
module.exports = router;

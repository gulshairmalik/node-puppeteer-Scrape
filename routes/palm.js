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

//Get Request to '/palm/getTaxBills'
router.get('/getTaxBills',PalmController.getTaxBills);

//Get Request to '/palm/getTaxBill1'
router.get('/getTaxBill1',PalmController.getTaxBill1);

//Get Request to '/palm/getTaxBill2'
router.get('/getTaxBill2',PalmController.getTaxBill2);

//Get Request to '/palm/getTaxBill3'
router.get('/getTaxBill3',PalmController.getTaxBill3);

//Exporting Router Object to server
module.exports = router;

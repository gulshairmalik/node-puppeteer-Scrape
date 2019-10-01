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

//Get Request to '/palm/getTaxBill1PDF
router.get('/getTaxBill1PDF',PalmController.getTaxBill1PDF);

//Get Request to '/palm/getTaxBill2PDF'
router.get('/getTaxBill2PDF',PalmController.getTaxBill2PDF);

//Get Request to '/palm/getTaxBill3PDF'
router.get('/getTaxBill3PDF',PalmController.getTaxBill3PDF);

//Get Request to '/palm/getTaxBill1CSV'
router.get('/getTaxBill1CSV',PalmController.getTaxBill1CSV);

//Get Request to '/palm/getTaxBill2CSV'
router.get('/getTaxBill2CSV',PalmController.getTaxBill2CSV);

//Get Request to '/palm/getTaxBill3CSV'
router.get('/getTaxBill3CSV',PalmController.getTaxBill3CSV);

//Get Request to '/palm/getAssesment'
router.get('/getAssesment',PalmController.getAssesment);

//Exporting Router Object to server
module.exports = router;

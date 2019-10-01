const fs = require('fs');

exports.getHome = (req,res) => {
    removeUnnecessaryFiles();
    res.render('index');
}

const removeUnnecessaryFiles = () => {
    
    fs.existsSync('./Page.csv') && fs.unlinkSync('./Page.csv');
    fs.existsSync('./Tax.csv') && fs.unlinkSync('./Tax.csv');
    fs.existsSync('./TaxBill1.csv') && fs.unlinkSync('./TaxBill1.csv');
    fs.existsSync('./TaxBill2.csv') && fs.unlinkSync('./TaxBill2.csv');
    fs.existsSync('./TaxBill3.csv') && fs.unlinkSync('./TaxBill3.csv');
    fs.existsSync('./TaxBill1.pdf') && fs.unlinkSync('./TaxBill1.pdf');
    fs.existsSync('./TaxBill2.pdf') && fs.unlinkSync('./TaxBill2.pdf');
    fs.existsSync('./TaxBill3.pdf') && fs.unlinkSync('./TaxBill3.pdf');
    fs.existsSync('./Assesment.pdf') && fs.unlinkSync('./Assesment.pdf');
} 
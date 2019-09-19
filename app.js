const express = require('express');
const puppeteer = require('puppeteer');
const app = express();

const printPDF = async (addr) => {

  const browser = await puppeteer.launch({ headless: true, defaultViewport: null});
  const page = await browser.newPage();

  await page.goto('https://www8.miamidade.gov/Apps/PA/propertysearch/#/',{waitUntil: 'networkidle0'});

  let address = addr;
  await page.focus('#search_box')
  await page.keyboard.type(address);


  await page.evaluate(async () => {

    document.getElementById('search_submit').click();
    await new Promise((resolve) => setTimeout(resolve, 3000));
    document.querySelectorAll("#results_list > div > div.results_record.ng-scope > div.record_folio.ng-binding > span")[0].click();
  
  });

  await page.waitFor(5000);
  const pdf = await page.pdf({path:"page.pdf",format:'A4'});

  await browser.close();
  return pdf;

};

//1630 sw 13th ave

app.get('/getPDF',async (req,res) => {

  let address = req.query.address;

  let getPDF = printPDF(address);

  getPDF.then( () => {
    //res.set({ 'Content-Type': 'application/pdf', 'Content-Length': pdf.length });
    //res.send(pdf)
    res.download('./page.pdf');
  });

});

app.get('/getCSV',async (req,res) => {

  let address = req.query.address;

});


app.listen(3000);
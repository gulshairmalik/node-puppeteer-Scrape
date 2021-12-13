const puppeteer = require('puppeteer');
const tableToCsv = require('node-table-to-csv');
const fs = require('fs');

exports.getPDF = (req,res) => {

    let address = req.query.address;
  
    let getPDF = printPDF(address);
  
    getPDF.then((response) => {
  
      if(response==='error'){
        res.send('Address is invalid.')
      }
      else{
        //res.set({ 'Content-Type': 'application/pdf', 'Content-Length': response.length });
        res.send(response);
      }
    });
  
}

exports.getCSV = (req,res) => {

    res.download('./Page.csv');
  
}

const printPDF = async (addr) => {

    const browser = await puppeteer.launch({
       headless: true, defaultViewport: null, 
       args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ]
    });
    const page = await browser.newPage();
  
    await page.goto('https://www8.miamidade.gov/Apps/PA/propertysearch/#/',{waitUntil: 'networkidle0', timeout: 0});
  
    let address = addr;
    await page.focus('#search_box')
    await page.keyboard.type(address);
  
  
    await page.$eval('#search_submit', el => el.click());
    await page.waitFor(1000);
    const searchError = await page.$eval('#error-modal', el => el.style.display);
    await page.waitFor(2000);
  
    if(searchError==='' || searchError==='none'){
      await page.$eval('#results_list > div > div.results_record.ng-scope > div.record_folio.ng-binding > span', el => el.click());
    }
  
  
    if(searchError==='block'){
      return new Promise((resolve) => {
        resolve('error');
      });
    }
  
    await page.waitFor(3000);
    const pdf = await page.pdf({format:'A4'});
    const html = await page.$eval('body',el => el.innerHTML);
    
    await page.waitFor(1000);
    const csv = tableToCsv(html);
  
    fs.writeFile("Page.csv", csv, (err) => {
      if(err) {
          return console.log(err);
      }
    }); 
  
  
    await browser.close();
    return pdf;
  
  };
  
const puppeteer = require('puppeteer');
const tableToCsv = require('node-table-to-csv');
const zip = require('express-zip');
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

exports.getTaxPDF = (req,res) => {

  let address = req.query.address;

  let getPDF = printTaxPDF(address);

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

exports.getTaxCSV = (req,res) => {

  res.download('./Tax.csv');

}

exports.getTaxBills = (req,res) => {

  let address = req.query.address;

  printTaxBills(address).then(resp => {
    
    if(resp.data){
      res.zip([
        { path: '/TaxBill1.csv', name: 'TaxBill1' },
        { path: '/TaxBill2.csv', name: 'TaxBill2' },
        { path: '/TaxBill3.csv', name: 'TaxBill3' }
      ]);
    }
    
  });

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
  
    await page.goto('https://www.pbcgov.org/papa/Asps/GeneralAdvSrch/MasterSearch.aspx',{waitUntil: 'networkidle0'});
  
    let address = addr;
    await page.waitFor(2000);
    await page.focus('#txtSearch');
    await page.keyboard.type(address);

    await page.$eval('#form2 > div.mainsearch > div.searchbararea > div > button', el => el.click());
    await page.waitFor(2000);
    
    let errorElement = '';
    try {
        errorElement = await page.$eval('#MainContent_lblMsg',el => el.innerHTML);
    } catch (error) {
    }
  
    await page.waitFor(1000);
  
    if(errorElement!==''){
      return new Promise((resolve) => {
        resolve('error');
      });
    }
  
    await page.waitFor(4000);
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

  const printTaxPDF = async (addr) => {

    const browser = await puppeteer.launch({
       headless: true, defaultViewport: null, 
       args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ]
    });
    const page = await browser.newPage();
  
    await page.goto('https://pbctax.manatron.com/Tabs/PropertyTax.aspx',{waitUntil: 'networkidle0'});
  
    let address = addr;
    await page.waitFor(2000);
    await page.$eval('#selSearchBy', el => el.selectedIndex = 4);
    await page.focus('#fldInput');
    await page.keyboard.type(address);

    await page.$eval('#btnsearch', el => el.click());
    await page.waitFor(2000);

    let errorElement = '';
    try {
      errorElement = await page.$eval('#lxT504 > p.Normal',el => el.innerHTML);
    } catch (error) {
    }
  
    await page.waitFor(1000);
  
    if(errorElement!==''){
      return new Promise((resolve) => {
        resolve('error');
      });
    }
    
    await page.waitFor(2000);
    await page.$eval('#grm-search > tbody > tr:nth-child(2) > td.ui-widget.ui-widget-content.no-vert-lines.c8 > a', el => el.click());
    await page.waitFor(4000);
    const pdf = await page.pdf({format:'A4'});
    const html = await page.$eval('#dnn_ContentPane',el => el.innerHTML);
    
    await page.waitFor(1000);
    const csv = tableToCsv(html);
  
    fs.writeFile("Tax.csv", csv, (err) => {
      if(err) {
          return console.log(err);
      }
    }); 
  
  
    await browser.close();
    return pdf;
  
  };


  const printTaxBills = async (addr) => {

    const browser = await puppeteer.launch({
       headless: true, defaultViewport: null, 
       args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ]
    });
    const page = await browser.newPage();
  
    await page.goto('https://pbctax.manatron.com/Tabs/PropertyTax.aspx',{waitUntil: 'networkidle0'});
  
    let address = addr;
    await page.waitFor(2000);
    await page.$eval('#selSearchBy', el => el.selectedIndex = 4);
    await page.focus('#fldInput');
    await page.keyboard.type(address);

    await page.$eval('#btnsearch', el => el.click());
    await page.waitFor(3000);
  
    await page.$eval('#grm-search > tbody > tr:nth-child(2) > td.ui-widget.ui-widget-content.no-vert-lines.c8 > a', el => el.click());
    await page.waitFor(2000);


    const linkToFirstTax = "https://pbctax.manatron.com"+ await page.$eval("#\\35 08 > table > tbody > tr:nth-child(1) > td:nth-child(1) > a", el => el.getAttribute('href'));
    const linkToSecondTax = "https://pbctax.manatron.com"+ await page.$eval("#\\35 08 > table > tbody > tr:nth-child(2) > td:nth-child(1) > a", el => el.getAttribute('href'));
    const linkToThirdTax = "https://pbctax.manatron.com"+ await page.$eval("#\\35 08 > table > tbody > tr:nth-child(3) > td:nth-child(1) > a", el => el.getAttribute('href'));

    await page.waitFor(1000);
    
    let response1 = await axios.get(linkToFirstTax);
    let html1 = await response1.data;
    let response2 = await axios.get(linkToSecondTax);
    let html2 = await response2.data;
    let response3 = await axios.get(linkToThirdTax);
    let html3 = await response3.data;
    
    await page.waitFor(2000);

    let CSVs = [
      tableToCsv(html1),
      tableToCsv(html2),
      tableToCsv(html3)
    ];
  
    for(let i=0; i<CSVs.length; i++){
      fs.writeFile("TaxBill"+(i+1)+".csv", CSVs[i], (err) => {
        if(err) {
            return console.log(err);
        }
      }); 
    }
  
  
    await browser.close();
    return true;
  
  };
  
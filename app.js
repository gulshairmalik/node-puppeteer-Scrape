const express = require('express');
const path = require('path');
const puppeteer = require('puppeteer');
const tableToCsv = require('node-table-to-csv');
const axios = require('axios');

const fs = require('fs');
const app = express();


//Requring Routes Files
const home = require('./routes/home');
const miami = require('./routes/miami');
const palm = require('./routes/palm');

//Using Routes
app.use('/',home);
app.use('/miami',miami);
app.use('/palm',palm);

//Setting View Engine
app.set('view engine', 'pug');
app.set('views',path.join(__dirname, 'views'));

//https://www.pbcgov.org/papa/
//https://www8.miamidade.gov/Apps/PA/propertysearch/#/

// (async () => {

//   const browser = await puppeteer.launch({ headless: false, defaultViewport: null});
//   const page = await browser.newPage();

//   await page.goto('https://www8.miamidade.gov/Apps/PA/propertysearch/#/',{waitUntil: 'networkidle0'});

//   let address = '1630 sw 13th ave';
//   await page.waitFor(2000);
//   await page.focus('#search_box')
//   await page.keyboard.type(address);

//   await page.$eval('#search_submit', el => el.click());
//   await page.waitFor(2000);
//   await page.$eval('#results_list > div > div.results_record.ng-scope > div.record_folio.ng-binding > span', el => el.click());

//   await page.waitFor(5000);
//   //const html = await page.content();
//   const html = await page.$eval('body',el => el.innerHTML);
//   await page.waitFor(2000);


//   let csv = tableToCsv(html);
//   console.log(csv);

//   fs.writeFile("index.csv", csv, function(err) {
//     if(err) {
//         return console.log(err);
//     }

//     console.log("The file was saved!");
//   }); 



//   //await browser.close();


// })();



// (async () => {

//   const browser = await puppeteer.launch({ headless: false, defaultViewport: null});

//   const page = await browser.newPage();

//   await page.goto('https://secure.co.palm-beach.fl.us/ClerkFSAPA/Disclaimer',{waitUntil: 'networkidle0'});


//   let address = '17795 35TH PL N';
//   await page.waitFor(1000);
//   await page.$eval('#MainContent_imgAccept', el => el.click());
//   await page.waitFor(1000);
//   await page.waitForSelector('#MainContent_txtSitusAddress');
//   await page.focus('#MainContent_txtSitusAddress');
//   await page.keyboard.type(address);
//   await page.waitFor(2000);

//   await page.$eval('#btnSeacrh', el => el.click());
//   await page.waitFor(2000);
  
//   let errorElement = '';
//   try {
//     errorElement = await page.$eval('#MainContent_lblBottomMessage',el => el.innerHTML);
//   } catch (error) {
//   }

//   await page.waitFor(2000);

//   await page.$eval('#MainContent_grdAccounts_hyperAcctseq_0', el => el.click());

//   await page.waitFor(2000);

//   const url = await page.url();

//   await page.waitFor(1000);
  
//   const pdfUrl = url.replace('AccountDetail','LienSatisfactionLttr.aspx');

//   await page.waitFor(1000);

//   axios.get(pdfUrl,{responseType: 'arraybuffer'}).then(res => {
//     fs.writeFile("Asses.pdf", res.data, (err) => {
//         if(err) {
//             return console.log(err);
//         }
//       });
//   })

//   //console.log(pdf);

//   //https://secure.co.palm-beach.fl.us/ClerkFSAPA/LienSatisfactionLttr.aspx?acctseq=rJYyDqMbwuvBEPtWQMFJrQ==

//   //await page.pdf({path:'Page.pdf',format:'A4'});


//   //await browser.close();


// })();



//1630 sw 13th ave
//815 upland rd 
//713 Sunset Rd
//795 Belvedere Rd

//17795 35TH PL N

app.listen(process.env.PORT || 3000);


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

//   await page.goto('https://pbctax.manatron.com/Tabs/PropertyTax.aspx',{waitUntil: 'networkidle0'});


//   let address = '815 upland rd 1';
//   await page.waitFor(2000);
//   await page.$eval('#selSearchBy', el => el.selectedIndex = 4);
//   await page.focus('#fldInput');
//   await page.keyboard.type(address);
//   //await page.waitFor(2000);

//   await page.$eval('#btnsearch', el => el.click());
//   await page.waitFor(2000);
//   // await page.$eval('#results_list > div > div.results_record.ng-scope > div.record_folio.ng-binding > span', el => el.click());
//   let errorElement = '';
//   try {
//     errorElement = await page.$eval('#lxT504 > p.Normal',el => el.innerHTML);
//   } catch (error) {
//   }
//   await page.waitFor(3000);

//   await page.$eval('#grm-search > tbody > tr:nth-child(2) > td.ui-widget.ui-widget-content.no-vert-lines.c8 > a', el => el.click());
  
//   await page.waitFor(10000);
//   const html = await page.$eval('#dnn_ContentPane',el => el.innerHTML);
//   // await page.waitFor(2000);
//   //await page.pdf({path:'Page.pdf',format:'A4'});

//   // let csv = tableToCsv(html);
//   let csv = '';
//   // console.log(csv);

//   // fs.writeFile("index.csv", csv, function(err) {
//   //   if(err) {
//   //       return console.log(err);
//   //   }

//   //   console.log("The file was saved!");
//   // }); 

// const linkToFirstTax = "https://pbctax.manatron.com"+ await page.$eval("#\\35 08 > table > tbody > tr:nth-child(1) > td:nth-child(1) > a", el => el.getAttribute('href'));
// // const linkToSecondTax = "https://pbctax.manatron.com"+ await page.$eval("#\\35 08 > table > tbody > tr:nth-child(2) > td:nth-child(1) > a", el => el.getAttribute('href'));
// // const linkToThirdTax = "https://pbctax.manatron.com"+ await page.$eval("#\\35 08 > table > tbody > tr:nth-child(3) > td:nth-child(1) > a", el => el.getAttribute('href'));

// await page.waitFor(1000);
// let response = await axios.get(linkToFirstTax);
// let html1 = await response.data;
// await page.waitFor(1000);
// console.log(html1);




//   //await browser.close();


// })();



//1630 sw 13th ave
//815 upland rd 1
//713 Sunset Rd
//795 Belvedere Rd

//17795 35TH PL N

app.listen(process.env.PORT || 3000);


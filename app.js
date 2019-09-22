const express = require('express');
const path = require('path');
const puppeteer = require('puppeteer');
const tableToCsv = require('node-table-to-csv');
const fs = require('fs');
const app = express();


//Requring Routes Files
const home = require('./routes/home');
const miami = require('./routes/miami');

//Using Routes
app.use('/',home);
app.use('/miami',miami);

//Setting View Engine
app.set('view engine', 'pug');
app.set('views',path.join(__dirname, 'views'));



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


//1630 sw 13th ave
//Miami Dade, FL, USA.

app.listen(process.env.PORT || 3000);


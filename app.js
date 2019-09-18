const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false});
  const page = await browser.newPage();

  await page.goto('https://www8.miamidade.gov/Apps/PA/propertysearch/#/');
  //await page.screenshot({path: 'delta.png'});
  //await page.waitFor(3000);

  let address = "1630 sw 13th ave";
  await page.focus('#search_box')
  await page.keyboard.type(address);

  await page.evaluate(() => {

    //document.getElementById('search_box').value = '1630 sw 13th ave';
    document.getElementById('search_submit').click();
   
  
  });

  //await browser.close();
})();
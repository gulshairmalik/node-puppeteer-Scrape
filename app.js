const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true, defaultViewport: null});
  const page = await browser.newPage();

  await page.goto('https://www8.miamidade.gov/Apps/PA/propertysearch/#/',{waitUntil: 'networkidle0'});
  //await page.screenshot({path: 'delta.png'});
  //await page.waitFor(3000);

  let address = "1630 sw 13th ave";
  await page.focus('#search_box')
  await page.keyboard.type(address);

  await page.evaluate(async () => {

    //document.getElementById('search_box').value = '1630 sw 13th ave';
    document.getElementById('search_submit').click();
    await new Promise((resolve) => setTimeout(resolve, 3000));
    document.querySelectorAll("#results_list > div > div.results_record.ng-scope > div.record_folio.ng-binding > span")[0].click();
  
  });
  await page.waitFor(5000);
  await page.pdf({path: 'page.pdf'});

  //await browser.close();
})();
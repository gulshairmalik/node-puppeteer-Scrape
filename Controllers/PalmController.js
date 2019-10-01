const puppeteer = require('puppeteer');
const tableToCsv = require('node-table-to-csv');
const axios = require('axios');
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

  printTaxBills(address).then((resp) => {
    if(resp){
      res.send(resp);
    }
    
  });

}

exports.getTaxBill1 = (req,res) => {

  let address = req.query.pageAddress;

  printTaxBill1(address).then((resp) => {
    if(resp==='success'){
      res.download('./TaxBill1.csv');
    }
    
  });


}

exports.getTaxBill2 = (req,res) => {

  let address = req.query.pageAddress;

  printTaxBill2(address).then((resp) => {
    if(resp==='success'){
      res.download('./TaxBill2.csv');
    }
    
  });

}

exports.getTaxBill3 = (req,res) => {

  let address = req.query.pageAddress;

  printTaxBill3(address).then((resp) => {
    if(resp==='success'){
      res.download('./TaxBill3.csv');
    }
    
  });

}

exports.getAssesment = (req,res) => {

  let address = req.query.address;

  let getPDF = printAssesment(address);

  getPDF.then((resp) => {
    if(resp==='success'){
      res.download('./Assesment.pdf');
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
    await page.waitFor(5000);
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
    await page.waitFor(4000);

    await page.waitForSelector('#\\35 08 > table > tbody > tr:nth-child(1) > td:nth-child(1) > a');


    const linkToFirstTax = "https://pbctax.manatron.com"+ await page.$eval("#\\35 08 > table > tbody > tr:nth-child(1) > td:nth-child(1) > a", el => el.getAttribute('href'));
    const linkToSecondTax = "https://pbctax.manatron.com"+ await page.$eval("#\\35 08 > table > tbody > tr:nth-child(2) > td:nth-child(1) > a", el => el.getAttribute('href'));
    const linkToThirdTax = "https://pbctax.manatron.com"+ await page.$eval("#\\35 08 > table > tbody > tr:nth-child(3) > td:nth-child(1) > a", el => el.getAttribute('href'));

    await page.waitFor(1000);

    const arrOfLinks = [linkToFirstTax,linkToSecondTax,linkToThirdTax];

    await browser.close();

    return new Promise(resolve => {
      resolve(arrOfLinks);
    })
  
  };
  



  const printTaxBill1 = async (pageAddr) => {

    const browser = await puppeteer.launch({
       headless: true, defaultViewport: null, 
       args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ]
    });
    const page = await browser.newPage();
  
    await page.goto(pageAddr,{waitUntil: 'networkidle0'});
    await page.waitFor(4000);
    const html = await page.$eval('#dnn_ContentPane',el => el.innerHTML);
    await page.waitFor(1000);
    
    const csv = tableToCsv(html);
  
    fs.writeFile("TaxBill1.csv", csv, (err) => {
      if(err) {
          return console.log(err);
      }
    }); 
  
    await browser.close();

    return new Promise(resolve => {
      resolve('success');
    })
  
  };


  const printTaxBill2 = async (pageAddr) => {

    const browser = await puppeteer.launch({
       headless: true, defaultViewport: null, 
       args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ]
    });
    const page = await browser.newPage();
  
    await page.goto(pageAddr,{waitUntil: 'networkidle0'});
    await page.waitFor(4000);
    const html = await page.$eval('#dnn_ContentPane',el => el.innerHTML);
    await page.waitFor(1000);
    
    const csv = tableToCsv(html);
  
    fs.writeFile("TaxBill2.csv", csv, (err) => {
      if(err) {
          return console.log(err);
      }
    }); 
  
    await browser.close();

    return new Promise(resolve => {
      resolve('success');
    })
  
  };


  const printTaxBill3 = async (pageAddr) => {

    const browser = await puppeteer.launch({
       headless: true, defaultViewport: null, 
       args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ]
    });
    const page = await browser.newPage();
  
    await page.goto(pageAddr,{waitUntil: 'networkidle0'});
    await page.waitFor(4000);
    const html = await page.$eval('#dnn_ContentPane',el => el.innerHTML);
    await page.waitFor(1000);
    
    const csv = tableToCsv(html);
  
    fs.writeFile("TaxBill3.csv", csv, (err) => {
      if(err) {
          return console.log(err);
      }
    }); 
  
    await browser.close();

    return new Promise(resolve => {
      resolve('success');
    })
  
  };



  const printAssesment = async (addr) => {

    const browser = await puppeteer.launch({
       headless: true, defaultViewport: null, 
       args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ]
    });
    const page = await browser.newPage();
  
    await page.goto('https://secure.co.palm-beach.fl.us/ClerkFSAPA/Disclaimer',{waitUntil: 'networkidle0'});

    let address = addr;
    await page.waitFor(1000);
    await page.$eval('#MainContent_imgAccept', el => el.click());
    await page.waitFor(1000);
    await page.waitForSelector('#MainContent_txtPCN');
    await page.focus('#MainContent_txtPCN');
    await page.keyboard.type(address);
    await page.waitFor(2000);
  
    await page.$eval('#btnSeacrh', el => el.click());
    await page.waitFor(2000);
    
    let errorElement = '';
    try {
      errorElement = await page.$eval('#MainContent_lblBottomMessage',el => el.innerHTML);
    } catch (error) {
    }

    await page.waitFor(2000);

    if(errorElement!==''){

      await page.pdf({path:'./Assesment.pdf',format:'A4'});
      await page.waitFor(3000);
      await browser.close();
      return new Promise(resolve => {
        resolve('success');
      })

    }

    await page.$eval('#MainContent_grdAccounts_hyperAcctseq_0', el => el.click());

    //https://secure.co.palm-beach.fl.us/ClerkFSAPA/LienSatisfactionLttr.aspx?acctseq=rJYyDqMbwuvBEPtWQMFJrQ==

    await page.waitFor(2000);

    const url = await page.url();
  
    await page.waitFor(1000);
    
    const pdfUrl = url.replace('AccountDetail','LienSatisfactionLttr.aspx');
  
    await page.waitFor(1000);

    const response = await axios.get(pdfUrl,{responseType: 'arraybuffer'});
    const pdf = await response.data;

    fs.writeFile("Assesment.pdf", pdf, (err) => {
      if(err) {
          return console.log(err);
      }
    }); 

    await page.waitFor(2000);
    await browser.close();

    return new Promise(resolve => {
      resolve('success');
    })
  
  };
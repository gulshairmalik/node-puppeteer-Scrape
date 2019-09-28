const searchInMiami = () => {

    document.getElementById('pdf').style.display = 'none';
    document.getElementById('csv').style.display = 'none';
    document.getElementById('error').innerHTML = '';
    document.getElementById('submit').innerText = 'Loading...';
    let searchedValue = document.getElementById('input').value;
    
    axios.get("/miami/getPDF?address="+searchedValue,{responseType: 'arraybuffer'}).then((res) => {
        let enc = new TextDecoder("utf-8");
        let error = enc.decode(res.data);

        if(error==='Address is invalid.'){
            document.getElementById('error').innerHTML = error;
            document.getElementById('submit').innerText = 'Search';
        }
        else{
            let blob = new Blob([res.data], { type:'application/pdf' });
            let pdfElement = document.getElementById('pdf');
            pdfElement.href = window.URL.createObjectURL(blob);
            pdfElement.download = 'Page.pdf';

            axios.get("/miami/getCSV",{responseType: 'arraybuffer'}).then((resp) => {
                document.getElementById('submit').innerText = 'Search';
                let blob = new Blob([resp.data], { type:'application/csv' });
                let csvElement = document.getElementById('csv');
                csvElement.href = window.URL.createObjectURL(blob);
                csvElement.download = 'Page.csv';
                document.getElementById('pdf').style.display = 'block';
                document.getElementById('csv').style.display = 'block';
            })
        }
    });
}

const searchInPalm = () => {

    document.getElementById('pdf1').style.display = 'none';
    document.getElementById('csv1').style.display = 'none';
    document.getElementById('getTax').style.display = 'none';
    document.getElementById('error1').innerHTML = '';
    document.getElementById('submit1').innerText = 'Loading...';
    let searchedValue = document.getElementById('input1').value;
    
    axios.get("/palm/getPDF?address="+searchedValue,{responseType: 'arraybuffer'}).then((res) => {
        let enc = new TextDecoder("utf-8");
        let error = enc.decode(res.data);

        if(error==='Address is invalid.'){
            document.getElementById('error1').innerHTML = error;
            document.getElementById('submit1').innerText = 'Search';
        }
        else{
            let blob = new Blob([res.data], { type:'application/pdf' });
            let pdfElement = document.getElementById('pdf1');
            pdfElement.href = window.URL.createObjectURL(blob);
            pdfElement.download = 'Page.pdf';

            axios.get("/palm/getCSV",{responseType: 'arraybuffer'}).then((resp) => {
                document.getElementById('submit1').innerText = 'Search';
                let blob = new Blob([resp.data], { type:'application/csv' });
                let csvElement = document.getElementById('csv1');
                csvElement.href = window.URL.createObjectURL(blob);
                csvElement.download = 'Page.csv';
                document.getElementById('pdf1').style.display = 'block';
                document.getElementById('csv1').style.display = 'block';
                document.getElementById('getTax').style.display = 'block';
            })
        }
    });
}

const searchTaxInPalm = () => {

    document.getElementById('tax').style.display = 'none';
    document.getElementById('getTax').innerText = 'Loading...';

    let searchedValue = document.getElementById('input1').value;
    
    axios.get("/palm/getTaxPDF?address="+searchedValue,{responseType: 'arraybuffer'}).then((res) => {
        let enc = new TextDecoder("utf-8");
        let error = enc.decode(res.data);

        if(error==='Address is invalid.'){
            document.getElementById('error2').innerHTML = 'No Tax Information found for this address.';
            document.getElementById('getTax').style.display = 'none';
        }
        else{
            let blob = new Blob([res.data], { type:'application/pdf' });
            let pdfElement = document.getElementById('pdf2');
            pdfElement.href = window.URL.createObjectURL(blob);
            pdfElement.download = 'Tax.pdf';

            axios.get("/palm/getTaxCSV",{responseType: 'arraybuffer'}).then((resp) => {
                document.getElementById('getTax').style.display = 'none';
                let blob = new Blob([resp.data], { type:'application/csv' });
                let csvElement = document.getElementById('csv2');
                csvElement.href = window.URL.createObjectURL(blob);
                csvElement.download = 'Tax.csv';
                document.getElementById('tax').style.display = 'block';
                document.getElementById('get3Tax').style.display = 'block';
            })
        }
    });
}

const searchTaxBillInPalm = () => {

    document.getElementById('taxBill').style.display = 'none';
    document.getElementById('get3Tax').innerText = 'Loading...';

    let searchedValue = document.getElementById('input1').value;
    
    axios.get("/palm/getTaxBills?address="+searchedValue).then((res) => {

        let arrOfLinks = res.data;

        axios.get("/palm/getTaxBill1?pageAddress="+encodeURIComponent(arrOfLinks[0]),{responseType: 'arraybuffer'}).then((res1) => {

            let blob1 = new Blob([res1.data], { type:'application/csv' });
            let csvElement1 = document.getElementById('csvTax1');
            csvElement1.href = window.URL.createObjectURL(blob1);
            csvElement1.download = 'TaxBill1.csv';
   

            axios.get("/palm/getTaxBill2?pageAddress="+encodeURIComponent(arrOfLinks[1]),{responseType: 'arraybuffer'}).then((res2) => {

                let blob2 = new Blob([res2.data], { type:'application/csv' });
                let csvElement2 = document.getElementById('csvTax2');
                csvElement2.href = window.URL.createObjectURL(blob2);
                csvElement2.download = 'TaxBill2.csv';

                axios.get("/palm/getTaxBill3?pageAddress="+encodeURIComponent(arrOfLinks[2]),{responseType: 'arraybuffer'}).then((res3) => {

                    document.getElementById('get3Tax').style.display = 'none';
                    
                    let blob3 = new Blob([res3.data], { type:'application/csv' });
                    let csvElement3 = document.getElementById('csvTax3');
                    csvElement3.href = window.URL.createObjectURL(blob3);
                    csvElement3.download = 'TaxBill3.csv';

                    document.getElementById('taxBill').style.display = 'block';
                    document.getElementById('getAssesment').style.display = 'block';
      
                });
                
            });
            
        });

        
    });
}


const searchAssesmentInPalm = () => {

    document.getElementById('assesment').style.display = 'none';
    document.getElementById('getAssesment').innerText = 'Loading...';
    let searchedValue = document.getElementById('input1').value;
    
    axios.get("/palm/getAssesment?address="+searchedValue,{responseType: 'arraybuffer'}).then((res) => {

        let blob = new Blob([res.data], { type:'application/pdf' });
        let pdfElement = document.getElementById('assesPdf');
        pdfElement.href = window.URL.createObjectURL(blob);
        pdfElement.download = 'Assesment.pdf';
        document.getElementById('getAssesment').style.display = 'none';
        document.getElementById('assesment').style.display = 'block';

    });
}

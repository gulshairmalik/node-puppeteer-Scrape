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
            })
        }
    });
}
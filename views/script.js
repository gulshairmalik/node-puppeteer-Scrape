function search(){
    document.getElementById('pdf').style.display = 'none';
    document.getElementById('error').innerHTML = '';
    document.getElementById('submit').innerText = 'Loading...';
    let searchedValue = document.getElementById('input').value;
    
    axios.get("/getPDF?address="+searchedValue,{responseType: 'arraybuffer'}).then((res) => {
        document.getElementById('submit').innerText = 'Search';
        let enc = new TextDecoder("utf-8");
        let error = enc.decode(res.data);

        if(error==='Address is invalid.'){
            document.getElementById('error').innerHTML = error;
        }
        else{
            let blob = new Blob([res.data], { type:'application/pdf' });
            let pdfElement = document.getElementById('pdf');
            pdfElement.href = window.URL.createObjectURL(blob);
            document.getElementById('pdf').style.display = 'block';
            pdfElement.download = 'Page.pdf';
        }
    });
}
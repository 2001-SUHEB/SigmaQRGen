document.addEventListener('contextmenu', event => event.preventDefault());
let imgBox = document.getElementById('imgBox');
let qrImage = document.getElementById('qrImage');
let qrText = document.getElementById('qrText');



function GenerateQR() {
    if (qrText.value.length > 0) { 
        qrImage.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&format=png&data=" + encodeURIComponent(qrText.value);
        imgBox.classList.add('show-img');
    } else {
        qrText.classList.add('error');
        setTimeout(() => {
            qrText.classList.remove('error');
        }, 1000);
    }
}

function DownloadQR() {
    if (qrImage.src && qrImage.src !== "") {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", qrImage.src, true);
        xhr.responseType = "blob";
        xhr.onload = function() {
            const url = window.URL.createObjectURL(xhr.response);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'qr-code.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        };
        xhr.send();
    } else {
        alert('Generate a QR code first.');
    }
}

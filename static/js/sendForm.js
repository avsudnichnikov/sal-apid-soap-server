function bindForm() {
    const url = '/wsdl';
    const form = document.querySelector('#soapForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const xhr = new XMLHttpRequest();
        const text = `
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body xmlns="http://localhost/wsdl">
        <person>
            <firstName>Nadya</firstName>
        </person>
    </soap:Body>
</soap:Envelope>`;
        xhr.open('post', url);
        xhr.setRequestHeader('Content-Type', 'text/xml');
        xhr.send(text);
        console.log(xhr)
        xhr.addEventListener('readystatechange', function () {
            if (this.readyState === this.DONE && this.status === 200) {
                console.log(this.responseText);
            }
        });
    })
}

window.addEventListener('load', () => {
    bindForm();
})

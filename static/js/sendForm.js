function bindForm() {
    const url = '/wsdl';
    const form = document.querySelector('#soapForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const xhr = new XMLHttpRequest();
        const text = form.querySelector('textarea').value;
        xhr.open('post', url);
        xhr.setRequestHeader('Content-Type', 'text/xml');
        xhr.send(text);
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

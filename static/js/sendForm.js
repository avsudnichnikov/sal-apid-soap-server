function bindForm() {
    const url = '/wsdl';
    const form = document.querySelector('#soapForm');
    const responseField = document.querySelector('#responseField');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const xhr = new XMLHttpRequest();
        const text = form.querySelector('textarea').value;
        xhr.open('post', url);
        xhr.setRequestHeader('Content-Type', 'text/xml');
        xhr.send(text);
        xhr.addEventListener('readystatechange', function () {
            if (this.readyState === this.DONE) {
                responseField.innerHTML = '<code>'
                    + this.responseText
                        .replaceAll('<', '&lt;')
                        .replaceAll('>', '><br>')
                    +'</code>';
            }
        });
    })
}

window.addEventListener('load', () => {
    bindForm();
})

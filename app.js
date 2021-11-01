const express = require('express');
const soap = require('soap');
const path = require('path');

const wsdl = require('fs').readFileSync('postPerson.wsdl', 'utf8');
const wsdlPath = "/wsdl";
const app = express();

app.use('/static', express.static(path.join(__dirname, 'static')))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
const port = process.env.PORT || 3000;

const serviceObject = {
    postPersonService: {
        postPersonPort: {
            postPerson: function (args) {
                console.log(args.name);
                return {key: 'qwerty'}
            }
        },
    }
};

async function getIndex(request, response) {
    response.render('index');
}

async function postPerson(request, response) {
    response.send('request.body');
}

app.route('/')
    .get(getIndex)
//    .post(postPerson);
// https://github.com/officer-rosmarino/node-soap-example/blob/master/service.wsdl
// https://stackoverflow.com/questions/4791794/client-to-send-soap-request-and-receive-response
// https://github.com/officer-rosmarino/node-soap-example/blob/master/README.md
// https://habr.com/ru/post/187390/

app.listen(port, () => {
    console.log('Listening on port ' + port);
    soap.listen(app, wsdlPath, serviceObject, wsdl, () => {
        console.log('Check http://localhost:' + port + wsdlPath + '?wsdl to see if the service is working');
    });
})

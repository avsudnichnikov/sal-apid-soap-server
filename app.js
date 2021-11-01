const express = require('express');
const soap = require('soap');
const path = require('path');

const wsdlPath = "/wsdl";
const wsdl = require('fs').readFileSync('service.wsdl', 'utf8');
const app = express();

require('dotenv').config()

app.use('/static', express.static(path.join(__dirname, 'static')))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
const port = process.env.PORT || 3000;

// the splitter function, used by the service
async function getIndex(request, response) {
    response.render('index');
}

// the service
const serviceObject = {
    PostPersonService: {
        PostPersonServiceSoapPort: {
            MessageSplitter: () => {
                return {key: '12345'}
            }
        },
        PostPersonServiceSoap12Port: {
            MessageSplitter: {
                MessageSplitter: () => {
                    return {key: '12345'}
                }
            },
        }
    }
};

app.route('/')
    .get(getIndex)
//    .post(postPerson);
// http//github.com/officer-rosmarino/node-soap-example/blob/master/service.wsdl
// http//stackoverflow.com/questions/4791794/client-to-send-soap-request-and-receive-response
// http//habr.com/ru/post/187390/
// https://stackoverflow.com/questions/47078343/node-soap-cannot-read-property-description-of-undefined

// Launch the server and listen
app.listen(port, function () {
    console.log('Listening on port ' + port);
    soap.listen(app, wsdlPath, serviceObject, wsdl, () => {
        console.log('Check http://localhost:' + port + wsdlPath + '?wsdl to see if the service is working');
    });
})

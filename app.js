const express = require('express');
const soap = require('soap');
const path = require('path');

const wsdlPath = "/wsdl";
const wsdl = require('fs').readFileSync('PostPerson.wsdl', 'utf8');
const app = express();

app.use('/static', express.static(path.join(__dirname, 'static')))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
const port = process.env.PORT || 3000;

async function getIndex(request, response) {
    response.render('index');
}

const postPerson = (args) =>{
    return {
        key: "Hello Cutie Pie!!!" + " " + args.name
    };
}

const service = {
    PostPersonService: {
        PostPersonServicePort_0: {
            PostPerson: postPerson,
        },
    }
};

app.route('/')
    .get(getIndex)

const cbServ = () => {
    console.log('Listening on port ' + port);
}
const cbSoap = () => {
    console.log('WSDL on http://localhost:' + port + wsdlPath + '?wsdl');
}

app.listen(port, cbServ);
soap.listen(app, wsdlPath, service, wsdl, cbSoap);

"use strict";
const express = require('express');
const soap = require('soap');
const path = require('path');
const fs = require('fs');

const wsdlPath = "/wsdl";
const wsdl = fs.readFileSync('service.wsdl', 'utf8');
const server = express();

server.use('/static', express.static(path.join(__dirname, 'static')))
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));
const port = process.env.PORT || 3000;

async function getIndex(request, response) {
    response.render('index');
}

function postPerson(person) {
    const template = {
        name: {
            firstname: 'string',
            surname: 'string',
            patronymic: 'string',
        },
        age: 'integer',
        gender: 'gender',
    }
    const recursiveTypeCheck = (temp, obj, nameOfProp = 'obj') => {
        if ((typeof obj === 'object') && (typeof temp === 'object')) {
            Object.keys(temp).forEach((prop) => recursiveTypeCheck(temp[prop], obj[prop], prop));
        } else {
            let type;
            if ((temp === 'string') && (typeof obj === 'string')) {
                type = 'string';
            } else if ((temp === 'integer') && (!Number.isNaN(Number.parseInt(obj)))) {
                type = 'integer';
            } else if ((temp === 'boolean') && (obj === 'true' || obj === 'false')) {
                type = 'boolean';
            } else if ((temp === 'gender') && (obj === 'male' || obj === 'female')) {
                type = 'gender';
            }
            if (!type) {
                throw {
                    Fault: {
                        Code: 400,
                        Reason: {Text: `Unexpected property value of "${nameOfProp}" (${obj})`}
                    }
                };

            }
        }
    }
    recursiveTypeCheck(template, person);
    return {
        key: 'You are awesome!',
        result: 'The data is valid',
    }
}

const service = {
    PostPersonService: {
        PostPersonServicePort: {
            PostPerson: postPerson
        }
    }
};

// root handler
server.route('/')
    .get(getIndex)

// Launch the server and listen
server.listen(port, function () {
    console.log('Listening on port ' + port);
});
soap.listen(server, wsdlPath, service, wsdl, function () {
    console.log("Check http://localhost:" + port + wsdlPath + "?wsdl to see if the service is working");
});

/*jslint node: true */
"use strict";

// SOAP client example

var soap = require('soap');
var url = 'http://localhost/wsdl';

soap.createClient(url,function(err, client) {
    console.log(err);
    client.postPerson({fullName: "moscow"}, function(err, result) {
        console.log(result);
    });
});

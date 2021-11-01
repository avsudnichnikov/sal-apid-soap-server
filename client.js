/*jslint node: true */
"use strict";

var soap = require('soap');
var url = 'http://localhost/wsdl';

soap.createClient(url,function(err, client) {
    client.postPerson({fullName: "moscow"}, function(err, result) {
        console.log(result);
    });
});

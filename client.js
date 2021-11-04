const soap = require('soap');
const url = 'http://localhost:3000/wsdl?wsdl';

// Create client
soap.createClient(url, function (err, client) {
    if (err){
        throw err;
    }

    const args = {
        name: {
            firstname: 'Bond',
            surname: 'James',
            patronymic: 'Azat ogli',
        },
        age: '32',
        gender: 'male',
    };

    client.PostPerson(args, function (err, res) {
        if (err)
            throw err;
        console.log(client.lastRequest);
    });
});

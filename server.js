const express = require('express');
const server = express();
const multer = require('multer');
const upload = multer();
const port = process.env.PORT || 3000;
server.use(upload.array());
server.use(express.static('public'));


server.get('/', (req, res) => {
    res.send(JSON.stringify({
        data: {
            info: 'Тут ничего нет. Попробуйте отправить запрос на \/answer',
        }
    }))
})

server.get('/answer', (req, res) => {
    res.send(JSON.stringify({
        data: {
            info: 'Это GET-запрос. Попробуйте отправить POST-запрос',
        }
    }))
})

server.post('/answer', function(req, res) {
    const added = 'это очень интересный вопрос, но не менее интересен - "Есть ли жизнь на Марсе?"';
    const answer = (req.body.question) ? `"${req.body.question}" - ${added}` : 'Вы не задали вопрос';

    res.send(JSON.stringify({
        data: {
            info: 'Это POST-запрос',
            answer
        }
    }))
});


server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

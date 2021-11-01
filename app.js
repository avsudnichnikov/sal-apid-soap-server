const express = require('express');
const multer = require('multer');
const upload = multer();
const path = require('path')


require('dotenv').config();

const app = express();
app.use(upload.array());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/static', express.static(path.join(__dirname, 'static')))

const port = process.env.PORT || 3000;

async function getIndex(request, response){
    response.render('index', {
        title: 'Отправить запрос',
    });
}

async function getPages(request, response) {
    response.json({info: 'it is pages'});
}

async function postPages(request, response) {
    response.json({info: request.name});
}

app.route('/')
    .get(getIndex);
app.route('/pages')
    .get(getPages)
    .post(postPages);

app.post('/answer', function (req, res) {
    const added = 'это очень интересный вопрос, но не менее интересен - "Есть ли жизнь на Марсе?"';
    const answer = (req.body.question) ? `"${req.body.question}" - ${added}` : 'Вы не задали вопрос';

    res.send(JSON.stringify({
        data: {
            info: 'Это POST-запрос',
            answer
        }
    }))
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

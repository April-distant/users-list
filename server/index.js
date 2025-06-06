const express = require('express');
const path = require('path');
const db = require('./database');
const cors = require('cors')

const app = express();
const PORT = 4000;
app.use(cors())

const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`);

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.get('/', (req, res) => {
    res.sendFile(createPath('index'));
});

app.get('/contacts', (req, res) => {
    res.sendFile(createPath('contacts'));
});

app.get('/about-us', (req, res) => {
    res.redirect('/contacts');
});

app.get('/users', (req, res) => {
    db.execute('SELECT * FROM users')
        .then(([users, _]) => {
            console.log(users)
            res.send(users)
        })
        .catch(err => console.log('Ошибка', err))
})

// создаем парсер для данных в формате json
const jsonParser = express.json();
// или устанавливаем автоматически парсинг тела запроса в json
// app.use(express.json());

app.post('/user', jsonParser, (req, res) => {

    console.log('Отправили пользователя', req.body)
    db.execute('INSERT INTO users (name, age) VALUES (?,?)', [req.body.name, req.body.age])
        .then(([users, _]) => {
            console.log(users)
            res.send(users)
        })
        .catch(err => console.log('Ошибка', err))
})

app.use((req, res) => {
    res
        .status(404)
        .sendFile(createPath('error'));
});
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    console.log('Server request');
    console.log(req);

    // Без кодировки русские буквы в файлах отображаются кракозябрами в браузере
    res.setHeader('Content-Type', 'text/html; charset=utf-8;');

    // Можно отослать в ответе просто такой код
    // res.write('<h1>Hello from NodeJS Привет</h1>')
    // res.end()
    //////////////////////

    const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`);
    let basePath = '';

    switch (req.url) {
        case '/':
        case '/home':
        case '/index.html':
            basePath = createPath('index');
            res.statusCode = 200;
            break;
        case '/about-us':
            res.statusCode = 301;
            res.setHeader('Location', '/contacts');
            res.end();
            break;
        case '/contacts':
            basePath = createPath('contacts');
            res.statusCode = 200;
            break;
        default:
            basePath = createPath('error');
            res.statusCode = 404;
            break;
    }

    fs.readFile(basePath, (err, data) => {
        if (err) {
            console.log('Ошибка', err);
            res.statusCode = 500;
            res.end();
        } else {
            res.write(data);
            res.end();
        }
    });
});

server.listen(PORT, 'localhost', (error) => {
    error ? console.log(error) : console.log(`listening port ${PORT}`);
});

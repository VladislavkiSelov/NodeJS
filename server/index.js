//Создание простого сервера;
const http = require('http');
const server = http.createServer((request, response) => {

    response.writeHead(200, {
        'Content-Type': 'text/html'
    })

    if (request.method === 'GET') {
        response.end(`<h1>Form</h1>
         <form method="post">
        <input type="text" name="title"></input>
        <button type="submit">Send</button>
            </form > `
        )
    }
    if (request.method === "POST") {
        const body = [];
        request.on('data', data => {
            body.push(Buffer.from(data))
        })
        request.on('end', () => {
            const res = body.toString().split('=').at(-1);
            response.end(
                `<h2>Titel: ${res}</h2>`
            )
        })
    }
})

server.listen(3000, () => {
    console.log('сервер запущен');
})
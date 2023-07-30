//Создание простого сервера;
// const http = require('http');
// const server = http.createServer((request, response) => {

//     response.writeHead(200, {
//         'Content-Type': 'text/html'
//     })

//     if (request.method === 'GET') {
//         response.end(`<h1>Form</h1>
//          <form method="post">
//         <input type="text" name="title"></input>
//         <button type="submit">Send</button>
//             </form > `
//         )
//     }
//     if (request.method === "POST") {
//         const body = [];
//         request.on('data', data => {
//             body.push(Buffer.from(data))
//         })
//         request.on('end', () => {
//             const res = body.toString().split('=').at(-1);
//             response.end(
//                 `<h2>Titel: ${res}</h2>`
//             )
//         })
//     }
// })

// server.listen(3000, () => {
//     console.log('сервер запущен');
// })




//Web-сервер с HTML-страницами
//Создание простого REST-сервера

const http = require('http');
const fs = require('fs');
const path = require('path');
const user = require('./user')

const server = http.createServer((request, response) => {
    if (request.method === 'GET') {
        response.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        })
        if (request.url === '/') {
            fs.readFile(path.join(__dirname, 'index.html'),
                'utf-8',
                (error, content) => {
                    if (error) {
                        throw new Error(error)
                    }
                    response.end(content)
                }
            )
        }
        if (request.url === '/about') {
            fs.readFile(path.join(__dirname, 'about.html'),
                'utf-8',
                (error, content) => {
                    if (error) {
                        throw new Error(error)
                    }
                    response.end(content)
                }
            )
        }
        if (request.url === '/about/getUsers') {
            response.writeHead(200, {
                'Content-Type': 'text/json'
            })

            response.end(JSON.stringify(user.user))
        }
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
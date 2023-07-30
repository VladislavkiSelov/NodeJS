// const express = require('express');
// const app = express();
// const PORT = process.env.PORT || 3000;
// const path = require('path')

// app.get('/', (request, response) => {
//     response.sendFile(path.join(__dirname, 'index.html'))
// })

// app.get('/about', (request, response) => {
//     response.sendFile(path.join(__dirname, 'about.html'))
// })


// app.listen(PORT, () => {
//     console.log('server go....');
// })


const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'main_folder')

app.get('/', (request, response) => {
    response.render('index')
})

app.get('/about', (request, response) => {
    response.render('about')
})

app.listen(PORT, () => {
    console.log('server go....');
})
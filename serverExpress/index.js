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
const main = require('./routers/main.js')
const add = require('./routers/add.js')
const courses = require('./routers/courses.js')
const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'main_folder')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use('/', main)
app.use('/courses', courses)
app.use('/add', add)

app.listen(PORT, () => {
    console.log('server go....');
})
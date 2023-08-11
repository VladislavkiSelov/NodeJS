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
const card = require('./routers/card.js')
const courses = require('./routers/courses.js')
const path = require('path')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
})




app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'main_folder')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use('/', main)
app.use('/courses', courses)
app.use('/add', add)
app.use('/card', card)

async function start() {
    try {
        const url2 = 'mongodb+srv://user_vlad:iCsUcxpqh4zCuWrp@vladislav.8wf6zfm.mongodb.net/'
        const url = 'mongodb+srv://vladislavkiselev2007:mongoDBvlad1234554321@vladislav.8wf6zfm.mongodb.net/'
        await mongoose.connect(url2, { useNewUrlParser: true })
        app.listen(PORT, () => {
            console.log('server go....');
        })
    } catch (e) {
        console.log(e);
    }
}

start()

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
const User = require('./models/User.js')
const path = require('path')
const orders = require('./routers/orders')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 3000;
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
})
const idUser = '64d77471d1d354d84563defc';

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'main_folder')

app.use(async (request, response, next) => {
    try {
        const user = await User.findById(idUser)
        request.user = user;
        next()
    } catch (e) {
        console.log(e);
    }
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use('/', main)
app.use('/courses', courses)
app.use('/add', add)
app.use('/card', card)
app.use('/orders', orders)

async function start() {
    try {
        const url = 'mongodb+srv://user_vlad:iCsUcxpqh4zCuWrp@vladislav.8wf6zfm.mongodb.net/'
        await mongoose.connect(url, { useNewUrlParser: true })
        try {
            const candidate = await User.findOne()
            if (!candidate) {
                const user = new User({
                    _id: idUser,
                    name: 'Vlad',
                    email: 'vladislavkiselev.2007@gmail.com',
                    cart: { items: [] }
                });
                await user.save()
            }
        } catch (e) {
            console.log(e);
        }
        app.listen(PORT, () => {
            console.log('server go....');
        })
    } catch (e) {
        console.log(e);
    }
}

start()

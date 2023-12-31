const { Router } = require('express');
const Course = require('../models/Course')
const router = Router();

router.get('/', (request, response) => {
    response.render('add', {
        title: 'Добавить курсы',
        isAdd: true
    })
})

router.post('/', async (request, response) => {
    const course = new Course({ title: request.body.title, price: request.body.price, img: request.body.img, userId: request.user._id })
    try {
        await course.save()
        response.redirect('/courses')
    } catch (e) {
        console.log(e);
    }
})

module.exports = router;
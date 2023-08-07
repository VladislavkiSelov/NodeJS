const { Router } = require('express');
const Course = require('../models/course')
const Card = require('../models/Card')
const router = Router();

router.post('/add', async (request, response) => {
    const course = await Course.getById(request.body.id);
    await Card.add(course)
    response.redirect('/')
})

router.delete('/delete/:id', async (request, response) => {
    const card = await Card.delete(request.params.id);
    console.log(card);
    response.status(200).json(card)
})

router.get('/', async (request, response) => {
    const card = await Card.fetch();
    response.render('card', {
        title: 'Корзина',
        isCard: true,
        courses: card.courses,
        price: card.price
    })
})

module.exports = router;
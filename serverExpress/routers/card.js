// const { Router } = require('express');
// const Course = require('../models/Course')
// const Card = require('../models/Card')
// const router = Router();

// router.post('/add', async (request, response) => {
//     const course = await Course.getById(request.body.id);
//     await Card.add(course)
//     response.redirect('/')
// })

// router.delete('/delete/:id', async (request, response) => {
//     const card = await Card.delete(request.params.id);
//     console.log(card);
//     response.status(200).json(card)
// })

// router.get('/', async (request, response) => {
//     const card = await Card.fetch();
//     response.render('card', {
//         title: 'Корзина',
//         isCard: true,
//         courses: card.courses,
//         price: card.price
//     })
// })

// module.exports = router;










const { Router } = require('express');
const Course = require('../models/Course')
const Card = require('../models/Card')
const router = Router();

function mapCardItems(cart) {
    return cart.items.map(c => ({
        ...c.courseId._doc,
        id: c.courseId.id,
        count: c.count
    }))
}

function computePrice(courses) {
    return courses.reduce((total, course) => {
        return total += course.price * course.count
    }, 0)
}

router.post('/add', async (request, response) => {
    const course = await Course.findById(request.body.id);
    await request.user.addToCard(course)
    response.redirect('/')
})

router.delete('/delete/:id', async (request, response) => {
    await request.user.removeFromCart(request.params.id)
    const user = await request.user.populate('cart.items.courseId')
    const courses = mapCardItems(user.cart)
    const card = {
        courses,
        price: computePrice(courses)
    }
    response.status(200).json(card)
})

router.get('/', async (request, response) => {

    const user = await request.user.populate('cart.items.courseId')
    console.log(user.cart.items);

    const courses = mapCardItems(user.cart)

    response.render('card', {
        title: 'Корзина',
        isCard: true,
        courses: courses,
        price: computePrice(courses)
    })
})

module.exports = router;
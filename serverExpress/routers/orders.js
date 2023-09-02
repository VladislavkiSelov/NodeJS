const { Router } = require('express');
const router = Router();
const Order = require('../models/order') 
router.get('/', async (request, response) => {
    response.render('orders', {
        isOrders: true,
        title: "Заказы"
    })
})

router.post('/', async (request, response) => {
    const user = await request.user.populate('cart.items.courseId')
    const courses = user.cart.items.map(i => ({
        count: i.count,
        course: { ...i.courseId.toJSON() }
        //можно использовать метод toJSON, или обратится к _doc
    }))
    response.redirect('/orders')
})

module.exports = router
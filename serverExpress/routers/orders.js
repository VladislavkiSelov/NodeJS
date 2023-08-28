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
    response.redirect('/orders')
})

module.exports = router
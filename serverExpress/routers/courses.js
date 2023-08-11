// const { Router } = require('express');
// const Course = require('../models/course')
// const router = Router();

// router.get('/', async (request, response) => {
//     const courses = await Course.getAll()
//     response.render('courses', {
//         title: 'Страница курсов',
//         isCourses: true,
//         courses
//     })
// })

// router.get('/:id', async (request, response) => {
//     const course = await Course.getById(request.params.id)
//     response.render('course', {
//         course
//     })
// })

// router.get('/:id/edit', async (request, response) => {
//     const course = await Course.getById(request.params.id)
//     response.render('edit', {
//         course
//     })
// })

// router.post('/:id/edit', async (request, response) => {
//     await Course.editCourse(request.body)
//     response.redirect('/')
// })

// module.exports = router;









const { Router } = require('express');
const Course = require('../models/course')
const router = Router();

router.get('/', async (request, response) => {
    const courses = await Course.find().lean()
    response.render('courses', {
        title: 'Страница курсов',
        isCourses: true,
        courses
    })
})

router.get('/:id', async (request, response) => {
    const course = await Course.findById(request.params.id).lean()
    response.render('course', {
        course
    })
})

router.post('/:id/edit', async (request, response) => {
    // const { id } = request.body.id;
    // delete request.body.id
    // await Course.findByIdAndUpdate(id, request.body)
    // response.redirect('/')
    const { id } = request.body.id;
    delete request.body.id
    await Course.updateOne(id, { $set: request.body })
    response.redirect('/')
})

router.get('/:id/edit', async (request, response) => {
    const course = await Course.findById(request.params.id).lean()
    response.render('edit', {
        course
    })
})

module.exports = router;
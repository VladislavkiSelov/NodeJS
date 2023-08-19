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
const Course = require('../models/Course')
const router = Router();

router.get('/', async (request, response) => {
    const courses = await Course.find().lean().populate('userId', 'name email')
    console.log(courses);
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

router.post('/delete', async (request, response) => {
    try {
        await Course.deleteOne({ _id: request.body.id })
        response.redirect('/')
    } catch (e) {
        console.log(e);
    }
})

module.exports = router;
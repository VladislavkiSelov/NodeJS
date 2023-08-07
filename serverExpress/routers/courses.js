const { Router } = require('express');
const Course = require('../models/course')
const router = Router();

router.get('/', async (request, response) => {
    const courses = await Course.getAll()
    response.render('courses', {
        title: 'Страница курсов',
        isCourses: true,
        courses
    })
})

router.get('/:id', async (request, response) => {
    const course = await Course.getById(request.params.id)
    response.render('course', {
        course
    })
})

router.get('/:id/edit', async (request, response) => {
    const course = await Course.getById(request.params.id)
    response.render('edit', {
        course
    })
})

router.post('/:id/edit', async (request, response) => {
    await Course.editCourse(request.body)
    response.redirect('/')
})

module.exports = router;
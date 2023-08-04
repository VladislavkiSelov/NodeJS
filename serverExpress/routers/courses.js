const { Router } = require('express');
const Course = require('../models/course')
const router = Router();

router.get('/', async (request, response) => {
    const res = new Course;
    const courses = await res.getAll()
    response.render('courses', {
        title: 'Страница курсов',
        isCourses: true,
        courses
    })
})

router.get('/:id', async (request, response) => {
    const coursClass = new Course;
    const course = await coursClass.getById(request.params.id)
    console.log(course);
    response.render('course', {
        course
    })
})

module.exports = router;
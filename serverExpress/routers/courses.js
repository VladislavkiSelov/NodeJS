const { Router } = require('express');
const Course = require('../models/course')
const router = Router();

router.get('/', async (request, response) => {
    const res = new Course;
    const courses = await res.getAll()
    console.log(courses);
    response.render('courses', {
        title: 'Страница курсов',
        isCourses: true,
        courses
    })
})

module.exports = router;
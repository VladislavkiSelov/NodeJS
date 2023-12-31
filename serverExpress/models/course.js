// const fs = require('fs');
// const path = require('path');
// const uuid = require('uuid')


// class Course {
//     constructor(title, price, img) {
//         this.title = title;
//         this.price = price;
//         this.img = img;
//         this.id = uuid.v4()
//     }

//     jsonOBj() {
//         return {
//             title: this.title,
//             price: this.price,
//             img: this.img,
//             id: this.id
//         }
//     }

//     async save() {
//         let courses = await Course.getAll();
//         courses.push(this.jsonOBj())

//         return new Promise((resolve, reject) => {
//             fs.writeFile(
//                 path.join(__dirname, '..', 'data', 'data.json'),
//                 JSON.stringify(courses),
//                 (err) => {
//                     if (err) {
//                         reject(err)
//                     } else {
//                         resolve()
//                     }
//                 }
//             )
//         })
//     }

//     static getAll() {
//         return new Promise((resolve, reject) => {
//             fs.readFile(
//                 path.join(__dirname, '..', 'data', 'data.json'),
//                 'utf-8',
//                 (err, content) => {
//                     if (err) reject(err);
//                     resolve(JSON.parse(content))
//                 }
//             )
//         })
//     }

//     static async getById(id) {
//         const allCourse = await this.getAll();
//         return allCourse.find(item => item.id === id)
//     }

//     static async editCourse(body) {
//         const courses = await this.getAll();
//         const indx = courses.findIndex(i => i.id = body.id)
//         courses[indx] = body;
//         return new Promise((resolve, reject) => {
//             fs.writeFile(
//                 path.join(__dirname, '..', 'data', 'data.json'),
//                 JSON.stringify(courses),
//                 (err) => {
//                     if (err) {
//                         reject(err)
//                     } else {
//                         resolve()
//                     }
//                 }
//             )
//         })
//     }
// }

// module.exports = Course;



//MongoDB
const { Schema, model } = require('mongoose');

const course = new Schema({
    title: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    img: String,

    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

course.method('toClient', function () {
    const course = this.toObject()
    course.id = course._id
    delete course._id
    return course
})


module.exports = model('Course', course);
const fs = require('fs');
const path = require('path');

class Card {

    static add() {

    }

    static async add(course) {
        let courses = await Card.fetch();
        const indx = courses.courses.findIndex(i => course.id === i.id)
        courses.price += +course.price
        if (courses.courses[indx]) {
            ++courses.courses[indx].number;
        } else {
            course.number = 1;
            courses.courses.push(course)
        }
        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'card.json'),
                JSON.stringify(courses),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                }
            )
        })
    }

    static async delete(id) {
        let card = await Card.fetch();
        const indx = card.courses.findIndex(i => i.id === id)
        card.price -= card.courses[indx].price;
        if (card.courses[indx].number === 1) {
            card.courses = card.courses.filter(item => item.id !== id)
        } else {
            card.courses[indx].number--;
        }

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'card.json'),
                JSON.stringify(card),
                (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(card)
                    }
                }
            )
        })
    }


    static fetch() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'card.json'),
                'utf-8',
                (err, content) => {
                    if (err) reject(err);
                    resolve(JSON.parse(content))
                }
            )
        })
    }
}

module.exports = Card
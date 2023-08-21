const { Schema, model } = require('mongoose');

const User = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    cart: {
        items: [
            {
                count: {
                    type: Number,
                    require: true,
                    default: 1
                },
                courseId: {
                    type: Schema.Types.ObjectId,
                    require: true,
                    ref: "Course"
                }
            }
        ]
    }

})

User.methods.addToCard = function (course) {
    const items = [...this.cart.items]
    const indx = items.findIndex(i => i.courseId.toString() === course._id.toString())
    if (indx >= 0) {
        items[indx].count = items[indx].count + 1
    } else {
        items.push({
            courseId: course._id,
            count: 1
        })
    }
    this.cart = { items }
    return this.save()
}

module.exports = model('User', User)
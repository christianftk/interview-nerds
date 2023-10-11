const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author', // Reference to the Author model
    },
    publishedIn:{
        type: Date,
        required: true
    },
    rating:{
        type: Number,
        validate: {
            validator: function(value) {
                return value >= 1 && value <= 100 | null;
            },
        message: 'Value must be between 1 and 5.',
        },
    },
    available: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Book', bookSchema);
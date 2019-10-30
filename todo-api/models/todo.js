var mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Name cannot be blank.'
    },
    completed: {
        type: Boolean,
        default: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;

//name
//completed
//created_date
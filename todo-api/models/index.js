var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/todo-buddy');

mongoose.Promise = Promise;

module.exports.Todo = require('./todo');
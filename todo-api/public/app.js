$(document).ready(() => {
    $.getJSON('/api/todos')
        .then(addTodos);

    $('.list').on('click', 'span' ,function(event) {
        event.stopPropagation();
        removeTodo($(this).parent());
    })

    $('#todoInput').keypress((e) => {
        if(e.which == 13) {
            createTodo();
        }
    });

    $('.list').on('click', 'li', function(){
        updateTodo($(this));
    })
});

function createTodo(){
    var usrInput = $('#todoInput').val();
    $.post('api/todos', { 
        name: usrInput
    })
        .then(newTodo => {
            $('#todoInput').val('');
            addTodo(newTodo);
        })
        .catch(err => {
            console.log(err);
        })
}

function addTodos(todos) {
    //add todos to page here
    todos.forEach(function(todo){
        addTodo(todo);
    });
}

function addTodo(todo){
    var newTodo = $('<li class="task">' + todo.name + '<span>X</span></li>');
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed);
    if (todo.completed) {
        newTodo.addClass('done');
    }
    $('.list').prepend(newTodo);
}

function removeTodo(todo){
    var clickedId = todo.data('id');
    var deleteUrl = '/api/todos/' + clickedId; 
    $.ajax({
        type: 'DELETE',
        url: deleteUrl
    })
        .then(data => {
            todo.remove();
        });
}
function updateTodo(todo){
    var updateUrl = '/api/todos/' + todo.data('id');
    var isDone = !todo.data('completed');
    var updateData = {completed: isDone}
    $.ajax({
        method: 'PUT',
        url: updateUrl,
        data: updateData
    })
    .then(function(updatedTodo){
        todo.toggleClass("done");
        todo.data('completed', isDone);
    })
}
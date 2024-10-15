document.addEventListener('DOMContentLoaded', function() {
    loadTasks(); // Load tasks from local storage when the page is loaded
});
document.getElementById('taskInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission or default behavior
        addTask(); // Add task when Enter key is pressed
    }
});

function addTask() {
    const input = document.getElementById('taskInput');
    const taskText = input.value.trim();
    if (taskText === '') return; // Prevent adding empty tasks


    // Create a new task element
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = function() {
        removeTask(taskText);
        this.parentElement.remove();
    };

    li.appendChild(span);
    li.appendChild(deleteBtn);
    document.getElementById('taskList').appendChild(li);

    // Save task to local storage
    saveTask(taskText);

    input.value = ''; // Clear input field
}

function saveTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        // Create a new task element for each stored task
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.textContent = task;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = function() {
            removeTask(task);
            this.parentElement.remove();
        };

        li.appendChild(span);
        li.appendChild(deleteBtn);
        document.getElementById('taskList').appendChild(li);
    });
}

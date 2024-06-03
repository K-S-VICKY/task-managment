document.addEventListener('DOMContentLoaded', loadTasks);

const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

addTaskBtn.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const task = {
            id: new Date().getTime(),
            text: taskText,
            completed: false
        };
        addTaskToDOM(task);
        saveTask(task);
        taskInput.value = '';
    }
}

function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.setAttribute('data-id', task.id);
    li.innerHTML = `
        <span>${task.text}</span>
        <button class="complete-btn">Complete</button>
        <button class="delete-btn">Delete</button>
    `;

    li.querySelector('.complete-btn').addEventListener('click', () => {
        task.completed = !task.completed;
        li.classList.toggle('completed', task.completed);
        updateTask(task);
    });

    li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
        deleteTask(task.id);
    });

    taskList.appendChild(li);
}

function saveTask(task) {
    let tasks = getTasksFromLocalStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
    let tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function loadTasks() {
    let tasks = getTasksFromLocalStorage();
    tasks.forEach(addTaskToDOM);
}

function updateTask(updatedTask) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.map(task => task.id === updatedTask.id ? updatedTask : task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(id) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
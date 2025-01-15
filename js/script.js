//Use Local storage
function loadTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || { work: [], personal: [], leisure: [] };
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Adding a Task with the add-task-button
document.getElementById('add-task-btn').addEventListener('click', () => {
    const taskInput = document.getElementById('task-input');
    const categorySelect = document.getElementById('category-select');

    const taskText = taskInput.value.trim();
    const category = categorySelect.value;

    if (!taskText) return alert('Please enter a task!');

    const tasks = loadTasks();
    tasks[category].push({ text: taskText, completed: false });
    saveTasks(tasks);

    taskInput.value = '';
    renderTasks();
});

//Load tasks in the category
function renderTasks() {
    const tasks = loadTasks();

    ['work', 'personal', 'leisure'].forEach(category => {
        const taskList = document.querySelector(`#${category}-tasks ul`);
        taskList.innerHTML = '';

        tasks[category].forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.innerHTML = `
                <span>${task.completed ? `<s>${task.text}</s>` : task.text}</span>
                <div>
                    <button onclick="markComplete('${category}', ${index})">✔</button>
                    <button onclick="editTask('${category}', ${index})">✎</button>
                    <button onclick="deleteTask('${category}', ${index})">✖</button>
                </div>
            `;
            taskList.appendChild(taskItem);
        });
    });
}

// Marking task as complete
function markComplete(category, index) {
    const tasks = loadTasks();
    tasks[category][index].completed = !tasks[category][index].completed;
    saveTasks(tasks);
    renderTasks();
}

//Editing the task
function editTask(category, index) {
    const tasks = loadTasks();
    const currentTask = tasks[category][index];
    const newTaskText = prompt("Edit task:", currentTask.text);

    if (newTaskText === null || newTaskText.trim() === "") {
        return; //if no input, do nothing.
    }

    currentTask.text = newTaskText.trim();
    saveTasks(tasks);
    renderTasks();
}

// Deleting the task
function deleteTask(category, index) {
    const tasks = loadTasks();
    tasks[category].splice(index, 1);
    saveTasks(tasks);
    renderTasks();
}

// Initialize App
renderTasks();

document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToDOM(task.text, task.completed));
}

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    if (taskText === "") return;
    addTaskToDOM(taskText);
    saveTask(taskText);
    taskInput.value = "";
}

function addTaskToDOM(taskText, completed = false) {
    let li = document.createElement("li");
    if (completed) li.style.textDecoration = "line-through";

    let span = document.createElement("span");
    span.textContent = taskText;
    span.onclick = () => toggleComplete(span, taskText);

    let button = document.createElement("button");
    button.textContent = "Delete";
    button.onclick = () => deleteTask(li, taskText);

    li.appendChild(span);
    li.appendChild(button);
    document.getElementById("taskList").appendChild(li);
}

function saveTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTask(li, taskText) {
    li.remove();
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function toggleComplete(span, taskText) {
    span.style.textDecoration = span.style.textDecoration === "line-through" ? "none" : "line-through";
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        if (task.text === taskText) task.completed = !task.completed;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


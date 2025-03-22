// Define the Task class globally
class Task {
    constructor(name, description, dueDate) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.completed = false; // Default to not completed
    }

    toggleCompleted() {
        this.completed = !this.completed;
    }

    updateTask(name, description, dueDate) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
    }
}

// Global array to hold tasks
const tasks = [];

document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM fully loaded and parsed");

    // Attach addTask function to the button
    document.getElementById("add-task-btn").addEventListener("click", addTask);
});

function addTask() {
    const name = document.getElementById("task-name").value.trim();
    const description = document.getElementById("task-desc").value.trim();
    const dueDate = document.getElementById("task-date").value.trim();

    // Prevent empty tasks
    if (!name || !description || !dueDate) {
        alert("Please fill in all fields!");
        return; 
    }

    const newTask = new Task(name, description, dueDate);
    tasks.push(newTask);
    renderTasks(); // Update UI

    // Clear input fields
    document.getElementById("task-name").value = "";
    document.getElementById("task-desc").value = "";
    document.getElementById("task-date").value = "";
}

function renderTasks() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = ""; // Clear existing tasks

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <strong>${task.name}</strong><br>
            ${task.description}<br>
            <em>Due: ${task.dueDate}</em><br>
            <button onclick="deleteTask(${index})">Delete</button><br><br>
        `;
        taskList.appendChild(li);
    });
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}
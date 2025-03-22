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

//Shows Tasks
function renderTasks() {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = ""; // Clear existing tasks

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.style.display = "flex";
        li.style.alignItems = "center";
        li.style.justifyContent = "space-between";
        li.style.padding = "10px";
        li.style.border = "1px solid #ccc";
        li.style.borderRadius = "5px";
        li.style.marginBottom = "10px";

        li.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <input type="checkbox" onclick="toggleTask(${index})" ${task.completed ? "checked" : ""}>
                <span style="text-decoration: ${task.completed ? 'line-through' : 'none'}; font-weight: bold;">
                    ${task.name}
                </span>
            </div>
            <div>
                <p style="margin: 5px 0;">${task.description}</p>
                <em>Due: ${task.dueDate}</em>
            </div>
            <button onclick="deleteTask(${index})" style="background-color: red; color: white; border: none; padding: 5px 10px; cursor: pointer;">
                Delete
            </button>
        `;

        taskList.appendChild(li);
    });
}

//Toggle Completed
function toggleTask(index) {
    tasks[index].toggleCompleted();x
    renderTasks(); // Update the UI
}

//Delete Task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}
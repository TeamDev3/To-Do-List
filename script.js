const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Load tasks from local storage
document.addEventListener("DOMContentLoaded", loadTasks);

// Add task
addTaskBtn.addEventListener("click", () => {
    if (taskInput.value.trim() !== "") {
        addTask(taskInput.value);
        saveTask(taskInput.value);
        taskInput.value = "";
    }
});

// Add task on Enter key press
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTaskBtn.click();
    }
});

// Add task to UI
function addTask(taskText, completed = false) {
    const li = document.createElement("li");
    li.textContent = taskText;

    if (completed) li.classList.add("completed");

    // Toggle complete
    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        updateLocalStorage();
    });

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        li.remove();
        updateLocalStorage();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Save task to local storage
function saveTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTask(task.text, task.completed));
}

// Update local storage when tasks change
function updateLocalStorage() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

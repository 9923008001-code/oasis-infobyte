let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    document.getElementById("pendingTasks").innerHTML = "";
    document.getElementById("completedTasks").innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <div class="task-title">${task.title}</div>
            <div class="task-desc">${task.desc}</div>
            <div class="task-time">${task.status === "pending" ? "Added" : "Completed"}: ${task.time}</div>
            <div class="buttons">
                ${task.status === "pending" ? `<button class="complete" onclick="completeTask(${index})">Complete</button>` : ""}
                <button class="edit" onclick="editTask(${index})">Edit</button>
                <button class="delete" onclick="deleteTask(${index})">Delete</button>
            </div>
        `;

        if (task.status === "pending") {
            document.getElementById("pendingTasks").appendChild(li);
        } else {
            document.getElementById("completedTasks").appendChild(li);
        }
    });
}

function addTask() {
    const title = taskTitle.value.trim();
    const desc = taskDesc.value.trim();

    if (title === "") {
        alert("Task title is required!");
        return;
    }

    tasks.push({
        title,
        desc,
        status: "pending",
        time: new Date().toLocaleString()
    });

    saveTasks();
    renderTasks();

    taskTitle.value = "";
    taskDesc.value = "";
}

function completeTask(index) {
    tasks[index].status = "completed";
    tasks[index].time = new Date().toLocaleString();
    saveTasks();
    renderTasks();
}

function editTask(index) {
    const newTitle = prompt("Edit task title:", tasks[index].title);
    if (newTitle && newTitle.trim() !== "") {
        tasks[index].title = newTitle;
        saveTasks();
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

renderTasks();

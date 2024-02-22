function addTask() {
  const taskInput = document.getElementById("taskInput");
  const newTask = taskInput.value.trim();

  if (newTask !== "") {
    const timestamp = new Date().toLocaleTimeString();
    let section;

    if (newTask.toLowerCase().includes("family")) {
      section = "familyTasks";
    } else if (newTask.toLowerCase().includes("work")) {
      section = "workTasks";
    } else {
      section = "personalTasks";
    }

    const task = { text: newTask, time: timestamp, completed: false };

    tasks.push({ section, task });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
    renderTasks();
  }
}

function removeTask(section, index) {
  tasks = tasks.filter(
    (task) => !(task.section === section && task.index === index)
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function toggleTask(section, index) {
  tasks.forEach((task) => {
    if (task.section === section && task.index === index) {
      task.task.completed = !task.task.completed;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function renderTasks() {
  const familyTasksList = document.getElementById("familyTasks");
  const personalTasksList = document.getElementById("personalTasks");
  const workTasksList = document.getElementById("workTasks");

  familyTasksList.innerHTML = "";
  personalTasksList.innerHTML = "";
  workTasksList.innerHTML = "";

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");
    listItem.className = task.task.completed ? "completed" : "";
    listItem.innerHTML = `
        <span>${task.task.text} (${task.task.time})</span>
        <button onclick="toggleTask('${task.section}', ${index})">${
      task.task.completed ? "Undo" : "Complete"
    }</button>
        <button onclick="removeTask('${
          task.section
        }', ${index})">Remove</button>`;

    if (task.section === "familyTasks") {
      familyTasksList.appendChild(listItem);
    } else if (task.section === "personalTasks") {
      personalTasksList.appendChild(listItem);
    } else if (task.section === "workTasks") {
      workTasksList.appendChild(listItem);
    }
  });
}

function updateTasksPeriodically() {
  setInterval(() => {
    // Fetch tasks from localStorage and render them periodically
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    renderTasks();
  }, 10000); // Update every 10 seconds (adjust as needed)
}

// Retrieve tasks from localStorage or initialize an empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Initial render
renderTasks();

// Start updating tasks periodically
updateTasksPeriodically();

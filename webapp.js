const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskTime = document.getElementById("taskTime");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task" + (task.completed ? " completed" : "");

    const top = document.createElement("div");
    top.className = "top";

    const title = document.createElement("span");
    title.className = "title";
    title.textContent = task.text;

    const info = document.createElement("div");
    info.className = "info";
    info.textContent = `Due: ${task.date} at ${task.time}`;

    const actions = document.createElement("div");
    actions.className = "actions";

    const completeBtn = document.createElement("button");
    completeBtn.className = "complete";
    completeBtn.textContent = task.completed ? "Undo" : "Done";
    completeBtn.onclick = () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    };

    const editBtn = document.createElement("button");
    editBtn.className = "edit";
    editBtn.textContent = "Edit";
    editBtn.onclick = () => {
      const newText = prompt("Edit task title:", task.text);
      if (newText) {
        task.text = newText;
        saveTasks();
        renderTasks();
      }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    actions.appendChild(completeBtn);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    top.appendChild(title);
    li.appendChild(top);
    li.appendChild(info);
    li.appendChild(actions);
    taskList.appendChild(li);
  });
}

addTaskBtn.onclick = () => {
  const text = taskInput.value.trim();
  const date = taskDate.value;
  const time = taskTime.value;

  if (text && date && time) {
    tasks.push({ text, date, time, completed: false });
    taskInput.value = "";
    taskDate.value = "";
    taskTime.value = "";
    saveTasks();
    renderTasks();
  } else {
    alert("Please fill all fields.");
  }
};

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

renderTasks();

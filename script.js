let tasks = [];

const taskList = document.getElementById("list");
const addTaskInput = document.getElementById("add");
const tasksCounter = document.getElementById("task-counter");
const inputbox = document.querySelector(".inputbox input");
const add = document.querySelector("#addbutton");
const clearall = document.querySelector(".clear-all");
const totalCounter = document.getElementById("taskCounter");

inputbox.onkeyup = () => {
  let UserEnterValue = inputbox.value;
  if (UserEnterValue.trim() != 0) {
    add.style.display = "block";
  } else {
    add.style.display = "none";
  }
};

add.onclick = () => {
  const task = {
    text: inputbox.value,
    id: Date.now().toString(),
    done: false,
  };
  addTask(task);
  inputbox.value = "";
};

function addTask(task) {
  if (task) {
    tasks.push(task);
    renderList();

    return;
  }
}

function addTaskToDom(task) {
  const li = document.createElement("li");
  li.innerHTML = `
    
      <input type="checkbox" id="${task.id}" ${
    task.done ? "checked" : ""
  } class="custum-checkbox">

      <label for="${task.id}">${task.text}</label>
      <img src="bin.svg" class="delete" data-id="${task.id}"/>
    
  `;

  taskList.append(li);
  add.style.display = "none";
}
function renderList() {
  taskList.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    addTaskToDom(tasks[i]);
  }
  calculate();
}

function toggleTask(taskId) {
  const task = tasks.filter(function (task) {
    return task.id == taskId;
  });

  if (task.length > 0) {
    const currentTask = task[0];
    currentTask.done = !currentTask.done;
    renderList();

    return;
  }
}
function deleteTask(taskId) {
  const newTasks = tasks.filter(function (task) {
    return task.id != taskId;
  });

  tasks = newTasks;

  renderList();
}
function handleClicklistener(e) {
  const target = e.target;
  console.log(target);

  if (target.className == "delete") {
    const taskId = target.dataset.id;
    deleteTask(taskId);
    showNotification("clicked on delete ");

    return;
  } else if (target.className == "custum-checkbox") {
    const taskId = target.id;
    toggleTask(taskId);

    return;
  }
}
// Complete all task is used for completer all task
document.querySelector(".complete").onclick = () => {
  checked(true);
};
//Uncomplete all task is used for uncompleter all task
document.querySelector(".uncomplete").onclick = () => {
  checked(false);
};
clearall.onclick = () => {
  tasks = []; //empty the array
  renderList();
};
function checked(params) {
  var inputElems = document.querySelectorAll(".custum-checkbox"); // Select selected task in list
  for (var i = 0; i < tasks.length; i++) {
    if (params == true) {
      inputElems[i].checked = true;
    } else {
      inputElems[i].checked = false;
    }
  }
  calculate();
}
document.addEventListener("click", handleClicklistener);

function calculate() {
  const total = tasks.length;
  const completed = document.querySelectorAll(
    'input[type="checkbox"]:checked'
  ).length;

  totalCounter.innerHTML = total;
  CompletedtasksCounter.innerHTML = completed;
  PendingtasksCounter.innerHTML = total - completed;
}

let taskData = [];
const colorTag = ["red", "blue", "green", "yellow"];
let curColor = "red";

function uniqueId() {
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).substr(2);
  return dateString + randomness;
}

function clearData() {
  const itemList = document.querySelector(".tasks-container");
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
}

function addTask() {
  const inputElement = document.querySelector("#create-task");
  if (inputElement.value === "") {
    alert("Please enter text");
  } else {
    const id = uniqueId();
    const timestamp =  getCurrentDateTime();
    console.log(timestamp);
    taskData.push({
      id: id,
      content: inputElement.value,
      created_at: timestamp,
      colorTag: curColor,
    });
    clearData();
    showTasks();
    inputElement.value = "";
    document.getElementById("chooseColorBtn").className =
      "fa-solid fa-circle dropbtn red";
    curColor = "red";
  }
}

function editTask(taskId) {
  taskData.map((task) => {
    if (task.id === taskId) {
      const curTask = document.querySelector(`#${taskId}`);

      while (curTask.firstChild) {
        curTask.removeChild(curTask.firstChild);
      }
      var input = document.createElement("input");
      input.value = task.content;
      input.id = "edit-task";
      var checkIcon = document.createElement("i");
      checkIcon.className = "fa fa-check";
      checkIcon.addEventListener("click", function handleClick(event) {
        const taskId = event.target.parentElement.id;
        saveEdit(taskId);
      });
      curTask.classList.add("edit-border");
      curTask.appendChild(input);
      curTask.appendChild(checkIcon);
    }
  });
}

function saveEdit(taskId) {
  const task = taskData.find((item) => item.id === taskId);
  const val = document.querySelector("#edit-task").value;
  if (task) {
    task.content = val;
    clearData();
    showTasks();
  }
}

function deleteTask(taskId) {
  const filtered = taskData.filter((task) => task.id !== taskId);
  taskData = filtered;
  clearData();
  showTasks();
}

function showTasks() {
  const itemList = document.querySelector(".tasks-container");
  taskData.forEach(function (item) {
    var div1 = document.createElement("div");
    div1.className = "task";
    div1.id = item.id;

    var div2 = document.createElement("div");
    div2.className = "task-data";

    var content = document.createElement("p");
    content.textContent = item.content;

    var p = document.createElement("p");
    p.textContent = item.created_at;
    p.className = "time"

    var right = document.createElement("div");
    right.className = "right";

    var editButton = document.createElement("i");
    editButton.className = "fa-solid fa-pen";
    editButton.addEventListener("click", function handleClick(event) {
      const taskId = event.target.parentElement.parentElement.id;
      editTask(taskId);
    });
    var deleteButton = document.createElement("i");
    deleteButton.className = "fa-solid fa-trash";
    deleteButton.addEventListener("click", function handleClick(event) {
      const taskId = event.target.parentElement.parentElement.id;
      deleteTask(taskId);
    });
    itemList.appendChild(div1);
    createDropDwn(item.id, item.colorTag);
    div1.appendChild(div2);
    div2.appendChild(content);
    div2.appendChild(p);
    div1.appendChild(right);
    right.appendChild(editButton);
    right.appendChild(deleteButton);
  });
}

function editColor(color, taskId) {
  const task = taskData.find((item) => item.id === taskId);
  task.colorTag = color;
  clearData();
  showTasks();
}
function createDropDwn(taskId, color) {
  const task = document.querySelector(`#${taskId}`);
  var dropDownContainer = document.createElement("div");
  dropDownContainer.className = "dropdown";
  var myDropdown = document.createElement("div");
  myDropdown.id = uniqueId();
  myDropdown.className = "dropdown-content";
  var dropDownBtn = document.createElement("i");
  dropDownBtn.className = `fa-solid fa-circle dropbtn ${color}`;
  task.appendChild(dropDownContainer);
  dropDownContainer.appendChild(dropDownBtn);
  dropDownContainer.appendChild(myDropdown);
  dropDownBtn.addEventListener("click", function handleClick(event) {
    const dropDownId = event.target.parentElement.lastChild.id;
    showColors(dropDownId);
  });

  colorTag.map((color) => {
    let i = document.createElement("i");
    i.className = `fa-solid fa-circle ${color}`;
    i.id = uniqueId();
    i.value = color;
    i.addEventListener("click", function handleClick(event) {
      let taskId1 = event.target.parentElement.parentElement.parentElement.id;
      editColor(taskId1, color);
    });
    myDropdown.appendChild(i);
  });
}

function showColors(dropDownId) {
  document.getElementById(dropDownId).classList.toggle("show");
}

function chooseColor(color) {
  curColor = color;
  document.getElementById(
    "chooseColorBtn"
  ).className = `fa-solid fa-circle dropbtn ${color}`;
}

function editColor(taskId, color) {
  const task = taskData.find((item) => item.id === taskId);
  console.log("taskId", taskId);
  if (task) {
    task.colorTag = color;
    clearData();
    showTasks();
  }
}

var input = document.getElementById("create-task");
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    console.log(event.key);
    document.querySelector(".save").click();
  }
});

function getCurrentDateTime() {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0'); // Get day and pad with leading zero if needed
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Get month and add 1 (months are zero-based) and pad with leading zero if needed
    const year = now.getFullYear().toString().slice(-2); // Get last two digits of the year
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0'); // Get minutes and pad with leading zero if needed
    const formattedHours = (hours % 12 || 12).toString(); // Convert to 12-hour format and handle midnight (0) as 12

    return `${day}/${month}/${year} ${formattedHours}:${minutes}`;
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
showTasks();

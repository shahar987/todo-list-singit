let taskData = [];
const colorTag = ["red", "blue", "green", "yellow"];
let curColor = "red";

//create task
function addTask() {
    const inputElement = document.querySelector("#create-task");
    //check value not empty
    if (inputElement.value === "") {
      alert("Please enter text");
    } else {
      const id = uniqueId();
      const timestamp =  getCurrentDateTime();
      taskData.push({
        id: id,
        content: inputElement.value,
        created_at: timestamp,
        colorTag: curColor,
      });
      //reset to start mode
      clearData();
      showTasks();
      inputElement.value = "";
      document.getElementById("chooseColorBtn").className =
        "fa-solid fa-circle dropbtn red";
      curColor = "red";
    }
  }

//edit task
function editTask(taskId) {
    taskData.map((task) => {
      if (task.id === taskId) {
        const curTask = document.querySelector(`#${taskId}`);
        //clear elements from task div
        while (curTask.firstChild) {
          curTask.removeChild(curTask.firstChild);
        }
        //create new element for edit mode
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

//save edit
function saveEdit(taskId) {
    const task = taskData.find((item) => item.id === taskId);
    const val = document.querySelector("#edit-task").value;
    if (task) {
      task.content = val;
      clearData();
      showTasks();
    }
  }

//delete task
function deleteTask(taskId) {
    const filtered = taskData.filter((task) => task.id !== taskId);
    taskData = filtered;
    clearData();
    showTasks();
  }

//create elements to show tasks
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

// create drop down element for task
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

//clear all current tasks
function clearData() {
    const itemList = document.querySelector(".tasks-container");
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }
  }

//edit color tag of drop down for exiting task
function editColor(color, taskId) {
    const task = taskData.find((item) => item.id === taskId);
    task.colorTag = color;
    clearData();
    showTasks();
  }

//choose color for task before the task created
function chooseColor(color) {
    curColor = color;
    document.getElementById(
      "chooseColorBtn"
    ).className = `fa-solid fa-circle dropbtn ${color}`;
  }

//show color tags in dropdown content
function showColors(dropDownId) {
    document.getElementById(dropDownId).classList.toggle("show");
  }

// -------------global-----------------

//get unique id
function uniqueId() {
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).substr(2);
  return dateString + randomness;
}

//get the current date and hour
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

//add listener for input when user press enter task added
var input = document.getElementById("create-task");
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    document.querySelector(".save").click();
  }
});


//when user click on screen stop showing dropdown
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

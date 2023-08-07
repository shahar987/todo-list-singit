let taskData = [];

function uniqueId() {
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).substr(2);
  return dateString + randomness;
}

function saveEdit(taskId){
    const task = taskData.find((item) => item.id === taskId);
    const val = document.querySelector("#edit-task").value;
    if (task) {
        task.content = val;
        clearData();
        showTasks();
    }
}

function editTask(taskId) {
  taskData.map((task) => {
    if (task.id === taskId) {
      if (!task.isEditing) {

        const itemList = document.querySelector(`#${taskId}`);
        while (itemList.firstChild) {
          itemList.removeChild(itemList.firstChild);
        }
        var input = document.createElement("input");
        input.value = task.content
        input.id="edit-task"
        var checkIcon = document.createElement("i");
        checkIcon.className="fa fa-check"
        checkIcon.addEventListener("click", function handleClick(event) {
            const taskId = event.target.parentElement.id;
            saveEdit(taskId);
          });
        itemList.appendChild(input);
        itemList.appendChild(checkIcon);
      }
    }
  });
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

    var h5 = document.createElement("h5");
    h5.textContent = item.content;

    var p = document.createElement("p");
    p.textContent = item.created_at;

    var editButton = document.createElement("i");
    editButton.className = "fa fa-pencil";
    editButton.addEventListener("click", function handleClick(event) {
        const taskId = event.target.parentElement.id;
        editTask(taskId);
      });
    var deleteButton = document.createElement("i");
    deleteButton.className = "fa fa-trash";
    deleteButton.addEventListener("click", function handleClick(event) {
      const taskId = event.target.parentElement.id;
      deleteTask(taskId);
    });
    itemList.appendChild(div1);
    div1.appendChild(div2);
    div2.appendChild(h5);
    div2.appendChild(p);
    div1.appendChild(editButton);
    div1.appendChild(deleteButton);
  });
}

function clearData() {
  const itemList = document.querySelector(".tasks-container");
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
}

function addTask() {
  const val = document.querySelector("#create-task").value;
  const id = uniqueId();
  const timestamp = new Date().getTime();
  taskData.push({
    id: id,
    content: val,
    created_at: timestamp,
    isEditing: false,
  });
  clearData();
  showTasks();
}

showTasks();

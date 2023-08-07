var taskData = [];

function uniqueId() {
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).substr(2);
  return dateString + randomness;
}

function deleteTask(taskId) {
  const filtered = taskData.filter((task) => {
    task.id !== taskId;
  });
  taskData = filtered;
  console.log("filter: ", filtered);
  clearData();
  showTasks();
}

function showTasks() {
  const itemList = document.querySelector(".tasks-container");
  taskData.forEach(function (item) {
    var div1 = document.createElement("div");
    div1.className = "task";
    div1.id = uniqueId();

    var div2 = document.createElement("div");
    div2.className = "task-data";

    var h6 = document.createElement("h6");
    h6.textContent = item.content;

    var p = document.createElement("p");
    p.textContent = item.created_at;

    var editButton = document.createElement("button");
    editButton.id = "edit-button";
    editButton.textContent = "edit";

    var deleteButton = document.createElement("button");
    deleteButton.id = "delete-button";
    deleteButton.textContent = "delete";
    // Add event listener for delete-button here
    deleteButton.addEventListener("click", function handleClick(event) {
      deleteTask(event.target.parentElement.id);
    });
    itemList.appendChild(div1);
    div1.appendChild(div2);
    div2.appendChild(h6);
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
  const val = document.querySelector("input").value;
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

console.log("hello world");
import TaskList from "./taskListModel.js";
let dsTask = new TaskList();

function getEle(id) {
  return document.getElementById(id);
}
function Task(id, taskName, type) {
  this.id = id;
  this.taskName = taskName;
  this.type = type;
}

let saveTask = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

let getTask = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
document.querySelector("#btn-add").onclick = () => {
  let taskName = getEle("todoAdd").value;
  let idTodo = Math.random();
  let task = new Task(idTodo, taskName, "todo");
  dsTask.themTask(task);
  saveTask("todo", dsTask.taskList);
  renderTask("task", getTask("todo"));
  getEle("todoAdd").value = "";
};

function renderTask(idhtml, ds) {
  let result = "";
  if (ds) {
    ds.map((item) => {
      result += `  <li>
      <div>${item.taskName}</div>
      <div>
        <button id="btn-delete"  onclick="xoaTask(${item.id})">
            Xóa
        </i></button>
        <button  onclick="suaTask(${item.id})">
            Sửa
        </i></button>
      </div>
    </li>`;
    });
  }
  document.getElementById(idhtml).innerHTML = result;
}
window.xoaTask = (id) => {
  dsTask.xoaTask(id);
  saveTask("todo", dsTask.taskList);
  renderTask("task", getTask("todo"));
};

window.suaTask = (id) => {
  let task = dsTask.timTask(id);
  if (task) {
    getEle("idTodoAdd").value = task.id;
    getEle("todoAdd").value = task.taskName;
    getEle("btn-add").style.display = "none";
    getEle("btn-update").style.display = "inline";
    getEle("btn-delete").disabled = true;
    return task;
  }
};
document.querySelector("#btn-update").onclick = () => {
  let id = getEle("idTodoAdd").value;
  let name = getEle("todoAdd").value;
  let task = new Task(id, name, "todo");
  dsTask.xoaTask(id);
  dsTask.themTask(task);
  saveTask("todo", dsTask.taskList);
  renderTask("task", getTask("todo"));
};

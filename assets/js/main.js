const todo = document.getElementById("listTodo");
const doing = document.getElementById("listDoing");
const finished = document.getElementById("listFinished");

const addForm = document.getElementById("addForm");
const editForm = document.getElementById("editForm");

const categoryInput = document.getElementById("addCategory");
const titleInput = document.getElementById("addTitle");
const contentInput = document.getElementById("addContent");

const categoryEdit = document.getElementById("editCategory");
const titleEdit = document.getElementById("editTitle");
const contentEdit = document.getElementById("editContent");

const btnAddTask = document.getElementById("btnAddTask");
const btnCloseAddForm = document.getElementById("btnCloseAddForm");
const formAddTask = document.querySelector(".form_add_new_todo");
const btnCloseEditForm = document.getElementById("btnCloseEditForm");
const formEditTask = document.querySelector(".form_edit_todo");

const TodoList = JSON.parse(localStorage.getItem("dataListTodo"));

const quantityTodo = document.querySelector(
  "#todo .container__part-header-quantity"
);
const quantityDoing = document.querySelector(
  "#doing .container__part-header-quantity"
);
const quantityFinished = document.querySelector(
  "#finished .container__part-header-quantity"
);
const indexEdit = document.getElementById("indexEdit");

const todoRadio = document.getElementById("todoRadio");
const doingRadio = document.getElementById("doingRadio");
const finishedRadio = document.getElementById("finishedRadio");

var data;
if (TodoList == null) {
  data = [
    {
      type: "todo",
      category: "Thêm task",
      title: "Hãy thêm task mới có Todo List",
      content: "Thêm các task cần thực hiện",
      datetime: Date(Date.now().toString()).slice(0, 15),
    },
  ];
} else {
  data = TodoList;
}

function renderData(data) {
  data.forEach((item, index) => {
    if (item.type === "todo") {
      root = todo;
    } else if (item.type === "doing") {
      root = doing;
    } else if (item.type === "finished") {
      root = finished;
    }
    root.innerHTML =
      root.innerHTML +
      `<div class="content__item">
            <div class="content__item-header">
                <div class="content__item-heading">
                    <h2 class="content__item-category">${item.category}</h2>
                    <h1 class="content__item-title">${item.title}</h1>
                </div>
                <div class="content__item-button">
                    <i class="fa-solid fa-pen" data-id ="${index}"  onclick="EditAt(${index})"></i>
                    <i class="fa-solid fa-trash" onclick="RemoveAt(${index})"></i>
                </div>
            </div>
            <div class="content__item-body">
                <span class="content__item-content">${item.content}</span>
                <div class="content__item-datetime">
                    <i class="fa-solid fa-clock"></i>
                    <span class="content__item-time">${item.datetime}</span>
                </div>
            </div>
        </div>`;
  });
  countTask();
}

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  data.push({
    type: "todo",
    category: categoryInput.value,
    title: titleInput.value,
    content: contentInput.value,
    datetime: Date(Date.now().toString()).slice(0, 15),
  });
  const typeList = [todo, doing, finished];
  for (i = 0; i < typeList.length; i++) {
    typeList[i].innerHTML = "";
  }
  localStorage.setItem("dataListTodo", JSON.stringify(data));
  renderData(data);
});

function RemoveAt(index) {
  data.splice(index, 1);
  const typeList = [todo, doing, finished];
  for (i = 0; i < typeList.length; i++) {
    typeList[i].innerHTML = "";
  }
  localStorage.setItem("dataListTodo", JSON.stringify(data));
  renderData(data);
}

btnAddTask.addEventListener("click", () => {
  formAddTask.classList.remove("none");
});

btnCloseAddForm.addEventListener("click", () => {
  formAddTask.classList.add("none");
});

function EditAt(index) {
  formEditTask.classList.remove("none");
  categoryEdit.value = data[index].category;
  titleEdit.value = data[index].title;
  contentEdit.value = data[index].content;
  if (data[index].type == "todo") {
    todoRadio.setAttribute("checked", "checked");
  } else if (data[index].type == "doing") {
    doingRadio.setAttribute("checked", "checked");
  } else if (data[index].type == "finished") {
    finishedRadio.setAttribute("checked", "checked");
  }
  indexEdit.setAttribute("value", index);
}

editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const index = parseInt(e.target.indexEdit.value);
  data[index].category = categoryEdit.value;
  data[index].title = titleEdit.value;
  data[index].content = contentEdit.value;
  data[index].type = document.querySelectorAll(
    "input[name='selected_type']:checked"
  )[0].value;
  data[index].datetime = Date(Date.now().toString()).slice(0, 15);
  const typeList = [todo, doing, finished];
  for (i = 0; i < typeList.length; i++) {
    typeList[i].innerHTML = "";
  }
  localStorage.setItem("dataListTodo", JSON.stringify(data));
  renderData(data);
});

if (btnCloseEditForm) {
  btnCloseEditForm.addEventListener("click", () => {
    formEditTask.classList.add("none");
  });
}

function countTask() {
  let countTodo = 0,
    countDoing = 0,
    countFinished = 0;
  data.forEach((item) => {
    if (item.type === "todo") {
      countTodo += 1;
    } else if (item.type === "doing") {
      countDoing += 1;
    } else if (item.type === "finished") {
      countFinished += 1;
    }
  });
  quantityTodo.innerText = countTodo.toString();
  quantityDoing.innerText = countDoing.toString();
  quantityFinished.innerText = countFinished.toString();
}

renderData(data);

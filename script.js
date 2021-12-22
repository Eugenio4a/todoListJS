function onPageLoaded() {
  const input = document.querySelector("#new_list");
  const ul = document.querySelector("ul.todos");
  const addTodo = document.querySelector("button.addTodo");
  const saveButton = document.querySelector("button.save");
  const clearButton = document.querySelector("button.clear");
  const showTipsButton = document.querySelector("button.showTips");
  const closeTipsButton = document.querySelector("a.closeTips");
  const overlay = document.querySelector("#overlay");
  const pensil = document.querySelector("#pensil");
  const title = document.querySelector(".title_main");
  const newTitle = document.querySelector("#new_title");
  const header = document.querySelector(".title");

  saveButton.addEventListener("click", () => {
    localStorage.setItem("todos", ul.innerHTML);
  });
  clearButton.addEventListener("click", () => {
    ul.innerHTML = "";
    localStorage.removeItem("todos");
  });
  showTipsButton.addEventListener("click", () => {
    overlay.classList.toggle("hide");
  });
  closeTipsButton.addEventListener("click", () => {
    overlay.classList.add("hide");
  });

  function createTodo() {
    const li = document.createElement("li");
    const spanText = document.createElement("span");
    spanText.classList.add("todo-text");
    const newTodo = input.value;
    spanText.append(newTodo);
    const deleteBtn = document.createElement("span");
    deleteBtn.classList.add("todo-trash");
    const icon = document.createElement("i");
    icon.classList.add("fas", "fa-trash-alt");
    deleteBtn.append(icon);
    const p = document.createElement("p");
    p.append(spanText);
    li.append(deleteBtn);
    ul.appendChild(li).append(p);
    input.value = "";
    console.log(li);
    li.classList.add("todo_li");
    li.addEventListener("click", onClickTodo);
    listenerDeleteTodo(deleteBtn);
    localStorage.getItem("title", title.innerText);
    localStorage.setItem("todos", ul.innerHTML);
  }
  console.log(addTodo);
  addTodo.addEventListener("click", () => createTodo());

  function listenerDeleteTodo(element) {
    element.addEventListener("click", (event) => {
      element.parentElement.remove();
      event.stopPropagation();
    });
  }

  function onClickTodo(element) {
    console.log(element.target.tagName);
    if (element.target.tagName === "SPAN" || element.target.tagName === "LI") {
      element.target.classList.toggle("checked");
    }
  }
  input.addEventListener("keypress", (keyPressd) => {
    const keyEnter = 13;
    if (keyPressd.which === keyEnter) {
      createTodo();
    }
  });

  function loadTodos() {
    const data = localStorage.getItem("todos");

    if (data) {
      ul.innerHTML = data;
    }
    const deleteButtons = document.querySelectorAll("span.todo-trash");
    for (const buttons of deleteButtons) {
      listenerDeleteTodo(buttons);
    }
    const lineLi = document.querySelectorAll("li");

    lineLi.forEach((e) => {
      e.addEventListener("click", onClickTodo);
    });
  }

  function loadTitle() {
    const titleNew = localStorage.getItem("title");
    if (titleNew) {
      title.innerHTML = titleNew;
    }
  }
  loadTitle();
  loadTodos();

  function changeTitle() {
    pensil.addEventListener("click", () => {
      title.classList.toggle("hide");
      newTitle.classList.toggle("hide");
      newTitle.value = title.innerText;
    });

    newTitle.addEventListener("keypress", (e) => {
      let keyEnter2 = 13;
      if (e.which === keyEnter2) {
        title.innerText = newTitle.value;
        title.classList.toggle("hide");
        newTitle.classList.toggle("hide");
        localStorage.setItem("title", title.innerText);
      }
    });
  }
  changeTitle();
}
document.addEventListener("DOMContentLoaded", onPageLoaded);

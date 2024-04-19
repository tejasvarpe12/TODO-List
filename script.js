document.getElementById('date').innerText = new Date().toLocaleDateString("en-us", { weekday: "long", year: "numeric", month: "short", day: "numeric" });

const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const clearBtn = document.getElementById('clearBtn');

// Load todos from local storage
const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
for (const todo of savedTodos) {
  addTodoToDOM(todo);
}

todoForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const todoText = todoInput.value;
  if (todoText.trim() !== '') {
    const todo = { text: todoText, done: false };
    savedTodos.push(todo);
    localStorage.setItem('todos', JSON.stringify(savedTodos));
    addTodoToDOM(todo);
    todoInput.value = '';
    todoInput.focus();
  }
});

function addTodoToDOM(todo) {
  const listItem = document.createElement('li');
  listItem.innerHTML = `
    <input type="checkbox" ${todo.done ? 'checked' : ''}>
    <label>${todo.text}</label>
    <hr>
  `;
  if (todo.done) {
    listItem.classList.add('completed');
  }

  const checkbox = listItem.querySelector('input[type="checkbox"]');
  checkbox.addEventListener('change', function () {
    todo.done = checkbox.checked;
    if (todo.done) {
      listItem.classList.add('completed');
    } else {
      listItem.classList.remove('completed');
    }
    localStorage.setItem('todos', JSON.stringify(savedTodos));
  });

  todoList.appendChild(listItem);
}


clearBtn.addEventListener('click', function () {
  savedTodos.length = 0;
  localStorage.setItem('todos', JSON.stringify(savedTodos));
  todoList.innerHTML = '';
});

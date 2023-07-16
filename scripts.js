// <div className="todo">
//   <p>{ text }</p>
//   <button className="todo-button">Cross</button>
//   <button className="todo-button">Delete</button>
// </div>

let initialized = false;
let id = 0;
let todos = JSON.parse(localStorage.getItem('todos')) || [];

for (let todo of todos) {
  id = Math.max(id, todo.id);
  const todoItem = createTodoItem(todo.text, todo.id);
  insertTodo(todoItem);
  if (todo.crossed) {
    todoItem.querySelector("p").classList.add('crossed');
    todoItem.querySelector("button").textContent = 'Uncross';
  }
}
id++;
initialized = true;

function createTodoItem(text, todoID) {
  const div = document.createElement('div');
  div.classList.add('todo');

  const p = document.createElement('p');
  p.textContent = text;

  const crossButton = document.createElement('button');
  crossButton.classList.add('todo-button');
  crossButton.textContent = 'Cross';
  crossButton.addEventListener('click', () => {
    p.classList.toggle('crossed');
    crossButton.textContent = p.classList.contains('crossed') ? 'Uncross' : 'Cross';
    for (let todo of todos) {
      if (todo.id === todoID) {
        todo.crossed = !todo.crossed;
        localStorage.setItem('todos', JSON.stringify(todos));
        return;
      }
    }
  });

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('todo-button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    div.remove();
    todos = todos.filter((todo) => todo.id !== todoID);
    localStorage.setItem('todos', JSON.stringify(todos));
  });

  div.appendChild(p);
  div.appendChild(crossButton);
  div.appendChild(deleteButton);

  if (initialized) {
    todos.push(
        {
          id: todoID,
          text: text,
          crossed: false,
        }
    );
    localStorage.setItem('todos', JSON.stringify(todos));
  }
  return div;
}

function insertTodo(todo) {
  document.querySelector('#todos').appendChild(todo);
}

const todoText = document.querySelector('#todo-text');
const addTodoButton = document.querySelector('#add-todo')

addTodoButton.addEventListener('click', (e) => {
  e.preventDefault();
  let text = todoText.value;
  todoText.value = '';
  if (text !== '') {
    const todoItem = createTodoItem(text, id++);
    insertTodo(todoItem);
  }
});

todoText.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    addTodoButton.click();
  }
});

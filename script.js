const todoInput = document.getElementById('todo-input');
const addTodoButton = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');

//Try to load saved todos from local storage (if any) 
const saved = localStorage.getItem('todos');
const savedTodos = saved ? JSON.parse(saved) : [];



function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(savedTodos));


}

//create a dom node for a todo object and append it to the list
function createTodoNode(todo , index) {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;

    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;

        //visual feedback:strike through when completed
        saveTodos()
    })

    //text of the todo item
    const textSpan = document.createElement('span');
    textSpan.textContent = todo.text;
    textSpan.style.margin = "0 8px";
    if (todo.completed) {
        textSpan.style.textDecoration = 'line-through';
    }
        //add double click listener
        textSpan.addEventListener("dblclick" ,()=>{
            const newText = prompt("Edit todos ", todo.text);
                if(newText !== null) {
                    todo.text = newText.trim();
                    textSpan.textContent = todo.text;
                    saveTodos();
                }
        })

    



//delete a todo from the list
 const delbtn = document.createElement("button"); 
 delbtn.textContent = "Delete";
 delbtn.addEventListener("click", () => {
    savedTodos.splice(index, 1);
    render();   
    saveTodos();
 })

 li.appendChild(checkbox);
 li.appendChild(textSpan);
 li.appendChild(delbtn);
return li;

        }
    

//render the whole todo list from todos array
function render(){
    todoList.innerHTML = '';
    savedTodos.forEach((todo, index) => {
        const todoNode = createTodoNode(todo, index);
        todoList.appendChild(todoNode);
    });
}

function addTodo() {
    const text = todoInput.value.trim();
    if (!text) {
        alert("Please enter a todo item.");
        return;
    }
   savedTodos.push({ text, completed: false });
todoInput.value = '';
render();
saveTodos();
}

addTodoButton.addEventListener("click", addTodo);
render();
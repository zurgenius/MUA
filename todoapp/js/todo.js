const input = document.getElementById('input')
const form = document.getElementById('form')
const ul = document.getElementById('todo-list')
function updateLS() {
    const todosEL = document.querySelectorAll('#todo-elem')

    const todos = []
    todosEL.forEach(todo => {
        todos.push({
            text: todo.innerText,
            completed: todo.classList.contains('completed') 
        })
    })
    localStorage.setItem("todos", JSON.stringify(todos))
}

const todos = JSON.parse(localStorage.getItem('todos'))



if (todos) {
    todos.forEach(todo => {
        addTodo(todo)
    })
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    addTodo()
})

function addTodo(todo) {
    let todoText = input.value

    if(todo) {
        todoText = todo.text
    }

    if (todoText) {
        const li = document.createElement("li")
        li.setAttribute('id', 'todo-elem')
        if (todo && todo.completed) {
            li.classList.add('completed')

        }
        li.innerText = todoText

        li.addEventListener('click', () => {
            li.classList.toggle('completed')
            updateLS()
        })

        li.addEventListener("contextmenu", (e) => {
            e.preventDefault()
            li.remove()
        })

        const button = document.createElement("button")
        const i = document.createElement("i")
        
        button.classList.add("btn")
        i.classList.add("ri-delete-bin-line")
        button.appendChild(i)
        li.appendChild(button)
        button.addEventListener('click', () => {
            li.remove()
        })

        ul.appendChild(li)
        input.value = ''

        updateLS()
    }
}


const input = document.getElementById('input')
const form = document.getElementById('form')
const ul = document.getElementById('todo-list')
let index =  0

// Drag and drop functionality

const listItems = []

let dragStartIndex

function dragStart(event) {
    dragStartIndex = +this.closest('li').getAttribute('data-index')
}

function dragOver(e) {
    
    e.preventDefault()
}
function dragDrop() {
    
    const dragEndIndex = +this.getAttribute('data-index')
    swapItems(dragStartIndex, dragEndIndex)
    this.classList.remove('over')
}
function dragEnter(event) {
    
    this.classList.add('over')
}
function dragLeave() {
    
    this.classList.remove('over')
}

function swapItems (fromIndex, toIndex) {
     const itemOne = listItems[fromIndex].innerHTML
     const itemTwo = listItems[toIndex].innerHTML
    
    console.log(itemOne, itemTwo)
    listItems[toIndex].innerHTML = itemOne
    listItems[fromIndex].innerHTML = itemTwo 
    const btn1 = listItems[fromIndex].querySelector(".btn")
    const btn2 = listItems[toIndex].querySelector(".btn")
    btn1.addEventListener('click', () => {
        btn1.parentElement.remove()
    })
    btn2.addEventListener('click', () => {
        btn2.parentElement.remove()
    })
    if (listItems[toIndex].classList.contains("completed") && !listItems[fromIndex].classList.contains("completed")) {
        listItems[toIndex].classList.remove("completed")
        listItems[fromIndex].classList.add("completed")
    }
   

    updateLS()
}

function addEventListeners() {
    const draggables = document.querySelectorAll('#todo-elem')
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart)
        draggable.addEventListener('dragover', dragOver)
        draggable.addEventListener('drop', dragDrop)
        draggable.addEventListener('dragenter', dragEnter)
        draggable.addEventListener('dragleave', dragLeave)
    })
}



// Main todo app
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
        li.setAttribute('draggable', 'true')
        li.setAttribute('data-index', index)
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
            button.parentElement.remove()
        })

        ul.appendChild(li)
        listItems.push(li)
        input.value = ''

        updateLS()
        addEventListeners()
        index++
    }
}


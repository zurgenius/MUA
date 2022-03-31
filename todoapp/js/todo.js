const input = document.getElementById('input')
const form = document.getElementById('form')
const ul = document.getElementById('todo-list')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const todoText = input.value

    if (todoText) {
        const li = document.createElement("li")
        li.setAttribute('id', 'todo-elem')
        li.innerText = todoText

        li.addEventListener('click', () => {
            li.classList.toggle('completed')
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

})

const updateLS = () => {
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
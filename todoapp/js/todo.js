const input = document.getElementById('input')
const form = document.getElementById('form')
const ul = document.getElementById('todo-list')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const todoText = input.value

    if (todoText) {
        const li = document.createElement("li")
        li.innerText = todoText
        ul.appendChild(li)
        input.value = ''
    }

})
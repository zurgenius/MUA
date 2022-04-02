const dropBtn = document.getElementById("dropdown-btn")
const boldBtn = document.getElementById('bold-btn')
const underBtn = document.getElementById('underlined-btn')
const iBtn = document.getElementById('italic-btn')
const colorBtn = document.querySelector('#color-btn')

const newBtn = document.getElementById('new-btn')
const txtBtn = document.getElementById('txt-btn')
const pdfBtn = document.getElementById('pdf-btn')

const content = document.getElementById('content')
const fileName = document.getElementById('file-name')
dropBtn.addEventListener('click', () => {
    document.getElementById("dropdown-menu").classList.toggle('show')
})

boldBtn.addEventListener('click', ()=> {
    document.execCommand('bold')
})

underBtn.addEventListener('click', ()=> {
    document.execCommand('underline')
})
iBtn.addEventListener('click', ()=> {
    document.execCommand('italic')
})
colorBtn.addEventListener("input", ()=> {
    document.execCommand("forecolor", false, colorBtn.value)
})

newBtn.addEventListener('click', () => {
    content.innerText = ''
    fileName.value = 'untitled'
})

txtBtn.addEventListener('click', () => {
    const a = document.createElement("a")
    const blob = new Blob([content.innerText])
    const url = URL.createObjectURL(blob)
    a.href = url
    a.download = `${fileName.value}.txt`
    a.click()
})

function stylechange() {
    content.style.backgroundColor = "rgba(103, 118, 121, 0.377)"
}

pdfBtn.addEventListener('click' , () => {
    content.style.backgroundColor = "white"
    html2pdf().from(content).save(fileName.value)
    setTimeout(stylechange, 0)
})

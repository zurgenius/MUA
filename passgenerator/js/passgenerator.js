const lengthInput = document.getElementById('pass-length')
const generateButton = document.getElementById('generate')
const copyBtn = document.getElementById('copy')
const passField = document.getElementById('gen-password')
const weakField = document.getElementById('weakness')
charsUsedInPassword = {
    capital : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    small: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '1234567890',
    specialChars: '!"#$%&@~^?'
}

keysConection = {
    'abcdefg e.t.c' : 'small',
    'ABCDEFG e.t.c' : 'capital',
    '1234567890' : 'numbers',
    '!"#$%&@~^?' : 'specialChars'
}
const AllChecked = () => {
    let keyArr = []
    const marked  = document.querySelectorAll('input[type="checkbox"]:checked')
    for (let value of marked) {
        keyArr.push(keysConection[value.parentElement.textContent.trim()])
    }
    return keyArr
}

const weaknessCheck = () => {
        if ((AllChecked().length== 2 && lengthInput.value > 12) || (AllChecked().length>= 3 && lengthInput.value < 10) ) {
            weakField.style.color = '#FFFF00'
            weakField.textContent = 'Medium'
        }
        else if (AllChecked().length>= 3 && (lengthInput.value > 10 && lengthInput.value < 16 )) {
            weakField.style.color = '#90EE90'
            weakField.textContent = 'Strong'
        }
        else if (AllChecked().length>= 3 && lengthInput.value >= 16) {
            weakField.style.color = '#00FF00'
            weakField.textContent = 'Impossible to hack!'
        } else {
            weakField.style.color = '#FF0000'
            weakField.textContent = 'Weak'
        }
}

const genPass = ( length, keys) => {
    let password = ''
    for (let i = 0; i<length; i++){
        let randomKey = charsUsedInPassword[keys[Math.floor(Math.random() * keys.length)]]
        let randomSym = randomKey[Math.floor(Math.random() * randomKey.length)]
        password = password.concat(randomSym)
    }
    return password
}

generateButton.addEventListener('click', () => {
    passField.textContent = genPass(lengthInput.value, AllChecked())
    weaknessCheck()
})

const copyToClipBoard = () => {
    text = passField.textContent
    navigator.clipboard.writeText(text)
}

copyBtn.addEventListener('click', ()=> {copyToClipBoard()})


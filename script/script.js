let passwordLengthValue = 16;
const inputEl = document.querySelector("#password")
const uppercaseCheck = document.querySelector("#uppercase-check")
const numberCheck = document.querySelector("#number-check")
const symbolCheck = document.querySelector("#symbol-check")
const passwordLengthText = document.querySelector("#password-length-text")
const segurityIndicatorBar = document.querySelector("#segurity-indicator-bar")
const trocar = document.querySelector("#renew")

function generatePassword(){
    let chars = "abcdefghjklmnpqrstuvwxyz"

    const uppercaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ"
    const numersChars = "123456789"
    const symbolChars = "?!@&*()[]"

    if(uppercaseCheck.checked){
        chars += uppercaseChars
    }
    if(numberCheck.checked){
        chars += numersChars
    }
    if(symbolCheck.checked){
        chars += symbolChars
    }

    let password = ""

    for(i = 0; i < passwordLengthValue; i++){
        const randomNumber = Math.floor(Math.random() * chars.length)
        password += chars.substring(randomNumber, randomNumber + 1)
    }

    inputEl.value = password

    percentualQualidade()
    calculateFont()
}

function percentualQualidade(){
    var percentual = Math.round((Number(passwordLengthText.innerText) / 64) * 25 + (uppercaseCheck.checked ? 15 : 0) + (numberCheck.checked ? 25 : 0) + (symbolCheck.checked ? 35 : 0))

    segurityIndicatorBar.style.width = `${percentual}%`

    if(percentual > 60){
        segurityIndicatorBar.classList.remove("warning")
        segurityIndicatorBar.classList.remove("critical")
        segurityIndicatorBar.classList.add("safe")
    }
    else if(percentual > 30){
        segurityIndicatorBar.classList.remove("safe")
        segurityIndicatorBar.classList.remove("critical")
        segurityIndicatorBar.classList.add("warning")
    }
    else{
        segurityIndicatorBar.classList.remove("warning")
        segurityIndicatorBar.classList.remove("safe")
        segurityIndicatorBar.classList.add("critical")
    }

    
    if(percentual >= 100){
        segurityIndicatorBar.classList.add("completed")
    }else{
        segurityIndicatorBar.classList.remove("completed")
    }
}

function calculateFont() {
    const passwordLength = Number(passwordLengthEl.value);

     if (passwordLength > 45) {
        inputEl.classList.remove("font-xs", "font-sm");
        inputEl.classList.add("font-xxs");
    } 
    else if (passwordLength > 32) {
        inputEl.classList.remove("font-xxs", "font-sm");
        inputEl.classList.add("font-xs");
    } 
    else if (passwordLength > 22) {
        inputEl.classList.remove("font-xs", "font-xxs");
        inputEl.classList.add("font-sm");
    } 
    else{
        inputEl.classList.remove("font-xs", "font-xxs", "font-sm");
    }
}
function copy(){
    navigator.clipboard.writeText(inputEl.value)
}
const passwordLengthEl = document.querySelector("#password-length")
passwordLengthEl.addEventListener("input", () => {
    passwordLengthValue = passwordLengthEl.value

    passwordLengthText.innerText = passwordLengthEl.value
    generatePassword()
})

uppercaseCheck.addEventListener('click', generatePassword)
numberCheck.addEventListener('click', generatePassword)
symbolCheck.addEventListener('click', generatePassword)

const copyButton = document.querySelector("#copy-1")
const copyButton2 = document.querySelector("#copy-2")

trocar.addEventListener('click', generatePassword)


copyButton.addEventListener("click", copy)
copyButton2.addEventListener("click", copy)
generatePassword()


let passwordLengthValue = 16;
const inputEl = document.querySelector("#password");
const uppercaseCheck = document.querySelector("#uppercase-check");
const numberCheck = document.querySelector("#number-check");
const symbolCheck = document.querySelector("#symbol-check");
const passwordLengthText = document.querySelector("#password-length-text");
const segurityIndicatorBar = document.querySelector("#segurity-indicator-bar");
const trocar = document.querySelector("#renew");

function generatePassword() {
    let chars = "abcdefghjklmnpqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    const numbersChars = "123456789";
    const symbolChars = "?!@&*()[]";

    let mandatoryChars = "";
    if (uppercaseCheck.checked) {
        chars += uppercaseChars;
        mandatoryChars += uppercaseChars.charAt(Math.floor(Math.random() * uppercaseChars.length));
    }
    if (numberCheck.checked) {
        chars += numbersChars;
        mandatoryChars += numbersChars.charAt(Math.floor(Math.random() * numbersChars.length));
    }
    if (symbolCheck.checked) {
        chars += symbolChars;
        mandatoryChars += symbolChars.charAt(Math.floor(Math.random() * symbolChars.length));
    }

    let password = mandatoryChars;
    for (let i = mandatoryChars.length; i < passwordLengthValue; i++) {
        const randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.charAt(randomNumber);
    }

    // Embaralhar a senha para não deixar os caracteres obrigatórios previsíveis
    password = password.split('').sort(() => Math.random() - 0.5).join('');
    
    inputEl.value = password;
    percentualQualidade();
    calculateFont();
}

function percentualQualidade() {
    let percentual = Math.round((Number(passwordLengthText.innerText) / 64) * 25 +
        (uppercaseCheck.checked ? 15 : 0) +
        (numberCheck.checked ? 25 : 0) +
        (symbolCheck.checked ? 35 : 0));

    segurityIndicatorBar.style.width = `${percentual}%`;

    segurityIndicatorBar.classList.remove("warning", "critical", "safe", "completed");
    if (percentual > 60) {
        segurityIndicatorBar.classList.add("safe");
    } else if (percentual > 30) {
        segurityIndicatorBar.classList.add("warning");
    } else {
        segurityIndicatorBar.classList.add("critical");
    }

    if (percentual >= 100) {
        segurityIndicatorBar.classList.add("completed");
    }
}

function calculateFont() {
    const passwordLength = Number(passwordLengthEl.value);
    inputEl.classList.remove("font-xs", "font-sm", "font-xxs");
    if (passwordLength > 45) {
        inputEl.classList.add("font-xxs");
    } else if (passwordLength > 32) {
        inputEl.classList.add("font-xs");
    } else if (passwordLength > 22) {
        inputEl.classList.add("font-sm");
    }
}

function copy() {
    navigator.clipboard.writeText(inputEl.value);
}

const passwordLengthEl = document.querySelector("#password-length");
passwordLengthEl.addEventListener("input", () => {
    passwordLengthValue = passwordLengthEl.value;
    passwordLengthText.innerText = passwordLengthEl.value;
    generatePassword();
});

uppercaseCheck.addEventListener("click", generatePassword);
numberCheck.addEventListener("click", generatePassword);
symbolCheck.addEventListener("click", generatePassword);
trocar.addEventListener("click", generatePassword);

document.querySelector("#copy-1").addEventListener("click", copy);
document.querySelector("#copy-2").addEventListener("click", copy);

generatePassword();

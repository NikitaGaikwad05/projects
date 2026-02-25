const passwordInput = document.getElementById("password");
const strengthBar = document.querySelector(".strength-bar");
const strengthLabel = document.getElementById("strength-label");
const toggle = document.getElementById("toggle");

const lengthTip = document.getElementById("length-tip");
const uppercaseTip = document.getElementById("uppercase-tip");
const lowercaseTip = document.getElementById("lowercase-tip");
const numberTip = document.getElementById("number-tip");
const symbolTip = document.getElementById("symbol-tip");

passwordInput.addEventListener("input", checkStrength);

function checkStrength() {

  const password = passwordInput.value;
  let score = 0;

  const hasLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  updateTip(lengthTip, hasLength);
  updateTip(uppercaseTip, hasUpper);
  updateTip(lowercaseTip, hasLower);
  updateTip(numberTip, hasNumber);
  updateTip(symbolTip, hasSymbol);

  if (hasLength) score += 20;
  if (hasUpper) score += 20;
  if (hasLower) score += 20;
  if (hasNumber) score += 20;
  if (hasSymbol) score += 20;

  strengthBar.style.width = score + "%";

  if (score < 40) {
    strengthBar.style.background = "red";
    strengthLabel.textContent = "Weak";
    passwordInput.classList.add("shake");
    setTimeout(() => passwordInput.classList.remove("shake"), 300);
  } 
  else if (score < 80) {
    strengthBar.style.background = "orange";
    strengthLabel.textContent = "Medium";
  } 
  else {
    strengthBar.style.background = "green";
    strengthLabel.textContent = "Strong";
  }
}

function updateTip(element, condition) {
  if (condition) {
    element.classList.add("valid");
    element.classList.remove("invalid");
    element.innerHTML = "✔ " + element.textContent.substring(2);
  } else {
    element.classList.add("invalid");
    element.classList.remove("valid");
    element.innerHTML = "❌ " + element.textContent.substring(2);
  }
}

/* Show / Hide Password */
toggle.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    toggle.textContent = "🙈";
  } else {
    passwordInput.type = "password";
    toggle.textContent = "👁";
  }
});
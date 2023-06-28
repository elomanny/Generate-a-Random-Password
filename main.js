const all_checkbox = document.querySelectorAll("input[type='checkbox']");


const generate_btn = document.getElementById("generate-btn")

const password_length = document.getElementById("number")


const gen_password = document.getElementById("password-field")

const reset_btn = document.getElementById("reset-btn")

const info = document.getElementById("info")
const copy = document.getElementById("copy")

const number_box = document.getElementById("numbers")
const lowercase_box = document.getElementById("lowercase")
const uppercase_box = document.getElementById("uppercase")
const symbols_box = document.getElementById("symbols")




generate_btn.onclick = generatePassword;
reset_btn.onclick = resetAll;



//copy password
copy.addEventListener("click",()=>{
  navigator.clipboard.writeText(gen_password.value)
  .then(()=>{
    info.textContent = "Copied Successfully"
    info.style.color = "white"
  })
  .catch(()=>{
    info.textContent = "Cant copy Password"
    info.style.color = "orange"
  })
})



//reset all to default
function resetAll() {
  gen_password.value = "";
  password_length.value = "";

  //also reset the checkboxes

  number_box.checked = true;
  lowercase_box.checked = true;
  uppercase_box.checked = false;
  symbols_box.checked = false;
  info.textContent = "";

}




//generate password based on users checked boxes
function generatePassword() {
  const all_char = {
    "numbers": 1234567890,
    "lowercase": "abcdefghijklmnopqrstuvwxyz",
    "uppercase": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "symbols": "#$&@_+()/?!"
  }

  let checked_box = getUsersCheckedBox();
  let password = "";
  

  if (checked_box.includes("numbers")) {
    password += all_char.numbers
  }

  if (checked_box.includes("lowercase")) {
    password += all_char.lowercase
  }

  if (checked_box.includes("uppercase")) {
    password += all_char.uppercase
  }

  if (checked_box.includes("symbols")) {
    password += all_char.symbols
  }
  
  
  

  if (checked_box != "") {
    if (password_length.value > 0) {
      gen_password.value = shuffle(password)
      info.textContent = ""
    }
    else {
      info.textContent = "Enter a Password length"
      info.style.color = "orange"
    }
  }
  else {
    info.textContent = "select a checkbox"
    info.style.color = "orange"
  }
}



//shuffle generated password
function shuffle(password) {
  let shuffled_password = "";

  for (let i = 0; i < password_length.value; i++) {
    let alpha = Math.floor(Math.random() * password.length)
    shuffled_password += password[alpha]
  }

  return shuffled_password

}



//get users checked boxes
function getUsersCheckedBox() {
  //hold all users checked boxes
  const checked = []

  for (const checkbox of all_checkbox) {
    if (checkbox.checked) {
      checked.push(checkbox.id)
    }
  }

  return checked;
}

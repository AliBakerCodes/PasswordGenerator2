// Assignment Code
var generateBtn = document.querySelector("#generate");
var passwordInpt = {
  len: 0,
  lower: false,
  upper: false,
  numeric: false,
  special: false,
  validLength: false,
  validType: false,
};
var allowLower = "";
var allowUpper = "";
var allowNumeric = "";
var allowSpecial = "";
var plen = 0;

var validChars = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","1","2","3","4","5","6","7","8","9","0","!",'"',"#","$","%","&","'","(",")","*","+",",","-",".","\/",":",";","<","=",">","?","@","\[","\]","\\","^","_","`","{","|","}","~"," ",];
 

// Write password to the #password input
function writePassword() {
  getUserInput();

  //Validate input
  validateInput(passwordInpt);

  if (passwordInpt.validLength && passwordInpt.validType) {
    //Generate Password
    var password = generatePassword(
      passwordInpt.len,
      passwordInpt.lower,
      passwordInpt.upper,
      passwordInpt.numeric,
      passwordInpt.special
    );

    //Output Password
    var passwordText = document.querySelector("#password");

    passwordText.value = password;
  }
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

//Validates password inputs. Throw an error if password number out of 8-128 range or at least 1 character type not picked"
function validateInput(password) {
  if (password.len >= 8 && password.len <= 128) {
    password.validLength = true;
  } else {
    password.validLength = false;
  }
  if (
    password.lower != false ||
    password.upper != false ||
    password.numeric != false ||
    password.special != false
  ) {
    password.validType = true;
  } else {
    password.validType = false;
  }

  if (!passwordInpt.validLength) {
    alert("You must select a length between 8-128");
  }
  if (!passwordInpt.validType) {
    alert("You must select at least one valid type");
  }
}
// Randomly select a number between 0 and the number of allowed characters
function randNum() {
  var index = Math.floor(Math.random() * validChars.length);
  return index;
}
//Tests for special characters
function containsSpecialChars(str) {
  var regex = /[ !\"#$%&\'()*+,-./:;<=>?@\[\\\]^_`{|}~]/;
  return regex.test(str);
}
//Tests for numbers
function containsNumbers(str) {
  const regex = /^[0-9]+$/;
  return regex.test(str);
}
//Tests for Upper Case
function containsUpper(str) {
  const regex = /[A-Z]/;
  return regex.test(str);
}
//Tests for Lower Case
function containsLower(str) {
  const regex = /[a-z]/;
  return regex.test(str);
}
//Generate the password
function generatePassword(length, lower, upper, numeric, special) {

  var generated = "";
  var tempchar = "";
// Generate random number. Pick from array of allowed characters. 
// Test character to determine type and if user selected type.
// If both match write to output string 
  do {
    tempchar = validChars[randNum()];
     if (lower && containsLower(tempchar)) {
      generated = generated + tempchar;
    } else if (upper && containsUpper(tempchar)) {
      generated = generated + tempchar;
    } else if (numeric && containsNumbers(tempchar)) {
      generated = generated + tempchar;
    } else if (special && containsSpecialChars(tempchar)) {
      generated = generated + tempchar;
    }
  } while (generated.length < length);
  return generated;
}
//Get user inputs for password length and character type using prompts
//Sanitize inputs to uppercase
function getUserInput() {
  //Input prompts
  passwordInpt.len = prompt("Choose Password Length (8-128)");
  allowLower = prompt("Lower Case Allowed? (Y/N)");
  //update the correct boolean on Y
  if (allowLower.toUpperCase() == "Y") {
    passwordInpt.lower = true;
  }
  allowUpper = prompt("Upper Case Allowed? (Y/N)");
  if (allowUpper.toUpperCase() == "Y") {
    passwordInpt.upper = true;
  }
  allowNumeric = prompt("Numeric Case Allowed? (Y/N)");
  if (allowNumeric.toUpperCase() == "Y") {
    passwordInpt.numeric = true;
  }
  allowSpecial = prompt("Special Case Allowed? (Y/N)");
  if (allowSpecial.toUpperCase() == "Y") {
    passwordInpt.special = true;
  }
}

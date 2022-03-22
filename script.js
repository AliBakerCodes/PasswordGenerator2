// Assignment Code

//Password input object
var passwordInpt = {
  len: 8,
  lower: false,
  upper: false,
  numeric: false,
  special: false,
  validLength: false,
  validType: false,
};

//Character types
var validUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var validLower = "abcdefghijklmnopqrstuvwxyz";
var validNumber = "1234567890";
var validSpecial = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

//Query Selectors
var generateBtn = document.querySelector("#generate");
var passwordText = document.querySelector("#password");

//hidden error divs
var lenErrorDiv = document.getElementById("lenError");
var typeErrorDiv = document.getElementById("typeError");

//event listeners
generateBtn.addEventListener("click", writePassword);

// Write password to the #password input
function writePassword() {
  getUserInputLength();
  getUserInputType();
  validateTypeInput(passwordInpt); //Validate input. If validated,
  validateLengthInput(passwordInpt);
  console.log(passwordInpt.len);
  console.log(passwordInpt.validLength);
  console.log(passwordInpt.validType);
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
    passwordText.value = password;
  }
}

//Validates password length input. Throw an error if password number out of 8-128 range
function validateLengthInput(password) {
  if (password.len >= 8 && password.len <= 128) {
    password.validLength = true;
    lenErrorDiv.style.display = "none";
  } else {
    if (!passwordInpt.validLength) {
      lenErrorDiv.style.display = "block";
    }
    password.validLength = false;
  }
}

//Validate password type input. Throw an error at least 1 character type not picked"
function validateTypeInput(password) {
  if (
    password.lower != false ||
    password.upper != false ||
    password.numeric != false ||
    password.special != false
  ) {
    typeErrorDiv.style.display = "none"; //Hide error div
    password.validType = true;
  } else {
    if (!passwordInpt.validType) {
      typeErrorDiv.style.display = "block"; //Show the error div
    }
    password.validType = false;
  }
}

// Randomly select a number between 0 and the number of allowed characters
function randArray(charArray) {
  var index = Math.floor(Math.random() * charArray.length);
  return index;
}

//Randomly select a number between min and max inclusive
function randNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//Esecape special characters on output (was causing undefined)
function escapeRegex(string) {
  return string.replace(/[.*+?^'${}()|[\]\\]/g, "$&");
}

//Generate the password
function generatePassword(length, lower, upper, numeric, special) {
  var generated = "";
  var lowerTest = false;
  var upperTest = false;
  var numericTest = false;
  var specialTest = false;
  var uppercase = "";
  var lowercase = "";
  var numbers = "";
  var specialChars = "";
  var charTypeArray = [];

  // For each selected char type, create a string of the desired password length, then add that to the end of our charType array
  if (lower) {
    for (i = 0; i < length; i++) {
      lowercase = lowercase + validLower.charAt(randNum(0, 25));
    }
    charTypeArray.push(lowercase);
    console.log("lowercase:");
    console.log(lowercase);
  }
  if (upper) {
    for (i = 0; i < length; i++) {
      uppercase = uppercase + validUpper.charAt(randNum(0, 25));
    }
    charTypeArray.push(uppercase);
    console.log("uppercase:");
    console.log(uppercase);
  }
  if (numeric) {
    for (i = 0; i < length; i++) {
      numbers = numbers + validNumber.charAt(randNum(0, 8));
    }
    charTypeArray.push(numbers);
    console.log("numbers:");
    console.log(numbers);
  }
  if (special) {
    for (i = 0; i < length; i++) {
      console.log(validSpecial.length);
      specialChars = specialChars + validSpecial.charAt(randNum(0, 32));
    }

    charTypeArray.push(specialChars);
    console.log("specialChars:");
    console.log(specialChars);
  }
  console.log(charTypeArray);

  //For the given password length, choose an array index at random (and therefor a character type at random)
  // and a character in that array. Since the characters were chosen at random when the array was created, they should be random as well.
  //Then add to the generated password variable
  for (i = 0; i < length; i++) {
    generated = escapeRegex(generated + charTypeArray[randArray(charTypeArray)].charAt(i));
    console.log(generated);
  }

  //There is an edge case where if truly random, the generated password might not have
  //one of each character type. Iterate through the generated password and ensure that it
  //has one of each character type
  for (i = 0; i < length; i++) {
    if (lower && validLower.includes(generated.charAt(i))) {
      lowerTest = true;
    }
  }
  for (i = 0; i < length; i++) {
    if (upper && validUpper.includes(generated.charAt(i))) {
      upperTest = true;
    }
  }

  for (i = 0; i < length; i++) {
    if (numeric && validNumber.includes(generated.charAt(i))) {
      numericTest = true;
    }
  }

  for (i = 0; i < length; i++) {
    if (special && validSpecial.includes(generated.charAt(i))) {
      specialTest = true;
    }
  }
  //We had to check all 4 character types, but all might not be needed. So insure that
  //the booleans match between selected type and tested type. If all the booleans match,
  //test is successful. If not, generate a new pass with the same criteria
  if (
    lower === lowerTest &&
    upper === upperTest &&
    numeric == numericTest &&
    special == specialTest
  ) {
    console.log(escapeRegex(generated));
    generated = escapeRegex(generated);
    return generated;
  } else {
    generatePassword(length, lower, upper, numeric, special);
  }
}

//Form controls
var slider = document.getElementById("rngPasswordLength");
var inptLenTxt = document.getElementById("inptLenTxt");
var tglLower = document.getElementById("tglLower");
var tglUpper = document.getElementById("tglUpper");
var tglNumeric = document.getElementById("tglNumeric");
var tglSpecial = document.getElementById("tglSpecial");
var allSwitch = document.querySelectorAll("input[type=checkbox]")
//Get user inputs for password length
function getUserInputLength() {
  passwordInpt["len"] = inptLenTxt.value;
}

//Get user inputs for char types
function getUserInputType() {
  passwordInpt["lower"] = tglLower.checked;
  passwordInpt["upper"] = tglUpper.checked;
  passwordInpt["numeric"] = tglNumeric.checked;
  passwordInpt["special"] = tglSpecial.checked;
}

//Validate the input length if you type in the box and change focus
function inptTxt() {
  slider.value = inptLenTxt.value;
  passwordInpt["len"] = inptLenTxt.value;
  validateLengthInput(passwordInpt);
}

inptLenTxt.addEventListener("focusout", inptTxt);

// Display the default slider value
inptLenTxt.value = slider.value;

// Update the input box value (each time you drag the slider handle) and update the
//password input object length property
slider.oninput = function () {
  inptLenTxt.value = this.value;
};

//update the slider each time you enter into the input box and update the
//password input object length property
inptLenTxt.oninput = function () {
  slider.value = this.value;
};

//If you fail type validation, toggling a toggle will clear the error message
//Iterate through the toggles setting a listener for each one. If any are checked,
//get all the inputs and validate type again
function toggleListener(switches) {
  for (i=0;i<switches.length; i++) {
    switches[i].addEventListener("change", function(event){
      getUserInputType();
      validateTypeInput(passwordInpt);
    })
  }
};

toggleListener(allSwitch);
// When an input field is in focus, move the descriptor out of the way
const inputFields = document.querySelectorAll("input");

inputFields.forEach((input) => {
  input.addEventListener("focus", () => {
    // Toggle off descriptorTransform on any active input
    const activeDescriptor = document.querySelector(".descriptorTransform");
    if (activeDescriptor) {
      activeDescriptor.classList.toggle("descriptorTransform");
    }
    // Toggle on descriptorTransform on this input's descriptor
    const descriptor = input.previousElementSibling;
    descriptor.classList.toggle("descriptorTransform");
  });

  // The change event fires when an input loses focus after having its value changed
  input.addEventListener("change", (event) => {
    // Class out-of-focus, invalid input is incomplete
    if (!input.validity.valid) {
      input.classList.toggle("incomplete");
    }
  });

  // Check validity after entering any input
  input.addEventListener("input", (event) => {
    // If the field was classed incomplete, stop doing so
    if (input.classList.contains("incomplete")) {
      input.classList.toggle("incomplete");
    }
    // If input is not valid and is not classed invalid, do so now
    if (!input.validity.valid && !input.classList.contains("invalid")) {
      input.classList.add("invalid");
    }
    // If valid, remove 'invalid' class
    else if (input.validity.valid) {
      input.classList.remove("invalid");
    }
  });
});

// Report back problems with password
passField = document.getElementById('password');
passField.addEventListener('input', (event) => {
    // Password requirements:
    // At least 1 uppercase letter
    // At least 1 lowercase letter
    // At least 1 number or special character
    // At least 8 characters long
    const enteredPass = passField.value;
    console.log(enteredPass);
    // If password doesn't contain an uppercase letter
    const upperCase = new RegExp('[A-Z]');
    if (upperCase.test(enteredPass)) {
        console.log("Uppercase letter satisfied");
    }

    const lowerCase = new RegExp('[a-z]');
    if (lowerCase.test(enteredPass)) {
        console.log("Lowercase letter satisfied");
    }

    const numChar = new RegExp(/[0-9!@#$%^&*()_+={}\[\]:;<>,.?~\\\|\/-]/)
    if (numChar.test(enteredPass)) {
        console.log("Number or special character satisfied");
    }

    const minEightChars = new RegExp(/^.{8,}$/)
    if (minEightChars.test(enteredPass)) {
        console.log("Minimum 8 characters satisfied");
    }

})

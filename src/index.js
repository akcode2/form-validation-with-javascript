// When an input field is in focus, move the descriptor out of the way
const inputFields = document.querySelectorAll("input");

inputFields.forEach((input) => {
  input.addEventListener("focus", () => {
    // Toggle off descriptorTransform on any active input
    // but only if it's empty
    const activeDescriptors = document.querySelectorAll(".descriptorTransform");
    activeDescriptors.forEach(descriptor => {
      const activeInput = descriptor.nextElementSibling;
      if (activeInput.value === '') {
        descriptor.classList.remove("descriptorTransform");
      }
    })
    // const activeDescriptor = document.querySelector(".descriptorTransform");
    // if (activeDescriptor && input.value === null) {
    //   activeDescriptor.classList.toggle("descriptorTransform");
    // }
    // Toggle on descriptorTransform on this input's descriptor
    const descriptor = input.previousElementSibling;
    if (!descriptor.classList.contains("descriptorTranform")) {
      descriptor.classList.add("descriptorTransform");
    }
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

function updateReqs(enteredPass) {
  const uppercase = new RegExp("[A-Z]");
  const lowercase = new RegExp("[a-z]");
  const numChar = new RegExp(/[0-9!@#$%^&*()_+={}\[\]:;<>,.?~\\\|\/-]/);
  const minEightChars = new RegExp(/^.{8,}$/);

  check = document.createElement("img");
  check.classList.add("reqImg");
  check.src = "images/check.svg";

  cross = document.createElement("img");
  cross.classList.add("reqImg");
  cross.src = "images/cross.svg";

  const uppercaseReq = document.getElementById("uppercaseReq");
  if (uppercase.test(enteredPass)) {
    uppercaseReq.querySelector("img").src = "images/check.svg";
  } else {
    uppercaseReq.querySelector("img").src = "images/cross.svg";
  }

  const lowercaseReq = document.getElementById("lowercaseReq");
  if (lowercase.test(enteredPass)) {
    lowercaseReq.querySelector("img").src = "images/check.svg";
  } else {
    lowercaseReq.querySelector("img").src = "images/cross.svg";
  }

  const numCharReq = document.getElementById("numCharReq");
  if (numChar.test(enteredPass)) {
    numCharReq.querySelector("img").src = "images/check.svg";
  } else {
    numCharReq.querySelector("img").src = "images/cross.svg";
  }

  const lengthReq = document.getElementById("lengthReq");
  if (minEightChars.test(enteredPass)) {
    lengthReq.querySelector("img").src = "images/check.svg";
  } else {
    lengthReq.querySelector("img").src = "images/cross.svg";
  }
}

// Get the password field
passField = document.getElementById("password");
// When the password field is active, display a tooltip
tooltip = document.getElementById("passTooltip");
passField.addEventListener("focus", (event) => {
  tooltip.style.display = "flex";
  const enteredPass = passField.value;
  updateReqs(enteredPass);
});

passField.addEventListener("blur", (event) => {
  tooltip.style.display = "none";

  // Reset tooltip
  const reqDivs = tooltip.querySelectorAll("div");
  reqDivs.forEach((div) => {
    div.querySelector("img").src = "images/cross.svg";
  });
});

// Give live feedback on password input
passField.addEventListener("input", (event) => {
  const enteredPass = passField.value;
  updateReqs(enteredPass);
});

const confirmMsg = document.getElementById("confirmMsg");
const confirmField = document.getElementById("confirm-password");
confirmField.addEventListener("input", (event) => {
  if (confirmField.value !== passField.value) {
    confirmMsg.style.display = "flex";
  } else {
    confirmMsg.style.display = "none";
  }
});
confirmField.addEventListener("focus", (event) => {
  if (confirmField.value !== passField.value) {
    confirmMsg.style.display = "flex";
  } else {
    confirmMsg.style.display = "none";
  }
});
confirmField.addEventListener("blur", (event) => {
  confirmMsg.style.display = "none";
});

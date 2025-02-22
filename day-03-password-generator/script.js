class PasswordGenerator {
  constructor() {
    // DOM elements
    this.display = document.getElementById("display");
    this.generateBtn = document.querySelector(".generate-btn");
    this.passLengthInput = document.getElementById("pass-length");
    this.lowerCaseInput = document.getElementById("lowercase");
    this.upperCaseInput = document.getElementById("uppercase");
    this.numbersInput = document.getElementById("numbers");
    this.symbolsInput = document.getElementById("symbols");
    this.excludeDups = document.getElementById("exc-duplicate");
    this.includeSpaces = document.getElementById("spaces");

    // Character sets
    this.lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    this.uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    this.numberChars = "0123456789";
    this.symbolChars = "!@#$%^&*()_+{}[]|;:,.<>?";
    this.spaceChar = " ";

    // Initialize
    this.init();
  }

  // Build the pool of allowed characters based on user selections
  buildCharacterPool() {
    let allowedChars = "";
    if (this.lowerCaseInput.checked) allowedChars += this.lowercaseChars;
    if (this.upperCaseInput.checked) allowedChars += this.uppercaseChars;
    if (this.numbersInput.checked) allowedChars += this.numberChars;
    if (this.symbolsInput.checked) allowedChars += this.symbolChars;
    if (this.includeSpaces.checked) allowedChars += this.spaceChar;
    return allowedChars;
  }

  // Generate the password
  generatePassword() {
    let password = "";
    const allowedChars = this.buildCharacterPool();

    // Ensure at least one character set is selected
    if (allowedChars.length === 0) {
      alert("Please select at least one character type.");
      return;
    }

    // Handle excluding duplicates
    if (this.excludeDups.checked) {
      // Check if the allowedChars pool is too small
      if (allowedChars.length < this.passLengthInput.value) {
        alert(
          "Cannot generate a password without duplicates: the selected character set is too small."
        );
        return;
      }

      // Generate the password without duplicates
      while (password.length < this.passLengthInput.value) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        const randomChar = allowedChars[randomIndex];

        if (!password.includes(randomChar)) {
          password += randomChar;
        }
      }
    } else {
      // Generate the password with possible duplicates
      for (let i = 0; i < this.passLengthInput.value; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        password += allowedChars[randomIndex];
      }
    }

    // Display the generated password
    this.display.value = password;
  }

  // Initialize event listeners
  init() {
    this.generateBtn.addEventListener("click", () => this.generatePassword());
    this.passLengthInput.addEventListener("change", (e) => {
      this.passLengthInput.value = e.target.value;
    });
  }
}

// Instantiate the PasswordGenerator class
const passwordGenerator = new PasswordGenerator();

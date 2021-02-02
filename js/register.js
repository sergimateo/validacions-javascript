//Constants and variables

const form = document.getElementById("validation-form");
var inputName = document.forms["validation-form"]["your-name-input"];
var inputEmail = document.forms["validation-form"]["email-input"];
var inputPassword = document.forms["validation-form"]["password-input"];
var inputRepeatPassword =
  document.forms["validation-form"]["repeat-password-input"];
var inputProvince = document.forms["validation-form"]["province-input"];
var inputCity = document.forms["validation-form"]["city-text-input"];
var gridCheck = document.forms["validation-form"]["policy-checkbox"];

// La direccion no es obligatioria pero capturo datos para la ventana modal
var inputAddress = document.forms["validation-form"]["address-text-input"];
// El codigo postal igual que la direccion, no es obligatoria pero capturo datospara ventana modal
var inputZip = document.forms["validation-form"]["postal-code-input"];

// Form field validation functions

function formValidate() {
  var checkForm = true;

  // Check name
  if (inputName.value === "") {
    inputName.classList.add("is-invalid");
    document.getElementById("your-name-error").textContent =
      "This field is required";
    checkForm = false;
  } else if (!validateName(inputName.value)) {
    inputName.classList.add("is-invalid");
    document.getElementById("your-name-error").textContent =
      "Your name must have at least 3 characters";
    checkForm = false;
  } else {
    inputName.classList.remove("is-invalid");
    document.getElementById("your-name-error").textContent = "";
  }

  // Check email
  if (inputEmail.value == "") {
    inputEmail.classList.add("is-invalid");
    document.getElementById("email-error").textContent =
      "This field is required";
    checkForm = false;
  } else if (!validateEmail(inputEmail.value)) {
    inputEmail.classList.add("is-invalid");
    document.getElementById("email-error").textContent =
      "Please enter a valid email address";
    checkForm = false;
  } else {
    inputEmail.classList.remove("is-invalid");
    document.getElementById("email-error").textContent = "";
  }

  // Check password

  if (inputPassword.value == "") {
    inputPassword.classList.add("is-invalid");
    document.getElementById("password-error").textContent =
      "This field is required";
    checkForm = false;
  } else if (!validatePassword(inputPassword.value)) {
    inputPassword.classList.add("is-invalid");
    document.getElementById("password-error").textContent =
      "Your password needs at least 8 characters long, and contain one uppercase letter and a number";
    inputPassword.value = "";
    checkForm = false;
  } else {
    inputPassword.classList.remove("is-invalid");
    document.getElementById("password-error").textContent = "";
  }

  // Check confirm password, if they don't match, clear both password fields and try again
  // A1sdfghj
  if (inputRepeatPassword.value == "") {
    inputPassword.classList.add("is-invalid");
    document.getElementById("repeat-password-error").textContent =
      "This field is required";
    checkForm = false;
  } else if (inputRepeatPassword.value != inputPassword.value) {
    inputRepeatPassword.classList.add("is-invalid");
    inputPassword.value = "";
    inputRepeatPassword.value = "";
    document.getElementById("repeat-password-error").textContent =
      "Your password does not match. Try again.";
    checkForm = false;
  } else {
    inputRepeatPassword.classList.remove("is-invalid");
    document.getElementById("repeat-password-error").textContent = "";
  }

  // City name must not be empty

  if (inputCity.value == "") {
    inputCity.classList.add("is-invalid");
    document.getElementById("city-error").textContent =
      "This field is required";
    checkForm = false;
  } else {
    inputCity.classList.remove("is-invalid");
    document.getElementById("city-error").textContent = "";
  }

  // Province select option must not be empty

  if (inputProvince.value == 0) {
    inputProvince.classList.add("is-invalid");
    document.getElementById("province-error").textContent =
      "This field is required";
    checkForm = false;
  } else {
    inputProvince.classList.remove("is-invalid");
    document.getElementById("province-error").textContent = "";
  }

  // Check privacy policy

  if (!gridCheck.checked) {
    gridCheck.classList.add("is-invalid");
    document.getElementById("checkbox-error").textContent =
      "You must agree to the Privacy Policy";
    checkForm = false;
  } else {
    gridCheck.classList.remove("is-invalid");
    document.getElementById("checkbox-error").textContent = "";
  }

  console.log(checkForm);

  if (checkForm) {
    return true;
  } else {
    return false;
  }
}

// On click del botón Register valida el formulario, si está bien lanza el "Nivell 3 finestra modal"
// Ventanta modal no muestra el password obviamente...el resto de campos del formulario sí

$("#submit-register-button").click(function (e) {
  if (formValidate()) {
    $(".modal-body").html(
      "<p>This is your submitted data:</p><p>Name: <span style='color: crimson'>" +
        inputName.value +
        "</span></p><p>Your e-mail: <span style='color: crimson'>" +
        inputEmail.value +
        "</span></p><p>Address: <span style='color: crimson'>" +
        inputAddress.value +
        "</span></p><p>City: <span style='color: crimson'>" +
        inputCity.value +
        "</span></p><p>Province: <span style='color: crimson'>" +
        inputProvince.value +
        "</span></p><p>Postal/Zip Code: <span style='color: crimson'>" +
        inputZip.value +
        "</span></p>"
    );

    $("#RegistrationModal").modal("show");
    e.preventDefault();
  }
});

//RegEx test functions

function validateName(name) {
  let regex = /^(?=.*?[a-zA-Z\ñ\ ]).{3,}$/;
  return regex.test(name) ? true : false;
}

function validateEmail(email) {
  let regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email) ? true : false;
}

function validatePassword(password) {
  let regex = /^(?=.*?[A-Z])(?=.*?[0-9]).{8,}$/;
  return regex.test(password) ? true : false;
}

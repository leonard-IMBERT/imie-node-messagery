var button = document.getElementById("register");
var errors = {
  all: document.getElementsByClassName("inputError"),
  length: document.getElementById("errorLength"),
  corresponding: document.getElementById("errorCorrespond"),
  email: document.getElementById("errorEmail")
};
var form = document.getElementById("form");

function hideErrors() {
  for(var ii = 0; ii < errors.length; ii++) {
    errors[ii].style.display = "none";
    errors[ii].parentElement.classList.remove("has-error");
  }
}

button.onclick = function(e) {
  hideErrors();

  var email = document.getElementById("email");
  var password = document.getElementById("password1").value;
  var confirmation = document.getElementById("password2").value;

  if(password.length < 3) {
    errors.length.style.display = "block";
    errors.length.parentElement.classList.add("has-error");
  } else if(password !== confirmation) {
    errors.corresponding.style.display = "block";
    errors.corresponding.parentElement.classList.add("has-error");
  } else if(!email.checkValidity()) {
    errors.email.style.display = "block";
    errors.email.parentElement.classList.add("has-error")
  } else {
    form.submit();
  }
}

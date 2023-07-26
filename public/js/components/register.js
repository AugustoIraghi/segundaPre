// show a message with a type of the input
function showMessage(input, message, type) {
	// get the small element and set the message
	const msg = input.parentNode.querySelector("small");
	msg.innerText = message;
	// update the class for the input
	input.className = type ? "success" : "error";
	return type;
}

function showError(input, message) {
	return showMessage(input, message, false);
}

function showSuccess(input) {
	return showMessage(input, "", true);
}

function hasValue(input, message) {
	if (input.value.trim() === "") {
		return showError(input, message);
	}
	return showSuccess(input);
}

function minLength(input, message) {
    if (input.value.trim().length < 6) {
        return showError(input, message)
    }
    return showSuccess(input);
}

function passwordConfirmation(input, input2, message) {
    if (input.value.trim() != input2.value.trim()) {
        return showError(input, message)
    }
    return showSuccess(input);
}

function validateEmail(input, requiredMsg, invalidMsg) {
	// check if the value is not empty
	if (!hasValue(input, requiredMsg)) {
		return false;
	}
	// validate email format
	const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	const email = input.value.trim();
	if (!emailRegex.test(email)) {
		return showError(input, invalidMsg);
	}
	return true;
}

const form = document.getElementById("registerForm");

const FIRST_NAME_REQUIRED = "Please enter your name";
const LAST_NAME_REQUIRED = "Please enter your last name";
const EMAIL_REQUIRED = "Please enter your email";
const EMAIL_INVALID = "Please enter a correct email address format";
const PASSWORD_REQUIRED = "Please enter your password";
const PASSWORD_MIN_LENGTH = "Your password must be at least 6 characters long";
const PASSWORD_CONFIRMATION = "Please confirm your password";
const PASSWORD_CONFIRMATION_MATCH = "Passwords do not match";

form.addEventListener("submit", async (event) => {
	// stop form submission
	event.preventDefault();

	// validate the form
	let first_nameValid = hasValue(form.elements["first_name"], FIRST_NAME_REQUIRED);
	let last_nameValid = hasValue(form.elements["last_name"], LAST_NAME_REQUIRED);
	let emailValid = validateEmail(form.elements["email"], EMAIL_REQUIRED, EMAIL_INVALID);
    let passwordValid = hasValue(form.elements["password"], PASSWORD_REQUIRED);
    let passwordMinLength = minLength(form.elements["password"], PASSWORD_MIN_LENGTH);
    let passwordConfirmationValid = hasValue(form.elements["password_confirmation"], PASSWORD_CONFIRMATION);
    let passwordConfirmationMatchValid = passwordConfirmation(form.elements["password_confirmation"], form.elements["password"], PASSWORD_CONFIRMATION_MATCH);

	// if valid, submit the form.
	if (first_nameValid && last_nameValid && emailValid && passwordValid && passwordMinLength && passwordConfirmationValid && passwordConfirmationMatchValid) {
		await fetch('/api/log/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: form.elements["first_name"].value,
                last_name: form.elements["last_name"].value,
                email: form.elements["email"].value,
                password: form.elements["password"].value,
            })
        }).then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        }
        ).then(data => {
            console.log(data);
            if (data.message) {
                swal.fire({
                    title: 'Success',
                    text: data.message,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then(() => {
                    window.location.href = '/products';
                });
            }
        }).catch(error => {
            console.log(error);
            swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        });
	}
});
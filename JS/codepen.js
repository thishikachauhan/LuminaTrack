// USER ID

const userRegex = /[^a-zA-Z0-9]/g;

const userId = document.getElementById("userId");
const password = document.getElementById("password");

userId.addEventListener("input", function () {
    this.value = this.value.replace(userRegex, "");
});


// LOGIN VALIDATION

function checkvalidation(event) {

    event.preventDefault();

    const enteredUserId = userId.value.trim();
    const enteredPassword = password.value;

    const validationCriteria = [
        { userId: "thishika", password: "tc1234" },
        { userId: "nikhil", password: "nv1234" },
        { userId: "110033", password: "tn1234" }
    ];

    const validUser = validationCriteria.some(user => 
        user.userId === enteredUserId &&
        user.password === enteredPassword
    );


    // EMPTY FIELDS
    if (!enteredUserId || !enteredPassword) {

        Swal.fire({
            title: "Missing Details",
            text: "Please fill all the required fields.",
            icon: "warning"
        });

        return;
    }


    // INVALID LOGIN
    if (!validUser) {

        Swal.fire({
            title: "Invalid Login",
            text: "Incorrect User ID or Password.",
            icon: "error"
        });

        return;
    }

    // SUCCESSFUL LOGIN

    sessionStorage.setItem("isLoggedIn", true);
    sessionStorage.setItem("lastActivity", Date.now());
        sessionStorage.setItem("loggedUser", enteredUserId);


    Swal.fire({
        title: "Login Successfully!!!",
        icon: "success",
        confirmButtonText: "Continue"
    }).then(() => {

        window.location.href = "dashboard.html";

    });
}


// FORM SUBMIT

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", checkvalidation);


// SHOW / HIDE PASSWORD

const togglePasswordBtn = document.getElementById("togglePassword");

togglePasswordBtn.addEventListener("click", () => {

    const isPassword = password.type === "password";

    password.type = isPassword ? "text" : "password";

    togglePasswordBtn.textContent = isPassword ? "Hide" : "Show";

});
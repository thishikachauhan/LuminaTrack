//apply validations on userId and password by using regex--

const toggleButtons = document.querySelectorAll(".toggle-password");

toggleButtons.forEach((button) => {
    button.addEventListener("click", function () {

        const inputId = this.getAttribute("data-target");
        const passwordInput = document.getElementById(inputId);

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            this.textContent = "Hide";
        } else {
            passwordInput.type = "password";
            this.textContent = "Show";
        }

    });
});




    
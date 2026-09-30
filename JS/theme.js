//toggling function
        const themeBtn = document.getElementById("themeToggle");

// Check saved theme
//local storage
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "dark") {
        document.body.classList.add("dark-theme");
        themeBtn.textContent = "☀️";
        } else {
        themeBtn.textContent = "🌙";
        }

// Toggle theme
        themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark-theme");

        if (document.body.classList.contains("dark-theme")) {
                localStorage.setItem("theme", "dark");
                themeBtn.textContent = "☀️";
        } else {
                localStorage.setItem("theme", "light");
                themeBtn.textContent = "🌙";
        }

        });
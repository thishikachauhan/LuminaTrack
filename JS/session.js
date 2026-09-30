//local storage for roles of user:-



//session timings for 10 min..if there is no activity within 10 min then it will be logged out automatically
const SESSION_TIME = 10 * 60 * 1000; // 10 minutes
const WARNING_TIME = 2 * 60 * 1000;  // 2 minutes

let warningTimer;
let logoutTimer;


// CHECK LOGIN

// if (sessionStorage.getItem("isLoggedIn") != true) {
//     window.location.href = "codepen.html";
// }


// SESSION ACTIVITY

function resetSession() {

    sessionStorage.setItem("lastActivity", Date.now());

    clearTimeout(warningTimer);
    clearTimeout(logoutTimer);


    // Warning after 8 minutes
    warningTimer = setTimeout(() => {

        alert("⚠️ Your session will expire in 2 minutes due to inactivity.");

    }, SESSION_TIME - WARNING_TIME);


    // Logout after 10 minutes
    logoutTimer = setTimeout(() => {

        sessionStorage.removeItem("isLoggedIn");
        sessionStorage.removeItem("lastActivity");

        alert("Your session has expired.");

        window.location.href = "codepen.html";

    }, SESSION_TIME);
}


// ===============================
// DETECT USER ACTIVITY
// ===============================

document.addEventListener("click", resetSession);
document.addEventListener("keydown", resetSession);
document.addEventListener("mousemove", resetSession);
document.addEventListener("scroll", resetSession);


// Start timer
resetSession();

//for showing the name of the user who loggs in the website

document.addEventListener("DOMContentLoaded", function () {

    const userName = sessionStorage.getItem("loggedInUserName");

    const nameElement = document.getElementById("loggedInUserName");
    const initialsElement = document.getElementById("userInitials");

    if (!userName) {
        return;
    }

    // Display full name
    if (nameElement) {
        nameElement.textContent = userName;
    }

    // Create initials
    const nameParts = userName.trim().split(/\s+/);

    let initials;

    if (nameParts.length >= 2) {

        initials =
            nameParts[0].charAt(0) +
            nameParts[nameParts.length - 1].charAt(0);

    } else {

        initials = nameParts[0].substring(0, 2);
    }

    // Display initials inside circle
    if (initialsElement) {
        initialsElement.textContent = initials.toUpperCase();
    }

});

// const fetchedUser = document.getElementById("loggedUSer");
// document.getElementById("loggedUser").innerHTML = `Hello!! ${fetchedUser}`;



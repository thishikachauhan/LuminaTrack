// // localStorage.setItem('user-Name','Thishika')

// // localStorage.setItem('userRole','oldUser');
// // localStorage.setItem('userRole','newUser');


// localStorage.setItem('user-Role','Admin');
// // 3 users 
// //roles : 4 - add, edit, delete, view 
// const userName = document.getElementById("user_Name").value;
// localStorage.setItem('userName', userName);

// const loggedInUser = localStorage.getItem("userName");
// document.getElementById("userName").textContent = loggedInUser;        

// const userRole = localStorage.getItem("user-Role");

// if (!userRole) {
//     window.location.href = "login.html";
// }

// if (userRole !== "Admin") {
//     document.querySelectorAll("admin-only").forEach(element => {
//         element.style.display = "none";
//     });
// }


// async function roleBasedAccess() {
//     try {
//         const response = await fetch("https://mocki.io/v1/8e8d16a7-7f4a-4e50-9d9a-8cc510a73671");
//         const data = await response.json();
//         console.log(data);
//     }
    
//     catch(error){
//         console.error("Error in fetching roles", error);
//     }
// }

// roleBasedAcces();


const rolePermissions = {

    "Admin": {
        view: true,
        add: true,
        edit: true,
        delete: true,
        viewOrders:true
    },

    "Sales Manager": {
        view: true,
        add: true,
        edit: true,
        delete: false,
        viewOrders:true
    },

    "New User": {
        view: true,
        add: false,
        edit: false,
        delete: false,
        viewOrders:true
    }

};

localStorage.setItem("userRole", "New User");
const userRole = localStorage.getItem("userRole");
const givenPermissions = rolePermissions[userRole];

console.log("Current User Role:", userRole);
console.log("User Permissions:", givenPermissions);




//check for user
if (!givenPermissions) {
     Swal.fire({
        icon: 'error',
        title: 'Access Denied',
        text: 'Invalid User'
    }).then(()=>{
    window.location.href="codepen.html"});
    
}

window.onload = async function () {
    alert("page is loading");
    
}
if(givenPermissions.view){
    console.log("user can view the data");
}


// ADD buttons
if (!givenPermissions.add) {
    document.querySelectorAll(".add-only").forEach(button => {
        button.style.display = "none";
    });
}


// EDIT buttons
if (!givenPermissions.edit) {
    document.querySelectorAll(".edit-only").forEach(button => {
        button.style.display = "none";
    });
}


// DELETE buttons
if (!givenPermissions.delete) {
    document.querySelectorAll(".delete-only").forEach(button => {
        button.style.display = "none";
    });
}

//view orders from dashboard
if(!givenPermissions.viewOrders){
    document.querySelectorAll(".view-only").forEach(element =>{
        element.style.display = "none";
    })
}


//callback and promise fucntion 
//api 
function orderfood(callme){
    function addtocarrt(callme){

    
console.log("food ordered");
console.log("food ready");
callme();
    }
}

function callme(){
console.log("eat and go");
}


//promise 
const pro = new Promise((resolve, reject)=>{

})

getuser.then(if(Response.issucce){

}
).then()
.catch

// async function roleBasedAccess() {
//     try {
//         const response = await fetch("https://mocki.io/v1/8e8d16a7-7f4a-4e50-9d9a-8cc510a73671");
//         const data = await response.json();
//         console.log(data);
//     }
    
//     catch(error){
//         console.error("Error in fetching roles", error);
//     }
// }


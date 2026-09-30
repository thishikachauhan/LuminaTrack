
// script to show today's date in the header
debugger;
const dateElement = document.getElementById('currentDate');
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
dateElement.innerHTML = new Date().toLocaleDateString('en-US', options);

console.log(dateElement);


//applying validations on user input for searching orderb by order id

const userRegex = /[^#A-Za-z0-9-]/g;

const searchInput = document.getElementById("searchinput");

searchInput.addEventListener("input", function () {

    this.value = this.value.replace(userRegex, "");

    const input = this.value.trim().toUpperCase();

    const rows = tableBody.querySelectorAll("tr");

    rows.forEach(row => {

        const orderId = row.cells[0].textContent.trim().toUpperCase();

        const dealerName = row.cells[1].textContent.trim().toUpperCase();

        if (
            orderId.includes(input) ||
            dealerName.includes(input)
        ) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }

    });

});


//creating API and using get method for fetching data
async function getDashboard() {
        debugger;
        try {
    const response = await fetch(
        "https://mocki.io/v1/ca6c51d4-6047-460a-94ed-f76113589fea"
    );

    const data = await response.json();

    const getTableBody = document.getElementById("mapDashboardTableData");

    data.forEach(element => {
        const createNewRow = document.createElement("tr");

        createNewRow.innerHTML = `
            <td>${element.order_id}</td>
            <td>${element.dealer_name}</td>
            <td>${element.date}</td>
            <td>${element.amount}</td>
            <td>${element.status}</td>
                
        `

        getTableBody.appendChild(createNewRow);
    });

} catch (error) {
    console.error("Failed to fetch data:", error);
}
}



window.onload = (event) => {
                // Call the function to test it
                getDashboard();
        }

// SEARCH by filtering
const userinput = document.getElementById("searchinput");
const tableBody = document.getElementById("mapDashboardTableData");

userinput.addEventListener("input", function () {

    let input = this.value.trim().toUpperCase();

    const rows = tableBody.querySelectorAll("tr");

    rows.forEach(row => {

        const orderId = row.cells[0].textContent
            .trim()
            .toUpperCase();

        if (orderId.includes(input)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }

    });

});


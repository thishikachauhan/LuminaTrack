// script to show today's date in the header
        const dateElement = document.getElementById('currentDate');
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = new Date().toLocaleDateString('en-US', options);


 //using get method to fetch data
        async function getOrders() {
                try {
                const response = await fetch("https://mocki.io/v1/15e75eb0-db64-4185-9839-fa2f218567e8");
                
                const data = await response.json();
                const getOrderData = document.getElementById("getOrdData");

                data.forEach(element => {
                    const createNewRow = document.createElement("tr");

                    createNewRow.innerHTML =`
                    <td>${element.Order_id}</td>
                    <td>${element.Date}</td>
                    <td>${element.Dealer_Name}</td>
                    <td>${element.Items}</td>
                    <td>${element.Amount}</td>
                    <td>${element.Payment_Status}</td>

                    <td>

                    <div data-bs-target="#editOrderModal" data-bs-toggle="modal" 
                    data-order="${element.Order_id}"
                    data-date="${element.Date}"
                    data-dealer="${element.Dealer_Name}"
                    data-items="${element.Items}"
                    data-amount="${element.Amount}"
                    data-status="${element.Payment_Status}">
                    
                    <button 
                    type="button"
                    title = "Edit Order Info"
                    class="btn btn-light">
                    <i class="bi bi-pencil-fill editOrder">
                    </i></button>
                    

                    </div>
                    </td>

                    <td>
                    <div data-bs-target="#deleteOrderModal" data-bs-toggle="modal"
                    data-order="${element.Order_id}">

                    <button 
                    type="button" 
                    title = "delete Order Info"
                    class="btn btn-light">
                    <i class="bi bi-trash-fill deleteOrder"
        >
                    </i></button>
                    
                    </div>
                    </td>
                    `

                    getOrderData.appendChild(createNewRow);
                    });

                } catch (error) {
                console.error("Failed to fetch data:", error);
                }
                }

        //applying validations on creating new orders
                const newRegex = /[^A-Za-z0-9\s.-]/g;

                const validateFields = ["newOrder", "newDealer", "newItems"];

                validateFields.forEach(id=>{
                const field = document.getElementById(id);
                field.addEventListener("input", function(){
                        this.value = this.value.replace(newRegex, "");
                })
                });

//popup on hitting save changes button
        const saveChanges= document.getElementById("clickSaveChanges");
        saveChanges.addEventListener("click", function(){
            Swal.fire("Changes are saved Successfullyy!");
        })

                //hitting corresponding data of edit and delete button

                const editOrderinfo= document.getElementById("editOrderModal");
                if(editOrderinfo){
                editOrderinfo.addEventListener("show.bs.modal",function(event){
                        const button = event.relatedTarget;

                        const orderName = button.dataset.order;
                        const orderDate = button.dataset.date;
                        const orderDealer = button.dataset.dealer;
                        const orderItems = button.dataset.items;
                        const orderAmount = button.dataset.amount;
                        const orderStatus = button.dataset.status;

                        document.getElementById("editOrders").value = orderName;
                        document.getElementById("editDate").value = orderDate;
                        document.getElementById("editDealer").value = orderDealer;
                        document.getElementById("editItems").value = orderItems;
                        document.getElementById("editAmount").value = orderAmount;
                        document.getElementById("editStatus").value = orderStatus;

                        console.log(orderName);
                        console.log(orderDate);
                        console.log(orderDealer);
                        console.log(orderItems);
                        console.log(orderAmount);
                        console.log(orderStatus);
                });
            }


                window.onload=(each)=>{
                // Call the function to test it
                    getOrders();
                }

    //search input by filtering data

    const inputData = document.getElementById("searchInput");
    const tableData = document.getElementById("getOrdData");

    inputData.addEventListener("input", function(){

        let input = this.value.trim().toUpperCase();
        const rows = document.querySelectorAll("tr");

        rows.forEach(row=>{
            const orderId =  row.cells[0].textContent.trim().toUpperCase();
            const dealerName =  row.cells[2].textContent.trim().toUpperCase();

            if (orderId.includes(input) || dealerName.includes(input)){
                row.style.display="";
            }
            else{
                row.style.display="none";
            }
        })

    })

    //applying validations for search box

    const userRegex = /[^A-Za-z0-9-]/g;

    const search_Input = document.getElementById("searchInput");

    search_Input.addEventListener("input", function () {

        this.value = this.value.replace(userRegex, "");

        const input = this.value.trim().toUpperCase();

        const rows = tableBody.querySelectorAll("tr");

        rows.forEach(row => {

            const orderId = row.cells[0].textContent.trim().toUpperCase();

            const dealerName = row.cells[2].textContent.trim().toUpperCase();

            if (
                orderId.includes(input) ||dealerName.includes(input)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }

        });

    });

    //remove the table row or data by clicking on the delete icon
            let selectedOrderRow = null;

            // Get delete modal
        const deleteOrderModal =
            document.getElementById("deleteOrderModal");


        if (deleteOrderModal) {

            deleteOrderModal.addEventListener(
                "show.bs.modal",
                function (event) {

                    // Button that opened the delete modal
                    const button = event.relatedTarget;


                    // Find the row containing that button
                    selectedOrderRow =
                        button.closest("tr");


                    // Get product name
                    const orderId =
                        button.dataset.dealer;


                    console.log(
                        "Order selected for deletion:",
                        orderId
                    );

                }
            );
        }


        // CONFIRM DELETE BUTTON
        // Change this ID if your Delete/OK button has a different ID.

        const confirmDeleteOrder =
            document.getElementById("confirmDeleteOrder");


        if (confirmDeleteOrder) {

            confirmDeleteOrder.addEventListener(
                "click",
                function () {

                    // Make sure a row was selected
                    if (!selectedOrderRow) {
                        return;
                    }


                    // Remove ONLY the selected row
                    selectedOrderRow.remove();


                    // Reset selected row
                    selectedOrderRow = null;


                    // Close Bootstrap modal
                    const modalInstance =
                        bootstrap.Modal.getInstance(
                            deleteOrderModal
                        );

                    if (modalInstance) {
                        modalInstance.hide();
                    }


                    // Success message
                    Swal.fire({
                        title: "Deleted!",
                        text: "Order has been deleted successfully.",
                        icon: "success",
                        confirmButtonText: "OK"
                    });

                }
            );
        }




        

//using post methods to add or update new data

                const form = document.getElementById("form_data");
                form.addEventListener("submit", async function(event){
                    event.preventDefault();
                    const formData= new FormData(form);

                    await addOrders(formData);
                })

                async function addOrders(){
                    try{
                        
                    const response= await fetch("https://mocki.io/v1/d581e471-d4cd-44b4-a4ba-06a8b4842d00", {
                        method:"POST",
                        
                        body:formData
                    });
                    console.log(response.status);

                    const data = response.json();
                    console.log(data);
                    }
                    catch(error){
                        console.error("failed to add new order: ", error)
                    }
                }

// <!-- Tiny script just for the Modal -->
 
        const modal = document.getElementById('orderModal');
        const openBtn = document.getElementById('openModalBtn');
        const closeBtn = document.getElementById('closeModalBtn');
        const cancelBtn = document.getElementById('cancelBtn');

        // Open Modal
        openBtn.addEventListener('click', () => {
            modal.classList.add('active');
        });

        // Close Modal functions
        const closeModal = () => modal.classList.remove('active');
        
        closeBtn.addEventListener('click', closeModal);
        cancelBtn.addEventListener('click', closeModal);

        // Close if user clicks outside the white box
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        let currentRow;

// Edit
document.querySelectorAll(".edit-btn").forEach(btn => {

    btn.addEventListener("click", function () {

        currentRow = this.closest("tr");

        document.getElementById("orderId").value =
            currentRow.cells[0].innerText;

        document.getElementById("date").value =
            currentRow.cells[1].innerText;

        document.getElementById("dealer").value =
            currentRow.cells[2].innerText;

        document.getElementById("items").value =
            currentRow.cells[3].innerText;

        document.getElementById("amount").value =
            currentRow.cells[4].innerText;

        const modal = new bootstrap.Modal(
            document.getElementById("editModal")
        );

        modal.show();

    });

});

document.getElementById("saveBtn").addEventListener("click", function () {

    currentRow.cells[0].innerText =
        document.getElementById("orderId").value;

    currentRow.cells[1].innerText =
        document.getElementById("date").value;

    currentRow.cells[2].innerText =
        document.getElementById("dealer").value;

    currentRow.cells[3].innerText =
        document.getElementById("items").value;

    currentRow.cells[4].innerText =
        document.getElementById("amount").value;

    bootstrap.Modal.getInstance(
        document.getElementById("editModal")
    ).hide();

});

document.querySelectorAll(".delete-btn").forEach(btn => {

    btn.addEventListener("click", function () {

        if (confirm("Are you sure you want to delete this order?")) {

            this.closest("tr").remove();

        }

    });

});


document.querySelectorAll(".delete-btn").forEach(btn => {

    btn.addEventListener("click", function () {

        let row = this.closest("tr");

        Swal.fire({
            title: "Delete Order?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, Delete"
        }).then((result) => {

            if(result.isConfirmed){

                row.remove();

                Swal.fire(
                    "Deleted!",
                    "Order deleted successfully.",
                    "success"
                );

            }

        });

    });

});

const rows = document.querySelectorAll(".data-table tbody tr");

rows.forEach(row => {
    const paymentStatus = row.querySelector(".status-badge");

    if (paymentStatus.textContent.trim() === "Paid") {
        console.log("Payment is Paid");
    } 
    else if (paymentStatus.textContent.trim() === "Pending") {
        console.log("Payment is Pending");
    }
});





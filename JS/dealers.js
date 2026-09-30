
     // Simple script to show today's date in the header
        const dateElement = document.getElementById('currentDate');
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = new Date().toLocaleDateString('en-US', options);

    //applying validations on creating new orders
                const newRegex = /[^A-Za-z0-9\s.-]/g;

                const validateFields = ["newDealer", "newContact", "phoneNo", "outstandingDues"];

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


    //using get method to fetch data 
        async function getDealers() {
                debugger;
                try {
                const response = await fetch("https://mocki.io/v1/6d98baa9-050c-4f0e-a197-5f632c900ff8");
                
                const data = await response.json();

                console.log(data);

                const getData= document.getElementById("getDealersdata");
                
                data.forEach(element => {
                        const createNewRow = document.createElement("tr");

                        //`` this backticks are used for working with tags of HTML in JS
                        createNewRow.innerHTML=`
                                <td>${element.Dealer_Name}</td>
                                <td>${element.Contact_Person}</td>
                                <td>${element.Phone}</td>
                                <td>${element.Outstanding_Dues}</td>
                                

                                <td>

                                <button 
                                type="button" 
                                class="btn btn-light" 
                                title = "Edit dealer Info"
                                data-bs-target="#editDealerModal" 
                                data-bs-toggle="modal" 
                                data-dealer="${element.Dealer_Name}"
                                data-contact="${element.Contact_Person}"
                                data-phone="${element.Phone}"
                                data-dues="${element.Outstanding_Dues}">
                                
                                <i class="bi bi-pencil-fill editDealer">
                                </i></button>
                                
                                </td>

                                <td>
                                <button 
                                type="button" 
                                class="btn btn-light" 
                                title = "delete dealer Info"
                                data-bs-target="#deleteDealerModal" 
                                data-bs-toggle="modal"
                                data-dealer="${element.Dealer_Name}">
                                

                                <i class="bi bi-trash-fill deleteDealer">
                                </i>
                                </button>
                                
                                </td>
                    
                        `
                        getData.appendChild(createNewRow);
                        
                });

                } catch (error) {
                console.error("Failed to fetch data:", error);
                }
                }

                //hitting corresponding data of edit and delete button

                const editDealerinfo= document.getElementById("editDealerModal");
                if(editDealerinfo){
                editDealerinfo.addEventListener("show.bs.modal",function(event){
                        const button = event.relatedTarget;

                        const dealerName = button.dataset.dealer;
                        const contactPerson = button.dataset.contact;
                        const phoneNo = button.dataset.phone;
                        const duesLeft = button.dataset.dues;

                        document.getElementById("editDealer").value = dealerName;
                        document.getElementById("editContact").value = contactPerson;
                        document.getElementById("editPhone").value = phoneNo;
                        document.getElementById("editDues").value = duesLeft;

                        console.log(dealerName);
                        console.log(contactPerson);
                        console.log(phoneNo);
                        console.log(duesLeft);
                });
        }


        //remove the table row or data by clicking on the delete icon
            let selectedDealerRow = null;

            // Get delete modal
        const deleteDealerModal =
            document.getElementById("deleteDealerModal");


        if (deleteDealerModal) {

            deleteDealerModal.addEventListener(
                "show.bs.modal",
                function (event) {

                    // Button that opened the delete modal
                    const button = event.relatedTarget;


                    // Find the row containing that button
                    selectedDealerRow =
                        button.closest("tr");


                    // Get product name
                    const dealerName =
                        button.dataset.dealer;


                    console.log(
                        "Dealer selected for deletion:",
                        dealerName
                    );

                }
            );
        }


        // CONFIRM DELETE BUTTON
        // Change this ID if your Delete/OK button has a different ID.

        const confirmDeleteDealer =
            document.getElementById("confirmDeleteDealer");


        if (confirmDeleteDealer) {

            confirmDeleteDealer.addEventListener(
                "click",
                function () {

                    // Make sure a row was selected
                    if (!selectedDealerRow) {
                        return;
                    }


                    // Remove ONLY the selected row
                    selectedDealerRow.remove();


                    // Reset selected row
                    selectedDealerRow = null;


                    // Close Bootstrap modal
                    const modalInstance =
                        bootstrap.Modal.getInstance(
                            deleteDealerModal
                        );

                    if (modalInstance) {
                        modalInstance.hide();
                    }


                    // Success message
                    Swal.fire({
                        title: "Deleted!",
                        text: "Dealer has been deleted successfully.",
                        icon: "success",
                        confirmButtonText: "OK"
                    });

                }
            );
        }

        

//using post method to add or update data

        const form = document.getElementById("form_data")
        form.addEventListener("submit", async function(event){
              event.preventDefault(); 
              const formData = new FormData(form); 

              await addDealers(formData);
        })

        async function addDealers(formData) {
                try{

                        const response = await fetch("https://mocki.io/v1/77087995-3cb4-45af-8ffc-0e0f49f85d12", {
                                method: "POST",
                                body: formData
                        });
                        console.log(response.status)

                        const data= await response.json();
                        console.log(data);
                }
                catch(error){
                        console.error("failed to add new data: ", error);
                }

        }
       

        window.onload = (event)=>{
                // Call the function to test it
                getDealers();
                
        }

//search rows by filtering
        const userInput = document.getElementById("searchInput");
        const tableBody = document.getElementById("getDealersdata");

        userInput.addEventListener("input", function () {

        let input = this.value.trim().toUpperCase();

        const rows = tableBody.querySelectorAll("tr");

        rows.forEach(row => {

                const dealerName = row.cells[0].textContent.trim().toUpperCase();

                if (dealerName.includes(input)) {
                row.style.display = "";

                } else {
                row.style.display = "none";
                }

        });

        });


        //applying validations in search box for input

        const userRegex = /[^A-Za-z0-9]/g;

        const search_Input = document.getElementById("searchInput");

        search_Input.addEventListener("input", function () {

        this.value = this.value.replace(userRegex, "");

        const input = this.value.trim().toUpperCase();

        const rows = tableBody.querySelectorAll("tr");

        rows.forEach(row => {

                const dealerName = row.cells[1].textContent
                .trim()
                .toUpperCase();

                if (dealerName.includes(input)) {
                row.style.display = "";
                } else {
                row.style.display = "none";
                }

        });

        });
        

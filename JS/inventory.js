// script to show today's date in the header
        const dateElement = document.getElementById('currentDate');
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateElement.textContent = new Date().toLocaleDateString('en-US', options);

        //applying validations on creating new orders
                const newRegex = /[^A-Za-z0-9\s.-]/g;

                const validateFields = ["newProduct", "newCategory", "getPrice", "availableStock"];

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
        });


//creating API and using get method to fetch data  
        async function getInventory() {
            debugger;
                try {
                const response = await fetch("https://mocki.io/v1/2d7bab1a-69e8-411e-840e-6fc43a61a8b9");
                
                const data = await response.json();
                const getInvdata = document.getElementById("getInventoryData");

                data.forEach(element => {
                    const createNewRow = document.createElement("tr");

                    createNewRow.innerHTML=`
                    <td>${element.Product_Name}</td>
                    <td>${element.Category}</td>
                    <td>${element.Price}</td>
                    <td>${element.Current_Stock}</td>
                    <td>${element.Status}</td>

                    <td>

                    <button 
                    type="button" 
                    class="btn btn-light" 
                    title = "Edit product Info"
                    data-bs-target="#editProductModal" 
                    data-bs-toggle="modal" 
                    data-product="${element.Product_Name}"
                    data-category="${element.Category}"
                    data-price="${element.Price}"
                    data-stock="${element.Current_Stock}"
                    data-status="${element.Status}">
                    
                    <i class="bi bi-pencil-fill editProduct">
                    </i></button>
                    
                    </td>

                    <td>
                    <button 
                    type="button" 
                    class="btn btn-light" 
                    title = "delete product Info"
                    data-bs-target="#deleteProductModal" 
                    data-bs-toggle="modal"
                    data-product="${element.Product_Name}">

                    <i class="bi bi-trash-fill deleteProduct">
                    </i></button>
                    
                    </td>
                    `

                    getInvdata.appendChild(createNewRow);

                        
                });

                const mapped_obj=data.map((i)=>{
                    return {Product_Name:i.Product_Name,
                            Category:i.Category,
                            Price:i.Price};
                })
                console.log(mapped_obj);

                const filter_obj=data.filter((i)=>{
                    return i.Category==="Inverter";
                })
                


                } catch (error) {
                console.error("Failed to fetch data:", error);
                }
                }

                //hitting corresponding data of edit and delete button

                const editProductinfo= document.getElementById("editProductModal");

                if(editProductinfo){
                editProductinfo.addEventListener("show.bs.modal",function(event){
                        const button = event.relatedTarget;

                        const productName = button.dataset.product;
                        const productCategory = button.dataset.category;
                        const productPrice = button.dataset.price;
                        const ProductStock = button.dataset.stock;
                        const productStatus = button.dataset.status;

                        document.getElementById("editProduct").value = productName;
                        document.getElementById("editCategory").value = productCategory;
                        document.getElementById("editPrice").value = productPrice;
                        document.getElementById("editStocks").value = ProductStock;
                        document.getElementById("editStatus").value = productStatus;

                        console.log(productName);
                        console.log(productCategory);
                        console.log(productPrice);
                        console.log(ProductStock);
                        console.log(productStatus);
                });
            }

        //remove the table row or data by clicking on the delete icon
            let selectedProductRow = null;

            // Get delete modal
        const deleteProductModal =
            document.getElementById("deleteProductModal");


        if (deleteProductModal) {

            deleteProductModal.addEventListener(
                "show.bs.modal",
                function (event) {

                    // Button that opened the delete modal
                    const button = event.relatedTarget;


                    // Find the row containing that button
                    selectedProductRow =
                        button.closest("tr");


                    // Get product name
                    const productName =
                        button.dataset.product;


                    console.log(
                        "Product selected for deletion:",
                        productName
                    );

                }
            );
        }


        // CONFIRM DELETE BUTTON
        // Change this ID if your Delete/OK button has a different ID.

        const confirmDeleteProduct =
            document.getElementById("confirmDeleteProduct");


        if (confirmDeleteProduct) {

            confirmDeleteProduct.addEventListener(
                "click",
                function () {

                    // Make sure a row was selected
                    if (!selectedProductRow) {
                        return;
                    }


                    // Remove ONLY the selected row
                    selectedProductRow.remove();


                    // Reset selected row
                    selectedProductRow = null;


                    // Close Bootstrap modal
                    const modalInstance =
                        bootstrap.Modal.getInstance(
                            deleteProductModal
                        );

                    if (modalInstance) {
                        modalInstance.hide();
                    }


                    // Success message
                    Swal.fire({
                        title: "Deleted!",
                        text: "Product has been deleted successfully.",
                        icon: "success",
                        confirmButtonText: "OK"
                    });

                }
            );
        }

        

//creating post methods to post and update data

                const form = document.getElementById("form_data");
                form.addEventListener("submit", async function(event){
                    event.preventDefault();

                    const formData = new FormData(form);
                    await addProduct(formData);
                }
            
        )

                async function addProduct(){
                    try{

                    const response= await fetch("https://mocki.io/v1/7f6badb1-6915-4cef-8fe5-5fef3d9f9900", {
                        method:"POST",
                        body: formData
                    });
                    console.log(response.status)
                    const data = await response.json();
                    console.log(data);

                    }
                
                    catch(error){
                        console.error("failed to add product", error)
                    }
                }
                



        

    //getting typed elements from search box

        function searchProduct() {

        let input = document.getElementById("searchInput").value();

        let rows = document.querySelectorAll("#productTable tbody tr");

        rows.forEach(function(row){

            let text = row.innerText.toLowerCase();

            if(text.includes(input)){
                row.style.display = "";
            }else{
                row.style.display = "none";
            }

        });

    }


    window.onload = (event)=>{
        // Call the function to test it
        getInventory();
    }

    //filtering of data when user searches for something

    const inputData = document.getElementById("searchInput");
    const tableData = document.getElementById("getInventoryData");
    
    inputData.addEventListener("input", function(){

        let input = this.value.trim().toUpperCase();

        const rows = document.querySelectorAll("tr");

        rows.forEach(row=>{
            const orderId =  row.cells[0].textContent.trim().toUpperCase();

            if(orderId.includes(input)){
               row.style.display =  "";
            }
            else{
                row.style.display = "none";
            }
        })

    })

    //applying validations in giving in input box

        const userRegex = /[^#A-Za-z0-9-]/g;

        const searchInput = document.getElementById("searchInput");

        searchInput.addEventListener("input", function () {

            this.value = this.value.replace(userRegex, "");

            const input = this.value.trim().toUpperCase();

            const rows = tableData.querySelectorAll("tr");

            rows.forEach(row => {

                const productName = row.cells[0].textContent
                    .trim()
                    .toUpperCase();

                if (
                    productName.includes(input)) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }

            });

        });


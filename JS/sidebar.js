// document.addEventListener("DOMContentLoaded", () => {
    //     // Find the div where we want the sidebar to go
    //     const sidebarContainer = document.getElementById('sidebar-container');
        
    //     if (sidebarContainer) {
    //         // Fetch the sidebar HTML file
    //         fetch('sidebar.html')
    //             .then(response => response.text())
    //             .then(data => {
    //                 sidebarContainer.innerHTML = data;
                    
    //                 // Optional: Highlight the correct link based on current page
    //                 const currentPage = window.location.pathname.split("/").pop();
    //                 const links = document.querySelectorAll('.nav-link');
                    
    //                 links.forEach(link => {
    //                     if (link.getAttribute('href') === currentPage) {
    //                         link.classList.add('active');
    //                     } else {
    //                         link.classList.remove('active');
    //                     }
    //                 });
    //             })
    //             .catch(error => console.error('Error loading sidebar:', error));
    //     }
    // });
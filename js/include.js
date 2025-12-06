// js/include.js
document.addEventListener('DOMContentLoaded', function() {
    // Get the current path and determine the correct location for navbar.html
    const isInResourcesFolder = window.location.pathname.includes('/resources/');
    const navbarPath = isInResourcesFolder ? '../navbar.html' : 'navbar.html';
    
    // Include navbar
    fetch(navbarPath)
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
            
            // Re-initialize Bootstrap dropdowns if needed
            var dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'))
            var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
                return new bootstrap.Dropdown(dropdownToggleEl)
            });
        })
        .catch(error => console.error('Error loading navbar:', error));
    
    // Optionally include footer too with the same logic
    const footerPath = isInResourcesFolder ? '../footer.html' : 'footer.html';
    fetch(footerPath)
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
});
// js/include.js
document.addEventListener('DOMContentLoaded', function() {
    // Try multiple possible locations for navbar
    const possibleNavbarPaths = [
        '/navbar.html',
        'navbar.html',
        '../navbar.html',
        '/classactivities/navbar.html',
        'classactivities/navbar.html'
    ];
    
    // Function to try loading from a path
    function tryLoadNavbar(paths, index = 0) {
        if (index >= paths.length) {
            console.error('Could not find navbar at any location');
            return;
        }
        
        fetch(paths[index])
            .then(response => {
                if (!response.ok) {
                    throw new Error('Not found');
                }
                return response.text();
            })
            .then(data => {
                document.getElementById('navbar-container').innerHTML = data;
                
                // Re-initialize Bootstrap dropdowns
                var dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'))
                var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
                    return new bootstrap.Dropdown(dropdownToggleEl)
                });
                
                console.log('Navbar loaded from:', paths[index]);
            })
            .catch(error => {
                console.log(`Trying next location... (failed: ${paths[index]})`);
                tryLoadNavbar(paths, index + 1);
            });
    }
    
    // Start trying to load the navbar
    tryLoadNavbar(possibleNavbarPaths);
});
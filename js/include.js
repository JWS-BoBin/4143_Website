// js/include.js
document.addEventListener('DOMContentLoaded', function() {
    // Load navbar from multiple possible locations
    loadNavbar();
    
    // Load footer
    loadFooter();
});

// Updated loadNavbar function
function loadNavbar() {
    const possibleNavbarPaths = [
        '/navbar.html',
        'navbar.html',
        '../navbar.html',
        '4143_website/navbar.html',
        '/classactivities/navbar.html',
        'classactivities/navbar.html'
    ];
    
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
                // Get the base path for the site
                const basePath = getBasePath();
                
                // Update links in navbar to use correct base path
                data = updateNavbarLinks(data, basePath);
                
                document.getElementById('navbar-container').innerHTML = data;
                
                // Re-initialize Bootstrap dropdowns
                var dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'))
                var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
                    return new bootstrap.Dropdown(dropdownToggleEl)
                });
                
                console.log('Navbar loaded from:', paths[index]);
                console.log('Base path set to:', basePath);
                
                // Also initialize navbar toggle functionality
                initializeNavbar();
            })
            .catch(error => {
                console.log(`Trying next location... (failed: ${paths[index]})`);
                tryLoadNavbar(paths, index + 1);
            });
    }
    
    tryLoadNavbar(possibleNavbarPaths);
}

function getBasePath() {
    // Get the current URL path
    const currentPath = window.location.pathname;
    
    // If we're in a subdirectory (like /4143_Website/), use that as base
    if (currentPath.includes('4143_Website')) {
        return '/4143_Website/';
    } else if (currentPath.includes('classactivities')) {
        return '/classactivities/';
    } else {
        return '/';
    }
}

function updateNavbarLinks(navbarHtml, basePath) {
    // Create a temporary div to parse the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = navbarHtml;
    
    // Update all links
    const links = tempDiv.querySelectorAll('a');
    links.forEach(link => {
        const href = link.getAttribute('href');
        
        // Skip if no href or if it's an external link
        if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) {
            return;
        }
        
        // If href starts with /, replace it with base path
        if (href.startsWith('/')) {
            const newHref = basePath + href.substring(1);
            link.setAttribute('href', newHref);
        } else if (href === 'index.html' || href === 'bibliography.html') {
            // For top-level pages, add base path
            link.setAttribute('href', basePath + href);
        } else if (href.startsWith('resources/') || href.startsWith('bibliography.html')) {
            // For resources and bibliography, add base path
            link.setAttribute('href', basePath + href);
        }
    });
    
    return tempDiv.innerHTML;
}

function loadFooter() {
    const possibleFooterPaths = [
        '/footer.html',
        'footer.html',
        '../footer.html',
        '4143_website/footer.html',
        '/classactivities/footer.html',
        'classactivities/footer.html'
    ];
    
    function tryLoadFooter(paths, index = 0) {
        if (index >= paths.length) {
            console.error('Could not find footer at any location');
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
                // Create or get footer container
                let footerContainer = document.getElementById('footer-container');
                if (!footerContainer) {
                    footerContainer = document.createElement('div');
                    footerContainer.id = 'footer-container';
                    document.body.appendChild(footerContainer);
                }
                footerContainer.innerHTML = data;
                
                // Set current year in footer
                setCurrentYear();
                
                console.log('Footer loaded from:', paths[index]);
            })
            .catch(error => {
                console.log(`Trying next location... (failed: ${paths[index]})`);
                tryLoadFooter(paths, index + 1);
            });
    }
    
    tryLoadFooter(possibleFooterPaths);
}

function initializeNavbar() {
    // Initialize navbar toggler for mobile view
    const navToggler = document.querySelector('.navbar-toggler');
    if (navToggler) {
        navToggler.addEventListener('click', function() {
            const target = this.getAttribute('data-bs-target');
            const navbarCollapse = document.querySelector(target);
            navbarCollapse.classList.toggle('show');
        });
    }
}

function setCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}
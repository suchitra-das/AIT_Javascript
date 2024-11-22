import { fetchAndRenderProducts } from '../js/home.js';
import { renderCartPage } from '../js/cart.js';
function loadPage(page) {
    const contentDiv = document.getElementById('content');
    
    fetch(page)
        .then(response => response.text())
        .then(html => {
            contentDiv.innerHTML = html;

            if (page === 'home.js.project.html' || page === 'products.html') {
                fetchAndRenderProducts(); // Fetch and render products for Home
            }else if(page === 'cart-1.html') {
                renderCartPage();
            }

        })
        .catch(err => {
            console.error('Error loading page:', err);
            contentDiv.innerHTML = `<p>Error loading page. Please try again later.</p>`;
        });
}



window.loadPage = loadPage;
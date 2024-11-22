let products = []; // Store fetched products

// Fetch and render products
const fetchAndRenderProducts = async () => {

    const container = document.getElementById("products-container");

    try {
        const response = await fetch("https://fakestoreapi.com/products");
        products = await response.json();
        renderProducts(products); // Render all products initially
    } catch (error) {
        console.error("Error fetching products:", error);
        container.innerHTML = `<p class="text-danger text-center">Failed to load products. Please try again later.</p>`;
    }
};

// Render products based on a given list
const renderProducts = (filteredProducts) => {
    const container = document.getElementById("products-container");
    container.innerHTML = ""; // Clear the container

    filteredProducts.forEach((product) => {
        const col = document.createElement("div");
        col.className = "col-lg-3 col-md-4 col-sm-6";

        col.innerHTML = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.title}" class="img-fluid">
                <h5 class="mt-2">${product.title.length > 10 ? product.title.substring(0, 10) + "..." : product.title}</h5>
                <p class="small">${product.description.substring(0, 90)}...</p>
                <hr>
                <p class="price">$${product.price}</p>
                <hr>
                <button class="btn btn-primary btn-sm">Details</button>
                <button class="btn btn-success btn-sm" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;

        container.appendChild(col);
    });
};

// Filter products by category and highlight the selected button
const filterProducts = (category, button) => {
    const buttons = document.querySelectorAll("#filter-buttons input");
    buttons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    if (category === "all") {
        renderProducts(products);
    } else {
        const filtered = products.filter((product) =>
            product.category.toLowerCase() === category.toLowerCase()
        );
        renderProducts(filtered);
    }
};

// Global cart object to hold product details and counts
const cart = {};

// Function to add items to the cart
function addToCart(productId) {
    if (cart[productId]) {
        cart[productId].count += 1; // Increment count
    } else {
        const productDetails = products.find(product => product.id === productId);
        cart[productId] = {
            ...productDetails,
            count: 1,
        };
    }

    // Save the cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    // Update the cart count in the UI
    updateCartCount();
}


// Call the renderCartPage function when the cart page is loaded

// Function to update cart count in the navbar
function updateCartCount() {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || {};
    const totalCount = Object.values(storedCart).reduce((sum, item) => sum + item.count, 0);
    document.querySelector('.cart-count').textContent = `${totalCount}`;
}



// Export functions (optional if using modules)
export { fetchAndRenderProducts, filterProducts,updateCartCount };
window.filterProducts = filterProducts;
window.addToCart = addToCart;
window.updateCartCount = updateCartCount;



// function updateCartCount(selectedIndex) {
//     const product = products[selectedIndex];
//     const cart = JSON.parse(localStorage.getItem('cart')) || [];
//     const productIndex = cart.findIndex(item => item.id === product.id);

//     if (productIndex >= 0) {
//         cart[productIndex].quantity++;
//     } else {
//         product.quantity = 1;
//         cart.push(product);
//     }

//     localStorage.setItem('cart', JSON.stringify(cart));
//     updateCartCount();
// }
function renderCartPage() {
    const cartContainer = document.getElementById('cart-items');
    const summaryContainer = document.getElementById('cart-summary');
    const emptyContainer = document.getElementById('cart-empty');
    // Fetch cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    // Clear previous cart content
    cartContainer.innerHTML = '';
    summaryContainer.innerHTML = '';
    emptyContainer.innerHTML = '';

    let totalAmount = 0;
    let totalItems = 0;
    console.log(cart);
    
    if(Object.keys(cart).length < 1 || Object.keys(cart).length === undefined) {
        emptyContainer.innerHTML += `
         <Section class="container-1">
       <center><h1>Cart</h1></center> 
       <hr>
       <div class="container">
        <p style="padding:0px; margin-bottom: 0px;">Your Cart Empty</p>
        <a href="..\html\practice.html"><input type="button" id="btn"value="&larr; Continue Shopping"/></a>
       </div>
    </Section>
        
        ` }else {
  // Render each cart item
  Object.values(cart).forEach(item => {
    const { title, price, count, id, image } = item;
    totalItems += count;
    totalAmount += price * count;

    cartContainer.innerHTML += `
        <div class="cart-item">
            <img src="${image}" alt="${title}" width="50">
            <p>${title}</p>
            <p>$${price}</p>
            <div>
                <button onclick="decrementItem('${id}')">-</button>
                <span>${count}</span>
                <button onclick="incrementItem('${id}')">+</button>
            </div>
            <p>$${(price * count).toFixed(2)}</p>
        </div>
    `;
});

// Update the summary
summaryContainer.innerHTML = `
    <p>Products (${totalItems}): $${totalAmount.toFixed(2)}</p>
    <p>Shipping: $30</p>
    <p>Total: $${(totalAmount + 30).toFixed(2)}</p>
    <button onclick="checkout()">Go to Checkout</button>
`;
    }

  
}
function incrementItem(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    cart[productId].count += 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartPage();
    updateCartCount();
}

function decrementItem(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    if (cart[productId].count > 1) {
        cart[productId].count -= 1;
    } else {
        delete cart[productId]; // Remove item from cart
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartPage();
    updateCartCount();
}



export { renderCartPage,decrementItem,incrementItem };
window.renderCartPage = renderCartPage;
window.decrementItem = decrementItem;
window.incrementItem = incrementItem;
// JavaScript for handling the cart functionality
document.addEventListener('DOMContentLoaded', function() {
    const cart = [];
    const cartCountElement = document.getElementById('cart-count');
    const cartItemsElement = document.getElementById('cart-items');
    const orderTotalElement = document.getElementById('order-total');

    // Function to update the cart UI
    function updateCart() {
        cartItemsElement.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            cartItemsElement.appendChild(li);
            total += item.price;
        });

        cartCountElement.textContent = cart.length;
        orderTotalElement.textContent = `$${total.toFixed(2)}`;
    }

    // Add to cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const dessertItem = this.parentElement;
            const name = dessertItem.getAttribute('data-name');
            const price = parseFloat(dessertItem.getAttribute('data-price'));

            cart.push({ name, price });
            updateCart();
        });
    });

    // Confirm order button
    document.querySelector('.confirm-order').addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Your cart is empty!');
        } else {
            alert('Order confirmed!');
        }
    });
});

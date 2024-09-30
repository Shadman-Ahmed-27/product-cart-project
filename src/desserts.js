document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.getElementById('cart-count');
    const cartItemsElement = document.getElementById('cart-items');
    const orderTotalElement = document.getElementById('order-total');
    const modal = document.getElementById('order-modal');
    const modalCloseBtn = document.querySelector('.close');
    const modalCartItems = document.getElementById('modal-cart-items');
    const modalTotalElement = document.getElementById('modal-total');
    const confirmOrderBtn = document.getElementById('close-order');

    // Function to update the cart UI
    function updateCart() {
        cartItemsElement.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `${item.name} - $${item.price.toFixed(2)} <button class="remove-item">Remove</button>`;
            cartItemsElement.appendChild(li);

            const removeButton = li.querySelector('.remove-item');
            removeButton.addEventListener('click', () => {
                cart.splice(cart.indexOf(item), 1);
                saveCart();
                updateCart();
            });

            total += item.price;
        });

        cartCountElement.textContent = cart.length;
        orderTotalElement.textContent = `$${total.toFixed(2)}`;
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Function to save the cart to local storage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Add to cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const dessertItem = this.parentElement;
            const name = dessertItem.getAttribute('data-name');
            const price = parseFloat(dessertItem.getAttribute('data-price'));

            const existingItem = cart.find(item => item.name === name);
            if (existingItem) {
                existingItem.price += price; // Add the price for multiple items
            } else {
                cart.push({ name, price });
            }

            saveCart();
            updateCart();
        });
    });

    // Show modal with order summary
    document.querySelector('.confirm-order').addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Your cart is empty!');
        } else {
            modalCartItems.innerHTML = '';
            cart.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
                modalCartItems.appendChild(li);
            });

            const total = cart.reduce((sum, item) => sum + item.price, 0);
            modalTotalElement.textContent = `$${total.toFixed(2)}`;
            modal.classList.remove('hidden');
        }
    });

    // Close modal functionality
    modalCloseBtn.addEventListener('click', function() {
        modal.classList.add('hidden');
    });

    confirmOrderBtn.addEventListener('click', function() {
        alert('Order Confirmed!');
        cart.length = 0;
        saveCart();
        updateCart();
        modal.classList.add('hidden');
    });

    updateCart();
});

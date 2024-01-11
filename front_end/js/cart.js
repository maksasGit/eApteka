document.addEventListener('DOMContentLoaded', function () {
    // updateNavbarForUserStatus();
    updateCartCount();
    displayCartContents();
    updateLiveDate();
    updateTotalPrice(); // Call the new function to update the total price
});

// Add this function to calculate and display the total price
function updateTotalPrice() {
    const totalPriceElement = document.getElementById('price'); // Assuming this is the element where you want to display the total price

    if (totalPriceElement) {
        let totalPrice = 0;

        cart.forEach(product => {
            const quantityInput = document.getElementById(product.name);
            // const productPriceElement = document.querySelector(`.product-price[data-product-id="${product.productId}"]`);

            if (quantityInput) {
                const quantity = parseInt(quantityInput.value);
                const productPrice = parseFloat(product.maxPrice);

                totalPrice += quantity * productPrice;
            }
        });

        totalPriceElement.textContent = totalPrice.toFixed(2) + 'zł';
    }
}
function deleteFromCart(product){
    cart.splice(cart.indexOf(product),1);
    setCookie('cart', JSON.stringify(cart), 7); // Store the cart in a cookie for 7 days
    updateCartCount();
    updateTotalPrice();
    location.reload();
}


function displayCartContents() {
    const cartItemsContainer = document.querySelector('.card-body');
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = '';
        cart.forEach(product => {

            const itemRow = document.createElement('div');
            itemRow.classList.add('row');

            const imgDiv = document.createElement('div');
            imgDiv.classList.add('col-lg-3', 'col-md-12', 'mb-4', 'mb-lg-0');
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('bg-image', 'hover-overlay', 'hover-zoom', 'ripple', 'rounded');
            imgContainer.setAttribute('data-mdb-ripple-color', 'light');
            const img = document.createElement('img');
            img.src = product.imageUrl;
            img.classList.add('w-100');
            img.alt = product.name;
            imgContainer.appendChild(img);
            const imgLink = document.createElement('a');
            imgLink.href = '#!';
            const imgMask = document.createElement('div');
            imgMask.classList.add('mask');
            imgMask.style.backgroundColor = 'rgba(251, 251, 251, 0.2)';
            imgLink.appendChild(imgMask);
            imgContainer.appendChild(imgLink);
            imgDiv.appendChild(imgContainer);

            const nameDiv = document.createElement('div');
            nameDiv.classList.add('col-lg-5', 'col-md-6', 'mb-4', 'mb-lg-0');
            const productName = document.createElement('p');
            productName.textContent = product.name;
            nameDiv.appendChild(productName);

            // Add other product details here

            itemRow.appendChild(imgDiv);
            itemRow.appendChild(nameDiv);

            // Add quantity and price divs here

            const quantityDiv = document.createElement('div');
            quantityDiv.classList.add('col-lg-4', 'col-md-6', 'mb-4', 'mb-lg-0');
            const quantityContainer = document.createElement('div');
            quantityContainer.classList.add('d-flex', 'mb-4');
            quantityContainer.style.maxWidth = '300px';
            // const decreaseButton = document.createElement('button');
            // decreaseButton.classList.add('btn', 'btn-primary', 'px-3', 'me-2');
            // decreaseButton.onclick = function() { this.parentNode.querySelector('input[type=number]').stepDown() };
            // decreaseButton.innerHTML = '<i class="fas fa-minus"></i>';
            const increaseButton = document.createElement('button');
            increaseButton.classList.add('btn', 'btn-danger', 'px-3', 'ms-3');
            increaseButton.onclick = function() {deleteFromCart(product);};
            increaseButton.innerHTML = '<i class="bi bi-trash"></i>';
            const quantityInputContainer = document.createElement('div');
            quantityInputContainer.classList.add('form-outline');
            const quantityInput = document.createElement('input');
            quantityInput.id = product.name;
            quantityInput.min = '0';
            quantityInput.name = 'quantity';
            quantityInput.value = '1';
            quantityInput.type = 'number';
            quantityInput.classList.add('form-control');
            quantityInput.addEventListener('input', function () {
                updateTotalPrice();
            });
            const quantityLabel = document.createElement('label');
            quantityLabel.classList.add('form-label');
            quantityLabel.for = 'form1';
            // quantityLabel.textContent = 'Ilość';
            quantityInputContainer.appendChild(quantityInput);
            quantityInputContainer.appendChild(quantityLabel);
            // quantityContainer.appendChild(decreaseButton);
            quantityContainer.appendChild(quantityInputContainer);
            quantityContainer.appendChild(increaseButton);
            quantityDiv.appendChild(quantityContainer);

            const priceP = document.createElement('p');
            priceP.classList.add('text-start', 'text-md-center');
            priceP.innerHTML = '<p>Сena: <strong>' + product.maxPrice + 'zł</strong></p>';
            quantityDiv.appendChild(priceP);

            itemRow.appendChild(quantityDiv);

            cartItemsContainer.appendChild(itemRow);
        });
    }
}

function updateLiveDate() {
    // Create a new Date object
    var currentDate = new Date();

    currentDate.setDate(currentDate.getDate() + 3);
  
    // Format the date as you want (you can customize this part)
    var formattedDate = currentDate.toDateString();
  
    // Get the element with the ID "liveDate" and set its text content
    document.getElementById("delivery-date").textContent = formattedDate;
  }
  
  // Call the function initially to display the date when the page loads

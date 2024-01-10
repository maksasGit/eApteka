let cart = JSON.parse(getCookie('cart')) || [];

//delete product from the cart
function deleteFromCart(product){
    cart.splice(cart.indexOf(product),1);
    setCookie('cart', JSON.stringify(cart), 7); // Store the cart in a cookie for 7 days
    updateCartCount();
    // location.reload();
}
//add a product to the cart
function addToCart(product) {
    cart.push(product);
    setCookie('cart', JSON.stringify(cart), 7); // Store the cart in a cookie for 7 days
    updateCartCount();
}

// Update cart count in UI
function updateCartCount() {
    const cartCountElement = document.querySelector('.bi-cart-fill + span');
    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
}

function redirectToCart() {
    window.location.href = "cart.html";
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
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
            quantityInput.id = 'form1';
            quantityInput.min = '0';
            quantityInput.name = 'quantity';
            quantityInput.value = '1';
            quantityInput.type = 'number';
            quantityInput.classList.add('form-control');
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
            // priceP.textContent = maxPrice; // Replace with actual price
            quantityDiv.appendChild(priceP);
            
            itemRow.appendChild(quantityDiv);
            
            cartItemsContainer.appendChild(itemRow);
        });
    }
  }
  
  


document.addEventListener('DOMContentLoaded', function () {
    updateNavbarForUserStatus();
    updateCartCount();
    
    if (!window.location.pathname.includes("cart.html")) {
        fetch('https://mocki.io/v1/4dc9188b-4d45-47f9-9725-5d58d559492e')
            .then(response => response.json())
            .then(products => {
                const productsContainer = document.getElementById('productsContainer');
                if (productsContainer) {
                    products.forEach(product => {
                        const colDiv = document.createElement('div');
                        colDiv.classList.add('col', 'mb-5');

                        const cardDiv = document.createElement('div');
                        cardDiv.classList.add('card', 'h-100');

                        const img = document.createElement('img');
                        img.classList.add('card-img-top');
                        img.src = product.imageUrl;
                        img.alt = 'Product Image';

                        const cardBodyDiv = document.createElement('div');
                        cardBodyDiv.classList.add('card-body', 'p-4');

                        const textCenterDiv = document.createElement('div');
                        textCenterDiv.classList.add('text-center');

                        const productName = document.createElement('h5');
                        productName.classList.add('fw-bolder');
                        productName.textContent = product.name;

                        const productPrice = document.createElement('p');
                        productPrice.textContent = `${product.minPrice}zł - ${product.maxPrice}zł`;

                        textCenterDiv.appendChild(productName);
                        textCenterDiv.appendChild(productPrice);
                        cardBodyDiv.appendChild(textCenterDiv);
                        cardDiv.appendChild(img);
                        cardDiv.appendChild(cardBodyDiv);

                        const cardFooterDiv = document.createElement('div');
                        cardFooterDiv.classList.add('card-footer', 'p-4', 'pt-0', 'border-top-0', 'bg-transparent');

                        const footerTextCenterDiv = document.createElement('div');
                        footerTextCenterDiv.classList.add('text-center');

                        const addToCartBtn = document.createElement('button');
                        addToCartBtn.classList.add('btn', 'btn-outline-dark', 'mt-3');
                        addToCartBtn.textContent = 'Add to cart';
                        addToCartBtn.onclick = function() {
                            addToCart(product);
                        };

                        footerTextCenterDiv.appendChild(addToCartBtn);
                        cardFooterDiv.appendChild(footerTextCenterDiv);
                        cardDiv.appendChild(cardFooterDiv);
                        colDiv.appendChild(cardDiv);

                        productsContainer.appendChild(colDiv);
                    });
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }


    if (window.location.pathname.includes("cart.html")) {
        displayCartContents();
    }

   
    const userStatusElement = document.getElementById('userStatus');
    const user = getCookie('user');
    if (user) {
        const userData = JSON.parse(user);
        userStatusElement.innerHTML = `<p>Logged in as: <strong>${userData.username}</strong></p>`;
    } else {
        
            userStatusElement.innerHTML = '<p>You are not logged in</p>';
        
    }

    
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(event.target);
            const user = Object.fromEntries(formData.entries());

            fetch('http://localhost:8080/users/register', {
                method: 'POST',
                body: JSON.stringify(user),
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setCookie('user', JSON.stringify(data), 7); 
                window.location.href = 'index.html'; 
            })
            .catch(error => console.error('Error:', error));
        });
    }
});



document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const user = Object.fromEntries(formData.entries());

    fetch('http://localhost:8080/users/register', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data && data.username) { 
            console.log(data);
            setCookie('user', JSON.stringify(data), 7); 
            window.location.href = 'index.html'; 
        } else {
            console.error('Registration failed');
            
        }
    })
    .catch(error => {
        console.error('Error:', error);
        
    });
});
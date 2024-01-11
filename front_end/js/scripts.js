let cart = JSON.parse(getCookie('cart')) || [];

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
    updateCartCount();
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

function isInCart(product) {
    const productName = product.name; // Assuming your product object has an 'id' property
    return cart.some(item => item.name === productName);
}

function updateNavbarForUserStatus() {
    const user = getCookie('user');
    const userDropdown = document.getElementById('userDropdown');
    const registerButton = document.getElementById('registerButton');
    const loginButton = document.getElementById('loginButton');

    if (user) {
        const userData = JSON.parse(user);
        userDropdown.style.display = 'block';
        userDropdown.querySelector('.dropdown-toggle').textContent = userData.username;
        registerButton.style.display = 'none';
        loginButton.style.display = 'none';
    } else {
        userDropdown.style.display = 'none';
        registerButton.style.display = 'block';
        loginButton.style.display = 'block';
    }
}



function deleteFromCart(product){
    cart.splice(cart.indexOf(product),1);
    setCookie('cart', JSON.stringify(cart), 7); // Store the cart in a cookie for 7 days
    updateCartCount();
}


function logout() {
    // Видаліть кукі 'user'
    setCookie('user', '', -1); // Встановіть минулу дату, щоб видалити кукі
    window.location.reload(); // Перезавантажте сторінку, щоб оновити стан
}



document.addEventListener('DOMContentLoaded', function () {
     updateNavbarForUserStatus();
     updateCartCount();
    
    if (window.location.pathname.includes("index.html")) {
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
                        addToCartBtn.classList.add('btn', 'btn-outline-dark', 'mt-3', 'addToCartBtn');
                        addToCartBtn.textContent = 'Dodaj do koszyka';
                        addToCartBtn.onclick = function() {
                            if (isInCart(product)) {
                                deleteFromCart(product);
                                addToCartBtn.textContent = 'Dodaj do koszyka';
                            } else {
                                addToCart(product);
                                addToCartBtn.textContent = 'Usuń z koszyka';
                            }
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
            return response.json().then(err => {
                throw new Error(err.message || 'Registration failed due to an unknown error');
            });
        }
        return response.json();
    })
    .then(data => {
        if (data && data.username) {
            console.log('Registration successful:', data);
            setCookie('user', JSON.stringify(data), 7);
            window.location.href = 'index.html';
        } else {
            throw new Error('Registration failed: No user data returned');
        }
    })
    .catch(error => {
        console.error('Error:', error.message);
        alert(error.message); // Display specific error message to the user
    });
});


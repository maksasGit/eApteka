//get the cart from the cooki
let cart = JSON.parse(getCookie('cart')) || [];

//add a product to the cart
function addToCart(product) {
    cart.push(product);
    setCookie('cart', JSON.stringify(cart), 7); // Store the cart in a cookie for 7 days
    updateCartCount();
}

//cart count in  UI
function updateCartCount() {
    const cartCountElement = document.querySelector('.bi-cart-fill + span');
    cartCountElement.textContent = cart.length;
}

function redirectToCart() {
  window.location.href = "cart.html";
}

//set a cookie
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

//get a cookie
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
          const img = document.createElement('img');
          img.src = product.imageUrl;
          img.classList.add('w-100');
          imgDiv.appendChild(img);

          const nameDiv = document.createElement('div');
          nameDiv.classList.add('col-lg-5', 'col-md-6', 'mb-4', 'mb-lg-0');
          const productName = document.createElement('p');
          productName.textContent = product.name;
          nameDiv.appendChild(productName);

          
          itemRow.appendChild(imgDiv);
          itemRow.appendChild(nameDiv);
          
          
          cartItemsContainer.appendChild(itemRow);
      });
  }
}


document.addEventListener('DOMContentLoaded', function () {
    updateCartCount(); 

    
    if (!window.location.pathname.includes("cart.html")) {
        fetch('https://mocki.io/v1/c01691bb-7f61-447c-9e77-ca8b2748ff66')
        .then(response => response.json())
        .then(data => {
            const productsContainer = document.getElementById('productsContainer');

            data.forEach(product => {
          
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
              productPrice.textContent = `$${product.minPrice} - $${product.maxPrice}`; 
          
              
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
              addToCartBtn.textContent = 'Do koszyka';
              addToCartBtn.onclick = function() {
                  addToCart(product); 
              };
          
            
              footerTextCenterDiv.appendChild(addToCartBtn);
              cardFooterDiv.appendChild(footerTextCenterDiv);
              cardDiv.appendChild(cardFooterDiv);
              colDiv.appendChild(cardDiv);
          
              
              productsContainer.appendChild(colDiv);
          });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    //display the cart contents if on the cart page
    if (window.location.pathname.includes("cart.html")) {
        displayCartContents();
    }
});


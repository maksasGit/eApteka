
let cart = [];

//add a product
function addToCart(product) {
  cart.push(product);
  
  //Update  count in  UI
  updateCartCount();
}


function updateCartCount() {
  const cartCountElement = document.querySelector('.bi-cart-fill + span');
  cartCountElement.textContent = cart.length;
}

document.addEventListener('DOMContentLoaded', function () {
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
});


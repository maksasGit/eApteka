fetch('https://mocki.io/v1/c01691bb-7f61-447c-9e77-ca8b2748ff66')
  .then(response => response.json())
  .then(data => {
    const productsContainer = document.getElementById('productsContainer'); // Replace with your actual container ID

    data.forEach(product => {
      // Create column div
      const colDiv = document.createElement('div');
      colDiv.classList.add('col', 'mb-5');

      // Create card div
      const cardDiv = document.createElement('div');
      cardDiv.classList.add('card', 'h-100');

      // Create image
      const img = document.createElement('img');
      img.classList.add('card-img-top');
      img.src = product.imageUrl; // Replace 'imageUrl' with your API response key
      img.alt = 'Product Image';

      // Create card body div
      const cardBodyDiv = document.createElement('div');
      cardBodyDiv.classList.add('card-body', 'p-4');

      // Center text div
      const textCenterDiv = document.createElement('div');
      textCenterDiv.classList.add('text-center');

      // Product name
      const productName = document.createElement('h5');
      productName.classList.add('fw-bolder');
      productName.textContent = product.name; // Replace 'name' with your API response key

      // Product price
      const productPrice = document.createElement('p');
      productPrice.textContent = `$${product.minPrice} - $${product.maxPrice}`; // Replace with your API response keys

      // Append name and price to card body
      textCenterDiv.appendChild(productName);
      textCenterDiv.appendChild(productPrice);
      cardBodyDiv.appendChild(textCenterDiv);
      cardDiv.appendChild(img);
      cardDiv.appendChild(cardBodyDiv);

      // Create card footer div
      const cardFooterDiv = document.createElement('div');
      cardFooterDiv.classList.add('card-footer', 'p-4', 'pt-0', 'border-top-0', 'bg-transparent');

      // Center text in card footer
      const footerTextCenterDiv = document.createElement('div');
      footerTextCenterDiv.classList.add('text-center');


      // Create 'Add to Cart' button
      const addToCartBtn = document.createElement('button');
      addToCartBtn.classList.add('btn', 'btn-outline-dark', 'mt-3');
      addToCartBtn.textContent = 'Do koszyka';
      addToCartBtn.onclick = function() {
        console.log('Added to cart:', product.name); // Replace with actual cart functionality
      };

      // Append buttons to footer

      footerTextCenterDiv.appendChild(addToCartBtn);
      cardFooterDiv.appendChild(footerTextCenterDiv);
      cardDiv.appendChild(cardFooterDiv);
      colDiv.appendChild(cardDiv);

      // Append the column to the products container
      productsContainer.appendChild(colDiv);
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

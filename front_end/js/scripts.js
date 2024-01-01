// Fetch data from the API (assuming it returns an array of products)
fetch('https://mocki.io/v1/c01691bb-7f61-447c-9e77-ca8b2748ff66')
  .then(response => response.json())
  .then(data => {
    // Assuming 'data' is an array of products

    // Get the container where the products will be displayed
    const productsContainer = document.getElementById('productsContainer'); // Replace 'productsContainer' with the actual ID of the container

    // Loop through the products and create HTML elements for each
    data.forEach(product => {
      // Create elements
      const colDiv = document.createElement('div');
      colDiv.classList.add('col', 'mb-5');

      const cardDiv = document.createElement('div');
      cardDiv.classList.add('card', 'h-100');

      const img = document.createElement('img');
      img.classList.add('card-img-top');
      img.src = product.imageUrl; // Replace 'imageUrl' with the key that holds the image URL in your API response
      img.alt = 'Product Image';

      const cardBodyDiv = document.createElement('div');
      cardBodyDiv.classList.add('card-body', 'p-4');

      const textCenterDiv = document.createElement('div');
      textCenterDiv.classList.add('text-center');

      const productName = document.createElement('h5');
      productName.classList.add('fw-bolder');
      productName.textContent = product.name; // Replace 'name' with the key that holds the product name in your API response

      const productPrice = document.createElement('p');
      productPrice.textContent = `$${product.minPrice} - $${product.maxPrice}`; // Replace 'minPrice' and 'maxPrice' with the keys that hold the price range in your API response

      const cardFooterDiv = document.createElement('div');
      cardFooterDiv.classList.add('card-footer', 'p-4', 'pt-0', 'border-top-0', 'bg-transparent');

      const footerTextCenterDiv = document.createElement('div');
      footerTextCenterDiv.classList.add('text-center');

      const viewOptionsBtn = document.createElement('a');
      viewOptionsBtn.classList.add('btn', 'btn-outline-dark', 'mt-auto');
      viewOptionsBtn.href = '#';
      viewOptionsBtn.textContent = 'View options';

      // Append elements to their respective parents
      textCenterDiv.appendChild(productName);
      textCenterDiv.appendChild(productPrice);
      cardBodyDiv.appendChild(textCenterDiv);
      cardDiv.appendChild(img);
      cardDiv.appendChild(cardBodyDiv);
      footerTextCenterDiv.appendChild(viewOptionsBtn);
      cardFooterDiv.appendChild(footerTextCenterDiv);
      cardDiv.appendChild(cardFooterDiv);
      colDiv.appendChild(cardDiv);

      // Append the new product card to the container
      productsContainer.appendChild(colDiv);
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

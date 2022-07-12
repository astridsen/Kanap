const _productsList = document.getElementById('items');

const getProductsFromApi = () => {
  return fetch("http://localhost:3000/api/products")
  	.then((res) => {
      if (!res.ok) {
        throw new Error('Error retrieving products!');
      }
    	return res.json();
    })
};

function displayProducts(products) {
    if (!hasProducts(products)) {
        throw new Error('No products found!');
    }
    products.forEach((product) => addProductToProductsList(product));
}

const hasProducts = (products) => {
  return products.length !== 0;
}

const addProductToProductsList = (product) => {
  const _productLink = document.createElement('a');
  _productLink.href = `./product.html?id=${product._id}`;
  
  const _productArticle = document.createElement('article');
  
  const _productImage = createImage(product.imageUrl, product.altTxt);
  
  const _productName = document.createElement('h3');
  _productName.innerHTML = `${product.name}`;

  const _productDescription = document.createElement('p');
  _productDescription.innerHTML = `${product.description}`;
  
  _productsList.appendChild(_productLink);
  _productLink.appendChild(_productArticle);
  _productArticle.appendChild(_productImage);
  _productArticle.appendChild(_productName);
  _productArticle.appendChild(_productDescription);

};



const createImage = (src, alt) => {
  const _image = document.createElement('img');
  _image.src = src;
  _image.alt = alt;
  
  return _image;
};

const displayError = (err) => {
    alert("Produit indisponible")
}

getProductsFromApi()
	.then(displayProducts)
	.catch(displayError)


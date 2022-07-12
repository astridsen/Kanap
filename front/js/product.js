//Faire le lien entre le produit sur la page d'accueil et la page produit

let str = window.location.href;
let url = new URL(str);
let id = url.searchParams.get("id");

console.log(id)

//Éléments à afficher sur la page produit
const productImg = document.getElementsByClassName(".item__img");
const productTitle = document.getElementById("title");
const productPrice = document.getElementById("price");
const productDescription = document.getElementById("description");
const productColor = document.getElementById("colors");

fetch('http://localhost:3000/api/products')
.then(function(res) {
    if (res.ok) {
        return res.json();
    }
})
.then(function(product) {
    productImg.innerHTML = `${product.imageUrl}`
    productTitle.innerHTml = `${product.name}`
    productPrice.innerHTML = `${product.price}`
    productDescription.innerHTML = `${product.description}`
})
.catch(function(err) {
    alert("Erreur produit")
});

/**Création de la constante items
const items = document.getElementById("items");

//Récupérer les informations de l'API
fetch("http://localhost:3000/api/products")
.then(function(res) {
    if (res.ok) {
        return res.json();
    }
})
//Affichage des informations produits
.then(function(products) {
    for (let product of products) {
        items.innerHTML += `<a href="./product.html?id=${product._id}">
        <article>
        <img src="${product.imageUrl}" alt="${product.altTxt}">
        <h3 class="productName">${product.name}</h3>
        <p class="productDescription">${product.description}</p>
        </article>   
        </a>`
    } ;
})
//Affichage d'un message d'erreur si les informations d'un produit ne peuvent pas être réupérés
.catch(function(err) {
    alert("Produit indisponible")
});


/**
 * const _productsList = document.getElementById('items');

getProductsFromApi()
	.then(displayProducts)
	.catch(displayError);

const getProductsFromApi = () => {
  return fetch("http://localhost:3000/api/products")
  	.then((res) => {
      if (!res.ok) {
        throw new Error('Error retrieving products!');
      }
    
    	return res.json();
    })
};

const displayProducts = (products) => {
  if (!hasProducts(products) {
    throw new Error('No products found!');
  }

	products.forEach((product) => addProductToProductsList(product));
};

const hasProducts = (products) => {
  return products.length !== 0;
}

const addProductToProductsList = (product) => {
  const _productLink = document.createElement('a');
  _productLink.href = `./product.html?id=${product._id}`;
  
  const _productArticle = document.createElement('article');
  
  const _productImage = createImage(product.imageUrl, product.altTxt);
  
  
  // ...
  
  _productsList.appendChild(_productLink);
};

const createImage = (src, alt) => {
  const _image = document.createElement('img');
  _img.src = src;
  _img.alt = alt;
  
  return _image;
};




//Création de la constante items
const items = document.getElementById("items");

//Récupérer les informations de l'API

.then(function(res) {
    if (res.ok) {
        return res.json();
    }
})
//Affichage des informations produits
.then(function(products) {
    for (let product of products) {
        items.innerHTML += `<a href="./product.html?id=${product._id}">
        <article>
        <img src="${product.imageUrl}" alt="${product.altTxt}">
        <h3 class="productName">${product.name}</h3>
        <p class="productDescription">${product.description}</p>
        </article>   
        </a>`
    } ;
})
//Affichage d'un message d'erreur si les informations d'un produit ne peuvent pas être réupérés
.catch(function(err) {
    alert("Produit indisponible")
});



















// Product

getProductIdFromUrl()
	.then(getProductFromApi)
	.then(displayProduct)
	.catch(displayError);


const getProductIdFromUrl = () => {
  const url = new UrlParams();
  
  return url.get('id');
};

const getProductFromApi = (productId) => getJsonFromApi(`/api/products?id=${productId}`);

const displayProduct = (product) => {
  
  
};

const displayError = (err) => {
  alert(err);
};



const getJsonFromApi = (url) => {
  return fetch(url);
  	.then((res) => {
    	if (!res.ok) {
        throw new Error('...');
      }
      
      return res.json();
    })
  	.catch((err) => alert(err));  
};

 */

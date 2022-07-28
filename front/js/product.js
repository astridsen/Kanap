// 
const productColors = [];

//Récupération de l'ID dans l'url
const url = new URL(window.location.href);
const searchId = url.searchParams.get('id');

const getProductIdFromUrl = (UrlId) => {
  if (searchId === null) {
    return Promise.reject(newError('Echec de récupération id produit depuis URL'));
  }
      
  return Promise.resolve(searchId);
};

//Lien entre l'ID récupéré dans l'URL et les informations de l'API
const getProductFromApi = (productId) => getJsonFromApi(`http://localhost:3000/api/products/${productId}`);

const getJsonFromApi = (url) => {
    return fetch(url)
        .then((res) => {
          if (!res.ok) {
          throw new Error('Error retrieving products!');
        }
        return res.json();
      })
        .catch((err) => alert(err));  
};

//Affichage des informations
const displayProduct = (product) => {
    // Affichage de l'image
    const productImg = createImage(product.imageUrl, product.altTxt);
    document.querySelector(".item__img").appendChild(productImg);

    // Affichage du titre
    const productName = document.getElementById('title');
    productName.textContent = product.name;

    // Affichage du prix
    const productPrice = document.getElementById('price');
    productPrice.textContent = product.price;

    // Affichage de la description
    const productDescription = document.getElementById('description');
    productDescription.textContent = product.description;

    // Affichage des couleurs
    const _productColors = document.querySelector("#colors");
    for (let color of product.colors) {
      _productColors.appendChild(createOption(color));
      
      productColors.push(colors);  
    }
}

const createOption = (value) => {
  const _option = document.createElement('option');
  _option.value = value;
  _option.textContent = value;

  return _option;
}

const createImage = (src, alt) => {
    const _image = document.createElement('img');
    _image.src = src;
    _image.alt = alt;
    
    return _image;
};

const displayError = (err) => {
    alert("Produit indisponible")
}

getProductIdFromUrl()
    .then(getProductFromApi)
    .then(displayProduct)
    .catch(displayError)


//Ajout des articles au panier 
const addToCart = document.querySelector("#addToCart"); 
const color = document.querySelector("#colors");
const quantity = document.querySelector("#quantity");

const errorColor = (color) => {
    alert("La couleur que vous avez sélectionnée " + color + " est invalide. Veuillez sélectionner une couleur valide!");
}

const errorQuantity = (quantity) => {
    alert("Veuillez sélectionner une quantité pour ce produit comprise entre 1 et 100. Vous aviez choisi " + quantity);
}

const validateColor = (color) => {
  return productColors.indexOf(color) >= -1;
};

const validateQuantity = (quantity) => {
  return quantity <= 100 && quantity > 0;
}  

addToCart.addEventListener('click', () => {  
    const product = {
        id: searchId,
        color: color.value,
        quantity: parseInt(quantity.value, 10),
    }        
    if (!validateColor(product.color) || product.color === "") {
        return errorColor(product.color);
    } 
    if (!validateQuantity(product.quantity)) {
        return errorQuantity(product.quantity);
    }
    addToBasket(product);
    alert('Le produit a bien été ajouté au panier')
});
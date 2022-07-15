//Récupération de l'ID dans l'url
const str = window.location.href;
const url = new URL(str);


const getProductIdFromUrl = (UrlId) => {
    return new Promise((resolve, reject) => {
        const id = url.searchParams.get("id");
        resolve(id);
        reject(newError('Echec de récupération id produit depuis URL'));
    });
}

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
    for (let colors of product.colors){
        console.table(colors);
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.textContent = colors;
    }
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
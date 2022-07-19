//Récupérer les informations du LocalStorage
let productInLocalStorage = JSON.parse(localStorage.getItem("basket"));
let cartTotalPrice = 0
let cartTotalItems = 0

//Récupérer les informations contenues dans le localstorage et faire le lien avec l'API

function getProduct(productInLocalStorage) {
    fetch(`http://localhost:3000/api/products/${productInLocalStorage.id}`)
        .then((response) => {
            return response.json();
        })
        .then((productAPI) => {
            displayProductInCart(productInLocalStorage, productAPI);
        })
        .catch((error) => {
            alert('Impossible de récupérer les données de l API')
        });
}

//Afficher les informations du panier
const _productItem = document.getElementById('cart__items')

const displayProductInCart = (productInLocalStorage, productAPI) => {
    const _productArticleInCart = document.createElement('article');
    _productItem.appendChild(_productArticleInCart);
    _productArticleInCart.className = "cart__item";

    const _productImageInCart = document.createImage(productAPI.imageUrl, productAPI.altTxt);
    _productArticleInCart.appendChild(_productImageInCart);

    const _productNameInCart = document.createElement('h2');
    _productName.textContent = `${productAPI.name}`
    _productArticleInCart.appendChild(_productNameInCart);
   

   /** <!--  <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
    <div class="cart__item__img">
      <img src="../images/product01.jpg" alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>Nom du produit</h2>
        <p>Vert</p>
        <p>42,00 €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article> --> 
  
  const _productName = document.createElement('h3');
  _productName.textContent = `${product.name}`;

  const _productDescription = document.createElement('p');
  _productDescription.textContent = `${product.description}`;
  
  _productsList.appendChild(_productLink);
  _productLink.appendChild(_productArticle);
  _productArticle.appendChild(_productImage);
  _productArticle.appendChild(_productName);
  _productArticle.appendChild(_productDescription);
*/

}

const createImage = (src, alt) => {
    const _image = document.createElement('img');
    _image.src = src;
    _image.alt = alt;
    
    return _image;
  };

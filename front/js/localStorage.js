//Création de la clé basket
const BASKET_KEY = 'basket';

//Ajout des produits au panier
const addToBasket = (product) => {
  if (isProductInBasket(product)) {
    return updateProductQuantity(product, product.quantity);
  }

  return persistProductInBasket(product);
};

//Suppression des produits dans le panier
const removeFromBasket = (product) => {
  if (!isProductInBasket(product)) {
    return;
  }
  
  return removeProductFromBasket(product);
}

//Vérifie si le produit est dans le panier
const isProductInBasket = (product) => {
  return typeof(getProductFromBasket(product)) !== 'undefined';
};

//Récupérer le produit depuis le panier
const getProductFromBasket = (product) => {
  const basket = getBasket();
  return basket.find(p => p.id === product.id && p.color === product.color);
};

//Modifie la quantité
const updateProductQuantity = (product, quantity) => {
  if (!isProductInBasket(product)) {
    return;
  }
  
  const basketProduct = getProductFromBasket(product);
  basketProduct.quantity += parseInt(quantity, 10);
  
  persistProductInBasket(basketProduct);
};

//Ajout d'un produit dans le panier
const addProductQuantity = (product) => {
  if (!isProductInBasket(product)) {
    return;
  }
  
  const basketProduct = getProductFromBasket(product);
  basketProduct.quantity += 1;
  
  persistProductInBasket(basketProduct);
};

//Suppression d'un produit dans le panier
const removeProductFromBasket = (product) => {
  const basket = getBasketWithoutProduct(product);

  saveBasket(basket);
};

//Récupérer les produits suite à une suppression
const getBasketWithoutProduct = (product) => {
  return getBasket().filter((p) => p.id !== product.id || p.color !== product.color);
};

//Récupérer les données du localstorage
const getBasket = () => {
  let basket = localStorage.getItem(BASKET_KEY);
  
  if (basket === null) {
    basket = [];
    saveBasket(basket);
  }
  
  return JSON.parse(basket);
};

//Enregistrer le panier 
const saveBasket = (basket) => {
  localStorage.setItem(BASKET_KEY, JSON.stringify(basket));
};

//Conserver le produit dans le panier
const persistProductInBasket = (product) => {
  const basket = getBasketWithoutProduct(product);
  basket.push(product);  
  
  saveBasket(basket);
};
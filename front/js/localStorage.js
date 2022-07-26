const BASKET_KEY = 'basket';

const addToBasket = (product) => {
  if (isProductInBasket(product)) {
    return updateProductQuantity(product, product.quantity);
  }

  return persistProductInBasket(product);
};

const removeFromBasket = (product) => {
  if (!isProductInBasket(product)) {
    return;
  }
  
  return removeProductFromBasket(product);
}

const isProductInBasket = (product) => {
  return typeof(getProductFromBasket(product)) !== 'undefined';
};

const getProductFromBasket = (product) => {
  const basket = getBasket();
  return basket.find(p => p.id === product.id && p.color === product.color);
};

const updateProductQuantity = (product, quantity) => {
  if (!isProductInBasket(product)) {
    return;
  }
  
  const basketProduct = getProductFromBasket(product);
  basketProduct.quantity += parseInt(quantity, 10);
  
  persistProductInBasket(basketProduct);
};

const addProductQuantity = (product) => {
  if (!isProductInBasket(product)) {
    return;
  }
  
  const basketProduct = getProductFromBasket(product);
  basketProduct.quantity += 1;
  
  persistProductInBasket(basketProduct);
};

const removeProductFromBasket = (product) => {
  const basket = getBasketWithoutProduct(product);

  saveBasket(basket);
};

const getBasketWithoutProduct = (product) => {
  return getBasket().filter((p) => p.id !== product.id || p.color !== product.color);
};

const getBasket = () => {
  let basket = localStorage.getItem(BASKET_KEY);
  
  if (basket === null) {
    basket = [];
    saveBasket(basket);
  }
  
  return JSON.parse(basket);
};

const saveBasket = (basket) => {
  localStorage.setItem(BASKET_KEY, JSON.stringify(basket));
};

const persistProductInBasket = (product) => {
  const basket = getBasketWithoutProduct(product);
  basket.push(product);  
  
  saveBasket(basket);
};
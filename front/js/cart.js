let _cart = document.getElementById("cart__items");
let apiProductsList = [];

const getProductsFromApi = () => {
   return fetch("http://localhost:3000/api/products")
      .then((res) => {
       if (!res.ok) {
         throw new Error('Error retrieving products!');
       }
       return res.json();
     })
};

const setApiProducts = (apiProducts) => {
   apiProductsList = apiProducts;
   return Promise.resolve();
}

const displayError = (error) => {
   console.error(error);
}

const displayProduct = (product) => {

   const apiProduct = apiProductsList.find(p => p._id === product.id)

   //creation de l'article
   const _article = document.createElement("article");
   document.querySelector("#cart__items").appendChild(_article);
   _article.className = "cart__item";
   _article.setAttribute("data-id", product.id);
   _article.setAttribute("data-color", product.color);

   // Ajout de la div "cart__item__img"
   const _productDiv = document.createElement("div");
   _article.appendChild(_productDiv);
   _productDiv.className = "cart__item__img";

   // ajout de l'image
   const _productImg = document.createElement("img");
   _productDiv.appendChild(_productImg);
   _productImg.src = apiProduct.imageUrl;
   _productImg.alt = apiProduct.altTxt;


   // Ajout de la div "cart__item__content"
   const _itemContent = document.createElement("div");
   _article.appendChild(_itemContent);
   _itemContent.className = "cart__item__content";

   // Ajout de la div "cart__item__content__titlePrice"
   const _itemContentTitlePrice = document.createElement("div");
   _itemContent.appendChild(_itemContentTitlePrice);
   _itemContentTitlePrice.className = "cart__item__content__titlePrice";

   // Ajout du titre h3
   const _productTitle = document.createElement("h2");
   _itemContentTitlePrice.appendChild(_productTitle);
   _productTitle.innerHTML = apiProduct.name;

   // Ajout de la couleur
   const _productColor = document.createElement("p");
   _productTitle.appendChild(_productColor);
   _productColor.innerHTML = product.color;


   // Ajout du prix
   const _productPrice = document.createElement("p");
   _itemContentTitlePrice.appendChild(_productPrice);
   _productPrice.classList = "product__price";
   _productPrice.innerHTML = parseInt(apiProduct.price) + " €";


   // Ajout de la div "cart__item__content__settings"
   const _itemContentSettings = document.createElement("div");
   _itemContent.appendChild(_itemContentSettings);
   _itemContentSettings.className = "cart__item__content__settings";

   // Ajout de la div "cart__item__content__settings__quantity"
   const _itemContentSettingsQuantity = document.createElement("div");
   _itemContentSettings.appendChild(_itemContentSettingsQuantity);
   _itemContentSettingsQuantity.className = "cart__item__content__settings__quantity";

   // Ajout de "Quantité : "
   const _productTitleQuantite = document.createElement("p");
   _itemContentSettingsQuantity.appendChild(_productTitleQuantite);
   _productTitleQuantite.innerHTML = "Quantité : ";

   // Ajout de la quantité
   const _productQuantity = document.createElement("input");
   _itemContentSettingsQuantity.appendChild(_productQuantity);
   _productQuantity.value = product.quantity;
   _productQuantity.className = "itemQuantity";
   _productQuantity.setAttribute("type", "number");
   _productQuantity.setAttribute("min", "1");
   _productQuantity.setAttribute("max", "100");
   _productQuantity.setAttribute("name", "itemQuantity");
   _productQuantity.addEventListener('change', () => {
      if (parseInt(_productQuantity.value, 10) === 0) {
         return deleteProduct(product);
      }
      if (!isProductInBasket(product)) {
         return;
      } 
      const basketProduct = getProductFromBasket(product);
      basketProduct.quantity = parseInt(_productQuantity.value, 10);

      persistProductInBasket(basketProduct);
      location.reload();
   });

   // Ajout de la "div" "cart__item__content__settings__delete"
   const _itemContentSettingsDelete = document.createElement("div");
   _itemContentSettings.appendChild(_itemContentSettingsDelete);
   _itemContentSettingsDelete.className = "cart__item__content__settings__delete";

   // Ajout de "p" suppression
   const _productDelete = document.createElement("p");
   _itemContentSettingsDelete.appendChild(_productDelete);
   _productDelete.className = "deleteItem";
   _productDelete.innerHTML = "Supprimer";
   _productDelete.addEventListener('click', () => deleteProduct(product));
}

const deleteProduct = (product) => {
	if (!confirm('Êtes-vous certain de vouloir supprimer ce produit de votre panier')) {
		return;
  }
  removeFromBasket(product);
  removeProductFromDom(product);
  location.reload();
};

const removeProductFromDom = () => {
   const article = document.querySelector("article")
   article.parentNode.removeChild(article);
}

const getTotalNumberOfProducts = () => {
   let totalQuantity = 0;
   for (let product of basket) {
       totalQuantity += product.quantity;
   }
   return totalQuantity;
};

const displayTotalQuantity = () => {
   let totalProductsQuantity = document.querySelector("#totalQuantity");
   totalProductsQuantity.textContent = getTotalNumberOfProducts();
}

const getTotalPrice = () => {
   let totalPrice = 0;
   const basket = getBasket();
   
   basket.forEach((product) => {
     const apiProduct = apiProductsList.find(p => p._id === product.id);
     totalPrice += product.quantity * apiProduct.price;
   });
   
   return totalPrice;
 }

const displayTotalPrice = () => {
   document.querySelector("#totalPrice").textContent = getTotalPrice()
}

const displayTotals = () => {
   displayTotalQuantity();
   displayTotalPrice();
}

const basketIsEmpty = () => {
   if (basket == null) {
      return true
   }
}

const displayEmptyBasket = () => {
   const noProductInBasket = document.createElement("p");
   noProductInBasket.innerText="Votre Panier est vide";
   _cart.appendChild(noProductInBasket);
}

const displayBasketProducts = () => {
   if (basketIsEmpty()) {
      return displayEmptyBasket();
   }
   const basketProducts = getBasket();
   basketProducts.forEach((product) => displayProduct(product));

   displayTotals();
}

getProductsFromApi()
   .then(setApiProducts)
   .then(displayBasketProducts)
   .catch(displayError)
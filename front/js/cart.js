basket = JSON.parse(localStorage.getItem("basket"));
let _cart = document.getElementById("cart__items");
let productListFiltred = [];

// recuperer tt les produits avec fetch 
// Filtrer la liste des produits pour garder juste les produits qu'on a sur le localstorage
const getProductsFromApi = () => {
   return fetch("http://localhost:3000/api/products")
      .then((res) => {
       if (!res.ok) {
         throw new Error('Error retrieving products!');
       }
        return res.json();
     })
};

const displayError = (error) => {
   //console.log("Impossible de récupérer les données du panier")
   console.error(error)
}

const getCart = (productList) => {
   for (let product in basket) {
      const productInCart = productList.find(p => p._id === basket[product].id);
      
      //creation de l'article
      const _article = document.createElement("article");
      document.querySelector("#cart__items").appendChild(_article);
      _article.className = "cart__item";
      _article.setAttribute("data-id", basket[product].id);
      _article.setAttribute("data-color", basket[product].color);

      // Ajout de la div "cart__item__img"
      const _productDiv = document.createElement("div");
      _article.appendChild(_productDiv);
      _productDiv.className = "cart__item__img";

      // ajout de l'image
      const _productImg = document.createElement("img");
      _productDiv.appendChild(_productImg);
      _productImg.src = productInCart.imageUrl;
      _productImg.alt = productInCart.altTxt;


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
      _productTitle.innerHTML = productInCart.name;

      // Ajout de la couleur
      const _productColor = document.createElement("p");
      _productTitle.appendChild(_productColor);
      _productColor.innerHTML = basket[product].color;


      // Ajout du prix
      const _productPrice = document.createElement("p");
      _itemContentTitlePrice.appendChild(_productPrice);
      _productPrice.classList = "product__price";
      _productPrice.innerHTML = parseInt(productInCart.price) + " €";

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
      _productQuantity.value = basket[product].quantity;
      _productQuantity.className = "itemQuantity";
      _productQuantity.setAttribute("type", "number");
      _productQuantity.setAttribute("min", "1");
      _productQuantity.setAttribute("max", "100");
      _productQuantity.setAttribute("name", "itemQuantity");
     	_productQuantity.addEventListener('change', () => {
        if (parseInt(_productQuantity.value, 10) === 0) {
          return deleteProduct(basket[product]);
        }
        addProductQuantity(basket[product])
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
     	_productDelete.addEventListener('click', () => deleteProduct(basket[product]));
    }
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

const filterProducts = (listProduct) => {
   if (basket && basket.length) {
     const productBasket = basket.map(product => product.id);
     productListFiltred = listProduct.filter(p => productBasket.includes(p._id));

     getCart(productListFiltred);
     getTotals();
   }else {
      emptyBasket();
   }
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
   for (let product of basket) {
      totalPrice += product.quantity * price;
      console.log(typeof(product.quantity))
      console.log(typeof(price))
   }
   return totalPrice
}

const displayTotalPrice = () => {
   let productTotalPrice = document.querySelector("#totalPrice");
   productTotalPrice.textContent = getTotalPrice()
}

const getTotals = () => {
   displayTotalQuantity();
   displayTotalPrice();
}

const emptyBasket = () => {
   const noProductInBasket = document.createElement("p");
   noProductInBasket.innerText="Votre Panier est vide";
   _cart.appendChild(noProductInBasket);
}

getProductsFromApi()
   .then(filterProducts)
   .catch(displayError)

//Partie Formulaire

 const contact = {
   firstName: "",
   lastName: "",
   address: "",
   city: "",
   email: "",
};

const formulaire = document.querySelector('.cart__order__form input[type= "submit"]');
const inputs = document.querySelector(".cart__order__form__question");

const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const address = document.querySelector("#address");
const email = document.querySelector("#email");
const city = document.querySelector("#city");

const firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
const lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
const addressErrorMsg = document.querySelector("#addressErrorMsg");
const emailErrorMsg = document.querySelector("#emailErrorMsg");
const cityErrorMsg = document.querySelector("#cityErrorMsg");

const submit = document.querySelector("#order");

const nameAndCityRegExp = new RegExp("^[a-zA-Zàâäéèêëïîôöùûüç ,.'-]+$");

const validateFirstName = (firstName) => {
   const textFirstName = nameAndCityRegExp.test(firstName)
   if(textFirstName) {
   return true;
   }else{
      firstNameErrorMsg.textContent = "Le nom est invalide";
   return false;
   }
}

firstName.addEventListener("blur", (e) => {
   validateFirstName(e);
});

lasttName.addEventListener("input", (e) => {
   const validateLastName = (lastName) => {
      const textLastName = nameAndCityRegExp.test(lastName)
      if(textLastName) {
      return true;
      }else{
         lastNameErrorMsg.textContent = "Le prénom est invalide";
      return false;
      }
   }
   validateLastName(e);
});

const adressRegExp = new RegExp("/^[a-zA-Z0-9\s,.'-]{3,}$/")

address.addEventListener("input", () => {
   const validateAddress = (adress) => {
      const textAddress = adressRegExp.test(adress)
      if(textAddress) {
      return true;
      }else{
         addressErrorMsg.textContent = "L'adresse est invalide";
      return false;
      }
   }
   validateAddress(a);
});

city.addEventListener("input", (c) => {
   const validateCity = (city) => {
      const textCity = addressRegExp.test(city)
      if(textCity) {
      return true;
      }else{
         cityErrorMsg.textContent = "La ville est invalide";
      return false;
      }
   }
   validateCity(c);
});

const emailRegExp = new RegExp("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$.")

email.addEventListener("input", (e) => {
   const validateEmail = (email) => {
      const textEmail = emailRegExp.test(email)
      if(textEmail) {
      return true;
      }else{
         emailErrorMsg.textContent = "L'adresse mail est invalide";
      return false;
      }
   }
   validateEmail(e);
});
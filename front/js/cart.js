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

const displayError = () => {
   console.log("Impossible de récupérer les données du panier")
}

const getCart = (productList) => {
   for (let product in basket) {
      const currentProduct = productList.find(p => p._id === basket[product].id);
      //creation de l'article

      let article = document.createElement("article");
      document.querySelector("#cart__items").appendChild(article);
      article.className = "cart__item";
      article.setAttribute("data-id", basket[product].id);

      // Ajout de la div "cart__item__img"
      let productDiv = document.createElement("div");
      article.appendChild(productDiv);
      productDiv.className = "cart__item__img";

      // ajout de l'image
      let productImg = document.createElement("img");
      productDiv.appendChild(productImg);
      productImg.src = currentProduct.imageUrl;
      productImg.alt = currentProduct.altTxt;


      // Ajout de la div "cart__item__content"
      let itemContent = document.createElement("div");
      article.appendChild(itemContent);
      itemContent.className = "cart__item__content";

      // Ajout de la div "cart__item__content__titlePrice"
      let itemContentTitlePrice = document.createElement("div");
      itemContent.appendChild(itemContentTitlePrice);
      itemContentTitlePrice.className = "cart__item__content__titlePrice";

      // Ajout du titre h3
      let productTitle = document.createElement("h2");
      itemContentTitlePrice.appendChild(productTitle);
      productTitle.innerHTML = currentProduct.name;

      // Ajout de la couleur
      let productColor = document.createElement("p");
      productTitle.appendChild(productColor);
      productColor.innerHTML = basket[product].color;


      // Ajout du prix
      let productPrice = document.createElement("p");
      itemContentTitlePrice.appendChild(productPrice);
      productPrice.classList = "product__price";
      productPrice.innerHTML = currentProduct.price + " €";

      // Ajout de la div "cart__item__content__settings"
      let itemContentSettings = document.createElement("div");
      itemContent.appendChild(itemContentSettings);
      itemContentSettings.className = "cart__item__content__settings";

      // Ajout de la div "cart__item__content__settings__quantity"
      let itemContentSettingsQuantity = document.createElement("div");
      itemContentSettings.appendChild(itemContentSettingsQuantity);
      itemContentSettingsQuantity.className = "cart__item__content__settings__quantity";

      // Ajout de "Qté : "
      let productQte = document.createElement("p");
      itemContentSettingsQuantity.appendChild(productQte);
      productQte.innerHTML = "Quantité : ";

      // Ajout de la quantité
      let productQuantity = document.createElement("input");
      itemContentSettingsQuantity.appendChild(productQuantity);
      productQuantity.value = basket[product].quantity;
      productQuantity.className = "itemQuantity";
      productQuantity.setAttribute("type", "number");
      productQuantity.setAttribute("min", "1");
      productQuantity.setAttribute("max", "100");
      productQuantity.setAttribute("name", "itemQuantity");

      // Ajout de la "div" "cart__item__content__settings__delete"
      let itemContentSettingsDelete = document.createElement("div");
      itemContentSettings.appendChild(itemContentSettingsDelete);
      itemContentSettingsDelete.className = "cart__item__content__settings__delete";

      // Ajout de "p" suppression
      let productDelete = document.createElement("p");
      itemContentSettingsDelete.appendChild(productDelete);
      productDelete.className = "deleteItem";
      productDelete.innerHTML = "Supprimer";
    }
}

const modifyQuantity = () => {
   let itemModif = document.querySelectorAll(".itemQuantity");
   itemModif.addEventListener("change", (event) => {
      updateProductQuantity();
   location.reload();
   });
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
      totalPrice += parseInt(product.quantity) * parseInt(product.productPrice);
   }
   return parseInt(totalPrice)
}

const displayTotalPrice = () => {
   let productTotalPrice = document.querySelector("#totalPrice");
   productTotalPrice.textContent = getTotalPrice()
}

const getTotals = () => {
   displayTotalQuantity();
   displayTotalPrice();
}

const deleteArticle = () => {
   let deleteItem = document.querySelectorAll(".deleteItem");
   
   deleteItem.addEventListener("click", () => {
   removeProductFromBasket();
   location.reload();
     });
};

const filterProducts = (listProduct) => {
   const list = listProduct;
   if (basket && basket.length) {
     const productBasket = basket.map(product => product.id);// Recupération des ID du local Storage
     productListFiltred = list.filter(p => productBasket.includes(p._id));//Filtrer les produit de l'api en fonction de ceux present ds le LS
     
     getCart(productListFiltred);
     modifyQuantity();
     deleteArticle();
     getTotals();
   }else {
      emptyBasket();
   }
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

const nameAndCityRegExp = new RegExp("^[a-zA-Zàâäéèêëïîôöùûüç ,.'-]+$");

firstName.addEventListener("input", (f) => {
   const validateFirstName = (firstName) => {
      const textFirstName = nameAndCityRegExp.test(firstName)
      if(textFirstName) {
      return true;
      }else{
         firstNameErrorMsg.textContent = "Le nom est invalide";
      return false;
      }
   }
   validateFirstName(f);
});

lasttName.addEventListener("input", (l) => {
   const validateLastName = (lastName) => {
      const textLastName = nameAndCityRegExp.test(lastName)
      if(textLastName) {
      return true;
      }else{
         lastNameErrorMsg.textContent = "Le prénom est invalide";
      return false;
      }
   }
   validateLastName(l);
});

const adressRegExp = new RegExp("/^[a-zA-Z0-9\s,.'-]{3,}$/")

address.addEventListener("input", (a) => {
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
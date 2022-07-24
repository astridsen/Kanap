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
      productPrice.classList = "product__price"
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
      productQte.innerHTML = "Qté : ";

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
   getProductsFromApi();
   let totalPrice = 0;
   for (let product of basket) {
      totalPrice += parseInt(product.quantity) * parseInt(product.price);
   }
   return totalPrice
}

const displayTotalPrice = () => {
   let productTotalPrice = document.querySelector("#totalPrice");
   productTotalPrice.textContent = getTotalPrice()
}

function getTotals() {
   displayTotalQuantity();
   displayTotalPrice();
}

 /** On récupère la quantité totale
   let elementsQuantity = document.getElementsByClassName('itemQuantity');
   let myLength = elementsQuantity.length;
   totalQuantity = 0;
   //(expression initiale, condition, incrémentation)
   for (let i = 0; i < myLength; i++) {
     totalQuantity += elementsQuantity[i].valueAsNumber;
   }
 
   let totalQuantity = document.getElementById('totalQuantity');
   totalQuantity.innerHTML = totalQuantity;
 
 
   // On récupère le prix total
   let elementPrice = document.getElementsByClassName("product__price");
   
   totalPrice = 0;
   for (let i = 0; i < myLength; i++) {
     let price = parseInt(elementPrice[i].innerHTML.split(" €")[0]);
     totalPrice += (elementsQuantity[i].valueAsNumber * price);
     
   }
 
   let productTotalPrice = document.getElementById('totalPrice');
   productTotalPrice.innerHTML = totalPrice;
 
}*/
 
 
 // On modifie la quantité d'un produit dans le panier
 
 
 
 function modifyQuantity() {
 
   let itemModif = document.querySelectorAll(".itemQuantity");
 
 
   for (let j = 0; j < itemModif.length; j++) {
     itemModif[j].addEventListener("change", (event) => {
       event.preventDefault()
       //Je selectionne l'élément à modifier selon son Id et sa couleur
       let itemNew = basket[j].quantity;
       let itemModifValue = itemModif[j].valueAsNumber;
 
       const result = basket.filter(
         (element) => element.itemModifValue !== itemNew);
 
       result.quantity = itemModifValue;
       basket[j].quantity = result.quantity;
 
       localStorage.setItem("basket", JSON.stringify(basket));
 
       location.reload();// rafraichir la  page
       // alert("votre panier est à jour.")
 
     });//fin addeventlistener
   }
}
 
 //pour supprimer le produit du panier
deleteArticle();
 
function deleteArticle() {
   let deleteItem = document.querySelectorAll(".deleteItem");
   for (let k = 0; k < deleteItem.length; k++) {
      deleteItem[k].addEventListener("click", (event) => {
      event.preventDefault()
 
      //Je selectionne l'élément à modifier selon son Id et sa couleur
      let deleteId = basket[k].id;
      let deleteColor = basket[k].color;
 
      basket = basket.filter((element) => element.id !== deleteId || element.color !== deleteColor);
      localStorage.setItem("basket", JSON.stringify(basket));
 
      location.reload();
      alert("Votre article a bien été supprimé.")
 
 
     })//fin addEventListener
   }
 }

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
      let emptyBasket = document.createElement("p");
      emptyBasket.innerText="Votre Panier est vide";
      _cart.appendChild(emptyBasket);
   }
}

getProductsFromApi()
   .then(filterProducts)
   .catch(displayError)
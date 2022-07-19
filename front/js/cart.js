productLocalStorage= JSON.parse(localStorage.getItem("basket"));
const cart = document.getElementById("cart__items");
let productListFiltred = [];

// recuperer tt les produits avec fetch 
// Filtrer la liste des produits pour garder juste les produits qu'on a sur le localstorage
function getBasket(){
fetch (`http://localhost:3000/api/products/`)
.then(function (res) {
   if (res.ok) {
     return res.json();
   }
})
.then( function (listProduct ) {

  let list = listProduct;
  if(productLocalStorage && productLocalStorage.length){
   let productBasket = productLocalStorage.map(product => product.id) ;// Recupérartion des ID du local Storage
   
   
 
   productListFiltred = list.filter(el =>  productBasket.includes(el._id));//Filtrer les produit de l'api en fonction de ceux present ds le LS
       getCart(productListFiltred);
       modifyQuantity();
       getTotals();
       deleteArticle();
       
  }
  
     
})

.catch (function(err){
   console.log("api error",err);
})
}


getBasket() ;
function getCart(productList)
{  
   
   // si le panier est vide
   if (productLocalStorage === null || productLocalStorage == 0 )
   {
      const emptyBasket = `<p>Votre panier est vide</p>`;
      cart.innerHTML = emptyBasket;
   }
   // on crée les éléments manquants dans le local storage
   else
   {  
      for(let product in productLocalStorage)
      {
         const currentProduct = productList.find(p => p._id === productLocalStorage[product].id);
         //creation de l'article

         let article = document.createElement("article");
         document.querySelector("#cart__items").appendChild(article);
         article.className = "cart__item";
         article.setAttribute("data-id", productLocalStorage[product].id);

         // Ajout de la div "cart__item__img"
         let productDiv = document.createElement("div");
         article.appendChild(productDiv);
         productDiv.className = "cart__item__img";

         // ajout de l'image
         let productImg = document.createElement("img");
         productDiv.appendChild(productImg);
         productImg.src =currentProduct.imageUrl;
         productImg.alt =currentProduct.altTxt;
         
         
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
         productColor.innerHTML = productLocalStorage[product].color;
         

         // Ajout du prix
         let productPrice = document.createElement("p");
         itemContentTitlePrice.appendChild(productPrice);
         // const currentProduct = productList.find(p => p._id === productLocalStorage[product].id);
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
         productQuantity.value = productLocalStorage[product].quantity;
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
}
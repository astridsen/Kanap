//Faire le lien entre la page d'accueil et la page produit
const link = window.location.href;
let url = new URL(link);
let search_params = new URLSearchParams(url.search); 

if(search_params.has('id')) {
  let id = search_params.get('id');
  console.log(id)
};

function itemLink () {
    
}

//Éléments à afficher sur la page produit
const productImg = document.getElementsByClassName(".item__img");
const productTitle = document.getElementById("title");
const productPrice = document.getElementById("price");
const productDescription = document.getElementById("description");
const productColor = document.getElementById("colors");





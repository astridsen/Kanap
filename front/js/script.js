//Création de la constante items
const items = document.getElementById("items");

//Récupérer les informations de l'API
fetch("http://localhost:3000/api/products")
.then(function(res) {
    if (res.ok) {
        return res.json();
    }
})
//Affichage des informations produits
.then(function(products) {
    for (let product of products) {
        items.innerHTML += `<a href="./product.html,id=${product._id}">
        <article>
        <img src="${product.imageUrl}" alt="${product.altTxt}">
        <h3 class="productName">${product.name}</h3>
        <p class="productDescription">${product.description}</p>
        </article>   
        </a>`
    } ;
})
//Affichage d'un message d'erreur si les informations d'un produit ne peuvent pas être réupérés
.catch(function(err) {
    alert("Produit indisponible")
});

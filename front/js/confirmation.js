//Suppression des éléments présents dans le localStorage
localStorage.clear();

// Récupération de l'identifiant de commande dans l'URL
const str = window.location.href;
const url = new URL(str);
const orderId= url.searchParams.get("id");

// Affichage de l'identifiant de commande
let displayOrderId = document.getElementById("orderId");
displayOrderId.textContent = orderId;
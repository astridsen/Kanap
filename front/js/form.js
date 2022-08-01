const basket = JSON.parse(localStorage.getItem("basket"));

//Création du tableau "contact" pour stocker les données du formulaire
let contact = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    email: "",
};
  
  
const formulaire = document.querySelector('.cart__order__form input[type= "submit"]');

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

//Création des expressions régulières
const emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
const nameAndCityRegExp = new RegExp("^[a-zA-Zàâäéèêëïîôöùûüç ,.'-]+$");
const addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");


let submit = document.querySelector("#order");


//Validation des champs du formulaire 

//Validation du prénom
const validFirstName = (firstName) => {
    const testName = nameAndCityRegExp.test(firstName);
    if (testName) {
      firstNameErrorMsg.textContent = "";
      return true;
    } else {
      firstNameErrorMsg.textContent = "Prénom invalide";
      return false;
    }
}

//Valisation du prénom lors du remplissage du champs
firstName.addEventListener("input", (e) => {
    validFirstName(e.target.value);
    contact.firstName = e.target.value;
});
  
//Validation du nom 
const validLastName = (lastName) => {
    const testLastName = nameAndCityRegExp.test(lastName);
    if (testLastName) {
      lastNameErrorMsg.textContent = "";
      return true;
    } else {
      lastNameErrorMsg.textContent = "Nom invalide";
      return false;
    }
}
  
//Validation du nom lors de l'événement remplissage du champ 
lastName.addEventListener("input", (e) => {
    validLastName(e.target.value);
    contact.lastName = e.target.value;
});

//Validation de l'adresse
const validAddress = (address) => {
    const testAddress = addressRegExp.test(address);
    if (testAddress) {
      addressErrorMsg.textContent = "";
      return true;
    } else {
      addressErrorMsg.textContent = "Adresse invalide";
      return false;
    }
} 

//Validation de l'adresse lors de l'événement remplissage du champ 
address.addEventListener("input", (e) => {
    validAddress(e.target.value);
    contact.address = e.target.value;
});
  
//Validation de la ville 
const validCity = (city) => {
    let testCity = nameAndCityRegExp.test(city);
    if (testCity) {
      cityErrorMsg.textContent = "";
      return true;
    } else {
      cityErrorMsg.textContent = "Ville invalide";
      return false;
    }
}  

//Validation de la ville lors de l'événement remplissage du champ 
city.addEventListener("input", (e) => {
    validCity(e.target.value);
    contact.city = e.target.value;
});

//Validation du email
const validEmail = (email) => {
    const testEmail = emailRegExp.test(email);
    if (testEmail) {
      emailErrorMsg.textContent = "";
      return true;
    } else {
      emailErrorMsg.textContent = "Email invalide";
      return false;
    }
} 

//Validation du email lors de l'événement remplissage du champ 
email.addEventListener("input", (e) => {
    validEmail(e.target.value);
    contact.email = e.target.value;
});
  
//Constitution de l'array products et de l'object order
let products = [];
let order = {
    contact: contact,
    products: products,
};

//Alerte dans le cas où le panier est vide
const emptyBasket = () => {
    alert("Votre panier est vide");
    location.reload();
}

//Enregistrer les données contact
const saveContact = () => localStorage.setItem("contact", JSON.stringify(contact))

//Envoi des données 
const sendDataOrder = () => {
    saveContact();
    if (basket && basket.length) {
        for (let articleInBasket of basket) {
          products.push(articleInBasket.id)
        };
        fetch("http://localhost:3000/api/products/order", {
          method: "POST",
          body: JSON.stringify(order),
          headers: {
            'Content-Type': 'application/json'
          },
        })
          .then((res) => res.json())
          .then((data) => {
            window.location.assign("confirmation.html?id=" + data.orderId)
          });    
      } else {
        emptyBasket();
    }
}

//Validation du formulaire
const validForm = () => {
    if (
        nameAndCityRegExp.test(firstName.value) == false ||
        nameAndCityRegExp.test(lastName.value) == false ||
        addressRegExp.test(address.value) == false ||
        nameAndCityRegExp.test(city.value) == false ||
        emailRegExp.test(email.value) == false
      ) {
        window.alert("Certaines informations du formulaire sont mal renseignées");
      } else if (
        firstName.value === "" ||
        lastName.value === "" ||
        address.value === "" ||
        city.value === "" ||
        email.value === ""
      ) {
        window.alert("Merci de remplir tous les champs");
      } else {
        sendDataOrder();
      }
}

const orderButton = document.querySelector("#order")

//Envoi des données pour validation de la commande lors du clic sur le bouton
orderButton.addEventListener("click", (e) => {
    e.preventDefault();
    validForm();
});
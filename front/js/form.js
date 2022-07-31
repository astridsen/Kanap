const basket = JSON.parse(localStorage.getItem("basket"));

//Création du tableau "contact" pour stocker les données du formulaire
let contact = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    email: "",
};
  
  
const _formulaire = document.querySelector('.cart__order__form input[type= "submit"]');

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

firstName.addEventListener("input", (e) => {
    validFirstName(e.target.value);
    contact.firstName = e.target.value;
});
  
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
  
lastName.addEventListener("input", (e) => {
    validLastName(e.target.value);
    contact.lastName = e.target.value;
});
  
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

address.addEventListener("input", (e) => {
    validAddress(e.target.value);
    contact.address = e.target.value;
});
  
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

city.addEventListener("input", (e) => {
    validCity(e.target.value);
    contact.city = e.target.value;
});
  
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

email.addEventListener("input", (e) => {
    validEmail(e.target.value);
    contact.email = e.target.value;
});
  
  
let products = [];
let order = {
    contact: contact,
    products: products,
};

const emptyCart = () => {
    alert("Votre panier est vide");
    location.reload();
}

const sendDataOrder = () => {
    localStorage.setItem("contact", JSON.stringify(contact));
    if (basket && basket.length) {
        for (let articleInCart of basket) {
          products.push(articleInCart.id)
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
        alert("Votre panier est vide");
        location.reload();
    }
}

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

orderButton.addEventListener("click", (e) => {
    e.preventDefault();
    validForm();
});
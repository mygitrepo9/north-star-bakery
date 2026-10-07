const bakeryItems = [
    { name: "Fresh Breads", category: "Bread" },
    { name: "Pastries", category: "Pastry" },
    { name: "Cakes", category: "Cake" }
];

let favoriteItems = JSON.parse(localStorage.getItem("favoriteItems")) || [];

function saveFavorites() {
    localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
}

function displayFavorites() {
    const favoritesList = document.getElementById("favorites-list");

    if (!favoritesList) {
        return;
    }

    favoritesList.innerHTML = "";

    favoriteItems.forEach(function(item) {
        const listItem = document.createElement("li");
        listItem.textContent = item;
        favoritesList.appendChild(listItem);
    });
}

function addFavorite(itemName) {
    const message = document.getElementById("favorite-message");

    if (!favoriteItems.includes(itemName)) {
        favoriteItems.push(itemName);
        saveFavorites();
        displayFavorites();

        if (message) {
            message.textContent = itemName + " was added to your favorites.";
        }
    } else {
        if (message) {
            message.textContent = itemName + " is already in your favorites.";
        }
    }
}

function setupFavoriteButtons() {
    const buttons = document.querySelectorAll(".favorite-btn");

    buttons.forEach(function(button) {
        button.addEventListener("click", function() {
            const itemName = button.getAttribute("data-item");
            addFavorite(itemName);
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    displayFavorites();
    setupFavoriteButtons();
});
const form = document.getElementById("preorder-form");

function validateName() {
    const nameInput = document.getElementById("name");
    const nameError = document.getElementById("name-error");

    if (!nameInput || !nameError) {
        return false;
    }

    const nameValue = nameInput.value.trim();

    if (nameValue === "") {
        nameError.textContent = "Please enter your name.";
        return false;
    }

    if (nameValue.length < 2) {
        nameError.textContent = "Name must be at least 2 characters.";
        return false;
    }

    nameError.textContent = "";
    return true;
}

function validateEmail() {
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("email-error");

    if (!emailInput || !emailError) {
        return false;
    }

    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === "") {
        emailError.textContent = "Please enter your email address.";
        return false;
    }

    if (!emailPattern.test(emailValue)) {
        emailError.textContent = "Please enter a valid email address.";
        return false;
    }

    emailError.textContent = "";
    return true;
}

function saveContactInfo() {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");

    if (!nameInput || !emailInput) {
        return;
    }

    const customerInfo = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim()
    };

    localStorage.setItem("customerInfo", JSON.stringify(customerInfo));
}

function loadContactInfo() {
    const savedInfo = JSON.parse(localStorage.getItem("customerInfo"));

    if (!savedInfo) {
        return;
    }

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");

    if (nameInput) {
        nameInput.value = savedInfo.name || "";
    }

    if (emailInput) {
        emailInput.value = savedInfo.email || "";
    }
}

if (form) {
    loadContactInfo();

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();

        if (isNameValid && isEmailValid) {
            saveContactInfo();

            const successMessage = document.getElementById("form-success");

            if (successMessage) {
                successMessage.textContent =
                    "Your information is valid and has been saved.";
            }
        }
    });
}

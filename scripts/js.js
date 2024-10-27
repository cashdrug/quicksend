// Sparkles Effect
function createSparkle(x, y) {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.style.left = x + "px";
    sparkle.style.top = y + "px";
    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 800);
}

function addSparkles(event) {
    const button = event.target;
    const rect = button.getBoundingClientRect();
    const buttonWidth = rect.width;
    const buttonHeight = rect.height;

    for (let i = 0; i < 20; i++) {
        const x = rect.left + Math.random() * buttonWidth;
        const y = rect.top + Math.random() * buttonHeight;
        createSparkle(x, y);
    }
}

// Authentication Simulation
function simulateUserAuth() {
    document.querySelector(".signin-button").style.display = "none";
    document.querySelector(".startforfree").style.display = "none";
    document.querySelector(".profile-button").style.display = "flex";
}

// Language Management
let currentLanguage = "ru";

const translations = {
    pricing: {
        ru: {
            currency: "₽",
            free: "Бесплатно",
            month: "/месяц",
        },
        en: {
            currency: "$",
            free: "Free",
            month: "/month",
        },
    },
};

function updatePricing() {
    const priceElements = document.querySelectorAll(".price");
    priceElements.forEach((element) => {
        const price = element.getAttribute(`data-${currentLanguage}-price`);
        const currencySymbol = translations.pricing[currentLanguage].currency;
        const monthText = translations.pricing[currentLanguage].month;

        if (price === "0") {
            element.textContent = translations.pricing[currentLanguage].free;
        } else {
            element.textContent = `${currencySymbol}${price}${monthText}`;
        }
    });
}

function updateLanguage() {
    const elements = document.querySelectorAll("[data-ru][data-en]");
    elements.forEach((element) => {
        element.textContent = element.getAttribute(`data-${currentLanguage}`);
    });
    updatePricing();
}

function toggleLanguage() {
    currentLanguage = currentLanguage === "ru" ? "en" : "ru";
    updateLanguage();
    document.documentElement.lang = currentLanguage;
    const toggleText = document.querySelector(".language-toggle span");
    toggleText.textContent = currentLanguage === "ru" ? "EN" : "RU";
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    // Button sparkles
    const buttons = document.querySelectorAll(".button");
    buttons.forEach((button) => {
        button.addEventListener("click", addSparkles);
    });

    // Auth buttons
    document.querySelector(".startforfree").addEventListener("click", (e) => {
        e.preventDefault();
        simulateUserAuth();
    });

    document.querySelector(".signin-button").addEventListener("click", (e) => {
        e.preventDefault();
        simulateUserAuth();
    });

    // Current year
    document.getElementById("current-year").textContent = new Date().getFullYear();

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth",
                });
            }
        });
    });

    // Profile button
    document.querySelector(".profile-button").addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "profile.html";
    });

    // Language toggle
    document.querySelector(".language-toggle").addEventListener("click", toggleLanguage);

    // Initialize language
    updateLanguage();
});
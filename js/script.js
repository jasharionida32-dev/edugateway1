/* ---------------- TRANSLATIONS DICTIONARY ---------------- */
const translations = {
    sq: {
        // Navigation
        "Home": "Ballina",
        "Scholarships": "Bursat",
        "Programs": "Programet",
        "Other": "Të tjera",
        "About": "Rreth nesh",

        // Reminder & Feedback
        "Reminder": "Kujtesë",
        "Upcoming program deadlines this month.": "Afatet e programeve këtë muaj.",
        "CLICK HERE TO ENTER FEEDBACK ON EDUGATEWAY :)": "KLIKO KËTU PËR TË DHËNË KOMENTE PËR EDUGATEWAY :)",

        // Home page
        "Unlock global opportunities for students everywhere": "Zbuloni mundësi globale për studentët kudo",
        "EduGateway helps students discover global scholarships, programs and learning opportunities.": "EduGateway ndihmon studentët të zbulojnë bursa, programe dhe mundësi mësimore globale.",
        "Many students miss life-changing opportunities simply because they never hear about them.": "Shumë studentë humbasin mundësi që ndryshojnë jetën thjesht sepse nuk dëgjojnë kurrë për to.",
        "Discover fully funded scholarships worldwide.": "Zbuloni bursa të financuara plotësisht në mbarë botën.",
        "Find summer programs and research opportunities.": "Gjeni programe verore dhe mundësi kërkimore.",
        "Why EduGateway?": "Pse EduGateway?",
        "EduGateway collects opportunities into one platform so students can easily find them.": "EduGateway mbledh mundësitë në një platformë të vetme që studentët t'i gjejnë lehtë.",

        // About page
        "About EduGateway": "Rreth EduGateway",
        "Many talented students miss opportunities simply because they never hear about them.": "Shumë studentë të talentuar humbasin mundësi thjesht sepse nuk dëgjojnë kurrë për to.",
        "EduGateway was created to bring scholarships, programs and competitions into one platform.": "EduGateway u krijua për të sjellë bursa, programe dhe konkurse në një platformë të vetme.",

        // Other page
        "Other Opportunities": "Mundësi të Tjera",
        "Here you will find competitions, fellowships and online courses.": "Këtu do të gjeni konkurse, fellowship dhe kurse online.",

        // Programs page
        "A summer leadership and academic enrichment program.": "Një program veror i lidershipit dhe pasurimit akademik.",

        // Scholarships page
        "Fully funded scholarship to study in the United States.": "Bursë e financuar plotësisht për të studiuar në Shtetet e Bashkuara.",

        // Search placeholder
        "Search opportunities": "Kërko mundësi",

        // Filter options
        "All": "Të gjitha"
    }
};

/* ---------------- TRANSLATION FUNCTION ---------------- */
function translateText(text, language) {
    if (language === "en") return text;
    return translations[language]?.[text] || text;
}

/* ---------------- LANGUAGE SWITCH ---------------- */
function initializeTranslation() {
    let languageSelect = document.getElementById("languageSelect");
    if (!languageSelect) return;

    // Load saved language preference
    let savedLanguage = localStorage.getItem("edugateway-language");
    if (savedLanguage) {
        languageSelect.value = savedLanguage;
        applyTranslation(savedLanguage);
    }

    languageSelect.addEventListener("change", function() {
        let language = this.value;
        localStorage.setItem("edugateway-language", language);
        applyTranslation(language);
    });
}

function applyTranslation(language) {
    // 1. Handle normal text elements
    let elements = document.querySelectorAll("[data-translate]");
    elements.forEach(el => {
        if (!el.hasAttribute("data-original")) {
            el.setAttribute("data-original", el.innerText.trim());
        }
        let original = el.getAttribute("data-original");
        el.innerText = translateText(original, language);
    });

    // 2. Handle input placeholders
    let searchInput = document.getElementById("searchInput");
    if (searchInput) {
        if (!searchInput.hasAttribute("data-original-placeholder")) {
            searchInput.setAttribute("data-original-placeholder", searchInput.placeholder);
        }
        let original = searchInput.getAttribute("data-original-placeholder");
        searchInput.placeholder = translateText(original, language);
    }

    // 3. Handle select options
    let typeFilter = document.getElementById("typeFilter");
    if (typeFilter) {
        let options = typeFilter.querySelectorAll("option");
        options.forEach(option => {
            if (!option.hasAttribute("data-original")) {
                option.setAttribute("data-original", option.textContent.trim());
            }
            let original = option.getAttribute("data-original");
            option.textContent = translateText(original, language);
        });
    }
}

/* ---------------- SEARCH & FILTER ---------------- */
function initializeFilter() {
    let searchInput = document.getElementById("searchInput");
    let typeFilter = document.getElementById("typeFilter");

    if (!searchInput || !typeFilter) return;

    function filterCards() {
        let searchTerm = searchInput.value.toLowerCase();
        let selectedType = typeFilter.value;
        let cards = document.querySelectorAll(".card");

        cards.forEach(card => {
            let text = card.innerText.toLowerCase();
            let type = card.getAttribute("data-type") || "other";

            let matchesSearch = text.includes(searchTerm);
            let matchesType = selectedType === "all" || type === selectedType;

            card.style.display = (matchesSearch && matchesType) ? "block" : "none";
        });
    }

    searchInput.addEventListener("input", filterCards);
    typeFilter.addEventListener("change", filterCards);
}

/* ---------------- INITIALIZE ON PAGE LOAD ---------------- */
document.addEventListener("DOMContentLoaded", function() {
    initializeTranslation();
    initializeFilter();
});

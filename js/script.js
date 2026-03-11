/* ---------------- TRANSLATIONS DICTIONARY ---------------- */
const translations = {
    sq: {
        // Navigation
        "Home": "Ballina",
        "Scholarships": "Bursat",
        "Programs": "Programet",
        "Other": "TÃ« tjera",
        "About": "Rreth nesh",

        // Reminder & Feedback
        "Reminder": "KujtesÃ«",
        "Upcoming program deadlines this month.": "Afatet e programeve kÃ«tÃ« muaj.",
        "CLICK HERE TO ENTER FEEDBACK ON EDUGATEWAY :)": "KLIKO KÃ‹TU PÃ‹R TÃ‹ DHÃ‹NÃ‹ KOMENTE PÃ‹R EDUGATEWAY :)",

        // Home page
        "Unlock global opportunities for students everywhere": "Zbuloni mundÃ«si globale pÃ«r studentÃ«t kudo",
        "EduGateway helps students discover global scholarships, programs and learning opportunities.": "EduGateway ndihmon studentÃ«t tÃ« zbulojnÃ« bursa, programe dhe mundÃ«si mÃ«simore globale.",
        "Many students miss life-changing opportunities simply because they never hear about them.": "ShumÃ« studentÃ« humbasin mundÃ«si qÃ« ndryshojnÃ« jetÃ«n thjesht sepse nuk dÃ«gjojnÃ« kurrÃ« pÃ«r to.",
        "Discover fully funded scholarships worldwide.": "Zbuloni bursa tÃ« financuara plotÃ«sisht nÃ« mbarÃ« botÃ«n.",
        "Find summer programs and research opportunities.": "Gjeni programe verore dhe mundÃ«si kÃ«rkimore.",
        "Why EduGateway?": "Pse EduGateway?",
        "EduGateway collects opportunities into one platform so students can easily find them.": "EduGateway mbledh mundÃ«sitÃ« nÃ« njÃ« platformÃ« tÃ« vetme qÃ« studentÃ«t t'i gjejnÃ« lehtÃ«.",

        // About page
        "About EduGateway": "Rreth EduGateway",
        "Many talented students miss opportunities simply because they never hear about them.": "ShumÃ« studentÃ« tÃ« talentuar humbasin mundÃ«si thjesht sepse nuk dÃ«gjojnÃ« kurrÃ« pÃ«r to.",
        "EduGateway was created to bring scholarships, programs and competitions into one platform.": "EduGateway u krijua pÃ«r tÃ« sjellÃ« bursa, programe dhe konkurse nÃ« njÃ« platformÃ« tÃ« vetme.",

        // Other page
        "Other Opportunities": "MundÃ«si tÃ« Tjera",
        "Here you will find competitions, fellowships and online courses.": "KÃ«tu do tÃ« gjeni konkurse, fellowship dhe kurse online.",

        // Programs page
        "A summer leadership and academic enrichment program.": "NjÃ« program veror i lidershipit dhe pasurimit akademik.",

        // Scholarships page
        "Fully funded scholarship to study in the United States.": "BursÃ« e financuar plotÃ«sisht pÃ«r tÃ« studiuar nÃ« Shtetet e Bashkuara.",

        // Search placeholder
        "Search opportunities": "KÃ«rko mundÃ«si",

        // Filter options
        "All": "TÃ« gjitha"
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


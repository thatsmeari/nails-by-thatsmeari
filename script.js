document.getElementById('year').textContent = new Date().getFullYear();

// RO-EN translations
const translations = {
  "Services": "Servicii",
  "Gallery": "Galerie",
  "Colors": "Culori",
  "Reviews": "Recenzii",
  "Contact": "Contact",
  "Book now": "Rezervă acum",
  "Nail studio · Timișoara": "Studio de unghii · Timișoara",
  "Your nails,": "Unghiile tale,",
  "your moment.": "momentul tău.",
  "Thoughtfully created nails, beautiful details, and a little time just for you. Discover your next favorite set at Nails by thatsmeari.": "Unghii realizate cu grijă, detalii frumoase și puțin lux la îndemâna ta.",
  "Book an appointment ↗": "Programează-te ↗",
  "Explore the gallery": "Vezi galeria",
  "A little luxury": "Puțin lux",
  "at your fingertips": "la îndemâna ta",
  "The service menu": "Lista de servicii",
  "Find your perfect set.": "Alege setul perfect.",
  "Explore the available manicure services.": "Explorează serviciile de manichiură disponibile.",
  "Explore the nail services available at Nails by thatsmeari.": "Descoperă serviciile de manichiură disponibile la Nails by thatsmeari.",
  "Your manicure photo": "Fotografia manichiurii",
  "Gel polish": "Ojă semipermanentă",
  "A glossy, polished look in the shade you love.": "Un aspect lucios și îngrijit, în nuanța preferată.",
  "Add your price · Add duration": "Adaugă prețul · Adaugă durata",
  "Your builder gel photo": "Fotografia cu gel de construcție",
  "Builder gel": "Gel de construcție",
  "Beautiful structure with a refined finish.": "Formă frumoasă și finisaj elegant.",
  "Your nail art photo": "Fotografia cu nail art",
  "Nail art & extensions": "Nail art și extensii",
  "Personalized designs, from subtle details to statement sets.": "Modele personalizate, de la detalii discrete la seturi îndrăznețe.",
  "Made with care": "Realizat cu grijă",
  "A closer look at the details.": "Detalii care fac diferența.",
  "Real nail designs, made with love.": "Modele de unghii reale, create cu drag.",
  "Nude and natural nail design": "Model de unghii nude și natural",
  "French tips": "French",
  "Chrome finish": "Finisaj chrome",
  "Bold colors": "Culori îndrăznețe",
  "Your color story": "Povestea culorilor tale",
  "Which shade feels like you?": "Ce nuanță ți se potrivește?",
  "Showcase your available polish colors and finishes. These are visual placeholders, not a real inventory.": "Prezintă culorile și finisajele disponibile. Acestea sunt exemple vizuale, nu o listă reală de stoc.",
  "Soft blush": "Roz pudrat",
  "Rose pink": "Roz trandafiriu",
  "Rose burgundy": "Burgundy",
  "Milky white": "Alb lăptos",
  "Soft lilac": "Lila delicat",
  "Sage": "Verde salvie",
  "Kind words": "Păreri frumoase",
  "Client love.": "Părerea clientelor.",
  "Only publish genuine reviews from your clients, with their permission.": "Publică doar recenzii reale de la cliente, cu acordul lor.",
  "Add a real client review here.": "Adaugă aici o recenzie reală de la o clientă.",
  "— Client name or initials, with permission": "— Numele sau inițialele clientei, cu acordul ei",
  "Add another genuine testimonial here.": "Adaugă aici încă o mărturie autentică.",
  "Share what clients love about your work.": "Spune ce apreciază clientele la munca ta.",
  "The details matter": "Detaliile contează",
  "Products we love.": "Produsele pe care le apreciem.",
  "Product photo": "Fotografie produs",
  "Polish & color": "Ojă și culoare",
  "All colors available.": "Toate culorile disponibile.",
  "Nail care": "Îngrijirea unghiilor",
  "Share your favorite care products.": "Prezintă produsele tale preferate pentru îngrijire.",
  "Studio photo": "Fotografie studio",
  "Care & cleanliness": "Îngrijire și curățenie",
  "Describe your actual hygiene and tool-care practices.": "Descrie practicile tale reale de igienă și îngrijire a instrumentelor.",
  "Your next set starts here": "Următorul tău set începe aici",
  "Ready for a little nail moment?": "Ești gata pentru un moment dedicat unghiilor tale?",
  "Timisoara, Romania": "Timișoara, România",
  "Instagram: ": "Instagram: ",
  "Email: ": "Email: ",
  "AI Nail Stylist": "Sitilist AI.",
  "Tell me what look you want and I’ll suggest a service.": "Spune-mi ce look îți dorești și îți voi recomanda un serviciu.",
  "Example: soft nude for work": "Exemplu: nuanță nude discretă pentru serviciu",
  "Made with care.": "Realizat cu grijă.",
  "Send": "Trimite",
  "Need help choosing a nail look?": "Ai nevoie de ajutor să alegi un model de unghii?",
};

const textNodes = [];
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
let node;

while ((node = walker.nextNode())) {
  if (node.nodeValue.trim()) {
    textNodes.push({ node, original: node.nodeValue });
  }
}

function setLanguage(language) {
  textNodes.forEach(({ node, original }) => {
    const trimmed = original.trim();
    const leading = original.match(/^\s*/)[0];
    const trailing = original.match(/\s*$/)[0];

    if (language === 'ro') {
      node.nodeValue = leading + (translations[trimmed] || trimmed) + trailing;
    } else {
      const english = Object.keys(translations).find(
        key => translations[key] === trimmed
      );
      node.nodeValue = leading + (english || trimmed) + trailing;
    }
  });

  document.documentElement.lang = language;

  document.querySelectorAll('[data-lang]').forEach(button => {
    const active = button.dataset.lang === language;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });

  syncAiButtonLanguage(language);

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.content = language === 'ro'
      ? 'Nails by thatsmeari — servicii de manichiură și modele de unghii în Timișoara, România.'
      : 'Nails by thatsmeari — thoughtful nail care and beautiful nail designs in Timișoara, Romania.';
  }

  document.title = 'Nails by thatsmeari | Timișoara';
}

document.querySelectorAll('[data-lang]').forEach(button => {
  button.addEventListener('click', () => setLanguage(button.dataset.lang));
});

setLanguage('ro');

function showProduct(color, nails) {
  document.getElementById("preview-color").src = color;
  document.getElementById("preview-nails").src = nails;

  const preview = document.getElementById("product-preview");
  preview.style.display = "block";
  preview.classList.add("show");
}

const AI_WORKER_URL = "https://nails-ai-assistant.craciunescuariana.workers.dev/chat";

const aiToggle = document.getElementById("ai-toggle");

const aiButtonLabels = {
  ro: "Ai nevoie de ajutor să alegi un model de unghii?",
  en: "Need help choosing a nail look?"
};

function syncAiButtonLanguage(language = document.documentElement.lang || "ro") {
  const button = document.getElementById("ai-toggle");
  if (button) {
    button.textContent = language === "ro"
      ? "Ai nevoie de ajutor să alegi un model de unghii?"
      : "Need help choosing a nail look?";
  }
}
const aiPanel = document.getElementById("ai-panel");
const aiClose = document.getElementById("ai-close");
const aiMessages = document.getElementById("ai-messages");
const aiForm = document.getElementById("ai-form");
const aiInput = document.getElementById("ai-input");

if (aiToggle && aiPanel && aiClose && aiMessages && aiForm && aiInput) {
  aiToggle.addEventListener("click", () => {
    const isOpen = aiPanel.hidden;
    aiPanel.hidden = !isOpen;
    aiToggle.setAttribute("aria-expanded", String(isOpen));

    if (isOpen) {
      aiInput.focus();
    }
  });

  aiClose.addEventListener("click", () => {
    aiPanel.hidden = true;
    aiToggle.setAttribute("aria-expanded", "false");
  });

  function addAiMessage(text, isUser = false) {
    const item = document.createElement("p");
    item.className = "ai-message";

    if (isUser) {
      item.style.background = "#8D535D";
      item.style.color = "#fff";
      item.style.marginLeft = "18px";
    }

    item.textContent = text;
    aiMessages.appendChild(item);
    aiMessages.scrollTop = aiMessages.scrollHeight;
  }

  aiForm.addEventListener("submit", async event => {
    event.preventDefault();

    const value = aiInput.value.trim();
    if (!value) return;

    addAiMessage(value, true);
    aiInput.value = "";
    aiInput.disabled = true;

    try {
      const response = await fetch(AI_WORKER_URL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    message: `
      Detect the language of the user's message and reply in that same language.
      If the user writes in Romanian, answer in Romanian.
      If the user writes in English, answer in English.
      Do not translate the user's message; respond naturally in their language.

      User message:
      ${value}
    `
  })
});

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "AI request failed");
      }

      addAiMessage(data.reply || "Sorry, I couldn't get a reply.");
        } catch (error) {
      console.error(error);
      addAiMessage(
        response && response.status === 503
          ? "The AI is very busy right now. Please try again in a moment."
          : "Sorry, I couldn't get a reply right now."
      );
    } finally {

      aiInput.disabled = false;
      aiInput.focus();
    }
  });
}

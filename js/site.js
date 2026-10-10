const PAGES = [
  { title: "Home", url: "index.html", text: "abstract introduction smart farm cattle AI machine learning Sri Lanka farmers" },
  { title: "Literature survey", url: "domain.html#literature", text: "precision livestock DenseNet YOLO behavior nutrition birth market identification literature" },
  { title: "Research gap", url: "domain.html#gap", text: "fragmented tools late diagnosis smallholder unified mobile vision clinical behavior" },
  { title: "Research problem", url: "domain.html#problem", text: "problem statement traditional cattle farming disease feed birth milk price" },
  { title: "Research objectives", url: "domain.html#objectives", text: "objectives disease severity treatment manual weight measurement feed nutrition calving egg hatch market identification" },
  { title: "Methodology", url: "domain.html#methodology", text: "methodology datasets training Flask Flutter evaluation dual model" },
  { title: "Technologies used", url: "domain.html#technologies", text: "tensorflow keras yolov8 flask flutter sqlite opencv scikit-learn" },
  { title: "Milestones", url: "milestones.html", text: "proposal progress presentation final assessment viva marks" },
  { title: "Documents", url: "documents.html", text: "charter proposal checklist final report status document logbook" },
  { title: "Presentations", url: "presentations.html", text: "slides proposal progress final presentation" },
  { title: "About us", url: "about.html", text: "group members Jayawardhana H.A.S. IT22136138 Illangasinhe I.M.A.D. IT22282118 Shamika G.L. IT22139894 Arachchi W.A.A.I.W. IT22134608 SLIIT NLDB" },
  { title: "Project documentation", url: "files/project-documentation.html", text: "documentation manual weight measurement feed nutrition disease behaviour milk" },
  { title: "Project presentation", url: "files/project-presentation.html", text: "slides presentation manual weight measurement project overview" },
  { title: "Contact", url: "contact.html", text: "email phone Malabe Faculty of Computing contact form" }
];

function setupSearch() {
  const forms = document.querySelectorAll("[data-search]");
  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = form.querySelector("input");
      const query = (input.value || "").trim();
      if (!query) return;
      window.location.href = "search.html?q=" + encodeURIComponent(query);
    });
  });

  const box = document.querySelector("[data-results]");
  if (!box) return;
  const params = new URLSearchParams(window.location.search);
  const query = (params.get("q") || "").trim();
  const label = document.querySelector("[data-query]");
  if (label) label.textContent = query || "everything";
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const hits = PAGES.filter((page) => {
    const hay = (page.title + " " + page.text).toLowerCase();
    return terms.every((term) => hay.includes(term));
  });
  if (!query) return;
  if (!hits.length) {
    box.innerHTML = "<p>No matching page. Try disease, feed, milestones, or documents.</p>";
    return;
  }
  box.innerHTML = hits.map((hit) =>
    `<a href="${hit.url}"><strong>${hit.title}</strong><br><small>${hit.url}</small></a>`
  ).join("");
}

function setupMilestones() {
  const map = {
    proposal: "pick-proposal",
    "progress-1": "pick-progress-1",
    "progress-2": "pick-progress-2",
    final: "pick-final",
    viva: "pick-viva"
  };
  const hash = (location.hash || "").replace("#", "");
  if (map[hash]) {
    const input = document.getElementById(map[hash]);
    if (input) input.checked = true;
  }
  document.querySelectorAll(".dropdown-list label").forEach((label) => {
    label.addEventListener("click", () => {
      const details = label.closest("details");
      if (details) details.open = false;
    });
  });
}

function setupContact() {
  const form = document.querySelector("[data-contact]");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const topic = String(data.get("topic") || "Project enquiry").trim();
    const message = String(data.get("message") || "").trim();
    const inbox = form.dataset.inbox;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const link = `mailto:${inbox}?subject=${encodeURIComponent(topic)}&body=${encodeURIComponent(body)}`;
    const status = document.querySelector("[data-status]");
    if (status) status.textContent = "Your email app should open with this message. If it does not, copy the text below.";
    const preview = document.querySelector("[data-preview]");
    if (preview) preview.textContent = `To: ${inbox}\nSubject: ${topic}\n\n${body}`;
    window.location.href = link;
  });
}

setupSearch();
setupMilestones();
setupContact();

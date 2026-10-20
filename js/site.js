const PAGES = [
  { title: "Home", url: "index.html", text: "abstract introduction smart farm cattle AI machine learning Sri Lanka farmers" },
  { title: "Literature survey", url: "domain.html#literature", text: "precision livestock DenseNet YOLO behavior nutrition birth market identification literature" },
  { title: "Research gap", url: "domain.html#gap", text: "fragmented tools late diagnosis smallholder unified mobile vision clinical behavior" },
  { title: "Research problem", url: "domain.html#problem", text: "problem statement traditional cattle farming disease feed birth milk price" },
  { title: "Research objectives", url: "domain.html#objectives", text: "objectives disease severity treatment manual weight measurement feed nutrition calving egg hatch market identification" },
  { title: "Methodology", url: "domain.html#methodology", text: "methodology datasets training Flask Flutter evaluation dual model" },
  { title: "Technologies used", url: "domain.html#technologies", text: "tensorflow keras yolov8 flask flutter sqlite opencv scikit-learn" },
  { title: "Milestones", url: "milestones.html", text: "proposal progress presentation final assessment viva marks" },
  { title: "Documents", url: "documents.html", text: "charter proposal checklist final report thesis draft logbook evidence sharepoint taf research paper" },
  { title: "Topic assessment form", url: "documents.html#taf", text: "taf topic assessment form Jayawardhana Illangasinhe Shamika Arachchi" },
  { title: "Research paper", url: "documents.html#paper", text: "research paper personalized feeding multimodal disease detection" },
  { title: "Research folder", url: "documents.html#library", text: "sharepoint full research folder taf paper presentations" },
  { title: "Final document and thesis", url: "documents.html#final", text: "final thesis group report individual component sharepoint" },
  { title: "Draft thesis", url: "documents.html#draft", text: "draft thesis upload working copy sharepoint" },
  { title: "Data collection evidence", url: "documents.html#evidence", text: "data collection evidence photographs forms datasets" },
  { title: "Log book", url: "documents.html#logbook", text: "logbook log book entries topic change" },
  { title: "Presentations", url: "presentations.html", text: "slides proposal progress final presentation pp1 pp2 sharepoint" },
  { title: "Final presentation", url: "presentations.html#final", text: "final presentation sharepoint folder closing deck" },
  { title: "Progress presentation 1", url: "presentations.html#progress-1", text: "pp1 progress presentation slides AI smart farm" },
  { title: "Progress presentation 2", url: "presentations.html#progress-2", text: "pp2 progress presentation slides converting traditional farm" },
  { title: "About us", url: "about.html", text: "group members supervisor Manori Gamage manori.g@sliit.lk co-supervisor Thilini Jayalath thilini.j@sliit.lk Jayawardhana H.A.S. IT22136138 sharadeeamanda74@gmail.com Illangasinhe I.M.A.D. IT22282118 avishka.dinesh12345@gmail.com Shamika G.L. IT22139894 lahirushamika59@gmail.com Arachchi W.A.A.I.W. IT22134608 ishaniamalsha@gmail.com SLIIT NLDB" },
  { title: "Project documentation", url: "files/project-documentation.html", text: "documentation manual weight measurement feed nutrition disease behaviour milk" },
  { title: "Project presentation", url: "files/project-presentation.html", text: "slides presentation manual weight measurement project overview" },
  { title: "Contact", url: "contact.html", text: "email sliitresearch2@gmail.com phone Malabe Faculty of Computing contact form" }
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
  const status = form.querySelector("[data-status]");
  const preview = form.querySelector("[data-preview]");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const topic = String(data.get("topic") || "Project enquiry").trim();
    const message = String(data.get("message") || "").trim();
    const inbox = form.dataset.inbox;
    const button = form.querySelector("button[type=submit]");
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    if (button) button.disabled = true;
    if (status) status.textContent = "Sending…";
    if (preview) preview.textContent = "";
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(inbox)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          _replyto: email,
          _subject: `Smart Farm · ${topic}`,
          message,
          _template: "table",
          _captcha: "false"
        })
      });
      const result = await response.json().catch(() => ({}));
      if (response.ok && String(result.success) === "true") {
        if (status) status.textContent = `Sent. The message will arrive at ${inbox}.`;
        form.reset();
        return;
      }
      const detail = String(result.message || "");
      if (/activation/i.test(detail)) {
        if (status) status.textContent = `Open ${inbox} and click Activate Form in the confirmation email. After that, messages from this page arrive there.`;
        return;
      }
      if (status) status.textContent = detail || "The message could not be sent.";
    } catch (error) {
      if (status) status.textContent = "The message could not be sent from the page. Your email app will open so you can send it.";
      if (preview) preview.textContent = `To: ${inbox}\nSubject: ${topic}\n\n${body}`;
      window.location.href = `mailto:${inbox}?subject=${encodeURIComponent(`Smart Farm · ${topic}`)}&body=${encodeURIComponent(body)}`;
    } finally {
      if (button) button.disabled = false;
    }
  });
}

setupSearch();
setupMilestones();
setupContact();

(function () {
  const root = document.querySelector("[data-archive]");
  if (!root) return;

  const records = Array.from(root.querySelectorAll(".record"));
  const groups = Array.from(root.querySelectorAll(".index-group"));
  const sheet = root.querySelector("[data-sheet]");
  const search = root.querySelector("[data-doc-search]");
  const filters = Array.from(root.querySelectorAll("[data-filter]"));
  const count = root.querySelector("[data-doc-count]");
  const toast = root.querySelector("[data-toast]");
  let group = "all";
  let active = null;
  let toastTimer = 0;

  document.documentElement.classList.add("archive-live");

  function matches(record, query) {
    if (group !== "all" && record.dataset.group !== group) return false;
    if (!query) return true;
    const hay = ((record.dataset.text || "") + " " + record.textContent).toLowerCase();
    return query.split(/\s+/).every((term) => hay.includes(term));
  }

  function visible() {
    const query = (search.value || "").trim().toLowerCase();
    return records.filter((record) => matches(record, query));
  }

  function paint() {
    const list = visible();
    const shown = new Set(list);
    records.forEach((record) => {
      record.hidden = !shown.has(record);
    });
    groups.forEach((block) => {
      block.hidden = !block.querySelector(".record:not([hidden])");
    });
    if (count) {
      const nounBase = root.dataset.noun || "document";
      const noun = list.length === 1 ? nounBase : nounBase + "s";
      count.textContent = list.length + " " + noun;
    }
    if (!list.length) {
      open(null, { updateHash: false });
      return;
    }
    if (!active || active.hidden) open(list[0], { updateHash: true });
  }

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-on");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove("is-on"), 2200);
  }

  function absoluteLink(href) {
    try {
      return new URL(href, window.location.href).href;
    } catch (error) {
      return href;
    }
  }

  function mountPreview(node) {
    node.querySelectorAll("[data-preview]").forEach((slot) => {
      const frame = document.createElement("iframe");
      frame.className = "viewer";
      frame.title = slot.dataset.previewTitle || "Document preview";
      frame.src = slot.dataset.preview;
      slot.replaceWith(frame);
    });
  }

  function wireSheet(node) {
    const copy = node.querySelector("[data-copy]");
    if (!copy) return;
    copy.addEventListener("click", async () => {
      const url = absoluteLink(copy.dataset.copy || "");
      try {
        await navigator.clipboard.writeText(url);
        showToast("Link copied");
      } catch (error) {
        showToast("Select the link and copy it");
      }
    });
  }

  function open(record, options) {
    const fromKeyboard = Boolean(options && options.fromKeyboard);
    const updateHash = !options || options.updateHash !== false;
    active = record;
    records.forEach((item) => {
      const on = item === record;
      item.classList.toggle("is-active", on);
      const button = item.querySelector(".record-open");
      if (button) button.setAttribute("aria-current", on ? "true" : "false");
    });
    if (!sheet) return;
    sheet.classList.remove("is-in");
    if (!record) {
      sheet.replaceChildren();
      const empty = document.createElement("p");
      empty.className = "sheet-empty";
      empty.textContent = "Nothing matches that search.";
      sheet.appendChild(empty);
      return;
    }
    const body = record.querySelector(".record-body");
    const holder = document.createElement("div");
    holder.innerHTML = body ? body.innerHTML : "";
    mountPreview(holder);
    wireSheet(holder);
    sheet.replaceChildren(holder);
    void sheet.offsetWidth;
    sheet.classList.add("is-in");
    if (updateHash && record.id && window.location.hash !== "#" + record.id) {
      history.replaceState(null, "", "#" + record.id);
    }
    const button = record.querySelector(".record-open");
    if (button && fromKeyboard) button.scrollIntoView({ block: "nearest" });
    if (fromKeyboard) {
      const heading = sheet.querySelector("h2");
      if (heading) {
        heading.tabIndex = -1;
        heading.focus({ preventScroll: true });
      }
    }
  }

  records.forEach((record) => {
    const button = record.querySelector(".record-open");
    if (!button) return;
    button.addEventListener("click", () => open(record, { updateHash: true }));
  });

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      group = button.dataset.filter || "all";
      filters.forEach((item) => item.setAttribute("aria-pressed", item === button ? "true" : "false"));
      paint();
    });
  });

  if (search) search.addEventListener("input", paint);

  document.addEventListener("keydown", (event) => {
    const typing = event.target.closest("input, textarea, select");
    if (typing) return;
    const list = visible();
    if (!list.length) return;
    const index = Math.max(0, list.indexOf(active));
    if (event.key === "ArrowDown" || event.key === "j") {
      event.preventDefault();
      open(list[Math.min(list.length - 1, index + 1)], { fromKeyboard: true, updateHash: true });
    } else if (event.key === "ArrowUp" || event.key === "k") {
      event.preventDefault();
      open(list[Math.max(0, index - 1)], { fromKeyboard: true, updateHash: true });
    } else if (event.key === "Enter" && active && !event.target.closest("a, button")) {
      const link = sheet.querySelector("a.btn-primary");
      if (link) link.click();
    }
  });

  const hash = (window.location.hash || "").replace("#", "");
  const fromHash = records.find((record) => record.id === hash);
  open(fromHash || records[0], { updateHash: false });
  paint();
})();

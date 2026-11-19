/* Datacenter Omnibus: study hub tools (Module 24, practice-exams.html, flashcards.html, index.html).
   Needs catalog.js, omnibus.js and the module/bank data files loaded first. */
(function () {
  "use strict";
  var OMNI = window.OMNI, h = OMNI.h, S = OMNI.svg;

  /* Exam facts and domain weights as published at time of writing (Nov 2026). Always verify on the vendor site. */
  OMNI.EXAMS = {
    A1: { q: "Up to 90", time: "90 min", pass: "675 / 900", types: "Multiple choice, drag and drop, performance-based", pre: "None; 12 months hands-on recommended", weights: { 1: 13, 2: 23, 3: 25, 4: 11, 5: 28 }, full: 90, min: 90 },
    A2: { q: "Up to 90", time: "90 min", pass: "700 / 900", types: "Multiple choice, drag and drop, performance-based", pre: "None; 12 months hands-on recommended", weights: { 1: 28, 2: 28, 3: 23, 4: 21 }, full: 90, min: 90 },
    N: { q: "Up to 90", time: "90 min", pass: "720 / 900", types: "Multiple choice, performance-based", pre: "None; A+ and 9–12 months networking recommended", weights: { 1: 23, 2: 20, 3: 19, 4: 14, 5: 24 }, full: 90, min: 90 },
    S: { q: "Up to 90", time: "90 min", pass: "750 / 900", types: "Multiple choice, performance-based", pre: "None; Network+ and 2 years in IT admin with a security focus recommended", weights: { 1: 12, 2: 22, 3: 18, 4: 28, 5: 20 }, full: 90, min: 90 },
    ITIL: { q: "40", time: "60 min", pass: "65% (26/40)", types: "Multiple choice only", pre: "None (training via an accredited partner is common). ITIL Version 5 Foundation launched Feb 2026", weights: { 1: 12.5, 2: 15, 3: 5, 4: 2.5, 5: 5, 6: 17.5, 7: 42.5 }, full: 40, min: 60 },
    DCCA: { q: "Check with EPI", time: "Check with EPI", pass: "Check with EPI", types: "Multiple choice (verify)", pre: "None; usually taken after EPI's official course", weights: null, full: 50, min: 60 },
    CISM: { q: "150", time: "4 hours", pass: "450 / 800 (scaled)", types: "Multiple choice", pre: "5 years infosec experience, 3 in management, to certify (can pass the exam first)", weights: { 1: 17, 2: 20, 3: 33, 4: 30 }, full: 150, min: 240 },
    CISA: { q: "150", time: "4 hours", pass: "450 / 800 (scaled)", types: "Multiple choice", pre: "5 years IS audit, control, assurance or security experience to certify (waivers available)", weights: { 1: 18, 2: 18, 3: 12, 4: 26, 5: 26 }, full: 150, min: 240 }
  };
  OMNI.BANK_MODULE = { aplus: 5, netplus: 13, secplus: 16, dcca: 18, itil: 19, cism: 21, cisa: 22 };
  OMNI.EXAM_CERTS = ["A1", "A2", "N", "S", "ITIL", "DCCA", "CISM", "CISA"];

  function pool(cert) {
    return OMNI.allQuestions().filter(function (q) { if (q.bank && !q.m) q.m = OMNI.BANK_MODULE[q.bank]; return q.c === cert; });
  }
  OMNI.certPool = pool;

  /* ---------- Practice exam engine ---------- */
  OMNI.examEngine = function (el) {
    if (typeof el === "string") el = document.getElementById(el); if (!el) return;
    var certSel = h("select", { "aria-label": "Certification" }, OMNI.EXAM_CERTS.map(function (k) { return h("option", { value: k }, OMNI.certName(k) + " (" + OMNI.certs[k].code + ")"); }));
    var lenSel = h("select", { "aria-label": "Length" });
    var timer = h("input", { type: "checkbox" });
    var info = h("p", { class: "figcap", "aria-live": "polite" });
    var area = h("div");
    function lens() {
      var c = certSel.value, e = OMNI.EXAMS[c], n = pool(c).length; lenSel.innerHTML = "";
      [10, 25, 50, e.full].filter(function (v, i, a) { return a.indexOf(v) === i; }).forEach(function (v) { lenSel.appendChild(h("option", { value: String(v) }, v === e.full ? "Full length (" + Math.min(v, n) + ")" : v + " questions")); });
      var byD = {}; pool(c).forEach(function (q) { var k = String(q.d || "").split(".")[0]; byD[k] = (byD[k] || 0) + 1; });
      info.innerHTML = "<b>" + n + "</b> " + OMNI.certName(c) + " questions in the pool across " + Object.keys(byD).length + " domains. " + (e.weights ? "Real exam: " + e.q + " questions, " + e.time + ", pass " + e.pass + " (verify)." : "Check the current question count, time and pass mark with the vendor.") + (n < e.full ? " The pool is smaller than a full exam, so a full-length run uses every question." : "");
    }
    certSel.onchange = lens;
    var start = h("button", { type: "button", class: "primary", onclick: function () {
      var c = certSel.value, e = OMNI.EXAMS[c], p = pool(c), n = Math.min(+lenSel.value, p.length);
      var qs = OMNI.pickQuestions(p, n, e.weights);
      var mins = Math.max(5, Math.round(e.min * n / e.full));
      try { OMNI.store.set("hub:lastExam", { c: c, n: n }); } catch (er) { }
      OMNI.renderQuiz(area, qs, { timerMin: timer.checked ? mins : 0, showModule: true, flags: true, prefix: "px" + c, shuffleOptions: true,
        onDone: function (r, t) { var hist = OMNI.store.get("hub:examHistory", []); hist.push({ c: c, r: r, t: t, at: Date.now() }); OMNI.store.set("hub:examHistory", hist.slice(-50)); drawHist(); } });
      area.scrollIntoView({ behavior: OMNI.reduced ? "auto" : "smooth" });
    } }, "Start exam");
    var hist = h("div");
    function drawHist() {
      var H = OMNI.store.get("hub:examHistory", []); hist.innerHTML = "";
      if (!H.length) return;
      hist.appendChild(h("p", { class: "figcap" }, "Your recent results (saved in this browser):"));
      hist.appendChild(h("div", { class: "chips" }, H.slice(-8).reverse().map(function (x) { var p = Math.round(100 * x.r / x.t); return h("span", { class: p >= 75 ? "pill-ok" : p >= 60 ? "pill-warn" : "pill-no" }, OMNI.certName(x.c) + ": " + x.r + "/" + x.t + " (" + p + "%)"); })));
    }
    el.appendChild(h("div", { class: "row" }, [h("label", null, ["Cert ", certSel]), h("label", null, ["Length ", lenSel]), h("label", null, [timer, " Timer at real-exam pace"]), start]));
    el.appendChild(info); el.appendChild(hist); el.appendChild(area);
    var last = OMNI.store.get("hub:lastExam", null); if (last && OMNI.EXAMS[last.c]) certSel.value = last.c;
    lens(); drawHist();
  };

  /* ---------- Cert crosswalk ---------- */
  OMNI.crosswalk = function (el) {
    if (typeof el === "string") el = document.getElementById(el); if (!el) return;
    var all = OMNI.allQuestions();
    all.forEach(function (q) { if (q.bank && !q.m) q.m = OMNI.BANK_MODULE[q.bank]; });
    var certSel = h("select", { "aria-label": "Certification" }, OMNI.EXAM_CERTS.map(function (k) { return h("option", { value: k }, OMNI.certName(k)); }));
    var out = h("div");
    function draw() {
      var c = certSel.value, cert = OMNI.certs[c], e = OMNI.EXAMS[c]; out.innerHTML = "";
      var rows = Object.keys(cert.domains).map(function (dk) {
        var mods = {}; all.forEach(function (q) { if (q.c === c && String(q.d || "").split(".")[0] === dk && q.m) mods[q.m] = (mods[q.m] || 0) + 1; });
        (OMNI.catalog || []).forEach(function (m) { if (m.certs.indexOf(c) >= 0 && !mods[m.n] && OMNI.data[m.n] && (OMNI.data[m.n].certmap || []).some(function (x) { return x.c === c && x.o.indexOf(dk + ".") >= 0; })) mods[m.n] = mods[m.n] || 0; });
        var links = Object.keys(mods).map(Number).sort(function (a, b) { return a - b; }).map(function (n) { return '<a href="' + OMNI.file(n) + '#quiz" title="' + OMNI.esc(OMNI.mod(n).title) + '">M' + n + "</a>" + (mods[n] ? " <small>(" + mods[n] + "q)</small>" : ""); }).join(", ");
        var w = e.weights ? e.weights[dk] : null;
        return "<tr><td><b>" + dk + ".</b> " + OMNI.esc(cert.domains[dk]) + "</td><td>" + (w != null ? w + "%" : "–") + "</td><td>" + (links || "<small>see the modules listed in the cert map</small>") + "</td></tr>";
      }).join("");
      out.innerHTML = "<div class='tablewrap'><table><thead><tr><th>" + OMNI.esc(cert.name) + " (" + OMNI.esc(cert.code) + ") domain</th><th>Weight</th><th>Covered in (questions)</th></tr></thead><tbody>" + rows + "</tbody></table></div>" +
        "<div class='tablewrap'><table><tbody><tr><th>Questions</th><td>" + e.q + "</td><th>Time</th><td>" + e.time + "</td></tr><tr><th>Passing score</th><td>" + e.pass + "</td><th>Question types</th><td>" + e.types + "</td></tr><tr><th>Prerequisites</th><td colspan='3'>" + e.pre + "</td></tr></tbody></table></div>" +
        "<p class='figcap'>Exam facts are from the versions current at time of writing. <a href='" + cert.url + "' rel='noopener'>Verify the current details on the " + OMNI.esc(cert.vendor) + " site</a>.</p>";
    }
    certSel.onchange = draw;
    el.appendChild(h("div", { class: "row" }, [h("label", null, ["Show crosswalk for ", certSel])]));
    el.appendChild(out); draw();
    // Full matrix: modules × certs
    var mx = "<div class='tablewrap'><table><thead><tr><th>Module</th>" + OMNI.EXAM_CERTS.map(function (k) { return "<th>" + OMNI.esc(OMNI.certName(k).replace(" Foundation", "")) + "</th>"; }).join("") + "</tr></thead><tbody>" +
      OMNI.catalog.map(function (m) { var cnt = {}; all.forEach(function (q) { if (q.m === m.n && !q.bank) cnt[q.c] = (cnt[q.c] || 0) + 1; }); return "<tr><td><a href='" + OMNI.file(m.n) + "'>" + m.n + ". " + OMNI.esc(m.title) + "</a></td>" + OMNI.EXAM_CERTS.map(function (k) { var on = m.certs.indexOf(k) >= 0; return "<td style='text-align:center'>" + (on ? "●" : cnt[k] ? "○" : "") + "</td>"; }).join("") + "</tr>"; }).join("") +
      "</tbody></table></div><p class='figcap'>● = a main focus of the module · ○ = some questions for that cert</p>";
    el.appendChild(h("details", null, [h("summary", null, "Show the full module × cert matrix"), h("div", { html: mx })]));
  };

  /* ---------- Study plan generator ---------- */
  OMNI.studyPlan = function (el) {
    if (typeof el === "string") el = document.getElementById(el); if (!el) return;
    var saved = OMNI.store.get("hub:plan", null);
    var certSel = h("select", { "aria-label": "Certification" }, OMNI.EXAM_CERTS.map(function (k) { return h("option", { value: k }, OMNI.certName(k)); }));
    var d0 = new Date(Date.now() + 56 * 864e5);
    var date = h("input", { type: "date", "aria-label": "Exam date", value: d0.toISOString().slice(0, 10) });
    var hrs = h("input", { type: "number", min: "1", max: "60", value: "8", style: "width:5em", "aria-label": "Hours per week" });
    var out = h("div", { "aria-live": "polite" });
    var HOURS_PER_MODULE = { main: 5, side: 2 };
    function build() {
      var c = certSel.value, exam = new Date(date.value + "T09:00:00"), now = new Date();
      var weeks = Math.max(1, Math.ceil((exam - now) / (7 * 864e5)));
      var perWeek = Math.max(1, +hrs.value || 1);
      var mods = OMNI.catalog.filter(function (m) { return m.certs.indexOf(c) >= 0 && m.n !== 24; }).map(function (m) { return { n: m.n, t: m.title, hrs: HOURS_PER_MODULE.main }; });
      var side = OMNI.catalog.filter(function (m) { return m.certs.indexOf(c) < 0 && m.n <= 3; }).map(function (m) { return { n: m.n, t: m.title, hrs: HOURS_PER_MODULE.side }; });
      var list = side.concat(mods).sort(function (a, b) { return a.n - b.n; });
      var studyHrs = list.reduce(function (s, m) { return s + m.hrs; }, 0), need = studyHrs + 6; // +6 h practice exams and review
      var studyWeeks = Math.max(1, weeks - 1), plan = [], cum = 0;
      // spread modules evenly over the study weeks by cumulative hours
      list.forEach(function (m) { var wk = Math.min(studyWeeks - 1, Math.floor((cum + m.hrs / 2) / studyHrs * studyWeeks)); (plan[wk] = plan[wk] || []).push(m); cum += m.hrs; });
      var items = [];
      for (var w = 0; w < weeks; w++) {
        var start = new Date(now.getTime() + w * 7 * 864e5), tasks = [];
        if (w < weeks - 1 || weeks === 1) (plan[w] || []).forEach(function (m) { tasks.push({ id: c + "-m" + m.n, t: "Read Module " + m.n + " (" + m.t + ") and do its labs", href: OMNI.file(m.n) }); tasks.push({ id: c + "-q" + m.n, t: "Module " + m.n + " knowledge check", href: OMNI.file(m.n) + "#quiz" }); });
        if (w > 0) tasks.push({ id: c + "-fc" + w, t: "Flashcard review (15–20 minutes, Leitner boxes)", href: "flashcards.html" });
        if (w >= weeks - 2) tasks.push({ id: c + "-px" + w, t: (w === weeks - 1 ? "Full-length " : "Half-length ") + OMNI.certName(c) + " practice exam, then review weak domains", href: "practice-exams.html" });
        if (w === weeks - 1) tasks.push({ id: c + "-tips", t: "Read the exam-day tips and confirm your booking, ID and test setup", href: OMNI.file(24) + "#tips" });
        items.push({ w: w + 1, start: start, tasks: tasks });
      }
      OMNI.store.set("hub:plan", { c: c, date: date.value, hrs: hrs.value });
      var done = OMNI.store.get("hub:planDone", {});
      out.innerHTML = "";
      var warn = need > weeks * perWeek ? "This plan needs about " + Math.round(need) + " hours but you have about " + weeks * perWeek + ". Consider more hours per week or a later exam date; the plan below is compressed." : "About " + Math.round(need) + " hours of study fits in " + weeks + " week(s) at " + perWeek + " h/week.";
      out.appendChild(h("div", { class: "callout", style: "border-left-color:" + (need > weeks * perWeek ? "var(--warn)" : "var(--good)") }, warn));
      var bar = h("div", { class: "meter", role: "img" }, h("i")), barTxt = h("span", { class: "figcap" });
      out.appendChild(h("div", { class: "row" }, [h("div", { style: "flex:1;min-width:160px" }, bar), barTxt]));
      function prog() { var all = 0, d = 0; items.forEach(function (it) { it.tasks.forEach(function (t) { all++; if (done[t.id]) d++; }); }); bar.firstChild.style.width = (all ? 100 * d / all : 0) + "%"; barTxt.textContent = d + " of " + all + " tasks done"; bar.setAttribute("aria-label", d + " of " + all + " tasks done"); }
      items.forEach(function (it) {
        var box = h("div", { class: "tile", style: "margin:8px 0" }, h("h4", null, "Week " + it.w + " · from " + it.start.toLocaleDateString(undefined, { month: "short", day: "numeric" })));
        if (!it.tasks.length) box.appendChild(h("p", { class: "figcap" }, "Catch-up and review week."));
        it.tasks.forEach(function (t) {
          var cb = h("input", { type: "checkbox" }); cb.checked = !!done[t.id];
          cb.onchange = function () { done[t.id] = cb.checked; OMNI.store.set("hub:planDone", done); prog(); };
          box.appendChild(h("label", { style: "display:flex;gap:8px;align-items:flex-start;margin:4px 0" }, [cb, h("span", null, [t.t, " ", h("a", { href: t.href }, "→ open")])]));
        });
        out.appendChild(box);
      });
      prog();
    }
    if (saved && OMNI.EXAMS[saved.c]) { certSel.value = saved.c; if (saved.date) date.value = saved.date; if (saved.hrs) hrs.value = saved.hrs; }
    el.appendChild(h("div", { class: "row" }, [h("label", null, ["Cert ", certSel]), h("label", null, ["Exam date ", date]), h("label", null, ["Hours per week ", hrs]),
      h("button", { type: "button", class: "primary", onclick: build }, "Build my plan"),
      h("button", { type: "button", onclick: function () { if (true) { OMNI.store.set("hub:planDone", {}); build(); } } }, "Clear ticks")]));
    el.appendChild(out);
    if (saved) build();
  };

  /* ---------- Recommended path roadmap ---------- */
  OMNI.roadmap = function (svg) {
    if (typeof svg === "string") svg = document.getElementById(svg); if (!svg) return;
    function txt(x, y, t, a) { var e = S("text", Object.assign({ x: x, y: y, class: "svg-text", "font-size": 12, "text-anchor": "middle" }, a || {}), svg); e.textContent = t; return e; }
    function box(x, y, w, t, sub, col, exp) {
      var a = S("a", { href: OMNI.file({ "A+": 4, "Network+": 8, "Security+": 14, "DCCA": 18, "ITIL 4": 19, "CISM": 21, "CISA": 22 }[t] || 24) }, svg);
      S("rect", { x: x, y: y, width: w, height: 58, rx: 10, fill: "var(--surface)", stroke: col, "stroke-width": 2.5 }, a);
      var e1 = S("text", { x: x + w / 2, y: y + 24, class: "svg-text", "font-size": 14, "font-weight": 800, "text-anchor": "middle" }, a); e1.textContent = t;
      var e2 = S("text", { x: x + w / 2, y: y + 42, class: "svg-text svg-muted", "font-size": 10, "text-anchor": "middle" }, a); e2.textContent = sub;
      if (exp) { S("rect", { x: x + w - 64, y: y - 10, width: 70, height: 18, rx: 9, fill: "var(--warn-soft)", stroke: "var(--warn)" }, svg); txt(x + w - 29, y + 3, exp, { "font-size": 9.5, "font-weight": 700 }); }
    }
    function arr(x1, y1, x2, y2) { S("line", { x1: x1, y1: y1, x2: x2, y2: y2, stroke: "var(--ink-2)", "stroke-width": 2 }, svg); var a = Math.atan2(y2 - y1, x2 - x1), s = 8; S("polygon", { points: x2 + "," + y2 + " " + (x2 - s * Math.cos(a - .45)) + "," + (y2 - s * Math.sin(a - .45)) + " " + (x2 - s * Math.cos(a + .45)) + "," + (y2 - s * Math.sin(a + .45)), fill: "var(--ink-2)" }, svg); }
    box(20, 40, 150, "A+", "Core 1 + Core 2 · support", "var(--hw)");
    box(225, 40, 150, "Network+", "networking", "var(--net)");
    box(430, 40, 150, "Security+", "security foundation", "var(--sec)");
    arr(170, 69, 225, 69); arr(375, 69, 430, 69);
    var B = [["DCCA", "data center operations", "var(--dc)", 20, ""], ["ITIL 4", "service management", "var(--gov)", 205, ""], ["CISM", "security leadership", "var(--gov)", 390, "5 yrs exp."], ["CISA", "IT audit and assurance", "var(--gov)", 575, "5 yrs exp."]];
    B.forEach(function (b) { box(b[3], 190, 165, b[0], b[1], b[2], b[4]); arr(505, 98, b[3] + 82, 190); });
    txt(380, 22, "Click a box to open its module. Arrows show a common order, not a requirement.", { "font-size": 10.5, class: "svg-text svg-muted" });
    txt(380, 280, "ITIL 4 and DCCA can be taken any time (no prerequisites). CISM and CISA can be passed first, but certification needs verified work experience.", { "font-size": 10.5, class: "svg-text svg-muted" });
  };

  /* ---------- Combined flashcard deck ---------- */
  OMNI.allDeck = function (el) {
    if (typeof el === "string") el = document.getElementById(el); if (!el) return;
    var certSel = h("select", { "aria-label": "Filter by cert" }, [h("option", { value: "" }, "All certs")].concat(OMNI.certOrder.map(function (k) { return h("option", { value: k }, OMNI.certName(k)); })));
    var modSel = h("select", { "aria-label": "Filter by module" }, [h("option", { value: "" }, "All modules")].concat(OMNI.catalog.map(function (m) { return h("option", { value: String(m.n) }, m.n + ". " + m.title); })));
    var info = h("p", { class: "figcap", "aria-live": "polite" }), host = h("div");
    function cards() {
      var c = certSel.value, mn = +modSel.value, out = [];
      OMNI.catalog.forEach(function (m) { var d = OMNI.data[m.n]; if (!d || !d.flashcards) return; if (mn && m.n !== mn) return; if (c && m.certs.indexOf(c) < 0) return; d.flashcards.forEach(function (fc) { out.push(fc); }); });
      return out;
    }
    function draw() {
      var cs = cards(); host.innerHTML = "";
      info.textContent = cs.length + " cards in this deck. Progress is saved per card in this browser, so the same card keeps its box across filters.";
      if (cs.length) OMNI.renderDeck(host, cs, { key: "all", showModule: true }); else host.appendChild(h("p", null, "No cards match."));
      try { OMNI.store.set("hub:deckFilter", { c: certSel.value, m: modSel.value }); } catch (e) { }
    }
    var f = OMNI.store.get("hub:deckFilter", null); if (f) { certSel.value = f.c || ""; modSel.value = f.m || ""; }
    certSel.onchange = draw; modSel.onchange = draw;
    el.appendChild(h("div", { class: "row" }, [certSel, modSel])); el.appendChild(info); el.appendChild(host); draw();
  };

  /* ---------- Merged glossary ---------- */
  OMNI.mergedGlossary = function () {
    var seen = {}, out = [];
    OMNI.catalog.forEach(function (m) {
      var d = OMNI.data[m.n]; if (!d || !d.glossary) return;
      d.glossary.forEach(function (t) {
        var k = t[0].toLowerCase();
        if (seen[k]) { var s = seen[k]; (t.certs || []).forEach(function (c) { if (s.certs.indexOf(c) < 0) s.certs.push(c); }); return; }
        var copy = t.slice(); copy.m = t.m || m.n; copy.certs = (t.certs || m.certs || []).slice(); seen[k] = copy; out.push(copy);
      });
    });
    return out;
  };
})();

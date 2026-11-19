/* Datacenter Omnibus: shared engine.
   Top bar, theme, glossary, quiz/exam engine, flashcards (Leitner), progress, lab helpers.
   Vanilla JS, no build step. Works from file:// and from any static host. */
(function () {
  "use strict";
  var OMNI = window.OMNI = window.OMNI || {};
  OMNI.data = OMNI.data || {};
  OMNI.reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- storage (always wrapped) ---------- */
  OMNI.store = {
    get: function (k, d) { try { var v = localStorage.getItem("omni:" + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem("omni:" + k, JSON.stringify(v)); } catch (e) { /* storage blocked: ignore */ } }
  };

  /* ---------- tiny DOM helpers ---------- */
  function h(tag, attrs, kids) {
    var el = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      var v = attrs[k];
      if (v == null || v === false) continue;
      if (k === "class") el.className = v;
      else if (k === "html") el.innerHTML = v;
      else if (k === "text") el.textContent = v;
      else if (k.slice(0, 2) === "on" && typeof v === "function") el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v === true ? "" : v);
    }
    if (kids != null) (Array.isArray(kids) ? kids : [kids]).forEach(function (c) {
      if (c == null || c === false) return;
      el.appendChild(typeof c === "string" || typeof c === "number" ? document.createTextNode(String(c)) : c);
    });
    return el;
  }
  OMNI.h = h;
  OMNI.$ = function (s, r) { return (r || document).querySelector(s); };
  OMNI.$$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var SVGNS = "http://www.w3.org/2000/svg";
  OMNI.svg = function (tag, attrs, parent) {
    var el = document.createElementNS(SVGNS, tag);
    if (attrs) for (var k in attrs) { if (k === "text") el.textContent = attrs[k]; else el.setAttribute(k, attrs[k]); }
    if (parent) parent.appendChild(el);
    return el;
  };
  OMNI.esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  OMNI.shuffle = function (a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
  OMNI.say = function (el, text) { if (typeof el === "string") el = document.getElementById(el); if (el) el.innerHTML = text; };
  OMNI.fmt = function (n, d) { return Number(n).toLocaleString(undefined, { maximumFractionDigits: d == null ? 2 : d }); };
  OMNI.clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };

  /* ---------- theme ---------- */
  function applyTheme(t) {
    if (t === "light" || t === "dark") document.documentElement.setAttribute("data-theme", t);
    else document.documentElement.removeAttribute("data-theme");
  }
  applyTheme(OMNI.store.get("theme", "auto"));
  function currentTheme() {
    var t = document.documentElement.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  /* ---------- progress ---------- */
  OMNI.progress = {
    all: function () { return OMNI.store.get("progress", { visited: {}, quiz: {} }); },
    visit: function (n) { var p = this.all(); p.visited[n] = Date.now(); OMNI.store.set("progress", p); },
    quiz: function (n, score, total) {
      var p = this.all(); var prev = p.quiz[n];
      if (!prev || score / total >= prev.score / prev.total) p.quiz[n] = { score: score, total: total, at: Date.now() };
      OMNI.store.set("progress", p);
    }
  };

  /* ---------- catalog helpers ---------- */
  OMNI.mod = function (n) { return (OMNI.catalog || []).filter(function (m) { return m.n === n; })[0]; };
  OMNI.certName = function (k) { var c = OMNI.certs && OMNI.certs[k]; return c ? c.name : k; };
  OMNI.domainName = function (cert, obj) {
    var c = OMNI.certs && OMNI.certs[cert]; if (!c) return "General";
    var key = String(obj || "").split(".")[0];
    return (c.domains && c.domains[key]) ? key + ". " + c.domains[key] : (c.domains && c.domains["0"]) || ("Objective " + obj);
  };

  /* ---------- top bar ---------- */
  function topbar() {
    var host = document.getElementById("topbar"); if (!host) return;
    var n = parseInt(document.body.getAttribute("data-module") || "0", 10);
    var m = n ? OMNI.mod(n) : null;
    var total = (OMNI.catalog || []).length;
    var label = m ? "Module " + OMNI.pad(n) + " · " + m.title : (document.body.getAttribute("data-page-title") || "");
    var themeBtn = h("button", { type: "button", "aria-label": "Toggle light or dark mode", title: "Light / dark mode",
      onclick: function () { var t = currentTheme() === "dark" ? "light" : "dark"; applyTheme(t); OMNI.store.set("theme", t); themeBtn.textContent = t === "dark" ? "☀ Light" : "☾ Dark"; } },
      currentTheme() === "dark" ? "☀ Light" : "☾ Dark");
    var nav = h("nav", { class: "tb-nav", "aria-label": "Module navigation" }, [
      n ? h("a", { href: n > 1 ? OMNI.file(n - 1) : "#", "aria-disabled": n > 1 ? null : "true", rel: "prev" }, "← Prev") : null,
      h("a", { href: "index.html" }, "Contents"),
      n ? h("a", { href: n < total ? OMNI.file(n + 1) : "#", "aria-disabled": n < total ? null : "true", rel: "next" }, "Next →") : null,
      themeBtn
    ]);
    var tools = h("div", { class: "tb-tools" }, [
      h("a", { href: "glossary.html" }, "Glossary"),
      h("a", { href: "practice-exams.html" }, "Practice exams"),
      h("a", { href: "flashcards.html" }, "Flashcards"),
      h("a", { href: "labs.html" }, "Labs"),
      h("a", { href: OMNI.file(27) }, "Study hub")
    ]);
    host.replaceWith(h("header", { class: "topbar" }, h("div", { class: "topbar-in" }, [
      h("a", { class: "brand", href: "index.html" }, ["Datacenter ", h("span", null, "Omnibus")]),
      h("div", { class: "tb-mod", title: label }, label), nav, tools
    ])));
  }

  /* ---------- jump nav ---------- */
  function jumpnav() {
    var host = document.getElementById("jumpnav"); if (!host) return;
    OMNI.$$(".page > section > h2").forEach(function (h2, i) {
      var sec = h2.parentNode; if (!sec.id) sec.id = "s" + i;
      if (sec.classList.contains("intro")) return;
      host.appendChild(h("a", { href: "#" + sec.id }, h2.textContent.replace(/^\s*[\d.]+\s*/, "")));
    });
  }

  /* ---------- cert map ---------- */
  OMNI.renderCertMap = function (el, map) {
    if (!el || !map) return;
    var on = {}; map.forEach(function (x) { on[x.c] = x; });
    var row = h("div", { class: "badges" });
    OMNI.certOrder.filter(function (k) { return k !== "GEN" && (on[k] || ["A1", "A2", "N", "S", "ITIL", "DCCA", "CISM", "CISA"].indexOf(k) >= 0); }).forEach(function (k) {
      var c = OMNI.certs[k]; var x = on[k];
      row.appendChild(h("div", { class: "cert-badge" + (x ? "" : " off"), title: x ? "" : "Not a focus of this module" }, [
        h("b", null, c.name + (x ? " ✓" : "")), h("small", null, c.code), x ? h("small", null, x.o) : h("small", null, "not covered here")
      ]));
    });
    el.appendChild(row);
    var extra = map.filter(function (x) { return x.c === "GEN" || x.c === "X"; });
    extra.forEach(function (x) { el.appendChild(h("p", { class: "figcap" }, x.o)); });
    el.appendChild(h("p", { class: "figcap" }, "Exam codes and objective numbers are from the versions current at time of writing. Exams are revised every few years, so verify on the vendor site before you book."));
  };

  /* ---------- glossary ---------- */
  OMNI.renderGlossary = function (el, terms, opts) {
    opts = opts || {};
    terms = terms.slice().sort(function (a, b) { return a[0].toLowerCase().localeCompare(b[0].toLowerCase()); });
    var input = h("input", { type: "search", class: "gsearch", placeholder: "Search " + terms.length + " terms…", "aria-label": "Search glossary" });
    var certSel = null;
    if (opts.certFilter) {
      certSel = h("select", { "aria-label": "Filter by cert" }, [h("option", { value: "" }, "All certs")].concat(
        OMNI.certOrder.map(function (k) { return h("option", { value: k }, OMNI.certName(k)); })));
    }
    var letterRow = opts.letters ? h("div", { class: "letters", role: "group", "aria-label": "Jump to letter" }) : null;
    var count = h("p", { class: "figcap", "aria-live": "polite" });
    var list = h("ul", { class: "glist" });
    var letter = "";
    function draw() {
      var q = input.value.trim().toLowerCase(); var cf = certSel ? certSel.value : "";
      list.innerHTML = ""; var shown = 0;
      terms.forEach(function (t) {
        var hay = (t[0] + " " + t[1] + " " + t[2] + " " + (t[3] || "")).toLowerCase();
        if (q && hay.indexOf(q) < 0) return;
        if (letter && t[0].charAt(0).toUpperCase() !== letter) return;
        if (cf && t.certs && t.certs.indexOf(cf) < 0) return;
        shown++;
        list.appendChild(h("li", null, [
          h("div", null, [h("span", { class: "gt" }, t[0]), t[3] ? h("span", { class: "gx" }, "  (" + t[3] + ")") : null,
            t.m && opts.links ? h("a", { href: OMNI.file(t.m) + "#glossary", style: "float:right;font-size:.85rem" }, "Module " + t.m) : null]),
          h("p", { class: "gp" }, t[1]), h("p", { class: "ge" }, t[2])
        ]));
      });
      count.textContent = shown + " of " + terms.length + " terms shown";
    }
    input.addEventListener("input", draw);
    if (certSel) certSel.addEventListener("change", draw);
    if (letterRow) {
      var all = h("button", { type: "button", "aria-pressed": "true", onclick: function () { letter = ""; mark(all); draw(); } }, "All");
      letterRow.appendChild(all);
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(function (L) {
        var has = terms.some(function (t) { return t[0].charAt(0).toUpperCase() === L; });
        var b = h("button", { type: "button", disabled: !has, "aria-pressed": "false", onclick: function () { letter = L; mark(b); draw(); } }, L);
        letterRow.appendChild(b);
      });
    }
    function mark(b) { OMNI.$$("button", letterRow).forEach(function (x) { x.setAttribute("aria-pressed", x === b ? "true" : "false"); }); }
    el.appendChild(h("div", { class: "row" }, [input, certSel]));
    if (letterRow) el.appendChild(letterRow);
    el.appendChild(count); el.appendChild(list); draw();
  };

  /* ---------- quiz / exam engine ----------
     Question: { t:'mc'|'ms'|'order', q, sc?, o:[...], a:index|[indices] (order: o is the correct order),
                 w:[why per option]?, x: explanation, c: cert key, d: objective, m: module (added on register) } */
  function sameSet(a, b) { if (a.length !== b.length) return false; a = a.slice().sort(); b = b.slice().sort(); for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false; return true; }

  function buildQuestion(q, idx, opts, onGraded) {
    var box = h("div", { class: "q", id: (opts.prefix || "q") + "-" + idx });
    var certTag = q.c ? h("span", { class: "tag", title: OMNI.domainName(q.c, q.d) }, OMNI.certName(q.c) + (q.d ? " " + q.d : "")) : null;
    var typeTag = h("span", { class: "tag" }, q.t === "ms" ? "Select all that apply" : q.t === "order" ? "Put in order" : q.sc ? "Scenario" : "Multiple choice");
    var flag = opts.flags ? h("button", { type: "button", class: "flag", "aria-pressed": "false", onclick: function () { flag.setAttribute("aria-pressed", flag.getAttribute("aria-pressed") === "true" ? "false" : "true"); if (opts.onFlag) opts.onFlag(); } }, "⚑ Flag") : null;
    box.appendChild(h("div", { class: "qhead" }, [h("span", { class: "qnum" }, "Q" + (idx + 1)), typeTag, certTag,
      q.m && opts.showModule ? h("a", { class: "tag", href: OMNI.file(q.m) }, "Module " + q.m) : null, flag]));
    if (q.sc) box.appendChild(h("div", { class: "scenario" }, q.sc));
    box.appendChild(h("div", { class: "qtext", html: q.q }));
    var state = { graded: false, correct: false, answered: false, flagged: function () { return flag && flag.getAttribute("aria-pressed") === "true"; } };
    var name = (opts.prefix || "q") + "n" + idx + "_" + Math.random().toString(36).slice(2, 7);
    var optEls = [], orderList = null;
    if (q.t === "order") {
      var order = OMNI.shuffle(q.o.map(function (_, i) { return i; }));
      if (order.every(function (v, i) { return v === i; }) && order.length > 1) order.reverse();
      orderList = h("ol", { class: "order-list", "aria-label": "Drag or use the arrows to put these in order" });
      var dragSrc = null;
      function renum() { OMNI.$$("li", orderList).forEach(function (li, i) { li.querySelector(".ol-n").textContent = (i + 1) + "."; }); state.answered = true; if (opts.onChange) opts.onChange(); }
      order.forEach(function (oi) {
        var li = h("li", { draggable: "true", "data-i": oi }, [h("span", { class: "ol-n" }), h("span", { class: "ol-t", html: q.o[oi] }),
          h("button", { type: "button", "aria-label": "Move up", onclick: function () { if (state.graded) return; var p = li.previousElementSibling; if (p) orderList.insertBefore(li, p); renum(); li.querySelector("button").focus(); } }, "↑"),
          h("button", { type: "button", "aria-label": "Move down", onclick: function () { if (state.graded) return; var nx = li.nextElementSibling; if (nx) orderList.insertBefore(nx, li); renum(); } }, "↓")]);
        li.addEventListener("dragstart", function (e) { dragSrc = li; try { e.dataTransfer.setData("text/plain", "x"); } catch (er) { } });
        li.addEventListener("dragover", function (e) { e.preventDefault(); });
        li.addEventListener("drop", function (e) { e.preventDefault(); if (!dragSrc || dragSrc === li || state.graded) return; var r = li.getBoundingClientRect(); var after = e.clientY > r.top + r.height / 2; orderList.insertBefore(dragSrc, after ? li.nextSibling : li); renum(); });
        orderList.appendChild(li);
      });
      OMNI.$$("li", orderList).forEach(function (li, i) { li.querySelector(".ol-n").textContent = (i + 1) + "."; });
      box.appendChild(orderList);
    } else {
      var wrap = h("div", { class: "opts", role: q.t === "ms" ? "group" : "radiogroup" });
      var idxs = opts.shuffleOptions && !q.fixed ? OMNI.shuffle(q.o.map(function (_, i) { return i; })) : q.o.map(function (_, i) { return i; });
      idxs.forEach(function (oi) {
        var inp = h("input", { type: q.t === "ms" ? "checkbox" : "radio", name: name, value: oi, onchange: function () { state.answered = true; if (opts.onChange) opts.onChange(); } });
        var lab = h("label", { class: "opt" }, [inp, h("span", null, [h("span", { html: q.o[oi] }), h("span", { class: "why", hidden: true })]), h("span", { class: "mark" })]);
        lab.dataset.i = oi; optEls.push(lab); wrap.appendChild(lab);
      });
      box.appendChild(wrap);
    }
    var fb = h("div", { class: "feedback", hidden: true, "aria-live": "polite" });
    var check = opts.instant ? h("button", { type: "button", class: "primary", onclick: function () { grade(); } }, "Check answer") : null;
    if (check) box.appendChild(h("div", { class: "row" }, check));
    box.appendChild(fb);

    function grade() {
      if (state.graded) return state.correct;
      var ok;
      if (q.t === "order") {
        var got = OMNI.$$("li", orderList).map(function (li) { return +li.dataset.i; });
        ok = got.every(function (v, i) { return v === i; });
        OMNI.$$("li", orderList).forEach(function (li, i) { li.classList.add(+li.dataset.i === i ? "right" : "wrong"); li.setAttribute("draggable", "false"); });
        fb.innerHTML = (ok ? "<b>Correct.</b> " : "<b>Not quite.</b> Correct order: " + q.o.map(function (s, i) { return (i + 1) + ". " + s; }).join("; ") + ". ") + (q.x || "");
      } else {
        var picked = optEls.filter(function (l) { return l.querySelector("input").checked; }).map(function (l) { return +l.dataset.i; });
        var ans = Array.isArray(q.a) ? q.a : [q.a];
        ok = sameSet(picked, ans);
        optEls.forEach(function (l) {
          var i = +l.dataset.i, isAns = ans.indexOf(i) >= 0, was = picked.indexOf(i) >= 0;
          l.querySelector("input").disabled = true;
          if (isAns) l.classList.add("right"); else if (was) l.classList.add("wrong");
          l.querySelector(".mark").textContent = isAns ? "✓ correct" : was ? "✗ your pick" : "";
          var why = l.querySelector(".why");
          if (q.w && q.w[i]) { why.textContent = q.w[i]; why.hidden = false; }
        });
        fb.innerHTML = (ok ? "<b>Correct.</b> " : "<b>Not quite.</b> ") + (q.x || "");
      }
      fb.className = "feedback " + (ok ? "good" : "bad"); fb.hidden = false;
      state.graded = true; state.correct = ok; if (check) check.disabled = true;
      if (onGraded) onGraded(ok);
      return ok;
    }
    state.grade = grade;
    return { el: box, state: state, q: q };
  }

  /* Render a question set.
     opts: { instant, timerMin, title, onDone(score,total,items), shuffle, shuffleOptions, showModule, flags, moduleNum } */
  OMNI.renderQuiz = function (el, questions, opts) {
    opts = opts || {};
    el.innerHTML = "";
    var qs = opts.shuffle ? OMNI.shuffle(questions) : questions.slice();
    var items = [], graded = 0, right = 0, timerId = null, deadline = 0;
    var scoreEl = h("span", { class: "score", "aria-live": "polite" });
    var progEl = h("span", { class: "figcap" });
    var timerEl = h("span", { class: "timer", "aria-live": "off" });
    var submit = opts.instant ? null : h("button", { type: "button", class: "primary", onclick: function () { finish(false); } }, "Submit exam");
    var reset = h("button", { type: "button", onclick: function () { if (timerId) clearInterval(timerId); OMNI.renderQuiz(el, questions, opts); } }, "Start over");
    var flaggedBtn = opts.flags ? h("button", { type: "button", onclick: function () { var f = items.filter(function (it) { return it.state.flagged(); })[0]; if (f) f.el.scrollIntoView({ behavior: OMNI.reduced ? "auto" : "smooth" }); } }, "Next flagged") : null;
    var bar = h("div", { class: "quiz-bar" }, [scoreEl, progEl, timerEl, h("span", { style: "flex:1" }), flaggedBtn, submit, reset]);
    el.appendChild(bar);
    var listEl = h("div"); el.appendChild(listEl);
    var resultEl = h("div", { "aria-live": "polite" }); el.appendChild(resultEl);
    function upd() {
      var answered = items.filter(function (it) { return it.state.answered || it.state.graded; }).length;
      progEl.textContent = answered + " of " + items.length + " answered" + (opts.flags ? " · " + items.filter(function (it) { return it.state.flagged(); }).length + " flagged" : "");
      scoreEl.textContent = opts.instant ? "Score: " + right + " / " + graded : "";
    }
    qs.forEach(function (q, i) {
      var it = buildQuestion(q, i, { instant: opts.instant, prefix: opts.prefix || ("qz" + (opts.moduleNum || "x")), shuffleOptions: opts.shuffleOptions, showModule: opts.showModule, flags: opts.flags, onChange: upd, onFlag: upd },
        function (ok) { graded++; if (ok) right++; upd(); if (opts.instant && graded === items.length) finish(true); });
      items.push(it); listEl.appendChild(it.el);
    });
    if (opts.timerMin) {
      deadline = Date.now() + opts.timerMin * 60000;
      var tick = function () {
        var left = Math.max(0, deadline - Date.now()); var m = Math.floor(left / 60000), s = Math.floor(left % 60000 / 1000);
        timerEl.textContent = "⏱ " + m + ":" + (s < 10 ? "0" : "") + s; timerEl.className = "timer" + (left < 5 * 60000 ? " low" : "");
        if (left <= 0) { clearInterval(timerId); finish(false, true); }
      };
      tick(); timerId = setInterval(tick, 1000);
    }
    function finish(fromInstant, timeUp) {
      if (timerId) clearInterval(timerId);
      if (!fromInstant) { graded = 0; right = 0; items.forEach(function (it) { var was = it.state.graded; var ok = it.state.grade(); if (was) { graded++; if (ok) right++; } }); right = items.filter(function (it) { return it.state.correct; }).length; graded = items.length; }
      if (submit) submit.disabled = true;
      upd(); scoreEl.textContent = "Score: " + right + " / " + items.length + " (" + Math.round(100 * right / Math.max(1, items.length)) + "%)";
      // Domain breakdown
      var dom = {};
      items.forEach(function (it) {
        var key = it.q.c ? OMNI.certName(it.q.c) + " · " + OMNI.domainName(it.q.c, it.q.d) : "General";
        var d = dom[key] = dom[key] || { r: 0, t: 0, mods: {} }; d.t++; if (it.state.correct) d.r++; else if (it.q.m) d.mods[it.q.m] = 1;
      });
      var rows = Object.keys(dom).sort().map(function (k) {
        var d = dom[k], pct = Math.round(100 * d.r / d.t);
        var weak = Object.keys(d.mods).map(function (m) { return '<a href="' + OMNI.file(+m) + '">Module ' + m + "</a>"; }).join(", ");
        return "<tr><td>" + OMNI.esc(k) + "</td><td>" + d.r + " / " + d.t + "</td><td><div class='meter' role='img' aria-label='" + pct + " percent'><i style='width:" + pct + "%'></i></div> " + pct + "%" + (weak ? "<br><small>Review: " + weak + "</small>" : "") + "</td></tr>";
      }).join("");
      var pctAll = Math.round(100 * right / Math.max(1, items.length));
      resultEl.innerHTML = "<div class='card'><h3 style='margin-top:0'>" + (timeUp ? "Time is up. " : "") + "Result: " + right + " of " + items.length + " (" + pctAll + "%)</h3>" +
        "<p>" + (pctAll >= 85 ? "Excellent. You are ready for harder practice." : pctAll >= 70 ? "Good. Review the weak areas below, then try again." : "Keep going. Re-read the lessons linked below, then retake this.") +
        " Every answer is explained above; wrong picks are marked in red.</p>" +
        "<div class='tablewrap'><table class='domain-table'><thead><tr><th>Domain</th><th>Right</th><th>Score</th></tr></thead><tbody>" + rows + "</tbody></table></div></div>";
      if (opts.onDone) opts.onDone(right, items.length, items);
      if (opts.moduleNum) OMNI.progress.quiz(opts.moduleNum, right, items.length);
    }
    upd();
    return { finish: finish };
  };

  /* Exam builder: picks `count` questions from a pool, weighted by cert domain when weights are given. */
  OMNI.pickQuestions = function (pool, count, weights) {
    if (!weights) return OMNI.shuffle(pool).slice(0, count);
    var byD = {}; pool.forEach(function (q) { var k = String(q.d || "").split(".")[0]; (byD[k] = byD[k] || []).push(q); });
    var out = [], keys = Object.keys(weights);
    keys.forEach(function (k) { var want = Math.round(count * weights[k] / 100); out = out.concat(OMNI.shuffle(byD[k] || []).slice(0, want)); });
    if (out.length < count) { var rest = OMNI.shuffle(pool.filter(function (q) { return out.indexOf(q) < 0; })); out = out.concat(rest.slice(0, count - out.length)); }
    return OMNI.shuffle(out.slice(0, count));
  };

  /* Readiness exam widget: pulls questions from loaded modules.
     cfg: { el, title, modules:[n...], certs:[keys], count, timerMin, weights } */
  OMNI.readiness = function (cfg) {
    var el = typeof cfg.el === "string" ? document.getElementById(cfg.el) : cfg.el; if (!el) return;
    var pool = OMNI.allQuestions().filter(function (q) {
      return (!cfg.modules || cfg.modules.indexOf(q.m) >= 0 || (q.bank && cfg.banks && cfg.banks.indexOf(q.bank) >= 0)) && (!cfg.certs || cfg.certs.indexOf(q.c) >= 0);
    });
    var n = Math.min(cfg.count, pool.length);
    var timerChk = h("input", { type: "checkbox" });
    var start = h("button", { type: "button", class: "primary", onclick: function () {
      var qs = OMNI.pickQuestions(pool, n, cfg.weights);
      OMNI.renderQuiz(area, qs, { timerMin: timerChk.checked ? cfg.timerMin : 0, showModule: true, flags: true, prefix: "rd" + (cfg.id || ""), shuffleOptions: true });
      area.scrollIntoView({ behavior: OMNI.reduced ? "auto" : "smooth" });
    } }, "Start " + n + "-question exam");
    var area = h("div");
    el.appendChild(h("p", null, "Draws " + n + " questions from a pool of " + pool.length + (cfg.count > pool.length ? " (the full pool; the target is " + cfg.count + ")" : "") + ". Questions are shuffled each time. Scored by exam domain."));
    el.appendChild(h("div", { class: "row" }, [h("label", null, [timerChk, " Use a timer (" + cfg.timerMin + " minutes, matching the real exam pace)"]), start]));
    el.appendChild(area);
  };

  OMNI.allQuestions = function () {
    var out = [];
    Object.keys(OMNI.data).forEach(function (k) { (OMNI.data[k].quiz || []).forEach(function (q) { out.push(q); }); });
    return out;
  };

  /* ---------- flashcards (Leitner boxes) ---------- */
  var BOX_DAYS = [0, 0, 1, 3, 7, 14];
  OMNI.renderDeck = function (el, cards, opts) {
    opts = opts || {};
    var key = "fc:" + (opts.key || "deck");
    var st = OMNI.store.get(key, {});
    var queue = [], cur = null, studyAll = false;
    var front = h("div", { class: "fc-txt" }), back = h("div", { class: "fc-txt" });
    var srcTag = h("div", { class: "fc-side" });
    var card = h("div", { class: "fc", tabindex: "0", role: "button", "aria-label": "Flashcard. Press Enter or Space to flip.",
      onclick: flip, onkeydown: function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); } } },
      h("div", { class: "fc-in" }, [h("div", { class: "fc-face front" }, [srcTag, front]), h("div", { class: "fc-face back" }, [h("div", { class: "fc-side" }, "Answer"), back])]));
    var knew = h("button", { type: "button", class: "primary", onclick: function () { rate(true); } }, "✓ I knew it");
    var again = h("button", { type: "button", onclick: function () { rate(false); } }, "↺ Review again");
    var flipB = h("button", { type: "button", onclick: flip }, "Flip");
    var skip = h("button", { type: "button", onclick: function () { if (cur) { queue.push(cur); next(); } } }, "Skip");
    var stats = h("div", { class: "fc-stats", "aria-live": "polite" });
    var boxes = h("div", { class: "boxes", "aria-label": "Leitner boxes" });
    var resetB = h("button", { type: "button", onclick: function () { st = {}; OMNI.store.set(key, st); build(); } }, "Reset progress");
    var allB = h("button", { type: "button", onclick: function () { studyAll = true; build(); } }, "Study all cards now");
    el.appendChild(h("div", { class: "deck" }, [card, h("div", { class: "fc-controls" }, [flipB, again, knew, skip]), stats, boxes, h("div", { class: "fc-controls" }, [allB, resetB])]));
    function id(c, i) { return c.id || (opts.key || "d") + "-" + i; }
    function build() {
      var now = Date.now();
      queue = cards.map(function (c, i) { return { c: c, id: id(c, i) }; }).filter(function (x) { var s = st[x.id]; return studyAll || !s || s.due <= now; });
      queue.sort(function (a, b) { return ((st[a.id] || {}).box || 1) - ((st[b.id] || {}).box || 1) || Math.random() - .5; });
      next();
    }
    function next() {
      card.classList.remove("flipped");
      cur = queue.shift();
      var counts = [0, 0, 0, 0, 0, 0];
      cards.forEach(function (c, i) { counts[(st[id(c, i)] || {}).box || 1]++; });
      boxes.innerHTML = ""; for (var b = 1; b <= 5; b++) boxes.appendChild(h("span", { title: "Box " + b + ": review every " + (BOX_DAYS[b] || "same") + " day(s)" }, "Box " + b + ": " + counts[b]));
      var mastered = counts[5];
      if (!cur) {
        front.textContent = "All caught up! 🎉"; back.textContent = "Come back later, or press “Study all cards now”.";
        srcTag.textContent = ""; stats.textContent = mastered + " of " + cards.length + " cards in the top box.";
        knew.disabled = again.disabled = skip.disabled = true; return;
      }
      knew.disabled = again.disabled = skip.disabled = false;
      front.innerHTML = cur.c[0]; back.innerHTML = cur.c[1];
      srcTag.textContent = cur.c.m && opts.showModule ? "Module " + cur.c.m : "Question";
      stats.textContent = (queue.length + 1) + " card(s) due · " + mastered + " of " + cards.length + " in the top box";
    }
    function flip() { if (cur) card.classList.toggle("flipped"); }
    function rate(ok) {
      if (!cur) return;
      var s = st[cur.id] || { box: 1 };
      s.box = ok ? Math.min(5, s.box + 1) : 1;
      s.due = Date.now() + BOX_DAYS[s.box] * 86400000;
      st[cur.id] = s; OMNI.store.set(key, st);
      if (!ok) queue.splice(Math.min(queue.length, 3), 0, cur);
      next();
    }
    build();
  };

  /* ---------- lab helpers ---------- */
  /* Drag and drop with a click/keyboard fallback: click a chip, then click a zone. */
  OMNI.dnd = function (root, onDrop) {
    var picked = null;
    function pick(c) { if (picked) picked.classList.remove("picked"); picked = c; if (c) c.classList.add("picked"); }
    root.addEventListener("dragstart", function (e) { var c = e.target.closest && e.target.closest(".chip"); if (!c) return; c.classList.add("dragging"); pick(c); try { e.dataTransfer.setData("text/plain", c.dataset.id || ""); e.dataTransfer.effectAllowed = "move"; } catch (er) { } });
    root.addEventListener("dragend", function (e) { var c = e.target.closest && e.target.closest(".chip"); if (c) c.classList.remove("dragging"); });
    root.addEventListener("dragover", function (e) { var z = e.target.closest && e.target.closest(".dropzone"); if (z) { e.preventDefault(); z.classList.add("over"); } });
    root.addEventListener("dragleave", function (e) { var z = e.target.closest && e.target.closest(".dropzone"); if (z) z.classList.remove("over"); });
    root.addEventListener("drop", function (e) { var z = e.target.closest && e.target.closest(".dropzone"); if (!z || !picked) return; e.preventDefault(); z.classList.remove("over"); place(picked, z); });
    root.addEventListener("click", function (e) {
      var c = e.target.closest(".chip");
      if (c && root.contains(c)) {
        var cz = c.closest(".dropzone");
        if (picked && picked !== c && cz && picked.closest(".dropzone") !== cz) { place(picked, cz); e.stopPropagation(); return; }
        pick(picked === c ? null : c); e.stopPropagation(); return;
      }
      var z = e.target.closest(".dropzone"); if (z && picked) place(picked, z);
    });
    root.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      var c = e.target.closest(".chip"), z = e.target.closest(".dropzone");
      if (c) { e.preventDefault(); pick(picked === c ? null : c); } else if (z && picked) { e.preventDefault(); place(picked, z); }
    });
    function place(c, z) { z.appendChild(c); pick(null); if (onDrop) onDrop(c, z); }
    OMNI.$$(".chip", root).forEach(function (c) { c.setAttribute("draggable", "true"); c.setAttribute("tabindex", "0"); c.setAttribute("role", "button"); });
    OMNI.$$(".dropzone", root).forEach(function (z) { z.setAttribute("tabindex", "0"); });
    return { refresh: function () { OMNI.$$(".chip", root).forEach(function (c) { c.setAttribute("draggable", "true"); c.setAttribute("tabindex", "0"); c.setAttribute("role", "button"); }); OMNI.$$(".dropzone", root).forEach(function (z) { z.setAttribute("tabindex", "0"); }); } };
  };

  /* Step-through helper: steps = [{title, text, on(i)}]. Builds Prev/Next/Play controls. */
  OMNI.stepper = function (root, steps, render, opts) {
    opts = opts || {}; var i = -1, timer = null;
    var prev = h("button", { type: "button", onclick: function () { go(i - 1); } }, "← Back");
    var nextB = h("button", { type: "button", class: "primary", onclick: function () { go(i + 1); } }, "Next step →");
    var play = h("button", { type: "button", onclick: function () { if (timer) stop(); else { timer = setInterval(function () { if (i >= steps.length - 1) stop(); else go(i + 1); }, opts.speed || 1600); play.textContent = "⏸ Pause"; } } }, "▶ Play");
    var resetB = h("button", { type: "button", onclick: function () { stop(); go(-1); } }, "Reset");
    var count = h("span", { class: "figcap" });
    function stop() { clearInterval(timer); timer = null; play.textContent = "▶ Play"; }
    function go(n) { i = OMNI.clamp(n, -1, steps.length - 1); prev.disabled = i < 0; nextB.disabled = i >= steps.length - 1; count.textContent = i < 0 ? "Ready" : "Step " + (i + 1) + " of " + steps.length; render(i, steps[i]); }
    root.appendChild(h("div", { class: "row" }, [prev, nextB, play, resetB, count]));
    go(-1);
    return { go: go, stop: stop };
  };

  /* ---------- module registration ---------- */
  OMNI.register = function (d) {
    (d.quiz || []).forEach(function (q, i) { q.m = q.m || d.n; q.id = q.id || ("m" + d.n + "q" + i); });
    (d.flashcards || []).forEach(function (c, i) { c.m = d.n; c.id = "m" + d.n + "c" + i; });
    (d.glossary || []).forEach(function (t) { t.m = d.n; t.certs = d.certs || (OMNI.mod(d.n) || {}).certs; });
    OMNI.data[d.n] = d;
  };
  OMNI.registerBank = function (name, qs) {
    qs.forEach(function (q, i) { q.bank = name; q.id = name + i; });
    OMNI.data["bank-" + name] = { n: 0, quiz: qs, glossary: [], flashcards: [] };
  };

  function initModule() {
    var n = parseInt(document.body.getAttribute("data-module") || "0", 10);
    var m = n ? OMNI.mod(n) : null;
    if (m && !document.body.getAttribute("data-cat")) document.body.setAttribute("data-cat", m.cat);
    topbar(); jumpnav();
    if (!n) return;
    OMNI.progress.visit(n);
    var d = OMNI.data[n]; if (!d) return;
    var cm = document.getElementById("certmap-badges"); if (cm) OMNI.renderCertMap(cm, d.certmap);
    var g = document.getElementById("glossary-list"); if (g && d.glossary) OMNI.renderGlossary(g, d.glossary);
    var qz = document.getElementById("quiz-area"); if (qz && d.quiz) OMNI.renderQuiz(qz, d.quiz, { instant: true, moduleNum: n, prefix: "m" + n });
    var fc = document.getElementById("deck-area"); if (fc && d.flashcards) OMNI.renderDeck(fc, d.flashcards, { key: "m" + n });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initModule); else setTimeout(initModule, 0);
  OMNI.topbar = topbar;
})();

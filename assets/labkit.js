/* Datacenter Omnibus: small reusable lab builders used by Modules 25–27. Needs omnibus.js. */
(function () {
  "use strict";
  var OMNI = window.OMNI, h = OMNI.h;

  /* Sorting lab: drag (or click then click) each card into the right box, then Check.
     cfg = { zones: [[key, label]], items: [[text, zoneKey, why]], cap: captionEl, intro: html, done: html } */
  OMNI.sorter = function (host, cfg) {
    if (typeof host === "string") host = document.getElementById(host);
    var cap = typeof cfg.cap === "string" ? document.getElementById(cfg.cap) : cfg.cap;
    var bank = h("div", { class: "dropzone", "aria-label": "Unsorted cards" }, h("span", { class: "zone-title" }, "Unsorted cards"));
    var zones = h("div", { class: "sort-zones", style: "display:grid;grid-template-columns:repeat(" + Math.min(cfg.zones.length, 3) + ",1fr);gap:10px;margin-top:10px" });
    cfg.zones.forEach(function (z) { zones.appendChild(h("div", { class: "dropzone", "data-z": z[0], "aria-label": z[1], style: "min-height:110px" }, h("span", { class: "zone-title" }, z[1]))); });
    var check = h("button", { type: "button", class: "primary" }, "Check");
    var again = h("button", { type: "button" }, "Shuffle and restart");
    var score = h("span", { class: "figcap", "aria-live": "polite" });
    var why = h("ul", { class: "figcap", style: "margin-top:6px" });
    host.appendChild(h("p", { class: "figcap" }, "Drag each card into a box, or click a card and then click a box. Keyboard: Tab to a card, press Enter, Tab to a box, press Enter."));
    host.appendChild(bank); host.appendChild(zones);
    host.appendChild(h("div", { class: "row" }, [check, again, score])); host.appendChild(why);
    function build() {
      OMNI.$$(".chip", host).forEach(function (c) { c.remove(); }); why.innerHTML = ""; score.textContent = "";
      OMNI.shuffle(cfg.items.map(function (it, i) { return i; })).forEach(function (i) { bank.appendChild(h("span", { class: "chip", "data-i": String(i) }, cfg.items[i][0])); });
      dnd.refresh();
      if (cap) OMNI.say(cap, cfg.intro);
    }
    var dnd = OMNI.dnd(host, function () { OMNI.$$(".chip", host).forEach(function (c) { c.classList.remove("ok", "bad"); }); });
    check.onclick = function () {
      var right = 0, placed = 0, wrong = []; why.innerHTML = "";
      OMNI.$$(".chip", host).forEach(function (c) {
        var it = cfg.items[+c.dataset.i], z = c.parentNode.getAttribute("data-z");
        c.classList.remove("ok", "bad"); if (!z) return; placed++;
        if (z === it[1]) { right++; c.classList.add("ok"); } else { c.classList.add("bad"); wrong.push(it); }
      });
      score.textContent = right + " of " + cfg.items.length + " correct" + (placed < cfg.items.length ? " (" + (cfg.items.length - placed) + " not placed yet)" : "");
      wrong.forEach(function (it) { var zl = cfg.zones.filter(function (z) { return z[0] === it[1]; })[0][1]; why.appendChild(h("li", { html: "<b>" + OMNI.esc(it[0]) + "</b> belongs in <b>" + OMNI.esc(zl) + "</b>: " + it[2] })); });
      if (cap) OMNI.say(cap, right === cfg.items.length ? cfg.done : "You placed " + right + " of " + cfg.items.length + " correctly. Red cards are in the wrong box; the reasons are listed under the buttons. Move them and press Check again.");
    };
    again.onclick = build;
    build();
  };

  /* Scenario trainer: one situation at a time, pick an answer, see the explanation, keep score.
     cfg = { items: [{ s: situation html, o: [options], a: index, x: explanation html }], cap, intro, label } */
  OMNI.trainer = function (host, cfg) {
    if (typeof host === "string") host = document.getElementById(host);
    var cap = typeof cfg.cap === "string" ? document.getElementById(cfg.cap) : cfg.cap;
    var order, i, right, answered;
    var count = h("b"), sc = h("span", { class: "figcap" });
    var box = h("div", { class: "tile", style: "margin:8px 0" });
    var opts = h("div", { style: "display:grid;gap:8px" });
    var fb = h("div", { "aria-live": "polite", style: "margin-top:8px" });
    var next = h("button", { type: "button", class: "primary" }, "Next →");
    var restart = h("button", { type: "button" }, "Start over");
    host.appendChild(h("div", { class: "row" }, [count, sc]));
    host.appendChild(box); host.appendChild(opts); host.appendChild(fb);
    host.appendChild(h("div", { class: "row" }, [next, restart]));
    function start() { order = OMNI.shuffle(cfg.items.map(function (x, k) { return k; })); i = 0; right = 0; show(); if (cap) OMNI.say(cap, cfg.intro); }
    function show() {
      answered = false; fb.innerHTML = ""; next.disabled = true;
      if (i >= order.length) { box.innerHTML = "<h4>Finished</h4><p>You got <b>" + right + " of " + order.length + "</b>.</p>"; opts.innerHTML = ""; count.textContent = ""; sc.textContent = ""; if (cap) OMNI.say(cap, "You finished all " + order.length + " " + (cfg.label || "scenarios") + " with " + right + " correct. Press Start over to get them in a new order."); return; }
      var it = cfg.items[order[i]];
      var lb = cfg.label ? cfg.label.replace(/s$/, "") : "scenario"; count.textContent = lb.charAt(0).toUpperCase() + lb.slice(1) + " " + (i + 1) + " of " + order.length; sc.textContent = "Score: " + right;
      box.innerHTML = it.s; opts.innerHTML = "";
      OMNI.shuffle(it.o.map(function (o, k) { return k; })).forEach(function (k) {
        var o = it.o[k];
        opts.appendChild(h("button", { type: "button", style: "text-align:left", "data-k": String(k), onclick: function () {
          if (answered) return; answered = true; next.disabled = false;
          var ok = k === it.a; if (ok) right++;
          OMNI.$$("button", opts).forEach(function (b) { var bk = +b.getAttribute("data-k"); b.disabled = true; if (bk === it.a) b.style.borderColor = "var(--good)"; if (bk === k && !ok) b.style.borderColor = "var(--bad)"; });
          fb.innerHTML = "<div class='callout' style='border-left-color:" + (ok ? "var(--good)" : "var(--bad)") + ";background:" + (ok ? "var(--good-soft)" : "var(--bad-soft)") + "'><b>" + (ok ? "✓ Correct." : "✗ Not quite.") + "</b> " + it.x + "</div>";
          sc.textContent = "Score: " + right;
          if (cap) OMNI.say(cap, (ok ? "Right: " : "The best answer was \"" + OMNI.esc(it.o[it.a]) + "\". ") + it.x);
        } }, o));
      });
    }
    next.onclick = function () { i++; show(); }; restart.onclick = start;
    start();
  };
})();

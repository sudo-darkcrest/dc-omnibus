/* Datacenter Omnibus: whole-computer simulator (input -> CPU -> RAM -> output) with a settable clock.
   Usage: OMNI.pcSim("host-element-id"). Needs omnibus.js. */
(function () {
  "use strict";
  var OMNI = window.OMNI, h = OMNI.h, S = OMNI.svg;
  var OPS = { 1: "LOAD", 2: "ADD", 3: "SUB", 4: "STORE", 5: "JUMP", 6: "JZ", 7: "IN", 8: "OUT", 15: "HALT" };
  var PROGRAMS = {
    add: { name: "Add two numbers you type", input: "7, 5", code: ["IN", "STORE 14", "IN", "ADD 14", "STORE 15", "OUT", "HALT"] },
    dbl: { name: "Double a number", input: "21", code: ["IN", "STORE 15", "ADD 15", "OUT", "HALT"] },
    count: { name: "Count down from your number", input: "3", code: ["IN", "OUT", "JZ 5", "SUB 15", "JUMP 1", "HALT", "", "", "", "", "", "", "", "", "", "DATA 1"] },
    total: { name: "Running total of three numbers", input: "4, 10, 6", code: ["IN", "STORE 15", "IN", "ADD 15", "STORE 15", "IN", "ADD 15", "STORE 15", "OUT", "HALT"] }
  };
  var HZ = [0.5, 1, 2, 4, 8, 16];

  function assemble(lines) {
    var ram = [], err = "";
    for (var i = 0; i < 16; i++) {
      var t = (lines[i] || "").trim().toUpperCase(); if (!t) { ram.push(0); continue; }
      var p = t.split(/\s+/), op = p[0], a = p.length > 1 ? parseInt(p[1], 10) : 0;
      if (op === "DATA") { ram.push((a | 0) & 255); continue; }
      var code = null; Object.keys(OPS).forEach(function (k) { if (OPS[k] === op) code = +k; });
      if (code === null) { err = "Line " + i + ": unknown instruction '" + op + "'"; ram.push(0); continue; }
      if (isNaN(a) || a < 0 || a > 15) { err = "Line " + i + ": address must be 0 to 15"; a = 0; }
      ram.push(code === 15 ? 0xF0 : (code << 4) | a);
    }
    return { ram: ram, err: err };
  }
  function dis(b) { var op = b >> 4, a = b & 15; if (!OPS[op]) return "DATA " + b; return OPS[op] + (op === 7 || op === 8 || op === 15 ? "" : " " + a); }
  function hex(b) { return "0x" + (b < 16 ? "0" : "") + b.toString(16).toUpperCase(); }

  OMNI.pcSim = function (host) {
    if (typeof host === "string") host = document.getElementById(host); if (!host) return;
    var progSel = h("select", { "aria-label": "Program" }, Object.keys(PROGRAMS).map(function (k) { return h("option", { value: k }, PROGRAMS[k].name); }));
    var inBox = h("input", { type: "text", "aria-label": "Numbers typed on the keyboard, comma separated", style: "width:9em" });
    var hzSel = h("select", { "aria-label": "Clock frequency" }, HZ.map(function (f) { return h("option", { value: String(f) }, f + " Hz"); }));
    hzSel.value = "2";
    var runB = h("button", { type: "button", class: "primary" }, "▶ Run clock");
    var tickB = h("button", { type: "button" }, "Single tick");
    var resetB = h("button", { type: "button" }, "Reset");
    var svg = S("svg", { viewBox: "0 0 760 400", width: "760", role: "img", "aria-label": "Simulated computer: keyboard input, CPU with clock, registers and ALU, RAM with 16 cells, and a display output, connected by buses." });
    var stats = h("div", { class: "row", "aria-live": "polite", style: "font-size:.92rem;gap:6px 18px" });
    var log = h("ol", { class: "figcap", style: "margin:4px 0 0;padding-left:2.4em;max-height:9.5em;overflow:auto", "aria-label": "Step log" });
    var cap = h("div", { class: "caption", "aria-live": "polite" });
    host.appendChild(h("div", { class: "row" }, [h("label", null, ["Program ", progSel]), h("label", null, ["Keyboard input ", inBox])]));
    host.appendChild(h("div", { class: "row" }, [h("label", null, ["Clock ", hzSel]), runB, tickB, resetB]));
    host.appendChild(h("div", { class: "stage" }, svg));
    host.appendChild(stats);
    host.appendChild(h("details", { open: "" }, [h("summary", null, "Step log"), log]));
    host.appendChild(cap);

    /* ---------- drawing ---------- */
    var el = {};
    function rect(x, y, w, hh, id, extra) { var r = S("rect", Object.assign({ x: x, y: y, width: w, height: hh, rx: 8, fill: "var(--surface)", stroke: "var(--line)", "stroke-width": 2 }, extra || {}), svg); if (id) el[id] = r; return r; }
    function text(x, y, s, a, id) { var t = S("text", Object.assign({ x: x, y: y, class: "svg-text", "font-size": 12 }, a || {}), svg); t.textContent = s; if (id) el[id] = t; return t; }
    function line(pts, id, a) { var l = S("polyline", Object.assign({ points: pts, fill: "none", stroke: "var(--line)", "stroke-width": 5, "stroke-linecap": "round", "stroke-linejoin": "round" }, a || {}), svg); if (id) el[id] = l; return l; }
    // buses first (behind boxes)
    line("160,105 230,105", "busIn"); text(195, 97, "I/O bus", { "font-size": 10, "text-anchor": "middle", class: "svg-text svg-muted" });
    line("160,285 195,285 195,175 230,175", "busOut");
    line("520,95 590,95", "busAddr"); text(555, 87, "address bus", { "font-size": 10, "text-anchor": "middle", class: "svg-text svg-muted" });
    line("520,140 590,140", "busData"); text(555, 158, "data bus", { "font-size": 10, "text-anchor": "middle", class: "svg-text svg-muted" });
    // input device
    rect(20, 50, 140, 120, "inDev"); text(90, 72, "⌨ Input (keyboard)", { "text-anchor": "middle", "font-weight": 700 });
    text(90, 92, "waiting to be read:", { "text-anchor": "middle", "font-size": 10.5, class: "svg-text svg-muted" });
    text(90, 125, "", { "text-anchor": "middle", "font-size": 18, "font-weight": 800, class: "svg-text" }, "inQ");
    // output device
    rect(20, 230, 140, 120, "outDev"); text(90, 252, "🖥 Output (display)", { "text-anchor": "middle", "font-weight": 700 });
    S("rect", { x: 32, y: 262, width: 116, height: 74, rx: 4, fill: "#0b1220", stroke: "none" }, svg);
    var outT = S("text", { x: 90, y: 306, "font-size": 22, "font-family": "monospace", fill: "#4ade80", "text-anchor": "middle" }, svg); el.outT = outT;
    // CPU
    rect(230, 20, 290, 240, "cpu", { "stroke-width": 2.5 }); text(375, 40, "CPU", { "text-anchor": "middle", "font-weight": 800, "font-size": 14 });
    function reg(x, y, w, label, id) { rect(x, y, w, 40, id + "Box"); text(x + 8, y + 15, label, { "font-size": 10, class: "svg-text svg-muted" }); text(x + w / 2, y + 33, "", { "text-anchor": "middle", "font-size": 14, "font-weight": 800, "font-family": "monospace" }, id); }
    reg(245, 55, 80, "Clock", "clk"); reg(335, 55, 80, "PC (next)", "pc"); reg(425, 55, 80, "Z flag", "z");
    reg(245, 110, 130, "IR (instruction)", "ir"); reg(385, 110, 120, "ACC (accumulator)", "acc");
    rect(245, 165, 130, 40, "cuBox"); text(310, 181, "Control unit", { "text-anchor": "middle", "font-size": 11, "font-weight": 700 }); text(310, 197, "", { "text-anchor": "middle", "font-size": 11 }, "cu");
    rect(385, 165, 120, 40, "aluBox"); text(445, 181, "ALU", { "text-anchor": "middle", "font-size": 11, "font-weight": 700 }); text(445, 197, "", { "text-anchor": "middle", "font-size": 11 }, "alu");
    text(375, 228, "", { "text-anchor": "middle", "font-size": 12, "font-weight": 700 }, "phase");
    text(375, 246, "", { "text-anchor": "middle", "font-size": 10.5, class: "svg-text svg-muted" }, "phaseSub");
    // clock wave
    text(230, 290, "Clock signal (each rising edge = one tick)", { "font-size": 10.5, class: "svg-text svg-muted" });
    var wave = S("polyline", { points: "", fill: "none", stroke: "var(--accent)", "stroke-width": 2 }, svg);
    S("rect", { x: 230, y: 298, width: 290, height: 46, fill: "none", stroke: "var(--line)", rx: 4 }, svg);
    // RAM
    rect(590, 10, 160, 380, "ramBox"); text(670, 28, "RAM (16 bytes)", { "text-anchor": "middle", "font-weight": 800 });
    var cells = [];
    for (var i = 0; i < 16; i++) {
      var y = 38 + i * 21.5;
      var r = S("rect", { x: 600, y: y, width: 140, height: 19, rx: 3, fill: "var(--surface-2)", stroke: "var(--line)" }, svg);
      var a = S("text", { x: 606, y: y + 14, "font-size": 10, class: "svg-text svg-muted" }, svg); a.textContent = i;
      var v = S("text", { x: 624, y: y + 14, "font-size": 11, "font-family": "monospace", class: "svg-text" }, svg);
      cells.push({ r: r, v: v });
    }

    /* ---------- machine state ---------- */
    var st, timer = null;
    function reset() {
      stop();
      var p = PROGRAMS[progSel.value]; var asm = assemble(p.code);
      var inputs = inBox.value.split(/[,\s]+/).filter(function (s) { return s !== ""; }).map(function (s) { return (parseInt(s, 10) | 0) & 255; });
      st = { ram: asm.ram, pc: 0, ir: 0, acc: 0, z: false, phase: 0, ticks: 0, instr: 0, halted: false, input: inputs, output: [], wave: [], wrote: {} , lastPC: 0 };
      log.innerHTML = "";
      clear(); draw();
      OMNI.say(cap, "the program was loaded into RAM (cells 0 and up) and the numbers you typed are waiting in the keyboard. Press <b>Single tick</b> to advance the clock once, or <b>Run clock</b> to let it tick by itself at " + hzSel.value + " Hz.");
    }
    function clear() {
      ["busIn", "busOut", "busAddr", "busData"].forEach(function (k) { el[k].setAttribute("stroke", "var(--line)"); });
      ["inDev", "outDev", "cuBox", "aluBox", "irBox", "accBox", "pcBox", "zBox", "clkBox", "ramBox"].forEach(function (k) { el[k].setAttribute("stroke", "var(--line)"); el[k].setAttribute("stroke-width", 2); });
      cells.forEach(function (c) { c.r.setAttribute("stroke", "var(--line)"); c.r.setAttribute("stroke-width", 1); });
    }
    function lit(k, col) { var e = el[k]; e.setAttribute("stroke", col || "var(--accent)"); if (e.tagName === "rect") e.setAttribute("stroke-width", 3.5); }
    function cell(i, col) { cells[i].r.setAttribute("stroke", col || "var(--accent)"); cells[i].r.setAttribute("stroke-width", 3); }
    function draw() {
      cells.forEach(function (c, i) { c.v.textContent = hex(st.ram[i]) + "  " + (st.ram[i] ? dis(st.ram[i]) : "–"); c.r.setAttribute("fill", i === st.pc && !st.halted ? "var(--accent-soft, var(--surface-2))" : st.wrote[i] ? "var(--good-soft)" : "var(--surface-2)"); });
      el.pc.textContent = st.pc; el.ir.textContent = st.ticks ? dis(st.ir) : "–"; el.acc.textContent = st.acc; el.z.textContent = st.z ? "1" : "0";
      el.clk.textContent = st.ticks;
      el.inQ.textContent = st.input.length ? st.input.join("  ") : "(empty)";
      el.outT.textContent = st.output.length ? st.output.slice(-3).join(" ") : "_";
      var hz = +hzSel.value, secs = st.ticks / hz;
      var real = st.ticks / 3.5e9 * 1e9;
      stats.innerHTML = "<span><b>" + st.ticks + "</b> clock ticks</span><span><b>" + st.instr + "</b> instructions done</span><span>At " + hz + " Hz that is <b>" + OMNI.fmt(secs, 1) + " s</b></span><span>A 3.5 GHz CPU would need about <b>" + OMNI.fmt(real, 2) + " ns</b></span>";
      // wave: last 12 ticks
      var n = Math.min(12, st.wave.length), pts = [], x0 = 236, w = 23, top = 306, bot = 336;
      pts.push(x0 + "," + bot);
      for (var i = 0; i < 12; i++) { var x = x0 + i * w; if (i < n) { pts.push(x + "," + bot, x + "," + top, (x + w / 2) + "," + top, (x + w / 2) + "," + bot, (x + w) + "," + bot); } }
      wave.setAttribute("points", pts.join(" "));
    }
    function say(phase, sub, html) {
      el.phase.textContent = phase; el.phaseSub.textContent = sub;
      OMNI.say(cap, "" + html);
      var li = h("li", { html: "<b>Tick " + st.ticks + "</b> · " + phase + ": " + sub }); log.appendChild(li); log.scrollTop = log.scrollHeight;
    }

    /* one clock tick = one micro-step */
    function tick() {
      if (st.halted) { stop(); return; }
      clear(); st.ticks++; st.wave.push(1); lit("clkBox");
      var op = st.ir >> 4, a = st.ir & 15;
      if (st.phase === 0) {
        st.lastPC = st.pc; lit("pcBox"); lit("busAddr"); lit("ramBox"); cell(st.pc); el.cu.textContent = "fetch"; el.alu.textContent = "";
        say("FETCH 1", "PC sends address " + st.pc + " to RAM", "the control unit put the <b>program counter</b> value (" + st.pc + ") on the <b>address bus</b>. This asks RAM: \"give me what is stored at cell " + st.pc + "\".");
        st.phase = 1;
      } else if (st.phase === 1) {
        st.ir = st.ram[st.pc]; cell(st.pc); lit("busData"); lit("irBox"); lit("ramBox"); st.pc = (st.pc + 1) & 15; el.cu.textContent = "fetch";
        say("FETCH 2", "RAM sends " + hex(st.ir) + " to the IR", "RAM put the byte " + hex(st.ir) + " on the <b>data bus</b> and the CPU copied it into the <b>instruction register</b>. The program counter moved on to " + st.pc + " so the next fetch reads the next instruction. The CPU has <b>received an instruction</b>.");
        st.phase = 2;
      } else if (st.phase === 2) {
        lit("irBox"); lit("cuBox"); el.cu.textContent = OPS[op] || "DATA?";
        var meaning = { 1: "copy RAM cell " + a + " into ACC", 2: "add RAM cell " + a + " to ACC", 3: "subtract RAM cell " + a + " from ACC", 4: "copy ACC into RAM cell " + a, 5: "jump to address " + a, 6: "jump to " + a + " if the Z flag is 1", 7: "read the next number from the keyboard", 8: "send ACC to the display", 15: "stop" }[op] || "nothing (this byte is data, not code)";
        say("DECODE", dis(st.ir) + " = " + meaning, "the <b>control unit</b> split " + hex(st.ir) + " into an opcode (" + (op).toString(16).toUpperCase() + " = " + (OPS[op] || "?") + ") and an address (" + a + "). Now it knows what to do: <b>" + meaning + "</b>.");
        st.phase = 3;
      } else {
        lit("cuBox");
        if (op === 7) {
          if (!st.input.length) { st.ticks; lit("inDev", "var(--warn)"); say("EXECUTE (waiting)", "keyboard is empty", "the CPU wants input but nothing is waiting in the keyboard. A real CPU would let another program run until a key-press <b>interrupt</b> arrives. Type numbers in the Keyboard input box and press Reset to try again."); stop(); return; }
          st.acc = st.input.shift(); st.z = st.acc === 0; lit("inDev"); lit("busIn"); lit("accBox");
          say("EXECUTE", "input " + st.acc + " → ACC", "the number <b>" + st.acc + "</b> travelled from the <b>keyboard</b> over the I/O bus into the accumulator. That is how input gets into a computer: a device hands data to the CPU.");
        } else if (op === 1) {
          st.acc = st.ram[a]; st.z = st.acc === 0; lit("busAddr"); lit("busData"); cell(a); lit("accBox");
          say("EXECUTE", "RAM[" + a + "] = " + st.acc + " → ACC", "the CPU read cell " + a + " from RAM and put " + st.acc + " in the accumulator.");
        } else if (op === 2 || op === 3) {
          var b = st.ram[a], old = st.acc; st.acc = op === 2 ? (st.acc + b) & 255 : (st.acc - b + 256) & 255; st.z = st.acc === 0;
          lit("busAddr"); lit("busData"); cell(a); lit("aluBox"); lit("accBox"); el.alu.textContent = old + (op === 2 ? " + " : " − ") + b;
          say("EXECUTE", "ALU: " + old + (op === 2 ? " + " : " − ") + b + " = " + st.acc, "the value " + b + " came from RAM cell " + a + " to the <b>ALU</b>, which " + (op === 2 ? "added it to" : "subtracted it from") + " the accumulator. This is the actual <b>processing</b>. The answer is " + st.acc + (st.z ? ", so the Z (zero) flag is now 1" : "") + ".");
        } else if (op === 4) {
          st.ram[a] = st.acc; st.wrote[a] = 1; lit("accBox"); lit("busAddr"); lit("busData"); cell(a, "var(--good)");
          say("EXECUTE", "ACC " + st.acc + " → RAM[" + a + "]", "the CPU put address " + a + " on the address bus and the value " + st.acc + " on the data bus, and RAM stored it. The result has been <b>moved to RAM</b> (green cell), where it stays until it's overwritten or the power goes off.");
        } else if (op === 8) {
          st.output.push(st.acc); lit("accBox"); lit("busOut"); lit("outDev");
          say("EXECUTE", "ACC " + st.acc + " → display", "the accumulator's value <b>" + st.acc + "</b> went over the I/O bus to the <b>display</b>. That is <b>output</b>: the result leaves the CPU so a person can see it.");
        } else if (op === 5 || (op === 6 && st.z)) {
          st.pc = a; lit("pcBox");
          say("EXECUTE", "PC = " + a, op === 5 ? "the program counter was set to " + a + ", so the next fetch jumps there. Jumps are how loops work." : "the Z flag was 1, so the CPU jumped to address " + a + ". This is a decision: the program does something different depending on a result.");
        } else if (op === 6) {
          lit("zBox");
          say("EXECUTE", "Z = 0, no jump", "the Z flag was 0 (the last result wasn't zero), so the CPU did not jump and carries on with the next instruction.");
        } else if (op === 15) {
          st.halted = true;
          say("HALT", "program finished", "the CPU reached HALT and stopped. It took <b>" + st.ticks + " ticks</b> for " + (st.instr + 1) + " instructions (4 ticks each: fetch, fetch, decode, execute). Output shown: <b>" + (st.output.join(", ") || "none") + "</b>.");
          stop();
        } else {
          say("EXECUTE", "not an instruction", "this byte is data, not code, so the CPU did nothing useful. Programs must not run into their data.");
        }
        st.instr++; st.phase = 0;
      }
      draw();
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } runB.textContent = "▶ Run clock"; }
    function run() {
      if (timer) { stop(); return; }
      if (st.halted) reset();
      runB.textContent = "⏸ Pause clock";
      timer = setInterval(tick, 1000 / +hzSel.value);
    }
    runB.onclick = run; tickB.onclick = function () { stop(); if (st.halted) reset(); tick(); }; resetB.onclick = reset;
    hzSel.onchange = function () { if (timer) { stop(); run(); } draw(); };
    progSel.onchange = function () { inBox.value = PROGRAMS[progSel.value].input; reset(); };
    inBox.onchange = reset;
    inBox.value = PROGRAMS[progSel.value].input; reset();
    return { tick: tick, reset: reset, state: function () { return st; } };
  };
})();

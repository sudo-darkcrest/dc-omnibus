#!/usr/bin/env node
/* Spell out acronyms the first time they appear on each module page.
   Run `node tools/acronyms.js` (dry run: lists what it would change) or
   `node tools/acronyms.js --write` (edits module-NN.html in place).
   Expansions come from tools/acronyms.json plus each module's glossary.
   Safe to re-run: an acronym already explained near its first use is left alone. */
const fs = require("fs"), path = require("path");
const root = path.join(__dirname, "..");
const WRITE = process.argv.includes("--write");

const dict = {};
// 1) glossary expansions (4th field) from every module's data block
const files = fs.readdirSync(root).filter(f => /^module-\d\d\.html$/.test(f)).sort();
for (const f of files) {
  const m = fs.readFileSync(path.join(root, f), "utf8").match(/id="module-data">([\s\S]*?)<\/script>/);
  if (!m) continue;
  for (const g of JSON.parse(m[1]).glossary || []) {
    const term = g[0], exp = g[3] || "";
    if (/^[A-Za-z0-9.+\/-]+$/.test(term) && (term.match(/[A-Z]/g) || []).length >= 2 && / /.test(exp) && !/not an acronym/i.test(exp)) dict[term] = exp;
  }
}
// 2) hand-written list wins
Object.assign(dict, JSON.parse(fs.readFileSync(path.join(__dirname, "acronyms.json"), "utf8")));
// 3) per-module meanings where an acronym means something else on that page (null = leave alone)
const PER = {
  2: { AC: null },
  3: { MS: null },
  4: { PCI: "Peripheral Component Interconnect", IR: "Instruction Register", ID: "Instruction Decode", RIP: null },
  5: { PCI: "Peripheral Component Interconnect", IPS: "In-Plane Switching" },
  7: { VA: "Volt-Amperes" },
  8: { IPS: "In-Plane Switching" },
  11: { DR: "Data center Reach", ER: "Extended Reach", OS: "Optical Single-mode", PD: "Powered Device", STP: "Shielded Twisted Pair", FDM: "Frequency-Division Multiplexing" },
  12: { EF: "Expedited Forwarding", SPF: "Shortest Path First" },
  16: { MAC: "Mandatory Access Control", ECC: "Elliptic Curve Cryptography" },
  18: { MSA: "Master Service Agreement" },
  23: { FC: "Fibre Channel" },
  22: { TR: "Telecommunications Room", IV: null, VA: "Volt-Amperes", HFC: "Hydrofluorocarbon" },
  32: { AC: "Access Control", AU: "Audit and Accountability", CM: "Configuration Management", SOC: "System and Organization Controls", MSA: "Master Service Agreement" },
  36: { IR: null, CR: null, DR: null },
  37: { PD: "Power Delivery" },
  21: { SC: null, AZ: null },
  14: { DR: null },
  27: { AZ: null, SC: null, ID: null, RA: null, AI: null },
  38: { AZ: null },
  15: { ID: null },
  20: { SOC: "System and Organization Controls", MAC: "Mandatory Access Control" },
  24: { KVM: "Kernel-based Virtual Machine" },
  26: { SCP: "Service Control Policy", EFS: "Elastic File System" },
  28: { AZ: null, ID: null, SC: null, SAS: "Shared Access Signature", MS: null },
  29: { ID: null },
  33: { ID: null }
};
const DIGIT_BASE = new Set(["DDR", "GDDR", "LPDDR", "SFP", "QSFP", "OM", "OS"]);
const SMALL = new Set(["of", "and", "the", "for", "to", "in", "on", "a", "an", "&", "with", "over", "as", "by"]);
const norm = s => s.toLowerCase().replace(/[^a-z0-9]/g, "");
const decode = s => s.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const SKIP = new Set(["kicker", "svg", "script", "style", "h1", "h2", "h3", "h4", "h5", "h6", "code", "pre", "button", "select", "option", "a", "th", "kbd", "summary", "label"]);
const HIDE = new Set(["svg", "script", "style"]);

function initialsMatch(words, acro) {
  // do the first letters of a run of words spell the acronym (ignoring small words)?
  const letters = acro.replace(/[^A-Za-z]/g, "").toLowerCase();
  if (letters.length < 3) return false;
  for (let i = 0; i < words.length; i++) {
    let k = 0;
    for (let j = i; j < words.length && k < letters.length; j++) {
      const w = words[j].toLowerCase();
      if (!w) continue;
      if (SMALL.has(w) && w[0] !== letters[k]) continue;
      // allow a hyphenated word to supply several letters (Multi-Source -> M, S)
      const parts = w.split("-").filter(Boolean);
      let ok = true;
      for (const p of parts) { if (k < letters.length && p[0] === letters[k]) k++; else { ok = parts.length > 1 && k > 0; break; } }
      if (!ok) break;
    }
    if (k === letters.length) return true;
  }
  return false;
}

const TOK = /[A-Za-z0-9][A-Za-z0-9]*(?:[-\/][A-Za-z0-9]+)*/g;
let total = 0;
for (const f of files) {
  const n = +f.slice(7, 9);
  const per = PER[n] || {};
  const lookup = k => (k in per ? per[k] : dict[k]);
  let html = fs.readFileSync(path.join(root, f), "utf8");
  const start = html.indexOf('<section class="intro"'), end = html.indexOf('<section class="glossary"');
  if (start < 0 || end < 0) continue;
  const region = html.slice(start, end);
  // pass 1: split into tags and text nodes, record plain-text offsets
  const nodes = []; let plain = ""; const stack = [];
  const re = /<\/?([a-zA-Z0-9]+)[^>]*?(\/?)>|[^<]+/g; let m;
  while ((m = re.exec(region))) {
    if (m[1]) {
      const tag = m[1].toLowerCase(), closing = m[0][1] === "/";
      // the page kicker ("Part 5 · Cloud, Data Center and AI · Module 21") is a label, not prose
      if (closing) { const i = tag === "div" ? Math.max(stack.lastIndexOf("div"), stack.lastIndexOf("kicker")) : stack.lastIndexOf(tag); if (i >= 0) stack.length = i; }
      else if (!m[2] && !/^(br|img|input|hr|meta|link|wbr)$/.test(tag)) stack.push(tag === "div" && /class="kicker"/.test(m[0]) ? "kicker" : tag);
      if (/^(p|li|td|tr|div|section|h\d|br|table|ul|ol|figcaption)$/.test(tag)) plain += " ";
      continue;
    }
    const hidden = stack.some(t => HIDE.has(t)), skip = hidden || stack.some(t => SKIP.has(t));
    const text = decode(m[0]);
    nodes.push({ idx: m.index, raw: m[0], text, poff: plain.length, skip, hidden });
    if (!hidden) plain += text;
  }
  // pass 2: first use of each acronym in an editable text node
  const done = new Set(), edits = [];
  const seenInSkip = new Set();
  for (const nd of nodes) {
    if (nd.hidden) continue;
    TOK.lastIndex = 0; let t;
    while ((t = TOK.exec(nd.raw))) {
      const word = t[0];
      if ((word.match(/[A-Z]/g) || []).length < 2) continue;
      // pick the key: whole compound, or first part when the rest is digits / lowercase (DDR4-3200, VT-x, RG-6)
      let key = null;
      const plural = w => (/[A-Z]s$/.test(w) && lookup(w.slice(0, -1)) ? w.slice(0, -1) : w);
      const parts = word.split(/[-\/]/);
      const candidates = [];
      if (/[-\/]/.test(word)) {
        if (lookup(word) || lookup(plural(word))) candidates.push(plural(word));
        else if (word.includes("/")) parts.forEach(p => candidates.push(plural(p)));
        else if (parts.slice(1).every(p => /^\d+$/.test(p) || /^[a-z]+$/.test(p))) candidates.push(plural(parts[0]));
      } else candidates.push(plural(word));
      const slashJoin = word.includes("/") && candidates.length > 1;
      const pending = [];
      for (let c of candidates) {
        if (!lookup(c) && /\d$/.test(c) && DIGIT_BASE.has(c.replace(/\d+$/, ""))) c = c.replace(/\d+$/, "");
        const exp = lookup(c);
        if (!exp || done.has(c)) continue;
        if (nd.skip) { seenInSkip.add(c); continue; }
        done.add(c);
        const pos = nd.poff + decode(nd.raw.slice(0, t.index)).length + (slashJoin ? decode(word).indexOf(c) : 0);
        const tokLen = slashJoin ? c.length : decode(word).length;
        const before = plain.slice(0, pos), after = plain.slice(pos + tokLen);
        const near = plain.slice(Math.max(0, pos - 120), pos + tokLen + 160);
        const words = near.split(/[\s,;:()"'.\/]+/);
        const ne = norm(exp);
        const explained =
          norm(plain.slice(0, pos + 300)).includes(ne.slice(0, Math.max(10, Math.min(24, ne.length)))) ||
          initialsMatch(words, c) ||
          /^s?\s*(=|stands for|means|is short for)/i.test(after) ||
          (/[(\/]\s*$/.test(before) && /^s?\s*[)\/]/.test(after));
        if (explained) continue;
        pending.push({ c, exp, pos, before });
      }
      if (!pending.length) continue;
      const enc = x => x.replace(/&/g, "&amp;").replace(/</g, "&lt;");
      const tokEndRaw = t.index + word.length + (/^s\b/.test(nd.raw.slice(t.index + word.length)) ? 1 : 0);
      const restRaw = nd.raw.slice(tokEndRaw);
      let ins, at = tokEndRaw;
      const body = slashJoin ? pending.map(q => q.c + ": " + enc(q.exp)).join("; ") : enc(pending[0].exp);
      if (/[(]\s*$/.test(pending[0].before) && /^\s*:/.test(restRaw)) ins = ", " + body;
      else if (/^\s\(/.test(restRaw) && !/^\s\(\d/.test(restRaw)) { at = tokEndRaw + 2; ins = body + "; "; }
      else ins = " (" + body + ")";
      const p0 = pending[0].pos;
      edits.push({ at: nd.idx + at, ins, key: pending.map(q => q.c).join("+"), ctx: plain.slice(Math.max(0, p0 - 50), p0 + word.length + 50) });
    }
  }
  if (!edits.length) continue;
  total += edits.length;
  console.log("== " + f + " (" + edits.length + ")");
  for (const e of edits) console.log("   " + e.key + " -> " + e.ins.trim() + "   | " + e.ctx.replace(/\s+/g, " "));
  if (WRITE) {
    let r = region;
    for (const e of edits.sort((a, b) => b.at - a.at)) r = r.slice(0, e.at) + e.ins + r.slice(e.at);
    html = html.slice(0, start) + r + html.slice(end);
    fs.writeFileSync(path.join(root, f), html);
  }
}
console.log((WRITE ? "inserted " : "would insert ") + total + " expansions");

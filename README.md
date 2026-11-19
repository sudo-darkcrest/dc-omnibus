# Datacenter Omnibus

An interactive study site for IT, networking, data centers, security, service management and audit. It has 24 modules with diagrams, interactive labs, quizzes and flashcards, and covers:

- CompTIA A+ (220-1201 / 220-1202)
- CompTIA Network+ (N10-009)
- CompTIA Security+ (SY0-701)
- ITIL 4 Foundation (PeopleCert)
- EPI DCCA (Data Centre Certified Associate)
- ISACA CISM
- ISACA CISA

Exam codes and weights are the ones published at the time of writing (Nov 2026). Always check the vendor's site before you book.

## Open it on your computer

1. Download or clone this repository.
2. Double-click **`index.html`**.

That's it. You don't need a server, a build step or an internet connection. Everything runs in your browser. Your progress, quiz scores, flashcard boxes and study plan are saved in your browser on that device only.

## What's inside

| Page | What it does |
|---|---|
| `index.html` | Home page: search everything, module cards by part, cert filter, your progress |
| `module-01.html` … `module-24.html` | The 24 modules. Each has lessons, labs, key terms, memory aids, a quiz, flashcards and official links |
| `module-24.html` | Study Hub: cert crosswalk, study plan generator, roadmap, practice exams, combined flashcards, exam-day tips |
| `glossary.html` | Every key term from every module, with a cert filter and A–Z jump |
| `practice-exams.html` | Timed practice exams for every cert, scored by domain |
| `flashcards.html` | One Leitner flashcard deck with every module's cards |
| `labs.html` | A gallery of all 108 interactive labs |

Folder layout:

```
assets/omnibus.css   shared styles (light and dark mode, phone layout)
assets/omnibus.js    shared engine: quiz, flashcards, glossary, labs helpers, progress
assets/hub.js        study hub tools: exam engine, crosswalk, study plan, roadmap
data/catalog.js      list of modules, parts and certs (every page loads this first)
data/mNN.js          one file per module: cert map, glossary, quiz, flashcards
data/bank-*.js       extra practice exam questions (A+, Network+, Security+, DCCA, ITIL, CISM, CISA)
data/search-index.js generated list of headings and labs (made by tools/build.js)
tools/build.js       optional helper, see below
render.yaml          Render static site setup
```

## Put it online

It's a plain static site, so any static host works. Pick one.

### Render (set up already)

1. Push this repository to GitHub.
2. In Render, choose **New → Blueprint** and pick this repository. Render reads `render.yaml` and creates a free static site.
3. Or choose **New → Static Site**, pick the repository, leave the build command empty and set the publish directory to `.`

### GitHub Pages

1. In the repository on GitHub, open **Settings → Pages**.
2. Under **Source**, choose **Deploy from a branch**, pick `main` and the `/ (root)` folder, then **Save**.
3. Your site appears at `https://<your-user>.github.io/<repo-name>/` after a minute or two.

### Netlify (drag and drop)

1. Go to <https://app.netlify.com/drop>.
2. Drag the whole project folder onto the page. Netlify gives you a link straight away.

## Add or change a module

1. **Write the data.** Copy an existing `data/mNN.js` (for example `data/m23.js`) to the new number. Fill in `certmap`, `glossary` (each term is `[term, plain meaning, exact definition, expansion]`), `quiz` and `flashcards`.
   - Quiz questions look like `{ t: "mc", q: "...", o: [options], a: 1, w: [why each option], x: "explanation", c: "N", d: "2.3 Objective" }`.
   - `t` can be `mc` (one answer), `ms` (select all, `a` is a list) or `order` (list `o` in the correct order). Add `sc: "..."` for a scenario.
   - `c` is the cert key (`A1`, `A2`, `N`, `S`, `ITIL`, `DCCA`, `CISM`, `CISA` or `GEN`). The first number of `d` is the exam domain.
2. **Write the page.** Copy an existing `module-NN.html`, change `data-module="NN"` on `<body>`, the text and the labs, and load `data/mNN.js`. Wrap each lab in `<div class="lab-card" id="lab-..." data-lab="short description"><h3>Lab title</h3> ... </div>` so it appears on the Labs page.
3. **Add it to the catalog.** Add a line to `OMNI.catalog` in `data/catalog.js` with its number, part, color category, title, subtitle and certs.
4. **Load it on the hub pages.** Add `<script src="data/mNN.js"></script>` to `index.html`, `module-24.html`, `glossary.html`, `practice-exams.html`, `flashcards.html` and `labs.html`.
5. **Run the build helper** (needs Node.js):

   ```
   node tools/build.js
   ```

   This refreshes the hidden module data block inside each module page and regenerates `data/search-index.js`, so the new headings and labs show up in search and on the Labs page.

## Accessibility

Pages use semantic headings, a skip link, labelled controls, keyboard support for every lab (click-to-place as well as drag and drop), live regions for results, visible focus, reduced-motion support and color pairs checked for contrast in light and dark mode.

## Disclaimer

Original study material. Not affiliated with or endorsed by CompTIA, PeopleCert, AXELOS, EPI, ISACA or any standards body. Exam names are trademarks of their owners.

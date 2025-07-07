# 📦 Robo Sort - Package Sorter

Tiny ESM utility that tells Thoughtful’s robot arm what stack a parcel goes:

-   **STANDARD** – light & compact
-   **SPECIAL** – heavy _or_ bulky
-   **REJECTED** – heavy **and** bulky

---

## ⏱ Time-box & stack

| Item         | Detail                                         |
| ------------ | ---------------------------------------------- |
| **Budget**   | **≈ 28 minutes** total (code ＋ tests ＋ docs) |
| **Language** | Vanilla **JavaScript (ES Modules)**            |
| **Tests**    | Jest 29 — 100 % coverage                       |
| **Typing**   | JSDoc typedefs (no TS build step)              |

---

## 🚀 Quick start

```bash
git clone https://github.com/<your-handle>/robo-sort.git
cd robo-sort
npm install
npm test     # runs Jest with coverage
```

---

## 📜 API

```js
import sortPackage from "robo-sort";

sortPackage({
	width: 80,
	height: 60,
	length: 40,
	mass: 18,
}); // → "STANDARD"
```

#### Types

> -   `PackageInput` — object with `height`, `width`, `length`, `mass` (numbers)
> -   `StackName` — `'STANDARD' | 'SPECIAL' | 'REJECTED'`
>
> (Defined in JSDoc inside `src/sortPackage.js`.)

---

## 🎯 Design choices

| Decision                                          | Why it helps                                                 |
| ------------------------------------------------- | ------------------------------------------------------------ |
| **Single-object param**                           | Prevents positional mix-ups; extensible for future fields.   |
| **Early `validatePackageInput`**                  | Catches missing/invalid keys once; helpers stay pure.        |
| **Short-circuit bulky test**                      | Checks max dimension before volume ⇒ fewer multiplications.  |
| **Frozen enums** (`THRESHOLDS`, `SORT_STACKS`)    | Guards against consumer mutation.                            |
| **Pure helpers** (`isBulky`, `isHeavy`, `volume`) | Easy unit tests, zero side-effects.                          |
| **JSDoc over TS build**                           | Gives IDE IntelliSense with zero compile cost.               |
| **Edge-case test matrix**                         | Boundaries, extremes, invalid ＋ missing fields all covered. |

---

## 🤖 AI usage statement

ChatGPT was used **only for scaffolding** (edge-case brainstorm, Jest table templates).
All code, naming, and lint fixes were **hand-reviewed and refined**.

---

## 🧪 Coverage snapshot

| Metric     | %   |
| ---------- | --- |
| Statements | 100 |
| Branches   | 100 |
| Functions  | 100 |
| Lines      | 100 |

HTML report: `coverage/lcov-report/index.html`

---

## 📂 Project layout

```
src/
  sortPackage.js        # library entry
test/
  sortPackage.test.js   # happy paths + validation failures
README.md
package.json
```

---

## 💡 Importing as a utility

```js
import sortPackage from "robo-sort"; // default export
import { SORT_STACKS } from "robo-sort"; // named export
```

The package declares its entry in **`package.json`**:

```jsonc
{
	"main": "./src/sortPackage.js",
	"exports": { ".": "./src/sortPackage.js" },
	"types": "./package-sorter.d.ts",
	"type": "module"
}
```

Consumers get a clean, single-token import without worrying about paths.

---

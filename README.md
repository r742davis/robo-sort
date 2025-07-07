# Robo Sorter - A Thoughtful Package Sorter 🤖📦

> Volume & mass → **STANDARD** / **SPECIAL** / **REJECTED**

| Threshold       | Value           |
| --------------- | --------------- |
| Bulky volume    | ≥ 1 000 000 cm³ |
| Bulky dimension | ≥ 150 cm        |
| Heavy mass      | ≥ 20 kg         |

## Usage

```js
import sortPackage from "robo-sort";

sortPackage(50, 40, 30, 10); // "STANDARD"
sortPackage(15, 15, 15, 25); // "SPECIAL"
sortPackage(200, 50, 40, 25); // "REJECTED"
```



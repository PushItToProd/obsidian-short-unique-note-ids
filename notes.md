Goal: enable hand-writing my note IDs more easily

- abbreviate year, month day, etc. using higher bases
	- year - set an "epoch year" and count up from 0
	- month - base 12
	- day - base 36
	- hour - base 36/26
	- minute - base 60(?) or maybe just normal decimal

- e.g. an ID like `202510252134` (2025-10-25 21:34) is 12 chars
  - just encoding `202510252134` in base 36 yields `2L15DILI`, just 8 digits -- other than the annoying amount of L's and I's, that's better
  - more custom encoding:
    - date
      - year: `2025` => `2` or `C` (epoch year is `2023` = `0`/`A`)
      - month: `10` => `A`
      - day: `25` => `P`
    - -> without abbreviating the time, this could look like `2aP2134`, `2AP2134`, `2AP-2134` 
      - 7/8 chars -- already 5 characters shorter
    - time
      - higher bases for hour and minute
        - hour: `21` (base 36) => `L`
        - minute: `34` (base 64) => `i` 
        - with the abbreviated date above, this gives `2aPLi` -> 7 characters shorter
      - ~downside of base64 is it's case sensitive -- would be kinda nice to disambiguate
      - alternatively: (using base 26 for the hour since anything extra is a waste)
        - hour: `21` (base 26) => `V`
        - minute: `34` (base 64) => `i` 
        - -> `2aPVi`
      - use base 26 for hours and base 10 for minutes
        - hour: `21` (base 26) => `V`
        - minute: `34`
        - -> `2aPV34`

- year representations
  - full year: `2025`
  - 2 digit year: `25` (good for at least 75 years)
  - 2 digit epoch-based year: start from `00`
  - epoch-based year in a higher base: `0`, `1`, `2`, ..., `A`, `B`, ..., `Z`, `a`, ..., `z`


## Base-64 encoding table

via https://www.lifewire.com/base64-encoding-overview-1166412

| **Value** | **Char** | **Value** | **Char** | **Value** | **Char** | **Value** | **Char** |
| --------- | -------- | --------- | -------- | --------- | -------- | --------- | -------- |
| 0         | A        | 16        | Q        | 32        | g        | 48        | w        |
| 1         | B        | 17        | R        | 33        | h        | 49        | x        |
| 2         | C        | 18        | S        | 34        | i        | 50        | y        |
| 3         | D        | 19        | T        | 35        | j        | 51        | z        |
| 4         | E        | 20        | U        | 36        | k        | 52        | 0        |
| 5         | F        | 21        | V        | 37        | l        | 53        | 1        |
| 6         | G        | 22        | W        | 38        | m        | 54        | 2        |
| 7         | H        | 23        | X        | 39        | n        | 55        | 3        |
| 8         | I        | 24        | Y        | 40        | o        | 56        | 4        |
| 9         | J        | 25        | Z        | 41        | p        | 57        | 5        |
| 10        | K        | 26        | a        | 42        | q        | 58        | 6        |
| 11        | L        | 27        | b        | 43        | r        | 59        | 7        |
| 12        | M        | 28        | c        | 44        | s        | 60        | 8        |
| 13        | N        | 29        | d        | 45        | t        | 61        | 9        |
| 14        | O        | 30        | e        | 46        | u        | 62        | +        |
| 15        | P        | 31        | f        | 47        | v        | 63        | /        |

Alternatively, use base-62 so we just need basic alphanumeric characters:

```js
const BASE62_DIGITS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
```

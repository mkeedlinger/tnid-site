+++
title = "Data Encoding"
weight = 2

[extra]
spec_anchor = "tnid-data-encoding"
+++

The data portion of a TNID (everything after the `.`) uses a custom **6-bit character encoding** to represent 102 bits of binary data.

## Structure

The 102-bit data portion encodes exactly into **17 characters**:
- 102 bits ÷ 6 bits/character = 17 characters
- No padding is required since 102 is evenly divisible by 6

## Character Set

The encoding uses 64 characters (2⁶ = 64):
- Hyphen `-`
- Digits `0` through `9`
- Uppercase letters `A` through `Z`
- Underscore `_`
- Lowercase letters `a` through `z`

## Relationship to Base64

This encoding is **similar to but NOT the same as** RFC 4648 Base64. Key differences:

- Different character set (uses `-` and `_` instead of `+` and `/`)
- Different character ordering (optimized for lexicographic sorting)
- Different bit-to-character mapping

Do not use standard Base64 libraries to encode or decode TNID data.

## String Layout

The 17 data characters map to specific bit positions in the TNID:

```
Position:  1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17
Nibbles:  [A ][B ][C ][D ][E ][F ][G ][H ][I ][J ][K ][L ][M ][N ][O ][P ][Q ]
Bits:     6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6   6
```

Each character represents 6 bits, reading left to right from most significant to least significant.

## Complete Mapping Table

| Character | Binary | Decimal |
|-----------|--------|---------|
| `-`       | `000000` | 0 |
| `0`       | `000001` | 1 |
| `1`       | `000010` | 2 |
| `2`       | `000011` | 3 |
| `3`       | `000100` | 4 |
| `4`       | `000101` | 5 |
| `5`       | `000110` | 6 |
| `6`       | `000111` | 7 |
| `7`       | `001000` | 8 |
| `8`       | `001001` | 9 |
| `9`       | `001010` | 10 |
| `A`       | `001011` | 11 |
| `B`       | `001100` | 12 |
| `C`       | `001101` | 13 |
| `D`       | `001110` | 14 |
| `E`       | `001111` | 15 |
| `F`       | `010000` | 16 |
| `G`       | `010001` | 17 |
| `H`       | `010010` | 18 |
| `I`       | `010011` | 19 |
| `J`       | `010100` | 20 |
| `K`       | `010101` | 21 |
| `L`       | `010110` | 22 |
| `M`       | `010111` | 23 |
| `N`       | `011000` | 24 |
| `O`       | `011001` | 25 |
| `P`       | `011010` | 26 |
| `Q`       | `011011` | 27 |
| `R`       | `011100` | 28 |
| `S`       | `011101` | 29 |
| `T`       | `011110` | 30 |
| `U`       | `011111` | 31 |
| `V`       | `100000` | 32 |
| `W`       | `100001` | 33 |
| `X`       | `100010` | 34 |
| `Y`       | `100011` | 35 |
| `Z`       | `100100` | 36 |
| `_`       | `100101` | 37 |
| `a`       | `100110` | 38 |
| `b`       | `100111` | 39 |
| `c`       | `101000` | 40 |
| `d`       | `101001` | 41 |
| `e`       | `101010` | 42 |
| `f`       | `101011` | 43 |
| `g`       | `101100` | 44 |
| `h`       | `101101` | 45 |
| `i`       | `101110` | 46 |
| `j`       | `101111` | 47 |
| `k`       | `110000` | 48 |
| `l`       | `110001` | 49 |
| `m`       | `110010` | 50 |
| `n`       | `110011` | 51 |
| `o`       | `110100` | 52 |
| `p`       | `110101` | 53 |
| `q`       | `110110` | 54 |
| `r`       | `110111` | 55 |
| `s`       | `111000` | 56 |
| `t`       | `111001` | 57 |
| `u`       | `111010` | 58 |
| `v`       | `111011` | 59 |
| `w`       | `111100` | 60 |
| `x`       | `111101` | 61 |
| `y`       | `111110` | 62 |
| `z`       | `111111` | 63 |


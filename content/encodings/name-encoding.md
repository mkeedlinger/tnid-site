+++
title = "Name Encoding"
weight = 1

[extra]
spec_anchor = "tnid-name-encoding"
+++

The name portion of a TNID uses a custom **5-bit character encoding** to pack up to 4 characters into 20 bits.

## Character Set

The encoding uses 32 characters (2⁵ = 32):
- Null character (for padding)
- Digits `0` through `4`
- Lowercase letters `a` through `z`

## Lexicographic Ordering

The character values are assigned so that their binary ordering matches ASCII lexicographic ordering:

- `0` (ASCII 48) comes before `a` (ASCII 97)
- `a` comes before `b`, `b` before `c`, etc.

This ensures that sorting encoded names as binary values produces the same result as sorting the original text alphabetically.

## Padding

Names shorter than 4 characters must be **null-padded at the end** (in the least significant bits). This ensures consistent 20-bit representation regardless of name length.

## Encoding Example

To encode the name `"ab"`:

1. Look up each character: `a` = `00110`, `b` = `00111`
2. Concatenate the bits: `00110` + `00111` = `0011000111`
3. Pad with nulls to 20 bits: `0011000111` + `0000000000` = `00110001110000000000`

The final 20-bit value is `00110001110000000000` (binary) = `0x30700` (hex).

## Complete Mapping Table

| Character | Binary | Decimal |
|-----------|--------|---------|
| *(null)*  | `00000` | 0 |
| `0`       | `00001` | 1 |
| `1`       | `00010` | 2 |
| `2`       | `00011` | 3 |
| `3`       | `00100` | 4 |
| `4`       | `00101` | 5 |
| `a`       | `00110` | 6 |
| `b`       | `00111` | 7 |
| `c`       | `01000` | 8 |
| `d`       | `01001` | 9 |
| `e`       | `01010` | 10 |
| `f`       | `01011` | 11 |
| `g`       | `01100` | 12 |
| `h`       | `01101` | 13 |
| `i`       | `01110` | 14 |
| `j`       | `01111` | 15 |
| `k`       | `10000` | 16 |
| `l`       | `10001` | 17 |
| `m`       | `10010` | 18 |
| `n`       | `10011` | 19 |
| `o`       | `10100` | 20 |
| `p`       | `10101` | 21 |
| `q`       | `10110` | 22 |
| `r`       | `10111` | 23 |
| `s`       | `11000` | 24 |
| `t`       | `11001` | 25 |
| `u`       | `11010` | 26 |
| `v`       | `11011` | 27 |
| `w`       | `11100` | 28 |
| `x`       | `11101` | 29 |
| `y`       | `11110` | 30 |
| `z`       | `11111` | 31 |


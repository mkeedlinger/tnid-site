+++
title = "Bit Layout"
weight = 2
sort_by = "weight"

[extra]
spec_anchor = "bit-layout"
+++

TNIDs pack multiple components into a 128-bit structure. This chapter explains how those bits are organized.

## Visual Layout

The diagram below shows how the 128 bits are divided into nibbles (4-bit groups), with each number indicating which component owns those bits:

```
1111.1111.1111.1111.1111.5555.5555.5555-
5555.5555.5555.5555-
2222.5555.5555.5555-
3344.5555.5555.5555-
5555.5555.5555.5555.5555.5555.5555.5555.5555.5555.5555.5555
```

## Components

| # | Component | Size | Description |
|---|-----------|------|-------------|
| 1 | **Name** | 20 bits (5 nibbles) | 4 encoded characters using TNID Name Encoding |
| 2 | **UUID Version** | 4 bits | Always `0x8` for UUIDv8 |
| 3 | **UUID Variant** | 2 bits | Always `0b10` per UUIDv8 specification |
| 4 | **TNID Variant** | 2 bits | Determines how the data bits are interpreted |
| 5 | **TNID Data Bits** | 100 bits | Available space for each variant to use |

The Name field allows quick visual identification of TNID types, while the remaining 108 bits provide space for version information, variant selection, and variant-specific data.


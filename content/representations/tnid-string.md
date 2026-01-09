+++
title = "TNID String Format"
weight = 1

[extra]
spec_anchor = "tnid-string"
+++

The TNID string format is the canonical human-readable representation of a TNID.

## Format

```
<name>.<encoded-data>
```

- **name**: The TNID name as ASCII characters. Must be 1 to 4 of the allowed TNID Name Encoding characters.
- **encoded-data**: The TNID Data Encoding of the TNID variant and TNID Data Bits. Must be exactly 17 characters.

## Example

```
test.Br2flcNDfF6LYICnT
```

In this example:
- `test` is the name (4 characters)
- `.` is the separator
- `Br2flcNDfF6LYICnT` is the encoded data (17 characters)

## Data Portion Structure

The 17-character encoded data represents 102 bits of information (17 × 6 bits = 102 bits). These bits are assembled from specific parts of the TNID:

1. **First 40 data bits** (from the timestamp or random data)
2. *(UUID version bits are skipped)*
3. **2 TNID variant bits**
4. *(UUID variant bits are skipped)*
5. **Remaining 60 data bits**

This structure ensures that the encoded string preserves all TNID-specific information while omitting the fixed UUID version and variant bits that can be reconstructed during decoding.

## Total Length

A complete TNID string is between 19 and 22 characters:
- Name: 1-4 characters
- Separator: 1 character (`.`)
- Encoded data: 17 characters

## Encoding Details

For specifics on the character sets and encoding algorithms used:
- See [Name Encoding](@/encodings/name-encoding.md) for the 5-bit name encoding
- See [Data Encoding](@/encodings/data-encoding.md) for the 6-bit data encoding


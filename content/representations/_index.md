+++
title = "Representations"
weight = 4
sort_by = "weight"

[extra]
spec_anchor = "representations"
+++

TNIDs are 128 bits and can be represented any way a UUID can: as a hexadecimal string, raw bytes, an integer, and more. Any system that stores UUIDs can store TNIDs without modification.

In addition to these standard representations, TNIDs define their own string format with advantages over UUID's typical hex representation:

- **Shorter**: 22 characters vs 36 for UUID hex strings
- **Type information**: The name prefix immediately identifies the ID type
- **Sortable**: Lexicographic ordering matches chronological ordering (for Variant 0)
- **URL-safe**: No special characters that require encoding

## Example Representations

The table below shows the same TNID in different formats:

| Format | Value |
|--------|-------|
| TNID string | `test.x8MRU0xetVa6QZeZR` |
| u128 hex | `0xCAB19F495DC78C1F9AB98261DB92A91C` |
| UUID hex | `cab19f49-5dc7-8c1f-9ab9-8261db92a91c` |
| Bytes (big-endian) | `CA B1 9F 49 5D C7 8C 1F 9A B9 82 61 DB 92 A9 1C` |

## Choosing a Representation

Use the **TNID string format** when:
- Displaying IDs to users
- Including IDs in URLs or APIs
- Storing IDs as text where compactness matters

Use **UUID hex format** when:
- Interfacing with systems that expect standard UUIDs
- Using database UUID columns
- Working with existing UUID libraries

Use **raw bytes** when:
- Storing IDs in binary formats
- Optimizing for storage space
- Performing binary comparisons


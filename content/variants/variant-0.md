+++
title = "Variant 0: Time-Sortable"
weight = 1

[extra]
spec_anchor = "variant-0"
+++

Variant 0 is similar to UUIDv7 and provides time-sortable identifiers with millisecond precision.

## Layout

```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                        Name (20 bits)                        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|              Milliseconds since epoch (43 bits)              |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|    ms (cont)    |  ver  |         Random (12 bits)           |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
| var |tnid |              Random (45 bits)                    |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

| Field | Bits | Description |
|-------|------|-------------|
| Name | 20 (5 nibbles) | Entity/table identifier |
| Milliseconds since epoch | 43 | Unix timestamp in milliseconds |
| UUID version | 4 | Always `1000` (version 8) |
| UUID variant | 2 | Always `10` (RFC 4122) |
| TNID variant | 2 | `00` for Variant 0 |
| Random bits | 57 | Cryptographically random data |

## Goals

- **Millisecond precision time sortable**: IDs generated later will sort after IDs generated earlier
- **Reasonable for 99% of use cases**: Balances time-ordering with sufficient randomness
- **Database-friendly**: Natural ordering reduces index fragmentation

## Non-Goals

- **Astronomically low collision probability**: While collisions are extremely rare, Variant 0 prioritizes time-ordering over maximum entropy
- **Extraordinary ID generation rates**: Not optimized for generating millions of IDs per millisecond on a single system

## Caveats

### Collisions

With 57 random bits, generating 1 million IDs in the same millisecond results in approximately a **0.00035% collision chance**. For most applications, this is negligible, but high-throughput systems should be aware of this limitation.

The collision probability can be calculated using the birthday problem formula. For `n` IDs generated in the same millisecond with `b` random bits:

```
P(collision) ≈ 1 - e^(-n²/2^(b+1))
```

### Hex Sortability

When sorting TNIDs as hexadecimal strings, be aware of **case sensitivity**. Uppercase and lowercase hex characters have different ASCII values, which can affect sort order. Always normalize to a consistent case (preferably lowercase) before sorting.

### Future IDs

Variant 0 TNIDs are only valid until the **year 2248**. The 43 bits allocated for milliseconds since the Unix epoch will overflow after approximately 278 years from 1970.

This limitation is unlikely to affect current systems, but long-lived archival systems should be aware of this constraint.


+++
title = "Variant 1: Random"
weight = 2

[extra]
spec_anchor = "variant-1"
+++

Variant 1 is similar to UUIDv4 and provides maximum randomness for scenarios where time-ordering is not required.

## Layout

```
 0                   1                   2                   3
 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                        Name (20 bits)                        |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                     Random (32 bits)                         |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|     Random      |  ver  |         Random (12 bits)           |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
| var |tnid |              Random (45 bits)                    |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

| Field | Bits | Description |
|-------|------|-------------|
| Name | 20 (5 nibbles) | Entity/table identifier |
| Random bits | 100 | Cryptographically random data |
| UUID version | 4 | Always `1000` (version 8) |
| UUID variant | 2 | Always `10` (RFC 4122) |
| TNID variant | 2 | `01` for Variant 1 |

## Goals

- **Maximize entropy**: 100 bits of randomness while conforming to UUID and TNID specifications
- **UUIDv4 compatibility**: Familiar behavior for teams accustomed to random UUIDs
- **No temporal information**: IDs reveal nothing about when they were created

## Caveats

### Fewer Random Bits Than UUIDv4

Variant 1 TNIDs have **22 fewer random bits** than standard UUIDv4 (100 bits vs 122 bits). This reduction comes from:

- 20 bits used for the Name field
- 2 bits used for the TNID variant

Despite this reduction, 100 bits of entropy is still **vastly sufficient for most use cases**. To put this in perspective:

- 100 bits = 2^100 ≈ 1.27 × 10^30 possible values
- Even generating 1 billion IDs per second, it would take over 40 billion years to have a 50% chance of collision

### No Time Ordering

Unlike Variant 0, these IDs are not time-sortable. If you need chronological ordering, use Variant 0 instead.


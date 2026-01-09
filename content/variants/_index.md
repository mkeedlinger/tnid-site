+++
title = "TNID Variants"
weight = 3
sort_by = "weight"

[extra]
spec_anchor = "tnid-variants"
+++

TNID uses 2 bits to specify the variant, allowing for 4 possible variants. This design provides flexibility for different use cases while maintaining compatibility with standard UUID infrastructure.

## Variant Overview

| TNID Variant | Similar to | Primary Use Case | Key Feature |
|--------------|------------|------------------|-------------|
| Variant 0 | UUIDv7 | Time-ordered IDs | Millisecond sortable |
| Variant 1 | UUIDv4 | Maximum randomness | 100 bits of entropy |
| Variant 2 | - | Reserved for future use | - |
| Variant 3 | - | Reserved for future use | - |

## Choosing a Variant

**Variant 0** is recommended for most use cases. It provides time-ordered IDs that are naturally sortable, making it ideal for database primary keys, event logs, and any scenario where chronological ordering is beneficial.

**Variant 1** is designed for scenarios requiring maximum randomness, similar to UUIDv4. Use this when time-ordering is not needed and you want to maximize entropy.

**Variants 2 and 3** are reserved for future expansion and should not be used in production systems.


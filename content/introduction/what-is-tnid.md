+++
title = "What is TNID?"
weight = 1
+++

## Overview

TNIDs (Typed Named IDs) are identifiers based on [UUIDv8](https://www.rfc-editor.org/rfc/rfc9562.html), the custom UUID format defined in RFC 9562. By building on UUIDv8, TNIDs maintain full compatibility with the UUID specification while adding powerful features for developers.

**TNIDs can be used anywhere that expects a standard UUID.** This means you can adopt TNIDs incrementally in your systems without breaking existing UUID-based infrastructure.

## Key Features

### Name Field

TNIDs include a **20-bit name field** that allows you to differentiate ID types both at runtime and compile time. This enables:

- Type-safe ID handling in your code
- Easy identification of what kind of entity an ID represents
- Prevention of accidental ID type mismatches

### String Representation

TNIDs use an **unambiguous, case-sensitive, lexicographically sortable** string format. This means:

- No confusion between similar-looking characters
- Consistent sorting in databases and file systems
- Compact representation compared to standard UUID hex format

## Variants

TNIDs come in two variants to suit different use cases:

| Variant | Description | Similar To |
|---------|-------------|------------|
| **Variant 0** | Time-sortable with embedded timestamp | UUIDv7 |
| **Variant 1** | Maximum randomness | UUIDv4 |

- **Variant 0** is ideal when you need chronologically ordered IDs, such as for database primary keys where insert order matters.
- **Variant 1** is best when you need maximum entropy and don't require time-based sorting.


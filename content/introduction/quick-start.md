+++
title = "Quick Start"
weight = 2
+++

## Example TNID

Here's the same TNID shown in different representations:

| Format | Value |
|--------|-------|
| TNID string | `test.x8MRU0xetVa6QZeZR` |
| UUID hex | `cab19f49-5dc7-8c1f-9ab9-8261db92a91c` |
| u128 hex | `0xCAB19F495DC78C1F9AB98261DB92A91C` |

## String Format

A TNID string follows the format:

```
<name>.<encoded-data>
```

- **name**: A human-readable identifier for the type (1-4 characters)
- **encoded-data**: The remaining UUID data in a compact, sortable encoding

## Name Field

The name can be **1 to 4 characters** long, using:

- Digits: `0-9`
- Lowercase letters: `a-z`

For example:
- `user.x8MRU0xetVa6QZeZR` — a user ID
- `post.x8MRU0xetVa6QZeZR` — a post ID
- `tx.x8MRU0xetVa6QZeZR` — a transaction ID

This naming convention makes it immediately clear what kind of entity an ID represents, even when viewing raw data in logs or databases.


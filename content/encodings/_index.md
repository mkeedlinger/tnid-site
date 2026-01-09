+++
title = "Encodings"
weight = 5
sort_by = "weight"
insert_anchor_links = "right"

[extra]
spec_anchor = "encodings"
+++

TNID uses two custom encodings to represent binary data as text: a **5-bit encoding** for the name portion and a **6-bit encoding** for the data portion.

## Design Principles

Both encodings are carefully designed with two key properties:

### Lexicographic Ordering

The bit ordering of the encoded values matches ASCII character ordering. This means that sorting TNID strings alphabetically produces the same order as sorting their underlying binary values. This property enables efficient indexing and range queries in databases and other systems that sort strings lexicographically.

### URL Safety

All characters used in both encodings are **unreserved** according to [RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986#section-2.3). This means TNIDs can be used directly in URLs without any percent-encoding:

- No special escaping required in path segments
- No encoding needed in query parameters
- Safe for use in URI fragments

The unreserved characters allowed by RFC 3986 are: `A-Z`, `a-z`, `0-9`, `-`, `.`, `_`, and `~`. TNID encodings use a subset of these characters.


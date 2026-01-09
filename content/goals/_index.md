+++
title = "Design Goals"
weight = 6
sort_by = "weight"

[extra]
spec_anchor = "overall-goals--non-goals"
+++

This specification is designed to be useful in 99% of use cases. It acknowledges that it won't work well for *all* use cases.

In particular, TNIDs are not optimized for use cases that generate massive volumes of IDs where collision risk justifies sacrificing human-readable names or other features for increased time precision or entropy. Such cases are exceedingly rare.

TNIDs are designed to increase usability for the more common cases where developers benefit from readable, typed identifiers with built-in timestamps.


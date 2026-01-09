+++
title = "Implementations"
weight = 7
sort_by = "weight"
+++

Known implementations of the TNID specification.

## Rust

The reference implementation.

- **Repository:** [github.com/mkeedlinger/tnid](https://github.com/mkeedlinger/tnid)
- **Crate:** [crates.io/crates/tnid](https://crates.io/crates/tnid)
- **Docs:** [docs.rs/tnid](https://docs.rs/tnid)

```bash
cargo add tnid
```

```rust
use tnid::{TNID, TNIDName, NameStr};

struct User;
impl TNIDName for User {
    const ID_NAME: NameStr<'static> = NameStr::new_const("user");
}

// Time-ordered (like UUIDv7)
let id = TNID::<User>::new_v0();
println!("{}", id);  // user.Br2flcNDfF6LYICnT

// High-entropy (like UUIDv4)
let id = TNID::<User>::new_v1();
```




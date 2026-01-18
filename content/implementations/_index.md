+++
title = "Implementations"
weight = 7
sort_by = "weight"
+++

Known implementations of the TNID specification.

## Rust

The reference implementation.

- **Repository:** [github.com/mkeedlinger/tnid-rust](https://github.com/mkeedlinger/tnid-rust)
- **Crate:** [crates.io/crates/tnid](https://crates.io/crates/tnid)
- **Docs:** [docs.rs/tnid](https://docs.rs/tnid)

```bash
cargo add tnid
```

```rust
use tnid::{NameStr, Tnid, TnidName};

struct User;
impl TnidName for User {
    const ID_NAME: NameStr<'static> = NameStr::new_const("user");
}

// Time-ordered (like UUIDv7)
let id = Tnid::<User>::new_v0();
println!("{}", id);  // user.Br2flcNDfF6LYICnT

// High-entropy (like UUIDv4)
let id = Tnid::<User>::new_v1();
```

Optional integrations:

- `serde` (**alpha**): `serde::Serialize` / `serde::Deserialize` for `Tnid<Name>`, `DynamicTnid`, `UuidLike`
- `sqlx-postgres` / `sqlx-mysql` / `sqlx-sqlite` (**alpha**): SQLx `Type`/`Encode`/`Decode` for DB storage

Core feature readiness:

- `uuid`, `time`, `rand` (**stable**)
- `encryption` (**beta**)

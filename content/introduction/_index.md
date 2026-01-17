+++
title = "Introduction"
weight = 1
sort_by = "weight"
+++

TNIDs (Typed Named IDs) are a UUIDv8-based identifier format that extends standard UUIDs with useful features for developers.

## What They Look Like

```
user.Br2flcNDfF6LYICnT
```

That's a TNID. The `user` prefix tells you exactly what kind of entity this ID represents. Compare this to a standard UUID:

```
cab1952a-f09d-86d9-928e-96ea03dc6af3
```

Both represent the same 128-bit value and are fully interchangeable—but the TNID string is shorter, sortable, and self-documenting.

| Format | Value |
|--------|-------|
| TNID string | `user.Br2flcNDfF6LYICnT` |
| UUID hex | `cab1952a-f09d-86d9-928e-96ea03dc6af3` |

## Rust Example

```rust
use tnid::{Case, NameStr, Tnid, TnidName};

// Define a type for User IDs
struct User;
impl TnidName for User {
    const ID_NAME: NameStr<'static> = NameStr::new_const("user");
}

// Create a time-ordered ID (like UUIDv7)
let user_id = Tnid::<User>::new_v0();
println!("{}", user_id);  // user.Br2flcNDfF6LYICnT

// Or a high-entropy ID (like UUIDv4)
let session_id = Tnid::<User>::new_v1();

// Convert to UUID string for databases
let uuid_str = user_id.to_uuid_string(Case::Lower);
// "cab1952a-f09d-86d9-928e-96ea03dc6af3"
```

## Type Safety

The real power comes from compile-time type safety:

```rust
struct User;
impl TnidName for User {
    const ID_NAME: NameStr<'static> = NameStr::new_const("user");
}

struct Post;
impl TnidName for Post {
    const ID_NAME: NameStr<'static> = NameStr::new_const("post");
}

fn delete_user(id: Tnid<User>) { /* ... */ }

let user_id = Tnid::<User>::new_v0();
let post_id = Tnid::<Post>::new_v0();

delete_user(user_id);  // ✓ Works
// delete_user(post_id);  // ✗ Compile error! Can't pass Post ID to User function
```

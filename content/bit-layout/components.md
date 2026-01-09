+++
title = "Components"
weight = 1
+++

This page provides a detailed explanation of each component in the TNID bit layout.

## UUIDv8 Compatibility

TNIDs follow the UUIDv8 specification for:

- **Bit layout** - The 128 bits are organized according to UUIDv8 structure
- **Byte order** - Big-endian ordering is used throughout
- **Version bits** - Bits 48-51 contain the version (always `0x8`)
- **Variant bits** - Bits 64-65 contain the variant (always `0b10`)

This ensures full compatibility with existing UUID infrastructure, including databases, libraries, and tools that support UUIDv8.

## Name (20 bits)

The first 20 bits encode a 4-character name using TNID Name Encoding. This name appears at the beginning of the canonical string representation, making it easy to visually identify the type of TNID.

- **Size**: 20 bits (5 nibbles)
- **Encoding**: TNID Name Encoding (5 bits per character)
- **Characters**: 4 encoded characters

## UUID Version (4 bits)

The version field occupies bits 48-51 and is always set to `0x8` to indicate UUIDv8 format.

- **Size**: 4 bits
- **Value**: Always `0x8`
- **Purpose**: Identifies this as a UUIDv8-compliant identifier

## UUID Variant (2 bits)

The variant field occupies bits 64-65 and is always set to `0b10` per the UUIDv8 specification.

- **Size**: 2 bits
- **Value**: Always `0b10`
- **Purpose**: Indicates RFC 4122 variant (required for UUIDv8)

## TNID Variant (2 bits)

The TNID variant field occupies bits 66-67 and determines how the data bits are interpreted.

- **Size**: 2 bits
- **Values**: `0b00`, `0b01`, `0b10`, or `0b11`
- **Purpose**: Selects which variant scheme is used to interpret the data bits

## TNID Data Bits (100 bits)

The remaining 100 bits are available for each variant to use according to its own specification.

- **Size**: 100 bits
- **Purpose**: Variant-specific data storage
- **Usage**: Depends entirely on the TNID variant selected


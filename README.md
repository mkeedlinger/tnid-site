# TNID Specification Website

This repository contains the source code for the TNID (Typed Named IDs) specification website, built with [Zola](https://www.getzola.org/).

## About TNID

TNIDs (Typed Named IDs) are identifiers based on UUIDv8, the custom UUID format defined in RFC 9562. TNIDs maintain full compatibility with the UUID specification while adding powerful features for developers:

- **20-bit name field** for type-safe ID handling and differentiation
- **Unambiguous, case-sensitive, lexicographically sortable** string format
- **Two variants**: Variant 0 (time-sortable, like UUIDv7) and Variant 1 (maximum randomness, like UUIDv4)

TNIDs can be used anywhere that expects a standard UUID, allowing for incremental adoption.

## Live Site

The specification is published at: [https://tnid.info](https://tnid.info)

## Development

### Prerequisites

- [Zola](https://www.getzola.org/documentation/getting-started/installation/) (static site generator)

### Building Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/mkeedlinger/tnid-site.git
   cd tnid-site
   ```

2. Serve the site locally with live reload:
   ```bash
   zola serve
   ```

3. The site will be available at `http://127.0.0.1:1111`

### Building for Production

```bash
zola build
```

The built site will be in the `public/` directory.

## Project Structure

```
tnid-site/
├── config.toml       # Site configuration
├── content/          # Markdown content files
├── sass/             # Stylesheets
├── templates/        # HTML templates
├── themes/           # Zola themes (using 'book' theme)
└── static/           # Static assets
```

## Links

- [Canonical Spec Document](https://github.com/mkeedlinger/tnid/blob/main/docs/spec.md)
- [TNID Main Repository](https://github.com/mkeedlinger/tnid)

## License

See the main [TNID repository](https://github.com/mkeedlinger/tnid) for license information.

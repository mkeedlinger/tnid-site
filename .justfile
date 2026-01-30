esbuild_flags := "--bundle --format=esm --platform=browser --jsx=automatic --jsx-import-source=preact"

# Watch JS changes
dev-js:
    esbuild js-src/playground.tsx --outfile=static/js/playground.js {{esbuild_flags}} --watch

# Serve site
dev-zola:
    zola serve

# Production build
build:
    esbuild js-src/playground.tsx --outfile=static/js/playground.js {{esbuild_flags}} --minify
    zola build

# Clean build artifacts
clean:
    rm -rf static/js/playground.js public

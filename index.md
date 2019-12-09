
# Sample layout updates for NIEM Model pages

## All pages

- [x] Added a breadcrumb to the top of the page for consistent niem.github.io navigation
- [x] Added a NIEM page footer
- [x] Added a `Return to top of page` link at the bottom of scrollable pages

## Release index page

Sample pages (`4.1`):

- [Original](./releaseIndexOriginal.html)
- [Updated](./releaseIndexUpdated.html)

Changes:

- [x] Added release info to top of page
- [x] Added namespace style filter
- [x] Updated list formatting

## Namespace index page

Sample pages (`aamva_d20`):

- [Original](./namespaceIndexOriginal.html)
- [Updated](./namespaceIndexUpdated.html)

Changes:

- [x] Added basic namespace information to the top of the page - prefix, definition, URI
- [x] Formatted the list of components
- [x] Displays component counts
- [x] Added a search / filter capability
  - [x] Search allows for spaces and `*` as wildcards
  - [x] Filter based on kind of component
  - [x] Component counts are updated based on the search filter

## Simple type page

Sample pages (`aamva_d20:AccidentSeverityCodeSimpleType`):

- [Original](./simpleTypeOriginal.html)
- [Updated](./simpleTypeUpdated.html)

Changes:

- [x] Added basic type info to top of page
- [x] Added fields for additional type info
- [x] Added expanders to open/close sections
- [x] Added formatting to the enum table
- [x] Added a note making sure users know that the diagram is clickable
- [x] Added schema syntax highlighting and simplified schema syntax on page

## Other Potential Changes

- [ ] Add copy buttons for common fields
- [ ] Set cookie for default visibility on summary expanders in component pages
- [ ] Handle non-enum facets for simple types
- [ ] Add search for codes
- [ ] Add additional reference concept links for associations, augmentations, adapters, metadata, etc.
- [ ] Check for accessibility

## Other possibilities

- Generate with JavaScript for speed and wider developer support?
  - There are libraries that can generate Graphviz diagrams using JavaScript
- Generate as a single page app rather than creating static pages for every component?

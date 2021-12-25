
# NIEM Model Pages

This projects generates model HTML pages to allow users to browse NIEM content.

## Features

**Misc**

- [x] Separate out stylesheet
- [x] Regenerate on file changes
- [x] Get file top button working
- [x] Update template mechanism
- [x] Fix async templates
- [x] Fix namespace property list alignment issue (mismatched tags?)
- [x] Fix available properties
- [ ] Cache type-contains templates to reuse for namespace component lists, property and type pages
- [ ] Set up ejs-lint
- [ ] Add 5.1 diffs from 5.0

**Release**

- [x] Namespace list
- [ ] Replace namespace definitions with names
- [ ] Remove `td word-break` style
- [ ] Release contents search page
- [ ] Try speed on unified search - properties, types, and codes
- [ ] Special handling for Core supplements and domain updates
- [ ] Add tabs for QA, search, changes from 5.0, etc.

**Namespace**

- [ ] Basic info
- [ ] Property list
- [ ] Type list
- [ ] Namespace search
- [ ] Local terminology list
- [ ] Word clouds

**Property**

- [ ] Basic info
- [ ] Property contents
- [ ] XML schema
- [ ] JSON schema
- [ ] UML

**Type**

- [ ] Basic info
- [ ] Type contents
- [ ] XML schema
- [ ] JSON schema
- [ ] UML

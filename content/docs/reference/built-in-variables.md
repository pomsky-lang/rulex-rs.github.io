---
title: 'Built-in variables'
description: 'Variables provided by rulex out of the box'
lead: ''
date: 2022-06-19T13:50:00+00:00
lastmod: 2022-06-19T13:50:00+00:00
draft: false
images: []
menu:
  docs:
    parent: 'reference'
weight: 303
toc: true
---

There are currently 6 built-in variables:

- `Grapheme` matches a single extended grapheme cluster. It compiles to the regex
  {{<regexp>}}\X{{</regexp>}}.
  Note that this functionality is not available in all regex flavors.
- `G` is an alias for `Grapheme`
- `Codepoint` matches a single Unicode code point. It compiles to the regex
  {{<regexp>}}[\s\S]{{</regexp>}}.
- `C` is an alias for `Codepoint`
- `Start`: Matches the start of the string. The alias, `<%` is about to be deprecated.
  It compiles to the regex {{<regexp>}}^{{</regexp>}}.
- `End`: Matches the end of the string. The alias, `%>` is about to be deprecated.
  It compiles to the regex {{<regexp>}}${{</regexp>}}.

---
title: 'Example: Java Identifiers'
description: 'Rulex matching a Java identifier'
lead: ''
date: 2022-05-17T13:55:00+00:00
lastmod: 2022-05-17T13:55:00+00:00
draft: false
images: []
menu:
  docs:
    parent: 'examples'
weight: 403
toc: true
---

Regex matching a Java identifier:

```regexp
[\p{Connector_Punctuation}\p{Currency_Symbol}\p{Mark}\p{Alphabetic}][\p{Connector_Punctuation}\p{Currency_Symbol}\p{Mark}\p{Alphabetic}\p{Numeric}]*
```

With abbreviations:

```regexp
[\p{Pc}\p{Sc}\p{M}\p{Alpha}][\p{Pc}\p{Sc}\p{M}\p{Alpha}\p{Numeric}]*
```

And as a rulex:

```rulex
[Pc Sc M Alpha]
[Pc Sc M Alpha Numeric]*
```

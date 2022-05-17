---
title: 'Boundaries'
description: 'Matching the start/end of a word or string'
lead: ''
date: 2022-05-17T13:55:00+00:00
lastmod: 2022-05-17T13:55:00+00:00
draft: false
images: []
menu:
  docs:
    parent: 'language-tour'
weight: 205
toc: true
---

Boundaries match a position in a string without consuming any code points. There are 4 boundaries:

- {{<rulex>}}%{{</rulex>}} matches a word boundary. It matches successfully if it is preceded,
  but not succeeded by a word character, or vice versa.
  For example, {{<rulex>}}[cp] % [cp]{{</rulex>}} matches `A;` and `;A`, but not `AA` or `;;`.
- {{<rulex>}}!%{{</rulex>}} matches a position that is _not_ a word boundary.
  For example, {{<rulex>}}[cp] !% [cp]{{</rulex>}} matches `aa` and `::`, but not `a:` or `:a`.
- {{<rulex>}}<%{{</rulex>}} matches the start of the string.
- {{<rulex>}}%>{{</rulex>}} matches the end of the string.

A word character is anything that matches {{<rulex>}}[word]{{</rulex>}}. If the regex engine is
Unicode-aware, this is {{<rulex>}}[Alphabetic Mark Decimal_Number Connector_Punctuation]{{</rulex>}}.
For some regex engines, Unicode-aware matching has to be enabled first
([see here](../../get-started/enable-unicode)).

In JavaScript, {{<rulex>}}%{{</rulex>}} and {{<rulex>}}!%{{</rulex>}} is _never_ Unicode-aware, even
when the `u` flag is set. [See here](../../get-started/enable-unicode#javascript) for more
information.

---
title: 'Lookaround'
description: 'Matching forwards or backwards without consuming characters'
lead: ''
date: 2022-05-17T13:55:00+00:00
lastmod: 2022-05-17T13:55:00+00:00
draft: false
images: []
menu:
  docs:
    parent: 'language-tour'
weight: 207
toc: true
---

Lookarounds provide the ability to see if the characters before or after the current position
match a certain expression. There are four variants:

- {{<rulex>}}>>{{</rulex>}}, a positive lookahead. For example, {{<rulex>}}(>> [w]){{</rulex>}}
  matches if the position is followed by a word character. That character isn't included in the
  match.

- {{<rulex>}}<<{{</rulex>}}, a positive lookbehind. For example, {{<rulex>}}(<< [w]){{</rulex>}}
  matches if the position is directly after a word character.

- {{<rulex>}}!>>{{</rulex>}}, a negative lookahead. For example {{<rulex>}}(!>> [w]){{</rulex>}}
  matches if the position is _not_ followed by a word character. Note that this also matches at
  the end of the string, so it's not the same as {{<rulex>}}(>> ![w]){{</rulex>}}, which would
  require that the position is followed by at least one character.

- {{<rulex>}}!<<{{</rulex>}}, a negative lookbehind. For example {{<rulex>}}(!<< [w]){{</rulex>}}
  matches if the position is _not_ directly after a word character. This also matches at the start
  of the string, so it's not the same as {{<rulex>}}(<< ![w]){{</rulex>}}.

Lookaround makes it possible to match a string in multiple ways. For example,
{{<rulex>}}(!>> ('_' | 'for' | 'while' | 'if') %) [w]+ %{{</rulex>}} matches a string consisting
of word characters, but not one of the keywords `_`, `for`, `while`and`if`. Be careful when using
this technique, because the lookahead might not match the same length as the expression after it.
Here, we ensured that both match until the end of the word with {{<rulex>}}%{{</rulex>}}.

Some regex engines don't allow arbitrary expressions in a lookbehind. For example, they might
forbid repetitions or expressions with an unknown length, such as
{{<rulex>}}'hi' | 'world'{{</rulex>}}. The reason for this is that they don't support backwards
matching; instead, when they see a lookbehind such as {{<rulex>}}(<< 'foo'){{</rulex>}}, they see
that it has a length of 3 code points, so they go back 3 characters in the string and match the
expression {{<rulex>}}'foo'{{</rulex>}} forwards. This requires that the length of the match
is known. Rulex currently doesn't validate this for regex engines with such a requirement.

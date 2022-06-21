---
title: 'Shorthands'
description: 'Character class shorthands'
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

There are a few _shorthand character classes_: `word`, `digit`, `space`, `horiz_space` and
`vert_space`. They can be abbreviated with their first letter: `w`, `d`, `s`, `h` and `v`. Like
Unicode properties, they must appear in square brackets.

- `word` matches a _word character_, i.e. a letter, digit or underscore. It's equivalent to
  {{<rulex>}}[Alphabetic Mark Decimal_Number Connector_Punctuation Join_Control]{{</rulex>}}.
- `digit` matches a digit. It's equivalent to `Decimal_Number`.
- `space` matches whitespace. It's equivalent to `White_Space`.
- `horiz_space` matches horizontal whitespace (tabs and spaces). It's equivalent to
  {{<rulex>}}[U+09 Space_Separator]{{</rulex>}}.
- `vert_space` matches vertical whitespace. It's equivalent to
  {{<rulex>}}[U+0A-U+0D U+85 U+2028 U+2029]{{</rulex>}}.

Note that `word`, `digit` and `space` only match ASCII characters, if the regex engine isn't
configured to be Unicode-aware. How to enable Unicode support is
[described here](../../get-started/enable-unicode).

If you want to match _any_ code point, you can use `Codepoint`, or `C` for short. This does not
require brackets, because it is a [built-in variable](../../reference/built-in-variables).
For example, this matches a double-quoted string:

```rulex
'"' Codepoint* lazy '"'
```

## What if I don't need Unicode?

You don't have to use Unicode-aware character classes such as {{<rulex>}}[word]{{</rulex>}} if you
know that the input is only ASCII. Unicode-aware matching can be considerably slower. For example,
the {{<rulex>}}[word]{{</rulex>}} character class includes more than 100,000 code points, so
matching a {{<rulex>}}[ascii_word]{{</rulex>}}, which includes only 63 code points, is faster.

Rulex supports a number of ASCII-only shorthands:

| Character class                       | Equivalent                                               |
| ------------------------------------- | -------------------------------------------------------- |
| {{<rulex>}}[ascii]{{</rulex>}}        | {{<rulex>}}[U+00-U+7F]{{</rulex>}}                       |
| {{<rulex>}}[ascii_alpha]{{</rulex>}}  | {{<rulex>}}['a'-'z' 'A'-'Z']{{</rulex>}}                 |
| {{<rulex>}}[ascii_alnum]{{</rulex>}}  | {{<rulex>}}['0'-'9' 'a'-'z' 'A'-'Z']{{</rulex>}}         |
| {{<rulex>}}[ascii_blank]{{</rulex>}}  | {{<rulex>}}[' ' U+09],{{</rulex>}}                       |
| {{<rulex>}}[ascii_cntrl]{{</rulex>}}  | {{<rulex>}}[U+00-U+1F U+7F]{{</rulex>}}                  |
| {{<rulex>}}[ascii_digit]{{</rulex>}}  | {{<rulex>}}['0'-'9']{{</rulex>}}                         |
| {{<rulex>}}[ascii_graph]{{</rulex>}}  | {{<rulex>}}['!'-'~']{{</rulex>}}                         |
| {{<rulex>}}[ascii_lower]{{</rulex>}}  | {{<rulex>}}['a'-'z']{{</rulex>}}                         |
| {{<rulex>}}[ascii_print]{{</rulex>}}  | {{<rulex>}}[' '-'~']{{</rulex>}}                         |
| {{<rulex>}}[ascii_punct]{{</rulex>}}  | {{<rulex>}}['!'-'/' ':'-'@' '['-'`' '{'-'~']{{</rulex>}} |
| {{<rulex>}}[ascii_space]{{</rulex>}}  | {{<rulex>}}[' ' U+09-U+0D]{{</rulex>}}                   |
| {{<rulex>}}[ascii_upper]{{</rulex>}}  | {{<rulex>}}['A'-'Z']{{</rulex>}}                         |
| {{<rulex>}}[ascii_word]{{</rulex>}}   | {{<rulex>}}['0'-'9' 'a'-'z' 'A'-'Z' '_']{{</rulex>}}     |
| {{<rulex>}}[ascii_xdigit]{{</rulex>}} | {{<rulex>}}['0'-'9' 'a'-'f' 'A'-'F']{{</rulex>}}         |

Using them can improve performance, but be careful when you use them. If you aren't sure if the
input will ever contain non-ASCII characters, it's better to err on the side of correctness, and
use Unicode-aware character classes.

## Non-printable characters

Characters that can't be printed should be replaced with their hexadecimal Unicode code point. For
example, you may write {{<rulex>}}U+FEFF{{</rulex>}} to match the
[Zero Width No-Break Space](https://www.compart.com/en/unicode/U+FEFF).

There are also 6 non-printable characters with a name:

- {{<rulex>}}[n]{{</rulex>}} is equivalent to {{<rulex>}}[U+0A]{{</rulex>}}, the `\n` line feed.
- {{<rulex>}}[r]{{</rulex>}} is equivalent to {{<rulex>}}[U+0D]{{</rulex>}}, the `\r` carriage
  return.
- {{<rulex>}}[f]{{</rulex>}} is equivalent to {{<rulex>}}[U+0C]{{</rulex>}}, the `\f` form feed.
- {{<rulex>}}[a]{{</rulex>}} is equivalent to {{<rulex>}}[U+07]{{</rulex>}}, the "alert" or "bell"
  control character.
- {{<rulex>}}[e]{{</rulex>}} is equivalent to {{<rulex>}}[U+0B]{{</rulex>}}, the "escape" control
  character.

Other characters have to be written in their hexadecimal form. Note that you don't need to write
leading zeroes, i.e. {{<rulex>}}U+0{{</rulex>}} is just as ok as {{<rulex>}}U+0000{{</rulex>}}.
However, it is conventional to write ASCII characters with two digits and non-ASCII characters
with 4, 5 or 6 digits depending on their length.

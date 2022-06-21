---
title: 'Character Classes'
description: 'Matching a code point with certain properties'
lead: ''
date: 2022-05-17T13:55:00+00:00
lastmod: 2022-05-17T13:55:00+00:00
draft: false
images: []
menu:
  docs:
    parent: 'language-tour'
weight: 204
toc: true
---

What if we want to match an arbitrary word? Enumerating every single word is obviously not feasible,
so what to do instead? We can simply enumerate the characters and repeat them:

```rulex
('a' | 'b' | 'c' | 'd' | 'e' |
 'f' | 'g' | 'h' | 'i' | 'j' |
 'k' | 'l' | 'm' | 'n' | 'o' |
 'p' | 'q' | 'r' | 's' | 't' |
 'u' | 'v' | 'w' | 'x' | 'y' | 'z')+
```

But this very verbose and still only matches lowercase letters. We programmers tend to be lazy, so
there must be a more convenient solution!

## Character ranges

This expression matches words that can contain uppercase and lowercase letters:

```rulex
['a'-'z' 'A'-'Z']+
```

What is this? The square brackets indicate that this is a _character class_. A character class
always matches exactly 1 character (more precisely, a Unicode code point). This character class
contains two ranges, one for lowercase letters and one for uppercase letters. Together, this
matches any character that is either a lowercase or uppercase letter.

It's also possible to add single characters, for example:

```rulex
['$' '_' 'a'-'z' 'A'-'Z']
```

When we have several characters in a character class that aren't part of a range, we can simply
put them into the same quotes:

```rulex
['$_' 'a'-'z' 'A'-'Z']
```

This is equivalent to {{<rulex>}}('$' | '\_' | ['a'-'z' 'A'-'Z']){{</rulex>}}, but it's shorter
and may be more efficient.

### Character ranges and Unicode

{{< alert icon="👉" text="You can skip this section if you know how the Unicode character set works." />}}

What is a range, exactly? Let's see with an example:

```rulex
['0'-'z']
```

This doesn't seem to make sense, but does work. If you compile it to a regex and
[try it out](https://regexr.com/6hagq), you'll notice that it matches numbers, lowercase and
uppercase letters. However, it also matches a few other characters, e.g. the question mark `?`.

The reason is that rulex uses Unicode, a standard that assigns every character a numeric value.
When we write {{<rulex>}}'0'-'z'{{</rulex>}}, rulex assumes that we want to match any character
whose numeric value is somewhere between the value of {{<rulex>}}'0'{{</rulex>}} and the value
of {{<rulex>}}'z'{{</rulex>}}. This works well for letters (e.g. {{<rulex>}}'a'-'Z'{{</rulex>}})
and numbers ({{<rulex>}}'0'-'9'{{</rulex>}}), because these have consecutive numbers in Unicode.
However, there are some special characters between digits, uppercase letters and lowercase letters:

<div class="small-table">

| Character | Unicode value |
| --------- | ------------- |
| `'0'`     | 48            |
| `'1'`     | 49            |
| `'2'`     | 50            |
|           | ...           |
| `'9'`     | 57            |
| `':'`     | 58            |
| `';'`     | 59            |
| `'<'`     | 60            |
| `'='`     | 61            |
| `'>'`     | 62            |
| `'?'`     | 63            |
| `'@'`     | 64            |
| `'A'`     | 65            |
| `'B'`     | 66            |
|           | ...           |
| `'Z'`     | 90            |
| `'['`     | 91            |
| `'\'`     | 92            |
| `']'`     | 93            |
| `'^'`     | 94            |
| `'_'`     | 95            |
| `` '`' `` | 96            |
| `'a'`     | 97            |
|           | ...           |
| `'z'`     | 122           |

</div>

Why, you might ask? This is for [historical](https://en.wikipedia.org/wiki/ASCII#Overview)
[reasons](https://en.wikipedia.org/wiki/Unicode#History).

### Unicode properties

The reason why Unicode was invented is that most people in the world don't speak English, and many
of them use languages with different alphabets. To support them, Unicode includes 144,697 characters
covering 159 different scripts. Since we have a standard that makes it really easy to support
different languages, there's no excuse for not using it.

The character class {{<rulex>}}['a'-'z' 'A'-'Z']{{</rulex>}} only recognizes Latin characters.
What should we do instead? We should use a
[Unicode category](https://en.wikipedia.org/wiki/Unicode_character_property#General_Category).
In this case, `Letter` seems like an obvious candidate. Rulex makes it very easy to use Unicode
categories:

```rulex
[Letter]
```

That's it. This matches any letter from all 159 scripts! It's also possible to match any character
in a specific script:

```rulex
[Cyrillic Hebrew]
```

This matches a Cyrillic or Hebrew character. Not sure why you'd want to do that.

Some regex engines can also match Unicode properties other than categories and scripts. Probably
the most useful ones are

- `Alphabetic` (includes letters and marks that can appear in a word)
- `White_Space`
- `Uppercase`, `Lowercase`
- `Emoji`

You can see the full list of Unicode properties [here](../../reference/unicode-properties).

## Negation

Character classes are negated by putting a {{<rulex>}}!{{</rulex>}} in front of it. For example,
{{<rulex>}}!['a'-'f']{{</rulex>}} matches anything except a letter in the range from `a` to `f`.

It's also possible to negate Unicode properties individually. For example,
{{<rulex>}}[Latin !Alphabetic]{{</rulex>}} matches a code point that is either in the Latin script,
or is not alphabetic.

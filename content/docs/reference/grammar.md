---
title: 'Formal grammar'
description: "Rulex' syntax specification"
lead: ''
date: 2022-05-17T13:55:00+00:00
lastmod: 2022-05-17T13:55:00+00:00
draft: false
images: []
menu:
  docs:
    parent: 'reference'
weight: 301
toc: true
---

## Summary

This document uses rulex syntax. Here's an incomplete summary of the syntax, which should be enough
to read the grammar:

- Variables are declared as {{<rulex>}}let var_name = expression;{{</rulex>}}. This assigns
  `expression` to the variable `var_name`.

- Verbatim text is wrapped in double quotes ({{<rulex>}}""{{</rulex>}}) or single quotes
  ({{<rulex>}}''{{</rulex>}}).

- A {{<rulex>}}*{{</rulex>}} after a rule indicates that it repeats 0 or more times.

- A {{<rulex>}}+{{</rulex>}} after a rule indicates that it repeats 1 or more times.

- A {{<rulex>}}?{{</rulex>}} after a rule indicates that the rule is optional.

- Consecutive rules can be grouped together by wrapping them in parentheses
  ({{<rulex>}}(){{</rulex>}}).

- Alternative rules are separated with a vertical bar ({{<rulex>}}|{{</rulex>}}).

- Character classes are wrapped in square brackets ({{<rulex>}}[]{{</rulex>}}).
  A character class matches exactly one code point. It can contain

  - sequences of characters (e.g. {{<rulex>}}'abdf'{{</rulex>}}, which matches either
    `a`, `b`, `d` or `f`)
  - Unicode ranges (e.g. {{<rulex>}}'0'-'9'{{</rulex>}}, which is equivalent to
    {{<rulex>}}'0123456789'{{</rulex>}})
  - shorthands (e.g. {{<rulex>}}w{{</rulex>}}, which matches a letter, digit or
    the ASCII underscore `_`)

  An exclamation mark ({{<rulex>}}!{{</rulex>}}) in front of the character class negates it.
  For example, {{<rulex>}}![w]{{</rulex>}} matches anything _except_ a letter, digit or
  ASCII underscore.

### Whitespace

Comments start with `#` and end at the end of the same line.

Comments and whitespace are ignored; they can be added anywhere, except in strings, in tokens
(such as {{<rulex>}}>>{{</rulex>}}), in words, numbers and code points (such as
{{<rulex>}}U+306F{{</rulex>}}). For example, {{<rulex>}}>>{{</rulex>}} can't be written as
{{<rulex>}}> >{{</rulex>}}, but {{<rulex>}}!>>'test'+{{</rulex>}} can be written as
{{<rulex>}}! >> 'test' +{{</rulex>}}.

Whitespace is required between consecutive words and code points, e.g.
{{<rulex>}}[a n Latin U+50]{{</rulex>}}.

## Formal grammar

### Expression

```rulex
let Expression = Statement* OrExpression;

let Statement = LetDeclaration | Modifier;

let LetDeclaration = 'let' VariableName '=' OrExpression ';';
let Modifier = ('enable' | 'disable') BooleanSetting ';';
let BooleanSetting = 'lazy';
```

### OrExpression

```rulex
let OrExpression = Alternative ('|' Alternative)*;

let Alternative = FixExpression+;
```

### FixExpression

An expression which can have a prefix or suffix.

```rulex
let FixExpression = LookaroundPrefix Expression
                  | AtomExpression RepetitionSuffix;
```

### Lookaround

```rulex
let LookaroundPrefix = '!'? ('<<' | '>>');
```

### Repetitions

```rulex
let RepetitionSuffix = ('*' | '+' | '?' | RepetitionBraces) Quantifier?;

let RepetitionBraces = '{' Number '}'
                     | '{' Number ',' Number? '}';

let Number = '0' | '1'-'9' ('0'-'9')*;

let Quantifier = 'greedy' | 'lazy';
```

### AtomExpression

```rulex
let AtomExpression = Group
                   | String
                   | CharacterClass
                   | Grapheme
                   | Boundary
                   | Reference
                   | CodePoint
                   | NumberRange
                   | VariableName;
```

### Group

```rulex
let Group = Capture? '(' Expression ')';

let Capture = ':' Name?;

let Name = [w]+;
```

### String

```rulex
let String = '"' !['"']* '"'
           | "'" !["'"]* "'";
```

### CharacterClass

```rulex
let CharacterClass = '!'? '[' CharacterGroup ']';

let CharacterGroup = '.' | 'cp' | CharacterGroupMulti+;

let CharacterGroupMulti = Range
                        | Characters
                        | CodePoint
                        | NonPrintable
                        | Shorthand
                        | UnicodeProperty
                        | PosixClass;

let Range = Character '-' Character;

let Characters = '"' !['"']* '"'
               | "'" !["'"]* "'";

let Character = '"' !['"'] '"'
              | "'" !["'"] "'"
              | CodePoint
              | NonPrintable;

let NonPrintable = 'n' | 'r' | 't' | 'a' | 'e' | 'f';

let Shorthand = '!'? ('w' | 'word' |
                      'd' | 'digit' |
                      's' | 'space' |
                      'h' | 'horiz_space' |
                      'v' | 'vert_space' |
                      'l' | 'line_break');

let PosixClass = 'ascii_alpha' | 'ascii_alnum' | 'ascii' | 'ascii_blank'
               | 'ascii_cntrl' | 'ascii_digit' | 'ascii_graph' | 'ascii_lower'
               | 'ascii_print' | 'ascii_punct' | 'ascii_space' | 'ascii_upper'
               | 'ascii_word'  | 'ascii_xdigit';
```

### CodePoint

```rulex
let CodePoint = 'U+' ['0'-'9' 'a'-'f' 'A'-'F']{1,6}
              | 'U' ['0'-'9' 'a'-'f' 'A'-'F']{1,6};
```

Note that the second syntax exists mainly to be compatible with Rust tokenization.

### UnicodeProperty

Details about supported Unicode properties can be [found here](../unicode-properties).

```rulex
let UnicodeProperty = '!'? [w]+;
```

### Grapheme

```rulex
let Grapheme = 'Grapheme' | 'X';
```

### Boundary

```rulex
let Boundary = '%' | '!' '%' | '<%' | '%>';
```

### NumberRange

```rulex
let NumberRange = 'range' String '-' String Base?;
let Base = 'base' Number;
```

### VariableName

```rulex
let VariableName = [w]+;
```

## Note about this grammar

Even though this grammar is written using rulex syntax, it isn't actually accepted by the rulex
compiler, because it uses cyclic variables.

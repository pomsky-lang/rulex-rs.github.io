---
title: 'Introduction'
description: 'Summary of what rulex is and what it looks like'
lead: ''
date: 2022-05-17T13:55:00+00:00
lastmod: 2022-05-17T13:55:00+00:00
draft: false
images: []
menu:
  docs:
    parent: 'get-started'
weight: 101
toc: true
---

Rulex is a language that compiles to regular expressions. It is currently in an alpha stage and will likely change in the next few releases.

## Usage

Rulex can be used with a CLI or a Rust macro. See
[installation instructions](/docs/get-started/quick-start).

You should also enable Unicode support in your regex engine if it isn't supported by default.
[See instructions](./enabling-unicode-support).

## Summary

{{< alert icon="👉" text="Here you can see all the features at a glance. Don't worry, they will be explained in detail in the language tour." />}}

On the left are rulex expressions, on the right are the equivalent regexes:

```rulex
# String
'hello world'                 # hello world

# Greedy repetition
'hello'{1,5}                  # (?:hello){1,5}
'hello'*                      # (?:hello)*
'hello'+                      # (?:hello)+

# Lazy repetition
'hello'{1,5} lazy             # (?:hello){1,5}?
'hello'* lazy                 # (?:hello)*?
'hello'+ lazy                 # (?:hello)+?

# Alternation
'hello' | 'world'             # hello|world

# Character classes
['aeiou']                     # [aeiou]
['p'-'s']                     # [p-s]

# Named character classes
[.] [w] [s] [n]               # .\w\s\n

# Combined
[w 'a' 't'-'z' U+15]          # [\wat-z\x15]

# Negated character classes
!['a' 't'-'z']                # [^at-z]

# Unicode
[Greek] U+30F Grapheme        # \p{Greek}\u030F\X

# Boundaries
<% %>                         # ^$
% 'hello' !%                  # \bhello\B

# Non-capturing groups
'terri' ('fic' | 'ble')       # terri(?:fic|ble)

# Capturing groups
:('test')                     # (test)
:name('test')                 # (?P<name>test)

# Lookahead/lookbehind
>> 'foo' | 'bar'              # (?=foo|bar)
<< 'foo' | 'bar'              # (?<=foo|bar)
!>> 'foo' | 'bar'             # (?!foo|bar)
!<< 'foo' | 'bar'             # (?<!foo|bar)

# Backreferences
:('test') ::1                 # (test)\1
:name('test') ::name          # (?P<name>test)\1

# Ranges
range '0'-'999'               # 0|[1-9][0-9]{0,2}
range '0'-'255'               # 0|1[0-9]{0,2}|2(?:[0-4][0-9]?|5[0-5]?|[6-9])?|[3-9][0-9]?
```

### Variables

```rulex
let operator = '+' | '-' | '*' | '/';
let number = '-'? [digit]+;

number (operator number)*
```

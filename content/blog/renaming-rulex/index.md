---
title: 'Renaming Rulex'
description: 'Rulex will be renamed to pomsky.'
lead: ''
date: 2022-07-01T13:06:32+00:00
lastmod: 2022-07-01T13:06:32+00:00
contributors: ['Ludwig Stecher']
draft: false
images: ['renaming-rulex.jpg']
weight: 1
toc: true
---

Hello world. This is not what I expected my first blog post to be, but here we are.

I was recently contacted by a lawyer on behalf of Rulex, Inc., who claimed that I'm not allowed to
use the name "Rulex" for my project, because they own a registered trademark for the name. This is
disappointing because coming up with a good name that isn't already used is hard. Furthermore,
their trademark is registered for software using Artificial Intelligence, so I'm pretty sure that
I'm allowed to use it for a project that is unrelated to AI.

However, I don't want to risk a lawsuit, because that would entail a lot of work, time and stress.
Therefore, it is with a heavy heart that I have decided to comply with the demands of Rulex, Inc.
and rename my project.

## What is the new name?

![Pomsky](renaming-rulex.jpg)

While I was brainstorming new names, I was reminded of [pug]. For those who don't know it or weren't
aware, pug was once called jade. In 2016, they were [forced to change the name][jade-pug], because
some company has a trademark for the word "jade" referring to software. This gave me the idea to
also name my project, like pug, after a dog breed.

The breed I settled on is the **Pomsky**, a hybrid of a Siberian Husky and a Pomeranian. I think
this is a great name for several reasons. First, it's short, only 1 letter longer than rulex.
There is no company or registered trademark named "pomsky". And the best part, our project now has
a really cute mascot 😀

It's also nice that pomsky rhymes with [Noam Chomsky][chomsky], a famous linguist. Chomsky
influenced the field of linguistics like no other, and he has also worked with formal languages and
formal grammars. He came up with [Chomsky’s hierarchy][chomskys-hierarchy], which categorizes
formal languages by the strictness of their grammar:

1. Regular grammars
2. Context-free grammars
3. Context-sensitive grammars
4. Unrestricted

Regular grammars are the most strict, and can always be parsed with a regular expression. And this
makes Chomsky's work relevant for rulex -- errrr, pomsky!

## The roadmap

Renaming rulex to pomsky is quite a bit of work, and can be [tracked here][renaming-roadmap]. The
name appears in a lot of different places, and during the migration we have to be careful not to
break anyone's workflow or invalidate the old website URLs. The `rulex-rs.github.io` subdomain will
redirect to the new website. Furthermore, crates on crates.io are immutable and can't be renamed,
so we have to release new crates using the new name, and we have to add disclaimers to the existing
crates that users have to switch to the new ones.

If you have questions about the renaming process, you can ask them in
[this issue][renaming-roadmap].

Have a great day!

Cheers,\
Ludwig

[pug]: https://pugjs.org/api/getting-started.html
[jade-pug]: https://github.com/pugjs/pug/issues/2184
[chomsky]: https://en.wikipedia.org/wiki/Noam_Chomsky
[chomskys-hierarchy]: https://www.freecodecamp.org/news/exploring-the-linguistics-behind-regular-expressions-596fab41146/
[renaming-roadmap]: https://github.com/rulex-rs/rulex/issues/40

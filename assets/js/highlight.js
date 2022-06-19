import hljs from 'highlight.js/lib/core'

import rust from 'highlight.js/lib/languages/rust'
import ini from 'highlight.js/lib/languages/ini'

hljs.registerLanguage('rust', rust)
hljs.registerLanguage('toml', ini)

hljs.registerLanguage('rulex', function (hljs) {
  return {
    name: 'Rulex',
    aliases: ['rulex'],
    contains: [
      hljs.HASH_COMMENT_MODE,
      {
        className: 'string',
        variants: [
          {
            begin: /"/,
            contains: [{ begin: /\\./, className: 'keyword' }],
            end: /"/,
          },
          { begin: /'/, end: /'/ },
        ],
      },
      {
        className: 'keyword',
        beginKeywords: 'let enable disable greedy lazy range base',
      },
      {
        className: 'keyword',
        begin: /::?\s*[+-]?[A-Za-z0-9]*/,
      },
      {
        className: 'literal',
        begin: /U\+[0-9a-fA-F]+|<%|%>|%/,
      },
      {
        className: 'title',
        begin: /\b[A-Za-z_][A-Za-z0-9_]*\b|\./,
      },
      {
        className: 'keyword',
        begin: /[+*?{}!<>-]+/,
      },
      {
        className: 'punctuation',
        begin: /[[\](),=;|]+/,
      },
      {
        className: 'number',
        variants: [
          {
            begin: /\b\d+\b/,
          },
        ],
      },
    ],
  }
})

hljs.registerLanguage('regexp', function () {
  const P_SINGLE = {
    className: 'keyword',
    begin: /\\[pP]\w/,
  }
  const P_BRACED = {
    className: 'literal',
    begin: /\\[pP]\{/,
    end: /\}/,
    contains: [
      {
        className: 'title',
        begin: /[\w\-&.]+/,
      },
    ],
  }
  const LITERAL = {
    className: 'literal',
    begin: /\\x\w\w|\\u\w\w\w\w|\\[xu]\{[\w.]+\}/,
  }
  const SPECIAL_ESCAPE = {
    className: 'literal',
    begin: /\\[.?+*^|\-(){}[\]\\]/,
  }
  const CHAR_ESCAPE = {
    className: 'title',
    begin: /\\./,
  }

  return {
    name: 'Regexp',
    aliases: ['regex', 'regexp'],
    contains: [
      {
        // modes, e.g. '(?s)'
        className: 'keyword',
        begin: /\(\?\w\)/,
      },
      {
        // special group start
        className: 'punctuation',
        begin: /\((\?:|\?<\w+>|\?=|\?!|\?<=|\?<!)/,
      },
      {
        className: 'punctuation',
        begin: /[|()]/,
      },
      {
        className: 'literal',
        begin: /[\^$]/,
      },
      {
        className: 'keyword',
        begin: /[+*?]+/,
      },
      {
        className: 'keyword',
        begin: /\{/,
        end: /\}/,
        contains: [
          {
            className: 'number',
            begin: /\d+/,
          },
          {
            className: 'punctuation',
            begin: /,/,
          },
        ],
      },
      P_BRACED,
      P_SINGLE,
      LITERAL,
      SPECIAL_ESCAPE,
      CHAR_ESCAPE,
      {
        className: 'punctuation',
        begin: /\[\^?/,
        end: /\]/,
        contains: [
          P_BRACED,
          P_SINGLE,
          LITERAL,
          SPECIAL_ESCAPE,
          CHAR_ESCAPE,
          {
            // make sure the above isn't triggered after a nested '['
            className: 'string',
            begin: /\[\^*/,
          },
          {
            // everything else
            className: 'string',
            begin: /[^\]]\w*/,
          },
        ],
      },
      {
        className: 'string',
        begin: /.\w*/,
      },
    ],
  }
})

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('code[class|=language]').forEach((block) => hljs.highlightBlock(block))
})

window.hljs = hljs

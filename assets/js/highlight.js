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
        beginKeywords: 'let enable disable greedy lazy range base Grapheme X',
      },
      {
        className: 'keyword',
        begin: '::?\\s*[+-]?[A-Za-z0-9]*',
      },
      {
        className: 'literal',
        begin: 'U\\+[0-9a-fA-F]+|<%|%>|%',
      },
      {
        className: 'title',
        begin: '\\b[A-Za-z0-9_]+\\b|\\.',
      },
      {
        className: 'keyword',
        begin: '[+*?{}!<>]+',
      },
      {
        className: 'punctuation',
        begin: '[\\[\\](),\\-=;|]+',
      },
      {
        className: 'number',
        variants: [
          {
            begin: '\\b\\d+\\b',
          },
        ],
      },
    ],
  }
})

hljs.registerLanguage('regexp', function () {
  const P_SINGLE = {
    className: 'keyword',
    begin: '\\\\[pP]\\w',
  }
  const P_BRACED = {
    className: 'keyword',
    begin: '\\\\[pP]\\{',
    end: '\\}',
    contains: [
      {
        className: 'literal',
        begin: '[\\w\\-&]+',
      },
    ],
  }
  const LITERAL = {
    className: 'literal',
    begin: '\\\\x\\w\\w|\\\\u\\w\\w\\w\\w|\\\\[xu]\\{[\\w.]+\\}',
  }
  const SPECIAL_ESCAPE = {
    className: 'literal',
    begin: '\\\\[.?+*^|\\-(){}\\[\\]\\\\]',
  }
  const CHAR_ESCAPE = {
    className: 'char.escape',
    begin: '\\\\.',
  }

  return {
    name: 'Regexp',
    aliases: ['regex', 'regexp'],
    contains: [
      {
        className: 'punctuation',
        begin: '\\|',
      },
      {
        className: 'keyword',
        begin: '[+*?]+',
      },
      {
        className: 'keyword',
        begin: '\\{',
        end: '\\}',
        contains: [
          {
            className: 'number',
            begin: '\\d+',
          },
        ],
      },
      P_BRACED,
      P_SINGLE,
      LITERAL,
      SPECIAL_ESCAPE,
      CHAR_ESCAPE,
      {
        className: 'keyword',
        begin: '\\(\\?\\w\\)',
      },
      {
        className: 'punctuation',
        begin: '\\((\\?:|\\?<\\w+>|\\?=|\\?!|\\?<=|\\?<!)?|\\)',
      },
      {
        className: 'punctuation',
        begin: '\\[',
        end: '\\]',
        contains: [
          P_BRACED,
          P_SINGLE,
          LITERAL,
          SPECIAL_ESCAPE,
          CHAR_ESCAPE,
          {
            className: 'punctuation',
            begin: '(?<![\\[\\\\])-(?!\\])',
          },
          {
            className: 'string',
            begin: '[^\\]]',
          },
        ],
      },
      {
        className: 'string',
        begin: '.',
      },
    ],
  }
})

document.addEventListener('DOMContentLoaded', () => {
  document
    .querySelectorAll('code[class|=language]')
    .forEach((block) => hljs.highlightBlock(block))
})

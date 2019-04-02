'use strict';

function range (len) {
  return Array.apply(null, Array(len));
}

var built_in = (
  range(32).map(function (e, i) { return 'x' + i; }) // integer registers
    .concat(range(32).map(function (e, i) { return 'v' + i; })) // vector registers
);

module.exports = function ($) {

  var STRING = {
    className: 'string',
    begin: '\'', end: '[^\\\\]\'',
    relevance: 0
  };

  return {
    aliases: ['riscv'],
    keywords: {
      meta: '.code .data',
      built_in: built_in
    },
    contains: [
      {
        className: 'keyword',
        begin: '\\b(add|sub)', // mnemonics
        end: '\\s'
      },
      $.COMMENT('[;@]', '$', {relevance: 0}),
      $.C_BLOCK_COMMENT_MODE,
      $.QUOTE_STRING_MODE,
      STRING,
      {
        className: 'title',
        begin: '\\|', end: '\\|',
        illegal: '\\n',
        relevance: 0
      },
      {
        className: 'number',
        variants: [
          {begin: '[#$=]?0x[0-9a-f]+'}, //hex
          {begin: '[#$=]?0b[01]+'},     //bin
          {begin: '[#$=]\\d+'},        //literal
          {begin: '\\b\\d+'}           //bare number
        ],
        relevance: 0
      },
      {
        className: 'symbol',
        variants: [
          {begin: '^[a-z_\\.\\$][a-z0-9_\\.\\$]+'}, //ARM syntax
          {begin: '^\\s*[a-z_\\.\\$][a-z0-9_\\.\\$]+:'}, //GNU ARM syntax
          {begin: '[=#]\\w+' }  //label reference
        ],
        relevance: 0
      }
    ]
  };
};

import moo from 'moo'

const lexer = moo.compile({
  /**
   * Matches various white space characters, including tab, vertical tab, form
   * feed, zero-width non-breaking space, and Unicode space separators.
   */
  WhiteSpace: { match: /[\t\v\f\ufeff\p{Zs}]+/u, lineBreaks: true },

  /**
   * Matches various line break sequences, including carriage return followed by
   * line feed, carriage return, line feed, and Unicode line/paragraph separators.
   */
  Lines: { match: /\r?\n|[\r\u2028\u2029]/u, lineBreaks: true },

  /**
   * Matches (literally) identifiers followed by collon (`:`) that may include
   * Unicode characters and escape sequences.
   */
  ObjectKey:
    /\[?(?:\x23)?(?=[$_\p{ID_Start}\\])(?:[$_\u200C\u200D\p{ID_Continue}]|\\u[\da-fA-F]{4}|\\u\{[\da-fA-F]+\})+\]?(?=:)/u,

  /**
   * Matches various punctuators commonly used in programming languages
   * and regular expressions. It includes operators, delimiters, and special
   * characters.
   */
  Punctuator:
    /--|\+\+|=>|\.{3}|\??\.(?!\d)|(?:&&|\|\||\?\?|[+\-%&|^]|\*{1,2}|<{1,2}|>{1,3}|!=?|={1,2}|\/(?![/*]))=?|[?~,:;[\](){}]/u,

  /**
   * Matches boolean literals, allowing for optional single or double quotes.
   */
  BooleanLiteral: /true|false/u,

  /**
   * Matches various forms of numeric literals, including hexadecimal, octal,
   * binary, decimal, and scientific notation.
   */
  NumericLiteral:
    /(?:0[xX][\da-fA-F](?:_?[\da-fA-F])*|0[oO][0-7](?:_?[0-7])*|0[bB][01](?:_?[01])*)n?|0n|[1-9](?:_?\d)*n|(?:(?:0(?!\d)|0\d*[89]\d*|[1-9](?:_?\d)*)(?:\.(?:\d(?:_?\d)*)?)?|\.\d(?:_?\d)*)(?:[eE][+-]?\d(?:_?\d)*)?|0[0-7]+/u,

  /**
   * Matches single-quoted and double-quoted string literals, allowing for
   * escaping of quotes and newlines within the string.
   */
  StringLiteral: {
    match:
      /(?:'(?:(?!')[^\\\n\r]|\\(?:\r\n|[^]))*')|(?:"(?:(?!")[^\\\n\r]|\\(?:\r\n|[^]))*")/u,
    value: x => `"${x.slice(1, -1)}"`
  },

  /**
   * Matches identifiers that may include Unicode characters and escape
   * sequences.
   */
  Identifier:
    /(?:\x23)?(?=[$_\p{ID_Start}\\])(?:[$_\u200C\u200D\p{ID_Continue}]|\\u[\da-fA-F]{4}|\\u\{[\da-fA-F]+\})+/u
})

/**
 * A utility to handle and transform loosely structured JSON data into valid
 * JSON strings.
 *
 * @param input - The invalid JSON string to parse and transform.
 * @param context - An optional context object for handling IdentifierWithContext.
 * @returns A JSON-like string representation of the transformed data.
 */
export default function jsonLoose(
  input: string,
  context: { [key: string]: unknown } = {}
): string {
  const trimedInput = input.trim().replace(/[,]+$/, '')

  if (trimedInput === '') return '{}'
  if (!isValid(trimedInput)) throw new TypeError('Unexpected input format')

  let acc = ''

  lexer.reset(trimedInput)

  for (const token of lexer) {
    // ignore spaces
    if (token.type === 'WhiteSpace' || token.type === 'Lines') {
      continue
    }

    switch (token.type) {
      case 'Identifier':
        token.value = `"${context[token.value] || token.value}"`
        break

      case 'ObjectKey':
        // computed id
        if (token.value.slice(0, 1) === '[' && token.value.slice(-1) === ']') {
          token.value = `"${
            context[token.value.slice(1, -1)] || token.value.slice(1, -1)
          }"`
        } else token.value = `"${token.value}"`
        break
    }

    acc += token.value
  }

  return acc.replace(/,([}\]])/g, '$1')
}

function isValid(str: string) {
  return (
    (str.startsWith('{') && str.endsWith('}')) ||
    (str.startsWith('[') && str.endsWith(']'))
  )
}

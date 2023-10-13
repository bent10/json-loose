/// <reference types="vitest/globals" />

import jsonLoose from '../src/index.js'

it('should handle basic JSON data', () => {
  const input = '{ key: "value", "number": 42 }'

  const result = jsonLoose(input)
  expect(result).toEqual('{"key":"value","number":42}')
  expect(() => JSON.parse(result)).not.toThrow()
})

it('should handle Identifier transformation', () => {
  const input = '{ key: foo }'
  const context = { foo: 'transformedValue' }

  const result = jsonLoose(input, context)
  expect(result).toEqual('{"key":"transformedValue"}')
  expect(() => JSON.parse(result)).not.toThrow()
})

it('should handle ObjectKey transformation', () => {
  const input = '{ [key]: value }'
  const context = { key: 'foo' }

  const result = jsonLoose(input, context)
  expect(result).toEqual('{"foo":"value"}')
  expect(() => JSON.parse(result)).not.toThrow()
})

it('should handle empty input', () => {
  const result = jsonLoose('')
  expect(result).toEqual('{}')
  expect(() => JSON.parse(result)).not.toThrow()
})

it('should handle complex input', () => {
  const input = `[
  "foo",
  true,
  [1, 2, wife],
  {
    [n]: 'Bambang Ekalaya',
    username: "@palgunadi",
    age: 30,
    address: [{city:city}, [country]],
    skills: skills,
    isStudent: true,
    relation: {
      wife: wife,
      guru: guru,
      [bar]: "qux"
    },
  },
],
`

  const context = {
    n: 'name',
    skills: 'Archery',
    city: 'Nishada',
    country: 'Aravalli',
    wife: 'Anggraini',
    guru: 'Drona'
  }

  const result = jsonLoose(input, context)
  expect(result).toEqual(
    '["foo",true,[1,2,"Anggraini"],{"name":"Bambang Ekalaya","username":"@palgunadi","age":30,"address":[{"city":"Nishada"},["Aravalli"]],"skills":"Archery","isStudent":true,"relation":{"wife":"Anggraini","guru":"Drona","bar":"qux"}}]'
  )
  expect(() => JSON.parse(result)).not.toThrow()
})

it('should throw an error on shorthand identifiers', () => {
  const input = '{ key }'
  const context = { key: 'foo' }

  const result = jsonLoose(input, context)
  expect(result).toEqual('{"foo"}')
  expect(() => JSON.parse(result)).toThrowError(
    /Unexpected token } in JSON at position/
  )
})

it('should throw an error on rest identifiers', () => {
  const input = '{ ...rest }'
  const context = { rest: { foo: 1, bar: 2 } }

  const result = jsonLoose(input, context)
  expect(result).toEqual('{..."[object Object]"}')
  expect(() => JSON.parse(result)).toThrowError(
    /Unexpected token . in JSON at position/
  )
})

it('should throw an error on malformed input', () => {
  expect(() => jsonLoose('{ key: "value" ')).toThrowError(
    /Unexpected input format/
  )
})

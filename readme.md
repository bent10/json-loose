# json-loose

A utility to handle and transform loosely structured data into valid JSON strings. It offers an intuitive solution to ensure data consistency and compatibility, providing a safer alternative to using the `Function` constructor to obtain an object from a string.

## Install

You can install this module using npm or yarn, it's only `2.93 kB │ gzip: 1.32 kB`:

```bash
npm i json-loose
# or
yarn add json-loose
```

You can also include this module directly in your HTML file from [CDN files](https://www.jsdelivr.com/package/npm/json-loose?tab=files&path=dist):

| Type | URL                                                              |
| :--- | :--------------------------------------------------------------- |
| ESM  | `https://cdn.jsdelivr.net/npm/json-loose/+esm`                   |
| UMD  | `https://cdn.jsdelivr.net/npm/json-loose/dist/index.umd.min.cjs` |

## Usage

The `jsonLoose` function takes an invalid JSON string as input and returns a JSON-like string representation of the transformed data.

```js
import jsonLoose from 'json-loose'

const invalidJSON = `
{
  name: 'Bambang Ekalaya',
  username: "@palgunadi",
  age: 30,
  isStudent: true
}
`
const data = jsonLoose(invalidJSON)
// now you can `JSON.parse(data)`

console.log(data)
```

Yields:

```json
{
  "name": "Bambang Ekalaya",
  "username": "@palgunadi",
  "age": 30,
  "isStudent": true
}
```

You can also specify an optional context object to transform Identifier values:

```js
import jsonLoose from 'json-loose'

const invalidJSON = `
[
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

const data = jsonLoose(invalidJSON, context)
// now you can `JSON.parse(data)`

console.log(data)
```

Yields:

```json
[
  "foo",
  true,
  [1, 2, "Anggraini"],
  {
    "name": "Bambang Ekalaya",
    "username": "@palgunadi",
    "age": 30,
    "address": [{ "city": "Nishada" }, ["Aravalli"]],
    "skills": "Archery",
    "isStudent": true,
    "relation": { "wife": "Anggraini", "guru": "Drona", "bar": "qux" }
  }
]
```

## Related

- [attributes-parser](https://github.com/bent10/attributes-parser) – A utility for parsing and tokenizing attributes string into meaningful tokens and key-value pairs.
- [js-tokens](https://www.npmjs.com/package/js-tokens) – A JavaScript tokenizer that never fails.

## Benchmarks

```bash
  name                hz     min      max    mean     p75     p99    p995    p999      rme  samples
· json-loose  109,620.27  0.0077   0.7080  0.0091  0.0083  0.0168  0.0363  0.2052   ±1.19%    54811   fastest
· js-tokens    54,156.77  0.0116  24.3425  0.0185  0.0122  0.0247  0.0643  1.1352  ±15.68%    27267
```

## Contributing

We 💛&nbsp; issues.

When committing, please conform to [the semantic-release commit standards](https://www.conventionalcommits.org/). Please install `commitizen` and the adapter globally, if you have not already.

```bash
npm i -g commitizen cz-conventional-changelog
```

Now you can use `git cz` or just `cz` instead of `git commit` when committing. You can also use `git-cz`, which is an alias for `cz`.

```bash
git add . && git cz
```

## License

![GitHub](https://img.shields.io/github/license/bent10/json-loose)

A project by [Stilearning](https://stilearning.com) &copy; 2023.

# json-loose

A utility that converts loosely structured data into valid JSON strings, ensuring data consistency and compatibility. It provides a safer alternative to using the `Function` constructor to create objects from strings.

## Install

You can install this module using npm or yarn, it's only `2.93 kB │ gzip: 1.32 kB`:

```bash
npm i json-loose
# or
yarn add json-loose
```

Alternatively, you can also include this module directly in your HTML file from [CDN](https://www.jsdelivr.com/package/npm/json-loose?tab=files&path=dist):

| Type | URL                                                         |
| :--- | :---------------------------------------------------------- |
| ESM  | `https://cdn.jsdelivr.net/npm/json-loose/+esm`              |
| CJS  | `https://cdn.jsdelivr.net/npm/json-loose/dist/index.cjs`    |
| UMD  | `https://cdn.jsdelivr.net/npm/json-loose/dist/index.umd.js` |

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

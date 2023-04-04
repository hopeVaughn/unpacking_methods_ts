# Unpacking JavaScript Methods in TypeScript

This project is designed to explain JavaScript methods in great detail through TypeScript.

## Table of Contents

- [Getting Started](#getting-started)
- [Running TypeScript Files](#running-typescript-files)
- [How to Change the File that is Run](#how-to-change-the-file-that-is-run)
- [JsonStringify Method](#jsonstringify-method)
- [Acknowledgments](#acknowledgments)

## Getting Started <a name="getting-started"></a>

To use this project, you will need to have [Node.js](https://nodejs.org/en/) installed on your computer.

1. Clone the repository to your local machine using the following command:

`git clone git@github.com:hopeVaughn/unpacking_methods_ts.git`

2. Navigate to the project directory in your terminal using the `cd` command.

3. Install the project dependencies by running the following command:

`npm install`

## Running TypeScript Files <a name="running-typescript-files"></a>

You can use the `npm start` command to run TypeScript files in your terminal and display their output.

To use this command, run the following command in your terminal:

- npm start

This will run the file indicated in the index.ts file. You can change the file that is run by changing the import statement in the index.ts file.

## How to Change the File that is Run <a name="how-to-change-the-file-that-is-run"></a> <sup><sub>[top](#table-of-contents)</sub></sup>

To change the file that is run, you will need to change the import statement in the index.ts file.

The import statement should look like this:
`import { functionName } from './path/to/file';`

Then you will need to add function name to the console.log statement in the index.ts file.

The console.log statement should look like this:
`console.log(functionName);`

This should transpile and run the TypeScript code in the specified file, displaying the output in the terminal.

## JsonStringify Method <a name="jsonstringify-method"></a> <sup><sub>[top](#table-of-contents)</sub></sup>

Here is a detailed explanation of the `jsonStringify` method:

1. Define an interface JsonObject that represents a JSON object. It can contain string, number, boolean, null, other JSON objects, and arrays of JSON objects.

```typescript
interface JsonObject {
  [key: string]: string | number | boolean | null | JsonObject | JsonObject[];
}
```

2. Define the objectToJson() function that converts a JavaScript object to a JSON string.

```typescript
function objectToJson(obj: JsonObject): string;
```

3. Check if the input object is null, undefined, or not an object. If the input object is not an object, throw an error.

```typescript
if (!obj || typeof obj !== 'object') {
  throw new Error('Cannot convert non-object to JSON');
}
```

4. Get the keys of the input object and the number of keys.

```typescript
const keys = Object.keys(obj);
const len = keys.length;
```

5. Initialize the json variable to an opening brace.

```typescript
let json = '{';
```

6. Iterate over each key in the input object.

```typescript
for (let i = 0; i < len; i++) {
  const key = keys[i];
  const value = obj[key];
  const type = typeof value;
```

7. Add primitive values (null, numbers, booleans) to the JSON string.

```typescript
if (value === null || type === 'number' || type === 'boolean') {
  json += `"${key}":${value},`;
}
```

8. Add strings to the JSON string.

```typescript
else if (type === "string") {
  json += `"${key}":"${value}",`;
}
```

9. Convert arrays to JSON strings.

```typescript
else if (Array.isArray(value)) {
  const arrayJson = value
    .map(item => {
      const itemType = typeof item;
      if (item === null || itemType === "number" || itemType === "boolean") {
        return item;
      } else if (itemType === "string") {
        return `"${item}"`;
      } else if (itemType === "object") {
        return objectToJson(item);
      }
    })
    .filter(item => item !== undefined)
    .join(",");
  json += `"${key}":[${arrayJson}],`;
}
```

10. Recursively convert nested objects to JSON strings.

```typescript
else if (type === "object") {
  const nestedJson = objectToJson(value);
  if (nestedJson !== "{}") {
    json += `"${key}":${nestedJson},`;
  }
}
```

11. Remove the trailing comma and add the closing brace.

```typescript
if (json !== '{') {
  json = json.slice(0, -1);
}
json += '}';
```

12. Return the JSON string.

```typescript
return json;
```

#### This way the objectToJson() function can convert a JavaScript object to a JSON string

## Acknowledgments <sup><sub>[top](#table-of-contents)</sub></sup>

- [TypeScript](https://www.typescriptlang.org/)
- [ts-node](https://github.com/TypeStrong/ts-node)

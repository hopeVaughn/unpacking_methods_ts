/**
 * Defines an interface that represents a JSON object. It can contain string, number, boolean, null,
 * other JSON objects and arrays of JSON objects.
 */
interface JsonObject {
  [key: string]: string | number | boolean | null | JsonObject | JsonObject[] | string[] | string;
}

/**
 * Function that converts a JavaScript object to a JSON string.
 *
 * @param obj - The JavaScript object to be converted to a JSON string.
 * @returns A JSON string representing the JavaScript object.
 * @throws An error if the input parameter is not an object.
 */
function objectToJson(obj: JsonObject): string {
  // Check if the input is not null, undefined and is an object. 
  // Throw an error if the input parameter is not an object.
  if (!obj || typeof obj !== "object") {
    throw new Error("Cannot convert non-object to JSON");
  }

  // Get all the keys of the object.
  const keys = Object.keys(obj);
  // Get the length of the keys array.
  const len = keys.length;
  // Initialize an empty JSON string.
  let json = "{";

  // Iterate over all the keys of the object.
  for (let i = 0; i < len; i++) {
    // Get the current key.
    const key = keys[i];
    // Get the value of the current key.
    const value = obj[key];
    // Get the type of the current value.
    const type = typeof value;

    // Check if the value is null, a number, or a boolean.
    // Add the key and value as a JSON string to the json variable.
    if (value === null || type === "number" || type === "boolean") {
      json += `"${key}":${value},`;
    }
    // Check if the value is a string.
    // Add the key and value as a JSON string to the json variable.
    else if (type === "string") {
      json += `"${key}":"${value}",`;
    }
    // Check if the value is an array.
    // Map through the array and recursively call the function on the array's items. 
    // Filter out any undefined elements, join the result array by commas, 
    // and add the key and the result as a JSON string to the json variable.
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
          return undefined;
        })
        .filter(item => item !== undefined)
        .join(",");
      json += `"${key}":[${arrayJson}],`;
    }
    // Check if the value is an object and not null.
    // Recursively call the function on the object and add the key and result to the json variable.
    else if (value !== null && typeof value === 'object') {
      const nestedJson = objectToJson(value);
      if (nestedJson !== "{}") {
        json += `"${key}":${nestedJson},`;
      }
    }
  }

  // Remove the last comma from the json string and close it with a closing bracket.
  if (json !== "{") {
    json = json.slice(0, -1);
  }

  json += "}";
  return json;
}

// Test object 1
const obj1 = { name: "Alice", age: 25, isActive: true };
const expectedJson1 = '{"name":"Alice","age":25,"isActive":true}';
const actualJson1 = objectToJson(obj1);
console.log("Test Object 1:");
console.log(`Expected: ${expectedJson1}`);
console.log(`Actual:   ${actualJson1}`);
console.log(actualJson1 === expectedJson1 ? "PASS\n" : "FAIL\n");

// Test object 2
let obj2 = {
  name: "Bob",
  age: 30,
  address: { street: "123 Main St", city: "Anytown", state: "CA" },
  interests: ["hiking", "photography", "traveling"],
  isMarried: false
};
const expectedJson2 = '{"name":"Bob","age":30,"address":{"street":"123 Main St","city":"Anytown","state":"CA"},"interests":["hiking","photography","traveling"],"isMarried":false}';
const actualJson2 = objectToJson(obj2);
console.log("Test Object 2:");
console.log(`Expected: ${expectedJson2}`);
console.log(`Actual:   ${actualJson2}`);
console.log(actualJson2 === expectedJson2 ? "PASS\n" : "FAIL\n");

// Test object 3
const obj3 = { name: "Charlie", age: 35, job: null };
const expectedJson3 = '{"name":"Charlie","age":35,"job":null}';
const actualJson3 = objectToJson(obj3);
console.log("Test Object 3:");
console.log(`Expected: ${expectedJson3}`);
console.log(`Actual:   ${actualJson3}`);
console.log(actualJson3 === expectedJson3 ? "PASS\n" : "FAIL\n");
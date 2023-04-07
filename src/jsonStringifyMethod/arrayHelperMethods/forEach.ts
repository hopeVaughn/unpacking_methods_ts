/**
 * A custom implementation of the forEach method for arrays in TypeScript.
 * @param array The array to iterate over.
 * @param callback The callback function to call for each element in the array.
 */
function myForEach<T>(array: T[], callback: (value: T, index: number, array: T[]) => void): void {
  // Loop through each element in the array
  for (let i = 0; i < array.length; i++) {
    // Get the current element, index, and original array
    const element = array[i];
    const index = i;
    const originalArray = array;

    // Call the callback function with the current element, index, and original array
    callback(element, index, originalArray);
  }
}

// Define an array of numbers
const myArray: number[] = [1, 2, 3, 4, 5];

// Call the custom forEach method on the array with a callback function that logs each element, index, and original array to the console
myForEach(myArray, (element, index, array) => {
  console.log(element, index, array);
});

/*
myForEach(array, callback)
├─ Loop through each element in the array
│ ├─ Get the current element, index, and original array
│ └─ Call the callback function with the current element, index, and original array
│ └─ In this example: console.log(element, index, array)
└─ Process finishes after iterating through all elements in the array

Example call of myForEach:
myForEach(myArray, (element, index, array) => {
console.log(element, index, array);
})
├─ Loop through each element in the array [1, 2, 3, 4, 5]
│ ├─ i = 0 (element = 1, index = 0, array = [1, 2, 3, 4, 5])
│ │ └─ Call callback: console.log(1, 0, [1, 2, 3, 4, 5])
│ ├─ i = 1 (element = 2, index = 1, array = [1, 2, 3, 4, 5])
│ │ └─ Call callback: console.log(2, 1, [1, 2, 3, 4, 5])
│ ├─ i = 2 (element = 3, index = 2, array = [1, 2, 3, 4, 5])
│ │ └─ Call callback: console.log(3, 2, [1, 2, 3, 4, 5])
│ ├─ i = 3 (element = 4, index = 3, array = [1, 2, 3, 4, 5])
│ │ └─ Call callback: console.log(4, 3, [1, 2, 3, 4, 5])
│ └─ i = 4 (element = 5, index = 4, array = [1, 2, 3, 4, 5])
│ └─ Call callback: console.log(5, 4, [1, 2, 3, 4, 5])
└─ Process finishes after iterating through all elements in the array
*/
import * as fs from 'fs';
import { objectToJson } from './src/jsonStringifyMethod/jsonStringify';

const filePath = process.argv[2];
if (!filePath) {
  console.error('Please provide a file path as an argument');
  process.exit(1);
}

const fileContent = fs.readFileSync(filePath, 'utf8');
const parsedData = JSON.parse(fileContent);
const jsonString = objectToJson(parsedData);

console.log(jsonString);

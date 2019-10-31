import fs from 'fs';
import genDiff from '../src';

const jsonFilepath1 = `${__dirname}/__fixtures__/before.json`;
const jsonFilepath2 = `${__dirname}/__fixtures__/after.json`;
const yamlFilepath1 = `${__dirname}/__fixtures__/before.yaml`;
const yamlFilepath2 = `${__dirname}/__fixtures__/after.yaml`;

test('Check different json files', () => {
  const expPath = `${__dirname}/__fixtures__/result1`;

  const expected = fs.readFileSync(`${expPath}`, 'utf8');
  expect(genDiff(jsonFilepath1, jsonFilepath2)).toBe(expected);
});

test('Check equal json files', () => {
  const expPath = `${__dirname}/__fixtures__/result2`;

  const expected = fs.readFileSync(`${expPath}`, 'utf8');
  expect(genDiff(jsonFilepath1, jsonFilepath1)).toBe(expected);
});

test('Check different yaml files', () => {
  const expPath = `${__dirname}/__fixtures__/result1`;

  const expected = fs.readFileSync(`${expPath}`, 'utf8');
  expect(genDiff(yamlFilepath1, yamlFilepath2)).toBe(expected);
});

test('Check equal yaml files', () => {
  const expPath = `${__dirname}/__fixtures__/result2`;

  const expected = fs.readFileSync(`${expPath}`, 'utf8');
  expect(genDiff(yamlFilepath1, yamlFilepath1)).toBe(expected);
});

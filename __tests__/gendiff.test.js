import fs from 'fs';
import genDiff from '../src';

const filepath1 = `${__dirname}/__fixtures__/before.json`;
const filepath2 = `${__dirname}/__fixtures__/after.json`;

test('Check different json files', () => {
  const expPath = `${__dirname}/__fixtures__/result1`;

  const expected = fs.readFileSync(`${expPath}`, 'utf8');
  expect(genDiff(filepath1, filepath2)).toBe(expected);
});

test('Check equal json files', () => {
  const expPath = `${__dirname}/__fixtures__/result2`;

  const expected = fs.readFileSync(`${expPath}`, 'utf8');
  expect(genDiff(filepath1, filepath1)).toBe(expected);
});

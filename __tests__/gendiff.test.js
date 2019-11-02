import fs from 'fs';
import { genDiff, render } from '../src';

const jsonFilepath1 = `${__dirname}/__fixtures__/json/before.json`;
const jsonFilepath2 = `${__dirname}/__fixtures__/json/after.json`;
const yamlFilepath1 = `${__dirname}/__fixtures__/yaml/before.yaml`;
const yamlFilepath2 = `${__dirname}/__fixtures__/yaml/after.yaml`;
const iniFilepath1 = `${__dirname}/__fixtures__/ini/before.ini`;
const iniFilepath2 = `${__dirname}/__fixtures__/ini/after.ini`;
const jsonBigBeforeFilepath1 = `${__dirname}/__fixtures__/json/bigbefore.json`;
const jsonBigAfterFilepath2 = `${__dirname}/__fixtures__/json/bigafter.json`;
const yamlBigBeforeFilepath1 = `${__dirname}/__fixtures__/yaml/bigbefore.yaml`;
const yamlBigAfterFilepath2 = `${__dirname}/__fixtures__/yaml/bigafter.yaml`;
const iniBigBeforeFilepath1 = `${__dirname}/__fixtures__/ini/bigbefore.ini`;
const iniBigAfterFilepath2 = `${__dirname}/__fixtures__/ini/bigafter.ini`;

test('Check different json files', () => {
  const expPath = `${__dirname}/__fixtures__/results/result1`;

  const expected = fs.readFileSync(`${expPath}`, 'utf8');
  expect(render(genDiff(jsonFilepath1, jsonFilepath2), 2)).toBe(expected);
});

test('Check equal json files', () => {
  const expPath = `${__dirname}/__fixtures__/results/result2`;

  const expected = fs.readFileSync(`${expPath}`, 'utf8');
  expect(render(genDiff(jsonFilepath1, jsonFilepath1), 2)).toBe(expected);
});

test('Check different yaml files', () => {
  const expPath = `${__dirname}/__fixtures__/results/result1`;

  const expected = fs.readFileSync(`${expPath}`, 'utf8');
  expect(render(genDiff(yamlFilepath1, yamlFilepath2), 2)).toBe(expected);
});

test('Check equal yaml files', () => {
  const expPath = `${__dirname}/__fixtures__/results/result2`;

  const expected = fs.readFileSync(`${expPath}`, 'utf8');
  expect(render(genDiff(yamlFilepath1, yamlFilepath1), 2)).toBe(expected);
});

test('Check different ini files', () => {
  const expPath = `${__dirname}/__fixtures__/results/result1`;

  const expected = fs.readFileSync(`${expPath}`, 'utf8');
  expect(render(genDiff(iniFilepath1, iniFilepath2), 2)).toBe(expected);
});

test('Check equal ini files', () => {
  const expPath = `${__dirname}/__fixtures__/results/result2`;

  const expected = fs.readFileSync(`${expPath}`, 'utf8');
  expect(render(genDiff(iniFilepath1, iniFilepath1), 2)).toBe(expected);
});

test('Check big different json files', () => {
  const expPath = `${__dirname}/__fixtures__/results/result3`;

  const expected = fs.readFileSync(`${expPath}`, 'utf8');
  expect(render(genDiff(jsonBigBeforeFilepath1, jsonBigAfterFilepath2), 2)).toBe(expected);
});

test('Check big different yaml files', () => {
  const expPath = `${__dirname}/__fixtures__/results/result3`;

  const expected = fs.readFileSync(`${expPath}`, 'utf8');
  expect(render(genDiff(yamlBigBeforeFilepath1, yamlBigAfterFilepath2), 2)).toBe(expected);
});

test('Check big different ini files', () => {
  const expPath = `${__dirname}/__fixtures__/results/result3`;

  const expected = fs.readFileSync(`${expPath}`, 'utf8');
  expect(render(genDiff(iniBigBeforeFilepath1, iniBigAfterFilepath2), 2)).toBe(expected);
});

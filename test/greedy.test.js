import brute from '../src/brute';
import greedy from '../src/greedy';
import { simpleGenerate, ruledGenerate, handmadeAlpha, handmadeBeta, randomGenerate } from '../utils/generator';

test('check exception empty alpha', () => {
  expect(() => {
    greedy([], -1);
  }).toThrow('select number must not less than zero');
});

test('check exception empty beta', () => {
  expect(() => {
    greedy([], 1);
  }).toThrow('selectable course not enough');
});

test('check exception not empty alpha', () => {
  expect(() => {
    greedy(simpleGenerate(9, 5).courses, -1);
  }).toThrow('select number must not less than zero');
});

test('check exception not empty beta', () => {
  expect(() => {
    greedy(simpleGenerate(9, 5).courses, 6);
  }).toThrow('selectable course not enough');
});

test('check equal empty', () => {
  expect(greedy([], 0)).toEqual([]);
});

test('check equal not empty', () => {
  const data = simpleGenerate(9, 5);
  expect(greedy(data.courses, 5)).toEqual(data.result);
});

test('check plain zero', () => {
  const data = ruledGenerate(15, 0, false);
  expect(greedy(data.courses)).toEqual(data.result);
});

test('check plain alpha', () => {
  const data = ruledGenerate(15, 1, false);
  expect(greedy(data.courses, 1)).toEqual(data.result);
});

test('check plain beta', () => {
  const data = ruledGenerate(15, 8, false);
  expect(greedy(data.courses, 8)).toEqual(data.result);
});

test('check plain gamma', () => {
  const data = ruledGenerate(15, 14, false);
  expect(greedy(data.courses, 14)).toEqual(data.result);
});

test('check mix zero', () => {
  const data = ruledGenerate(15, 0, true);
  expect(greedy(data.courses, 0)).toEqual(data.result);
});

test('check mix alpha', () => {
  const data = ruledGenerate(15, 1, true);
  expect(greedy(data.courses, 1)).toEqual(data.result);
});

test('check mix beta', () => {
  const data = ruledGenerate(15, 8, true);
  expect(greedy(data.courses, 8)).toEqual(data.result);
});

test('check mix gamma', () => {
  const data = ruledGenerate(15, 14, true);
  expect(greedy(data.courses, 14)).toEqual(data.result);
});

test('check additional', () => {
  const data = handmadeAlpha(15, 14, true);
  expect(greedy(data.courses, 5)).toEqual(data.result);
});

test('check additional beta', () => {
  const data = handmadeBeta(15, 14, true);
  expect(greedy(data.courses, 5)).toEqual(data.result);
});

test('check random group A alpha', () => {
  const data = randomGenerate(15, false);
  const std = brute(data, 5);
  expect(greedy(data, 5)).toEqual(std);
});

test('check random group A beta', () => {
  const data = randomGenerate(15, false);
  const std = brute(data, 5);
  expect(greedy(data, 5)).toEqual(std);
});

test('check random group A gamma', () => {
  const data = randomGenerate(15, false);
  const std = brute(data, 5);
  expect(greedy(data, 5)).toEqual(std);
});

test('check random group B alpha', () => {
  const data = randomGenerate(15, false);
  const std = brute(data, 9);
  expect(greedy(data, 9)).toEqual(std);
});

test('check random group B beta', () => {
  const data = randomGenerate(15, false);
  const std = brute(data, 9);
  expect(greedy(data, 9)).toEqual(std);
});

test('check random group B gamma', () => {
  const data = randomGenerate(15, false);
  const std = brute(data, 9);
  expect(greedy(data, 9)).toEqual(std);
});

test('check random group B omega', () => {
  const data = randomGenerate(15, false);
  const std = brute(data, 9);
  expect(greedy(data, 9)).toEqual(std);
});

test('check random group C alpha', () => {
  const data = randomGenerate(15, false);
  const std = brute(data, 14);
  expect(greedy(data, 14)).toEqual(std);
});

test('check random group C beta', () => {
  const data = randomGenerate(15, false);
  const std = brute(data, 14);
  expect(greedy(data, 14)).toEqual(std);
});

test('check random group C gamma', () => {
  const data = randomGenerate(15, false);
  const std = brute(data, 14);
  expect(greedy(data, 14)).toEqual(std);
});

test('check random group D alpha', () => {
  const data = randomGenerate(15, true);
  const std = brute(data, 5);
  expect(greedy(data, 5)).toEqual(std);
});

test('check random group D beta', () => {
  const data = randomGenerate(15, true);
  const std = brute(data, 5);
  expect(greedy(data, 5)).toEqual(std);
});

test('check random group D gamma', () => {
  const data = randomGenerate(15, true);
  const std = brute(data, 5);
  expect(greedy(data, 5)).toEqual(std);
});

test('check random group E alpha', () => {
  const data = randomGenerate(15, true);
  const std = brute(data, 9);
  expect(greedy(data, 9)).toEqual(std);
});

test('check random group E beta', () => {
  const data = randomGenerate(15, true);
  const std = brute(data, 9);
  expect(greedy(data, 9)).toEqual(std);
});

test('check random group E gamma', () => {
  const data = randomGenerate(15, true);
  const std = brute(data, 9);
  expect(greedy(data, 9)).toEqual(std);
});

test('check random group E omega', () => {
  const data = randomGenerate(15, true);
  const std = brute(data, 9);
  expect(greedy(data, 9)).toEqual(std);
});

test('check random group F alpha', () => {
  const data = randomGenerate(15, true);
  const std = brute(data, 14);
  expect(greedy(data, 14)).toEqual(std);
});

test('check random group F beta', () => {
  const data = randomGenerate(15, true);
  const std = brute(data, 14);
  expect(greedy(data, 14)).toEqual(std);
});

test('check random group F gamma', () => {
  const data = randomGenerate(15, true);
  const std = brute(data, 14);
  expect(greedy(data, 14)).toEqual(std);
});

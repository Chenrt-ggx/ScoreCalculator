import greedy from '../src/greedy';
import { simpleGenerate, ruledGenerate, handmadeAlpha, handmadeBeta, greedyHack } from '../utils/generator';

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
  expect(greedy(data.courses, 0)).toEqual(data.result);
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
  const data = handmadeAlpha();
  expect(greedy(data.courses, 5)).toEqual(data.result);
});

test('check additional beta', () => {
  const data = handmadeBeta();
  expect(greedy(data.courses, 5)).toEqual(data.result);
});

test('check additional gamma', () => {
  const data = greedyHack();
  expect(greedy(data.courses, 3)).toEqual(data.greedy);
});

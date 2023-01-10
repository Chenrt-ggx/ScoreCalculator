import sort from '../src/sort';
import brute from '../src/brute';
import greedy from '../src/greedy';
import binary from '../src/binary';
import { randomGenerate } from '../utils/generator';

const calculateSelected = (buf) => buf.filter((i) => i.selected).length;

const calculateScore = (buf) => {
  const fixed = buf.filter((i) => i.selected);
  const creditsSum = fixed.reduce((now, next) => now + next.credits, 0);
  const scoreSum = fixed.reduce((now, next) => now + next.score * next.credits, 0);
  return scoreSum / creditsSum;
};

for (let i = 0; i < 100; ++i) {
  test('random brute greedy test ' + i, () => {
    const data = randomGenerate(15, 7, 90, 100);
    const std = brute(data, 8);
    const ans = greedy(data, 8);
    expect(calculateSelected(ans)).toEqual(calculateSelected(std));
    expect(calculateScore(ans)).toEqual(calculateScore(std));
  });
}

for (let i = 0; i < 1000; ++i) {
  test('random brute sort test alpha ' + i, () => {
    const data = randomGenerate(15, 6, 85, 100);
    const std = brute(data, 8);
    const ans = sort(data, 8);
    expect(calculateSelected(ans)).toEqual(calculateSelected(std));
    expect(calculateScore(ans)).toEqual(calculateScore(std));
  });
}

for (let i = 0; i < 1000; ++i) {
  test('random brute sort test beta ' + i, () => {
    const data = randomGenerate(15, 2, 60, 100);
    const std = brute(data, 8);
    const ans = sort(data, 8);
    expect(calculateSelected(ans)).toEqual(calculateSelected(std));
    expect(calculateScore(ans)).toEqual(calculateScore(std));
  });
}

for (let i = 0; i < 1000; ++i) {
  test('random brute binary test alpha ' + i, () => {
    const data = randomGenerate(15, 6, 85, 100);
    const std = brute(data, 8);
    const ans = binary(data, 8);
    expect(calculateSelected(ans)).toEqual(calculateSelected(std));
    expect(calculateScore(ans)).toEqual(calculateScore(std));
  });
}

for (let i = 0; i < 1000; ++i) {
  test('random brute binary test beta ' + i, () => {
    const data = randomGenerate(15, 2, 60, 100);
    const std = brute(data, 8);
    const ans = binary(data, 8);
    expect(calculateSelected(ans)).toEqual(calculateSelected(std));
    expect(calculateScore(ans)).toEqual(calculateScore(std));
  });
}

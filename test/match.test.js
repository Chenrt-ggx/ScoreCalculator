import brute from '../src/brute';
import greedy from '../src/greedy';
import binary from '../src/binary';
import { randomGenerate } from '../utils/generator';

for (let i = 0; i < 100; ++i) {
  test('random brute greedy test ' + i, () => {
    const data = randomGenerate(15, 6, 90, 100);
    const std = brute(data, 8);
    expect(greedy(data, 8)).toEqual(std);
  });
}

for (let i = 0; i < 2000; ++i) {
  test('random brute binary test alpha ' + i, () => {
    const data = randomGenerate(15, 6, 85, 100);
    const std = brute(data, 8);
    expect(binary(data, 8)).toEqual(std);
  });
}

for (let i = 0; i < 2000; ++i) {
  test('random brute binary test beta ' + i, () => {
    const data = randomGenerate(15, 2, 60, 100);
    const std = brute(data, 8);
    expect(greedy(data, 8)).toEqual(std);
  });
}

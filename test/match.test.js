import brute from '../src/brute';
import greedy from '../src/greedy';
import { randomGenerate } from '../utils/generator';

for (let i = 0; i < 1000; ++i) {
  test('random brute greedy test ' + i, () => {
    const data = randomGenerate(15, 6);
    const std = brute(data, 8);
    expect(greedy(data, 8)).toEqual(std);
  });
}

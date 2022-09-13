import sort from '../src/sort';
import { randomGenerate } from '../utils/generator';

for (let i = 0; i < 10; ++i) {
  test('sort performance test round ' + i, () => {
    const data = randomGenerate(10000, 5, 60, 100);
    const result = sort(data, 5000);
    expect(result.filter((i) => i['selected']).length).toEqual(45000);
  });
}

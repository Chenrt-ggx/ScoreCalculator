import binary from '../src/binary';
import { randomGenerate } from '../utils/generator';

for (let i = 0; i < 10; ++i) {
  test('binary performance test round ' + i, () => {
    const data = randomGenerate(10000, 5, 60, 100);
    const result = binary(data, 5000);
    expect(result.filter((i) => i.selected).length).toEqual(45000);
  });
}

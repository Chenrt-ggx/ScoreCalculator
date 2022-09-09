import brute from '../src/brute';

test('check exception', () => {
    expect(() => {
        brute([], 1);
    }).toThrow('selectable course not enough');
});

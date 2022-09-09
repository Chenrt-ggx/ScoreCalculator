import brute from '../src/brute';

function randInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateScore() {
    return randInteger(60, 100);
}

function generateCredits() {
    const base = Array(9)
        .fill(1)
        .map((item, index) => (item + index) / 2);
    return base[randInteger(0, base.length - 1)];
}

test('check exception zero', () => {
    expect(() => {
        brute([], 1);
    }).toThrow('selectable course not enough');
});

test('check exception not zero', () => {
    const courses = Array(9)
        .fill(1)
        .map((item, index) => {
            return {
                name: 'course ' + (item + index),
                score: generateScore(),
                credits: generateCredits(),
                optional: item + index >= 5
            };
        });
    expect(() => {
        brute(courses, 6);
    }).toThrow('selectable course not enough');
});

test('check equal zero', () => {
    expect(brute([], 0)).toEqual([]);
});

test('check equal not zero', () => {
    const courses = Array(9)
        .fill(1)
        .map((item, index) => {
            return {
                name: 'course ' + (item + index),
                score: generateScore(),
                credits: generateCredits(),
                optional: item + index >= 5
            };
        });
    const result = courses.map((i) => {
        i['selected'] = true;
    });
    expect(brute(courses, 5)).toEqual(result);
});

function checkNormal(courseCount, selectCount) {
    const courses = Array(courseCount)
        .fill(1)
        .map((item, index) => {
            return {
                name: 'course ' + (item + index),
                score: generateScore(),
                credits: 2,
                optional: true
            };
        });
    const checker = new Set(
        courses
            .map((item, index) => (item['index'] = index))
            .sort((lhs, rhs) => {
                if (rhs['score'] === lhs['score']) {
                    return lhs['index'] - rhs['index'];
                } else {
                    return rhs['score'] - lhs['score'];
                }
            })
            .slice(0, selectCount)
            .map((i) => i['name'])
    );
    const result = courses.map((i) => {
        i['selected'] = checker.has(i['name']);
    });
    expect(brute(courses, selectCount)).toEqual(result);
}

test('check normal zero', () => {
    checkNormal(9, 0);
});

test('check normal alpha', () => {
    checkNormal(9, 1);
});

test('check normal beta', () => {
    checkNormal(9, 5);
});

test('check normal gamma', () => {
    checkNormal(9, 8);
});

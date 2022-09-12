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

function simpleGenerate(courseCount, selectCount) {
    return Array(courseCount)
        .fill(1)
        .map((item, index) => {
            return {
                name: 'course ' + (item + index),
                score: generateScore(),
                credits: generateCredits(),
                optional: index >= courseCount - selectCount
            };
        });
}

test('check exception zero alpha', () => {
    expect(() => {
        brute([], -1);
    }).toThrow('select number must not less than zero');
});

test('check exception zero beta', () => {
    expect(() => {
        brute([], 1);
    }).toThrow('selectable course not enough');
});

test('check exception not zero alpha', () => {
    expect(() => {
        brute(simpleGenerate(9, 5), -1);
    }).toThrow('select number must not less than zero');
});

test('check exception not zero beta', () => {
    expect(() => {
        brute(simpleGenerate(9, 5), 6);
    }).toThrow('selectable course not enough');
});

test('check equal zero', () => {
    expect(brute([], 0)).toEqual([]);
});

test('check equal not zero', () => {
    const courses = simpleGenerate(9, 5);
    expect(brute(courses, 5)).toEqual(
        courses.map((item) => {
            return {
                ...item,
                selected: true
            };
        })
    );
});

function abstractCheck(courseCount, selectCount, includeMix) {
    const courses = Array(includeMix ? courseCount * 2 : courseCount)
        .fill(1)
        .map((item, index) => {
            return {
                name: 'course ' + (item + index),
                score: generateScore(),
                credits: 2,
                optional: !includeMix || (index & 1) !== 0
            };
        });
    const checker = new Set(
        courses
            .filter((i) => i['optional'])
            .map((item, index) => {
                return {
                    ...item,
                    index: index
                };
            })
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
    expect(brute(courses, selectCount)).toEqual(
        courses.map((item) => {
            return {
                ...item,
                selected: !item['optional'] || checker.has(item['name'])
            };
        })
    );
}

test('check plain zero', () => {
    abstractCheck(15, 0, false);
});

test('check plain alpha', () => {
    abstractCheck(15, 1, false);
});

test('check plain beta', () => {
    abstractCheck(15, 8, false);
});

test('check plain gamma', () => {
    abstractCheck(15, 14, false);
});

test('check mix zero', () => {
    abstractCheck(15, 0, true);
});

test('check mix alpha', () => {
    abstractCheck(15, 1, true);
});

test('check mix beta', () => {
    abstractCheck(15, 8, true);
});

test('check mix gamma', () => {
    abstractCheck(15, 14, true);
});

test('check additional', () => {
    const courses = [
        { name: 'course 1', score: 90, credits: 30, optional: false },
        { name: 'course 2', score: 96, credits: 4, optional: true },
        { name: 'course 3', score: 96, credits: 4, optional: true },
        { name: 'course 4', score: 97, credits: 4, optional: true },
        { name: 'course 5', score: 97, credits: 4, optional: true },
        { name: 'course 6', score: 98, credits: 4, optional: true },
        { name: 'course 7', score: 99, credits: 1, optional: true }
    ];
    expect(brute(courses, 5)).toEqual(
        courses.map((item) => {
            return {
                ...item,
                selected: !item['optional'] || item['score'] !== 99
            };
        })
    );
});

test('check additional beta', () => {
    const courses = [
        { name: 'course 1', score: 99, credits: 6, optional: false },
        { name: 'course 2', score: 99, credits: 6, optional: false },
        { name: 'course 3', score: 98, credits: 1.5, optional: true },
        { name: 'course 4', score: 98, credits: 2, optional: true },
        { name: 'course 5', score: 97, credits: 2, optional: true },
        { name: 'course 6', score: 100, credits: 2, optional: true },
        { name: 'course 7', score: 96, credits: 2, optional: true },
        { name: 'course 8', score: 82, credits: 1.5, optional: true }
    ];
    expect(brute(courses, 5)).toEqual(
        courses.map((item) => {
            return {
                ...item,
                selected: !item['optional'] || item['score'] !== 82
            };
        })
    );
});

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
    expect(brute(courses, 5)).toEqual(
        courses.map((item) => {
            return {
                ...item,
                selected: true
            };
        })
    );
});

function checkPlain(courseCount, selectCount) {
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
                selected: checker.has(item['name'])
            };
        })
    );
}

function checkMix(courseCount, selectCount) {
    const courses = Array(courseCount * 2)
        .fill(1)
        .map((item, index) => {
            return {
                name: 'course ' + (item + index),
                score: generateScore(),
                credits: 2,
                optional: item & (1 !== 0)
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
                selected: checker.has(item['name'])
            };
        })
    );
}

test('check plain zero', () => {
    checkPlain(15, 0);
});

test('check plain alpha', () => {
    checkPlain(15, 1);
});

test('check plain beta', () => {
    checkPlain(15, 8);
});

test('check plain gamma', () => {
    checkPlain(15, 14);
});

test('check mix zero', () => {
    checkMix(15, 0);
});

test('check mix alpha', () => {
    checkMix(15, 1);
});

test('check mix beta', () => {
    checkMix(15, 8);
});

test('check mix gamma', () => {
    checkMix(15, 14);
});

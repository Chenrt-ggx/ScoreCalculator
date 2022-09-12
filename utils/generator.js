import { randCredits, randScore } from './random';

export function simpleGenerate(courseCount, selectCount) {
  const courses = Array(courseCount)
    .fill(1)
    .map((item, index) => {
      return {
        name: 'course ' + (item + index),
        score: randScore(),
        credits: randCredits(),
        optional: index >= courseCount - selectCount
      };
    });
  const result = courses.map((item) => {
    return {
      ...item,
      selected: true
    };
  });
  return { courses, result };
}

export function ruledGenerate(courseCount, selectCount, includeMix) {
  const courses = Array(includeMix ? courseCount * 2 : courseCount)
    .fill(1)
    .map((item, index) => {
      return {
        name: 'course ' + (item + index),
        score: randScore(),
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
  const result = courses.map((item) => {
    return {
      ...item,
      selected: !item['optional'] || checker.has(item['name'])
    };
  });
  return { courses, result };
}

export function handmadeAlpha() {
  const courses = [
    { name: 'course 1', score: 90, credits: 30, optional: false },
    { name: 'course 2', score: 96, credits: 4, optional: true },
    { name: 'course 3', score: 96, credits: 4, optional: true },
    { name: 'course 4', score: 97, credits: 4, optional: true },
    { name: 'course 5', score: 97, credits: 4, optional: true },
    { name: 'course 6', score: 98, credits: 4, optional: true },
    { name: 'course 7', score: 99, credits: 1, optional: true }
  ];
  const result = courses.map((item) => {
    return {
      ...item,
      selected: !item['optional'] || item['score'] !== 99
    };
  });
  return { courses, result };
}

export function handmadeBeta() {
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
  const result = courses.map((item) => {
    return {
      ...item,
      selected: !item['optional'] || item['score'] !== 82
    };
  });
  return { courses, result };
}

export function randomGenerate(courseCount, includeMix) {
  return Array(includeMix ? courseCount * 2 : courseCount)
    .fill(1)
    .map((item, index) => {
      return {
        name: 'course ' + (item + index),
        score: randScore(),
        credits: randCredits(),
        optional: !includeMix || (index & 1) !== 0
      };
    });
}

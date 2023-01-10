import { preHandle } from './common';

const check = (select, info, value, count) => {
  const buf = info.selectable
    .map((item) => ({ name: item.name, value: item.score * item.credits - value * item.credits }))
    .sort((lhs, rhs) => rhs.value - lhs.value)
    .slice(0, count);
  if (buf.reduce((now, next) => now + next.value, info.scoreSum - value * info.credits) > 0) {
    select.clear();
    buf.forEach((item) => select.add(item.name));
    return true;
  } else {
    return false;
  }
};

export default (courses, selectNumber) => {
  const info = preHandle(courses, selectNumber);
  if (info instanceof Array) {
    return info;
  } else {
    let left = 60;
    let right = 100;
    const selected = new Set();
    while (right - left > 1e-4) {
      const mid = (left + right) / 2;
      const result = check(selected, info, mid, selectNumber);
      left = result ? mid : left;
      right = result ? right : mid;
    }
    return courses.map((item) => ({ ...item, selected: !item.optional || selected.has(item.name) }));
  }
};

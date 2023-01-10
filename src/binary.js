import { preHandle } from './common';
import { findKth } from './algorithm';

const check = (select, info, value, count) => {
  const buf = info.selectable.map((item) => ({
    name: item.name,
    value: item.score * item.credits - value * item.credits
  }));
  const selected = [];
  let result = info.scoreSum - value * info.credits;
  if (count !== 0) {
    const kth = findKth(buf, count, (lhs, rhs) => rhs.value - lhs.value);
    const update = (item) => {
      selected.push(item.name);
      result += item.value;
    };
    const greater = buf.filter((i) => i.value > kth.value);
    greater.forEach((i) => update(i));
    const equal = buf.filter((i) => i.value === kth.value);
    equal.forEach((i) => selected.length < count && update(i));
  }
  if (result > 0) {
    select.clear();
    selected.forEach((item) => select.add(item));
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

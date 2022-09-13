import preHandle from './common';
import { findKth } from './algorithm';

function check(select, info, value, count) {
  const buf = info.selectable.map((item) => {
    return { name: item['name'], value: item['score'] * item['credits'] - value * item['credits'] };
  });
  let selected = [];
  let result = info.scoreSum - value * info.credits;
  if (count !== 0) {
    const kth = findKth(buf, count, (lhs, rhs) => rhs.value - lhs.value);
    buf
      .filter((i) => i.value > kth.value)
      .forEach((i) => {
        selected.push(i['name']);
        result += i.value;
      });
    buf
      .filter((i) => i.value === kth.value)
      .forEach((i) => {
        if (selected.length < count) {
          selected.push(i['name']);
          result += i.value;
        }
      });
  }
  if (result > 0) {
    select.clear();
    selected.forEach((item) => select.add(item));
    return true;
  } else {
    return false;
  }
}

export default function (courses, selectNumber) {
  const info = preHandle(courses, selectNumber);
  if (info instanceof Array) {
    return info;
  } else {
    const selected = new Set();
    let left = 60,
      right = 100;
    while (right - left > 1e-4) {
      const mid = (left + right) / 2;
      if (check(selected, info, mid, selectNumber)) left = mid;
      else right = mid;
    }
    return courses.map((item) => {
      return {
        ...item,
        selected: !item['optional'] || selected.has(item['name'])
      };
    });
  }
}

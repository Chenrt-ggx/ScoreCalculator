import preHandle from './common';

function check(select, info, value, count) {
  const buf = info.selectable
    .map((item) => {
      return { name: item['name'], value: item['score'] * item['credits'] - value * item['credits'] };
    })
    .sort((lhs, rhs) => rhs.value - lhs.value)
    .slice(0, count);
  if (buf.reduce((now, next) => now + next.value, info.scoreSum - value * info.credits) > 0) {
    select.clear();
    buf.forEach((item) => select.add(item['name']));
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

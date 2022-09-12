import preHandle from './common';

export default function (courses, selectNumber) {
  const info = preHandle(courses, selectNumber);
  if (info instanceof Array) {
    return info;
  } else {
    const unique = new Set();
    for (let i = 0; i < selectNumber; ++i) {
      let max = -1,
        selected = null;
      info.selectable.forEach((item) => {
        const update = (info.scoreSum + item['score'] * item['credits']) / (info.credits + item['credits']);
        if (!unique.has(item['name']) && update > max) {
          max = update;
          selected = item;
        }
      });
      unique.add(selected['name']);
      info.scoreSum += selected['score'] * selected['credits'];
      info.credits += selected['credits'];
    }
    return courses.map((item) => {
      return {
        ...item,
        selected: !item['optional'] || unique.has(item['name'])
      };
    });
  }
}

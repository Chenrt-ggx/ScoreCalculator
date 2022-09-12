import preHandle from './common';

export default function (courses, selectNumber) {
  const info = preHandle(courses, selectNumber);
  if (info instanceof Array) {
    return info;
  } else {
    const selected = new Set();
    for (let i = 0; i < courses.length; ++i) {
      let max = -1,
        name = '';
      info.selectable.forEach((item) => {
        const update = (info.scoreSum + item['score'] * item['credits']) / (info.credits + item['credits']);
        if (!selected.has(item['name']) && update > max) {
          max = update;
          name = item['name'];
        }
      });
      selected.add(name);
    }
    return courses.map((item) => {
      return {
        ...item,
        selected: !item['optional'] || selected.has(item['name'])
      };
    });
  }
}

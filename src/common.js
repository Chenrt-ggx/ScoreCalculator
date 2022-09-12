export default function preHandle(courses, selectNumber) {
  const base = courses.filter((i) => !i['optional']);
  const info = {
    scoreSum: base.reduce((now, next) => now + next['score'] * next['credits'], 0),
    credits: base.reduce((now, next) => now + next['credits'], 0),
    selectable: courses.filter((i) => i['optional'])
  };
  if (selectNumber < 0) {
    throw new RangeError('select number must not less than zero');
  } else if (selectNumber > info.selectable.length) {
    throw new RangeError('selectable course not enough');
  } else if (selectNumber === info.selectable.length) {
    return courses.map((item) => {
      return {
        ...item,
        selected: true
      };
    });
  }
  return info;
}

function search(info, current, buf, level) {
  if (level === 0) {
    const creditsSum = buf.reduce((now, next) => now + next['credits'], info.credits);
    const scoreSum = buf.reduce((now, next) => now + next['score'] * next['credits'], info.scoreSum);
    if (scoreSum / creditsSum > info.final) {
      info.final = scoreSum / creditsSum;
      info.selected = buf.map((i) => i['name']);
    }
  } else {
    for (let i = current; i < info.selectable.length; ++i) {
      buf.push(info.selectable[i]);
      search(info, i + 1, buf, level - 1);
      buf.pop();
    }
  }
}

export default function (courses, selectNumber) {
  const base = courses.filter((i) => !i['optional']);
  const info = {
    scoreSum: base.reduce((now, next) => now + next['score'] * next['credits'], 0),
    credits: base.reduce((now, next) => now + next['credits'], 0),
    selectable: courses.filter((i) => i['optional']),
    selected: null,
    final: 0
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
  } else {
    search(info, 0, [], selectNumber);
    const checker = new Set(info.selected);
    return courses.map((item) => {
      return {
        ...item,
        selected: !item['optional'] || checker.has(item['name'])
      };
    });
  }
}

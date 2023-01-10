import { preHandle } from './common';

const search = (info, current, buf, level) => {
  if (level === 0) {
    const creditsSum = buf.reduce((now, next) => now + next.credits, info.credits);
    const scoreSum = buf.reduce((now, next) => now + next.score * next.credits, info.scoreSum);
    if (scoreSum / creditsSum > info.final) {
      info.final = scoreSum / creditsSum;
      info.selected = buf.map((i) => i.name);
    }
  } else {
    for (let i = current; i < info.selectable.length; ++i) {
      buf.push(info.selectable[i]);
      search(info, i + 1, buf, level - 1);
      buf.pop();
    }
  }
};

export default (courses, selectNumber) => {
  const info = preHandle(courses, selectNumber);
  if (info instanceof Array) {
    return info;
  } else {
    info.selected = null;
    info.final = 0;
    search(info, 0, [], selectNumber);
    const checker = new Set(info.selected);
    return courses.map((item) => ({ ...item, selected: !item.optional || checker.has(item.name) }));
  }
};

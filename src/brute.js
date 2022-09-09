function search(info, current, buf, level) {
    if (level === 0) {
        const creditsSum = buf.reduce((now, next) => now + next['credits'], info.credits);
        const scoreSum = buf.reduce((now, next) => now + next['score'] * next['credits'], info.score * info.credits);
        if (scoreSum / creditsSum > info.final) {
            info.final = scoreSum / creditsSum;
            info.selected = buf.slice();
        }
    } else {
        for (let i = current; i < info.selectable.length; ++i) {
            buf.push(info.selectable[i]['name']);
            search(info, current + 1, buf, level - 1);
            buf.pop();
        }
    }
}

export default function (courses, selectNumber) {
    const base = courses.filter((i) => !i['optional']);
    const info = {
        score: base.reduce((now, next) => now + next['score'], 0),
        credits: base.reduce((now, next) => now + next['credits'], 0),
        selectable: courses.filter((i) => i['optional']),
        selected: null,
        final: 0
    };
    if (selectNumber > info.selectable.length) {
        throw new RangeError('selectable course not enough');
    } else if (selectNumber === info.selectable.length) {
        return courses.map((i) => {
            i['selected'] = true;
        });
    } else {
        search(info, 0, [], selectNumber);
        const checker = new Set(info.selected);
        return courses.map((i) => {
            i['selected'] = !i['optional'] || checker.has(i['name']);
        });
    }
}

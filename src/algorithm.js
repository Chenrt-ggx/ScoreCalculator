function swap(buf, lhs, rhs) {
  let store = buf[lhs];
  buf[lhs] = buf[rhs];
  buf[rhs] = store;
}

function quickQueryIndex(buf, left, right, rank, cmp) {
  let mid = Math.floor((left + right) / 2);
  if (cmp(buf[left], buf[right]) > 0) swap(buf, left, right);
  if (cmp(buf[right], buf[mid]) < 0) swap(buf, right, mid);
  if (cmp(buf[left], buf[mid]) < 0) swap(buf, left, mid);
  let i = left,
    j = right,
    selected = buf[left];
  while (i !== j) {
    while (cmp(buf[j], selected) >= 0 && i < j) --j;
    while (cmp(buf[i], selected) <= 0 && i < j) ++i;
    if (i < j) swap(buf, i, j);
  }
  buf[left] = buf[i];
  buf[i] = selected;
  mid = j = i;
  while (i >= left && cmp(buf[i], buf[mid]) === 0) --i;
  while (j <= right && cmp(buf[j], buf[mid]) === 0) ++j;
  if (i >= rank) return quickQueryIndex(buf, left, i, rank, cmp);
  if (j <= rank) return quickQueryIndex(buf, j, right, rank, cmp);
  return i + 1;
}

export function findKth(buf, rank, cmp) {
  const copy = buf.slice();
  const index = quickQueryIndex(copy, 0, copy.length - 1, rank - 1, cmp);
  return copy[index];
}

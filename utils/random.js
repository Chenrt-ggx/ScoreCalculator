const creditsPool = Array(9)
  .fill(1)
  .map((item, index) => (item + index) / 2);

export function randInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export function randScore() {
  return randInteger(60, 100);
}

export function randCredits() {
  return creditsPool[randInteger(0, creditsPool.length - 1)];
}

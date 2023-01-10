const creditsPool = [...Array(9).keys()].map((i) => (i + 1) / 2);

export const randInteger = (min, max) => Math.floor(Math.random() * (max - min)) + min;

export const randCredits = () => creditsPool[randInteger(0, creditsPool.length - 1)];

export const fakeDelay = (callback: () => void, delay?: number) => {
  setTimeout(callback, delay || 700);
};

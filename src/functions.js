export const formatLyrics = (str) => str.replace(/[^a-zA-Z0-9 ]/g, "");
export const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

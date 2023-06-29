import { pipe, filter, replace, split, toLower, startsWith } from "lodash/fp";

export const formatLyrics = (str) => str.replace(/[^a-zA-Z0-9 ]/g, "");
export const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

export const getJsonFromResponse = async (req) => (await req).json();

export const formatLyricsForDisplay = pipe(
  replace(/\n/g, " "),
  split(" "),
  filter(Boolean)
);
export const isWordGuessed = (guess, currWord) =>
  pipe(
    toLower,
    startsWith(pipe(toLower(), replace(/[^a-zA-Z0-9 ]/g, ""))(currWord))
  )(guess);

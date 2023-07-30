import {
  pipe,
  filter,
  replace,
  split,
  toLower,
  startsWith,
  map,
} from "lodash/fp";

export const formatLyrics = (str) => str.replace(/[^a-zA-Z0-9]/g, "");
export const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

export const getJsonFromResponse = async (req) => (await req).json();

export const formatLyricsForDisplay = pipe(
  replace(/\[.+?]/g, ""),
  replace(/\n/g, " "),
  split(" "),
  filter(Boolean),
  map((word) => ({ word, isVisible: false }))
);

export const formatWord = pipe(toLower, replace(/[^a-zA-Z0-9]/g, ""));

export const isWordGuessed = (guess, currWord) =>
  pipe(toLower, startsWith(formatWord(currWord)))(formatWord(guess));

export const mapIndexed = map.convert({
  cap: false,
  curry: true,
  immutable: true,
  fixed: true,
  rearg: true,
});

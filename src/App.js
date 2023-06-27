import { useEffect, useState } from "react";
import classes from "./App.module.css";
import { getLyrics } from "./requests";
import { SiteBanner } from "./siteBanner/SiteBanner";

export const App = () => {
  const [songInfo, setSongInfo] = useState("no lyrics");
  const [wordGuesses, setWordGuesses] = useState("");

  useEffect(() => {
    getLyrics().then((res) =>
      res
        .json()
        .then((songJson) => setSongInfo(songJson))
        .catch(console.log)
    );
  }, []);

  const lyricsArray =
    songInfo.lyrics &&
    songInfo.lyrics.replace(/\n/g, " ").split(" ").filter(Boolean);

  const wordsTable =
    lyricsArray &&
    lyricsArray.map((word, isInvisible = true) => (
      <div className="border">
        <p className={isInvisible ? "invisible" : "visible"}>{word}</p>
      </div>
    ));

  return (
    <div className={classes.App}>
      <input
        onChange={({ value }) => setWordGuesses(value)}
        value={wordGuesses}
        className="border"
        type="text"
      ></input>
      {songInfo.lyrics && (
        <div className="w-9/12 h-5/6 flex-col flex flex-wrap justify-start	items-stretch content-center">
          {wordsTable}
        </div>
      )}
    </div>
  );
};

import { useEffect, useState } from "react";
import classes from "./App.module.css";
import { Loader } from "./Loader";
import { getLyrics } from "./requests";
import { SiteBanner } from "./siteBanner/SiteBanner";

export const App = () => {
  const [songInfo, setSongInfo] = useState({ lyrics: "no lyrics" });
  const [wordGuess, setWordGuess] = useState("");
  const [isFetchingLyrics, setIsFetchingLyrics] = useState(true);
  const [wordsTable, setWordsTable] = useState();

  useEffect(() => {
    getLyrics().then((res) =>
      res
        .json()
        .then((songJson) => {
          setSongInfo(songJson);
          setWordsTable(
            songJson.lyrics
              .replace(/\n/g, " ")
              .split(" ")
              .filter(Boolean)
              .map((word) => (
                <div className="border">
                  <p className="invisible">{word}</p>
                </div>
              ))
          );
          setIsFetchingLyrics(false);
        })
        .catch(console.log)
    );
  }, []);

  const updateWordDisplay = (event) => {
    setWordGuess(event.target.value);
  };

  useEffect(() => {
    !isFetchingLyrics &&
      setWordsTable((prevValue) =>
        prevValue.map((word) => {
          if (
            word.props.children.props.className !== "visible" &&
            wordGuess
              .toLocaleLowerCase()
              .startsWith(
                word.props.children.props.children
                  .toLocaleLowerCase()
                  .replace(/[^a-zA-Z0-9 ]/g, "")
              )
          ) {
            setWordGuess("");
            return (
              <div className="border">
                <p className="visible">{word.props.children.props.children}</p>
              </div>
            );
          } else {
            return word;
          }
        })
      );
  }, [wordGuess, songInfo.lyrics]);

  return (
    <div className={classes.App}>
      <input
        onChange={updateWordDisplay}
        value={wordGuess}
        className="border"
        type="text"
      ></input>
      {isFetchingLyrics && (
        <div className="fixed top-56">
          <Loader />
        </div>
      )}
      {songInfo.lyrics && (
        <div className="w-9/12 h-5/6 flex-col flex flex-wrap justify-start	items-stretch content-center">
          {wordsTable}
        </div>
      )}
    </div>
  );
};

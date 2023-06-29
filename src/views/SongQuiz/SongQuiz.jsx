import { useEffect, useState } from "react";
import classes from "./SongQuiz.module.css";
import { Loader } from "../../components/Loader";
import { getLyricsBySongNumber } from "../../requests";
import { formatLyricsForDisplay, isWordGuessed } from "../../functions";
import { WordCell } from "./WordCell";

export const SongQuiz = () => {
  const [songInfo, setSongInfo] = useState({ lyrics: "no lyrics" });
  const [wordGuess, setWordGuess] = useState("");
  const [isFetchingLyrics, setIsFetchingLyrics] = useState(true);
  const [wordsTable, setWordsTable] = useState(
    <WordCell key={1} word="no words" isVisible={false} />
  );

  useEffect(() => {
    getLyricsBySongNumber(1).then((songJson) => {
      setSongInfo(songJson);
      setWordsTable(
        formatLyricsForDisplay(songJson.lyrics).map((word, index) => (
          <WordCell key={index} word={word} isVisible={false} />
        ))
      );
      setIsFetchingLyrics(false);
    });
  }, []);

  const updateWordDisplay = (event) => setWordGuess(event.target.value);

  useEffect(() => {
    !isFetchingLyrics &&
      setWordsTable((prevValue) => {
        console.log(prevValue);
        return prevValue.map((wordCell, index) => {
          if (!wordCell.props.isVisible && isWordGuessed(wordGuess, wordCell)) {
            setWordGuess("");
            return <WordCell key={index} word={wordCell} isVisible={true} />;
          } else {
            return wordCell;
          }
        });
      });
  }, [wordGuess, songInfo.lyrics]);

  return (
    <div className={classes.App}>
      <input
        onChange={updateWordDisplay}
        value={wordGuess}
        className="border"
        type="text"
        placeholder="put a word in bitch!"
      ></input>
      {isFetchingLyrics && (
        <div className="fixed top-56">
          <Loader />
        </div>
      )}
      <div className="border-green h-4/6 flex-col flex flex-wrap justify-start items-stretch content-center">
        {wordsTable}
      </div>
    </div>
  );
};

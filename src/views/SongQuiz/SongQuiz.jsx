import { useEffect, useMemo, useState } from "react";
import classes from "./SongQuiz.module.css";
import { Loader } from "../../components/Loader";
import { getLyricsBySongNumber } from "../../requests";
import {
  formatLyricsForDisplay,
  isWordGuessed,
  mapIndexed,
} from "../../functions";
import { WordCell } from "./WordCell";
import { map } from "lodash/fp";
import { useParams } from "react-router";
import taylorHoldingCats from "../../assets/images/taylorHoldingCats.png";
export const SongQuiz = () => {
  const [songInfo, setSongInfo] = useState({ lyrics: "no lyrics" });
  const [wordGuess, setWordGuess] = useState("");
  const [isFetchingLyrics, setIsFetchingLyrics] = useState(true);
  const [lyricsProps, setLyricsProps] = useState(
    formatLyricsForDisplay(songInfo.lyrics)
  );
  const { songNum } = useParams();

  useEffect(() => {
    getLyricsBySongNumber(songNum).then((songJson) => {
      setSongInfo(songJson);
      setLyricsProps(formatLyricsForDisplay(songJson.lyrics));
      setIsFetchingLyrics(false);
    });
  }, [songNum]);

  const updateWordDisplay = (event) => setWordGuess(event.target.value);
  const wordsTable = useMemo(
    () =>
      mapIndexed(
        (lyricProps, index) => <WordCell key={index} {...lyricProps} />,
        lyricsProps
      ),
    [lyricsProps]
  );
  useEffect(() => {
    !isFetchingLyrics &&
      setLyricsProps((prevValue) =>
        map(({ word, isVisible }) => {
          if (!isVisible && isWordGuessed(wordGuess, word)) {
            setWordGuess("");
            return { word, isVisible: true };
          } else {
            return { word, isVisible };
          }
        }, prevValue)
      );
  }, [wordGuess, songInfo.lyrics, isFetchingLyrics]);

  return (
    <div className={classes.App}>
      <input
        onChange={updateWordDisplay}
        value={wordGuess}
        className="bg-gray-50 border border-gray-300 rounded disabled:opacity-75 p-4 focus:ring-violet-300"
        type="text"
        placeholder="put a word in bitch!"
      ></input>
      {isFetchingLyrics && (
        <div className="fixed top-56">
          <Loader />
        </div>
      )}
      {songInfo.lyrics && (
        <div className="h-4/6 flex-col flex flex-wrap justify-start items-stretch content-center">
          {wordsTable}
        </div>
      )}
      <div className="fixed bottom-0 right-0 h-24">
        <img className="h-24" src={taylorHoldingCats} alt="taylor-with-cats" />
      </div>
    </div>
  );
};

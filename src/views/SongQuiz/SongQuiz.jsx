import { useEffect, useMemo, useState } from "react";
import classes from "./SongQuiz.module.css";
import { Loader } from "../../components/Loader";
import { getLyricsBySongNumber } from "../../requests";
import {
  formatLyricsForDisplay,
  getRandomInt,
  isWordGuessed,
  mapIndexed,
} from "../../functions";
import { WordCell } from "./WordCell";
import { filter, map, prop, set } from "lodash/fp";
import { useLocation, useNavigate } from "react-router";
import taylorHoldingCats from "../../assets/images/taylorHoldingCats.png";
import catFeet from "../../assets/images/catFeet.png";
import { PurpleButton } from "../../components/PurpleButton";
import { ErrorInFetchingSong } from "../../components/ErrorInFetchingSong";

export const SongQuiz = () => {
  const [songInfo, setSongInfo] = useState();
  const [wordGuess, setWordGuess] = useState("");
  const [isFetchingLyrics, setIsFetchingLyrics] = useState(true);
  const [lyricsProps, setLyricsProps] = useState();
  const [gaveUp, setGaveUp] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const lyricsGuessed = filter(prop("isVisible"), lyricsProps)?.length;

  useEffect(() => {
    state &&
      getLyricsBySongNumber(state.songNum).then((songJson) => {
        setSongInfo(songJson);
        setLyricsProps(formatLyricsForDisplay(songJson.lyrics));
        setIsFetchingLyrics(false);
      });
  }, [state]);

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
  }, [wordGuess, songInfo, isFetchingLyrics]);

  const regenerateSong = () =>
    navigate(`/songquiz`, {
      state: {
        songNum: getRandomInt(state.numOfSongs),
        numOfSongs: state.numOfSongs,
      },
    });

  return (
    <div className={classes.App}>
      <img className="fixed top-0 left-0 w-16" src={catFeet} alt="catFeet" />
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
      {lyricsProps?.length ? (
        !gaveUp || lyricsGuessed !== lyricsProps?.length || gaveUp ? (
          <>
            <div className="font-playfair">
              you guessed {lyricsGuessed} lyrics out of {lyricsProps?.length}
            </div>
            <div className="h-4/6 flex-col flex flex-wrap gap-x-3 justify-start items-stretch content-center">
              {wordsTable}
            </div>
            <button
              onClick={() => {
                setGaveUp(true);
                setLyricsProps(map(set("isVisible", true)));
              }}
            >
              give up? :(
            </button>
          </>
        ) : (
          <div>
            YOU WON
            <img
              src="https://gifdb.com/images/high/taylor-swift-happy-dance-0sukpoogfw30zukw.gif"
              alt="taylor dance"
            />
          </div>
        )
      ) : (
        <ErrorInFetchingSong />
      )}
      <div className="fixed bottom-0 right-0 flex items-center">
        <PurpleButton onClick={regenerateSong}>regenerate song</PurpleButton>
        <img className="h-24 " src={taylorHoldingCats} alt="taylor-with-cats" />
      </div>
    </div>
  );
};

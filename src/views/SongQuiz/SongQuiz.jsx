import { useEffect, useMemo, useState } from "react";
import classes from "./SongQuiz.module.css";
import {
  formatLyricsForDisplay,
  getRandomInt,
  isWordGuessed,
  mapIndexed,
} from "../../functions";
import { WordCell } from "./WordCell";
import { equals, filter, map, overSome, pipe, prop, find } from "lodash/fp";
import { useLocation, useNavigate } from "react-router";
import taylorHoldingCats from "../../assets/images/taylorHoldingCats.png";
import loverHouse from "../../assets/images/loverHouse.jpg";
import { PurpleButton } from "../../components/PurpleButton";
import { ErrorInFetchingSong } from "../../components/ErrorInFetchingSong";
import { Timer } from "../../components/Timer";
import { Link } from "react-router-dom";
import allLyrics from "../../lyrics.json";

export const SongQuiz = () => {
  const { state } = useLocation();
  const [wordGuess, setWordGuess] = useState("");
  const [lyricsProps, setLyricsProps] = useState(
    formatLyricsForDisplay(
      find(pipe(prop("song_id"), equals(state.songNum)), allLyrics)?.lyrics
    )
  );
  const [gaveUp, setGaveUp] = useState(false);
  const [restartTimer, setRestartTimer] = useState(false);
  const navigate = useNavigate();
  const lyricsGuessed = filter(
    overSome(prop("isVisible"), !prop("losingWord")),
    lyricsProps
  )?.length;

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
    setLyricsProps((prevValue) =>
      map(({ word, isVisible, losingWord }) => {
        if (!isVisible && isWordGuessed(wordGuess, word)) {
          setWordGuess("");
          return { word, isVisible: true, losingWord };
        } else {
          return { word, isVisible, losingWord };
        }
      }, prevValue)
    );
  }, [wordGuess]);

  const regenerateSong = () => {
    setRestartTimer((prevValue) => !prevValue);
    navigate(`/songquiz`, {
      state: {
        songNum: getRandomInt(state.numOfSongs),
        numOfSongs: state.numOfSongs,
      },
    });
  };
  const lose = () => {
    setGaveUp(true);
    setLyricsProps(
      map((wordProps) =>
        !wordProps.isVisible
          ? { ...wordProps, losingWord: true }
          : { ...wordProps }
      )
    );
  };

  return (
    <div className={classes.App}>
      <Link to="/">
        <img
          className="fixed top-1 left-1 w-16"
          src={loverHouse}
          alt="lover house"
        />
      </Link>
      <input
        onChange={updateWordDisplay}
        value={wordGuess}
        className="bg-gray-50 border border-gray-300 rounded disabled:opacity-75 p-4 focus:ring-violet-300"
        type="text"
        placeholder="put a word in bitch!"
      ></input>
      {lyricsProps?.length ? (
        lyricsGuessed !== lyricsProps?.length || gaveUp ? (
          <>
            <div className="self-start w-2/4">
              <Timer
                stopTimer={gaveUp || lyricsGuessed === lyricsProps?.length}
                restartTimer={restartTimer}
              />
            </div>
            <div className="font-playfair">
              you guessed {lyricsGuessed} lyrics out of {lyricsProps?.length}
            </div>
            <div className="h-4/6 flex-col flex flex-wrap gap-x-3 justify-start items-stretch content-center">
              {wordsTable}
            </div>
            <button onClick={lose}>give up? :(</button>
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

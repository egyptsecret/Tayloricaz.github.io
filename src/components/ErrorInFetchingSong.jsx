import { useNavigate } from "react-router";
import { getRandomInt } from "../functions";
import { getAllSongs } from "../requests";

export const ErrorInFetchingSong = () => {
  const navigate = useNavigate();
  const regenerateSong = () =>
    getAllSongs().then((res) =>
      navigate("/songquiz", {
        state: { songNum: getRandomInt(res.length), numOfSongs: res.length },
      })
    );

  return (
    <div className="text-red-800 red-tv-font">
      <div className="text-red-800 red-tv-font text-4xl italic">
        Looks like the song got lost in translation
      </div>
      <button
        className="bg-red-800 text-orange-100 mt-4 px-2 rounded"
        onClick={regenerateSong}
      >
        regenerate song
      </button>
    </div>
  );
};

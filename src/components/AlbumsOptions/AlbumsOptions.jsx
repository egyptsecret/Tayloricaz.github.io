import speakNow from "../../assets/images/speakNow.webp";
import evermore from "../../assets/images/evermore.png";
import red from "../../assets/images/red.webp";
import midnights from "../../assets/images/midnights.png";
import reputation from "../../assets/images/reputation.png";
import lover from "../../assets/images/lover.png";
import eightyNine from "../../assets/images/1989.png";
import fearless from "../../assets/images/fearless.png";
import debut from "../../assets/images/debut.png";
import folklore from "../../assets/images/folklore.png";
import { map, prop } from "lodash/fp";
import { useNavigate } from "react-router-dom";
import { getAllSongsInAlbum } from "../../requests";
import { getRandomInt } from "../../functions";

export const AlbumsOptions = ({ numOfSongs }) => {
  const navigate = useNavigate();

  const albumsArray = [
    { img: debut, albumNum: 2 },
    { img: fearless, albumNum: 3 },
    { img: speakNow, albumNum: 4 },
    { img: red, albumNum: 5 },
    { img: eightyNine, albumNum: 1 },
    { img: reputation, albumNum: 6 },
    { img: lover, albumNum: 7 },
    { img: folklore, albumNum: 8 },
    { img: evermore, albumNum: 9 },
    { img: midnights, albumNum: 10 },
  ];

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-2xl">choose a random song from an album</div>
      <div className="flex max-w-full items-center gap-5 ">
        {map(
          ({ img, albumNum }) => (
            <img
              className={"max-w-[10rem] w-1/12 cursor-pointer hover:scale-105"}
              src={img}
              key={albumNum}
              alt="speakNow"
              onClick={() =>
                getAllSongsInAlbum(albumNum).then((res) => {
                  const songArray = map(prop("song_id"), res);
                  navigate(`songquiz`, {
                    state: {
                      songNum: songArray[getRandomInt(songArray.length)],
                      numOfSongs,
                    },
                  });
                })
              }
            />
          ),
          albumsArray
        )}
      </div>
    </div>
  );
};

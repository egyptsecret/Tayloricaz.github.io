import { equals, find, first, flatMap, map, pipe, prop } from "lodash/fp";
import { useNavigate } from "react-router-dom";
import { getAllSongsInAlbum } from "../../requests";
import { getRandomInt } from "../../functions";
import { useEffect, useState } from "react";
import { albumsArray } from "./constants";

export const AlbumsOptions = ({ numOfSongs }) => {
  const [albumOption, setAlbumOption] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all(
      map(
        ({ albumNum, img }) =>
          getAllSongsInAlbum(albumNum).then((res) =>
            setAlbumOption((preVal) => [...preVal, [res]])
          ),
        albumsArray
      )
    );
  }, []);

  const AlbumSongOption = ({ song_id, title, album_id }) => (
    <div
      onClick={() =>
        navigate(`songquiz`, {
          state: {
            songNum: song_id,
          },
        })
      }
      className="cursor-pointer"
    >
      {title}
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-2xl">choose a song or an album</div>
      <div className="flex max-w-full items-baseline gap-5 ">
        {map(
          ({ img, albumNum }) => (
            <div className="flex flex-col max-w-[10rem] items-center">
              <img
                className={"cursor-pointer hover:scale-105"}
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
              <div className="grid divide-y ">
                {flatMap(
                  map(AlbumSongOption),
                  find(
                    pipe(first, first, prop("album_id"), equals(albumNum)),
                    albumOption
                  )
                )}
              </div>
            </div>
          ),
          albumsArray
        )}
      </div>
    </div>
  );
};

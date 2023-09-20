import { equals, find, flatMap, map, pipe, prop } from "lodash/fp";
import { useNavigate } from "react-router-dom";
import { getRandomInt } from "../../functions";
import { albumsArray } from "./constants";
import songsInAlbums from "../../songsInAlbums.json";

export const AlbumsOptions = ({ numOfSongs }) => {
  const navigate = useNavigate();

  const AlbumSongOption = ({ song_id, title, album_id }) => (
    <div
      key={song_id}
      onClick={() =>
        navigate(`songquiz`, {
          state: {
            songNum: song_id,
            albumNum: album_id,
            numOfSongs,
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
                onClick={() =>{
                  const songsInAlbum = find(pipe(prop("album_id"), equals(albumNum)), songsInAlbums).songs
                  
                    navigate(`songquiz`, {
                      state: {
                        songNum: songsInAlbum[getRandomInt(songsInAlbum.length)].song_id,
                        numOfSongs,
                        albumNum,
                      },
                  })}
                }
              />
              <div className="grid divide-y ">
                {flatMap(
                  map(AlbumSongOption),
                  find(pipe(prop("album_id"), equals(albumNum)), songsInAlbums)
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

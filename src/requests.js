import { getJsonFromResponse } from "./functions";

export const getLyricsBySongNumber = async (songNum) =>
  getJsonFromResponse(
    fetch(`https://taylor-swift-api.sarbo.workers.dev/lyrics/${songNum}`)
  );

export const getAllSongs = async () =>
  getJsonFromResponse(
    fetch("https://taylor-swift-api.sarbo.workers.dev/songs")
  );

export const getAllSongsInAlbum = async (albumNumber) =>
  getJsonFromResponse(
    fetch(`https://taylor-swift-api.sarbo.workers.dev/albums/ ${albumNumber}`)
  );

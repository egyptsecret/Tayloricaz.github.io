export const getLyrics = async () =>
  await fetch("https://taylor-swift-api.sarbo.workers.dev/lyrics/1");

export const getAllSongs = async () =>
  await fetch("https://taylor-swift-api.sarbo.workers.dev/songs");

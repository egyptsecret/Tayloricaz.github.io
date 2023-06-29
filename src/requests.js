export const getLyricsBySongNumber = async (songNum) =>
  await fetch(`https://taylor-swift-api.sarbo.workers.dev/lyrics/${songNum}`);

export const getAllSongs = async () =>
  await fetch("https://taylor-swift-api.sarbo.workers.dev/songs");

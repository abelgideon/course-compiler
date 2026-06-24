export function extractPlaylistId(url: string): string {
  try {
    const parsedUrl = new URL(url);

    const playlistId = parsedUrl.searchParams.get("list");

    if (!playlistId) {
      throw new Error("Invalid playlist URL");
    }

    return playlistId;
  } catch {
    throw new Error("Invalid playlist URL");
  }
}

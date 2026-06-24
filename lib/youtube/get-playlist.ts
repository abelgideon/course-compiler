type YouTubePlaylist = {
  id: string;
  title: string;
  description: string;
  thumbnail: string | null;
  channelTitle: string;
  videoCount: number;
};

export async function getPlaylist(
  playlistId: string,
): Promise<YouTubePlaylist> {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&id=${playlistId}&key=${process.env.YOUTUBE_API_KEY}`,
    {
      next: {
        revalidate: 60 * 60,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch playlist");
  }

  const data = await response.json();

  const playlist = data.items?.[0];

  if (!playlist) {
    throw new Error("Playlist not found");
  }

  return {
    id: playlist.id,
    title: playlist.snippet.title,
    description: playlist.snippet.description,
    thumbnail:
      playlist.snippet.thumbnails.maxres?.url ??
      playlist.snippet.thumbnails.high?.url ??
      playlist.snippet.thumbnails.medium?.url ??
      null,
    channelTitle: playlist.snippet.channelTitle,
    videoCount: playlist.contentDetails.itemCount,
  };
}

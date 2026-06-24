type PlaylistVideo = {
  youtubeVideoId: string;
  title: string;
  description: string;
  thumbnail: string | null;
  position: number;
  publishedAt: Date;
  channelTitle: string;
};

export async function getPlaylistVideos(
  playlistId: string,
): Promise<PlaylistVideo[]> {
  const videos: PlaylistVideo[] = [];

  let nextPageToken: string | undefined;

  do {
    const params = new URLSearchParams({
      part: "snippet,contentDetails",
      playlistId,
      maxResults: "50",
      key: process.env.YOUTUBE_API_KEY!,
    });

    if (nextPageToken) {
      params.set("pageToken", nextPageToken);
    }

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?${params.toString()}`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch playlist videos");
    }

    const data = await response.json();

    videos.push(
      ...data.items.map((item: any) => ({
        youtubeVideoId: item.contentDetails.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail:
          item.snippet.thumbnails.high?.url ??
          item.snippet.thumbnails.medium?.url ??
          null,
        position: item.snippet.position,
      })),
    );

    nextPageToken = data.nextPageToken;
  } while (nextPageToken);

  return videos;
}

export interface VideoData {
  videoId: string;
  videoDBId: number;
  videoPublishedAt: string;
  videoThumbnail: string;
  videoUri: string;
  videoTitle: string;
  videoDescription: string;
  videoChannelData: {
    videoChannelTitle: string;
    videoChannelDescription: string;
    videoChannelThumbnail: string;
  };
}

export interface videoDetailData {
  videoId: string;
  videoCreatedAt: string;
  videoTitle: string;
  videoDescription: string;
  videoViewCount: number;
  videoCommentCount: number;
  videoLibraryCount: number;

  videoChannelData: {
    videoChannelTitle: string;
    videoChannelDescription: string;
    videoChannelThumbnail: string;
  };
}

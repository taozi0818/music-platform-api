export interface Song {
  id: number;
  name: string;
  duration: number; // unit: millisecond
  artists: Array<Artist>;
  album: Album;
  status: number;
  mvid: number;
}

export interface Artist {
  id: number,
  name: string;
  picUrl: string;
  alias: string[];
  albumSize: number;
  picId: number;
  img1v1Url: string;
  img1v1: number;
  alia: string;
}

export interface Album {
  id: string;
  name: string;
  artist: Artist;
  publishTime: number;
  size: number;
  copyrightId: number;
  status: number;
  picId: number;
  mark: number;
}

export interface LyricsResponse extends BaseResponse {
  songStatus: number;
  lyricVersion: number;
  lyric: string;
}

export interface SearchResponse extends BaseResponse {
  result: {
    albums: Album[];
    artists: Artist[];
    songs: Song[];
  };
}

export interface BaseResponse {
  code: number;
}

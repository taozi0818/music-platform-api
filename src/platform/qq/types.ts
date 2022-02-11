export interface Song {
  docid: string;
  id: string;
  mid: string;
  name: string;
  singer: string;
}

export interface Singer {
  docid: string;
  id: string;
  mid: string;
  name: string;
  pic: string;
  singer: string;
}

export interface Mv {
  docid: string;
  id: string;
  mid: string;
  name: string;
  singer: string;
  vid: string;
}

export interface SongList {
  count: number;
  itemlist: Array<Song>;
}

interface SearchResult<T> {
  count: number;
  itemlist: T[]
}

export interface SearchResponse extends BaseResponse {
  data: {
    album: string;
    mv: SearchResult<Mv>;
    singer: SearchResult<Singer>;
    song: SearchResult<Song>;
  };
}

interface BaseResponse {
  code: number;
}

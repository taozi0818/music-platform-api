import axios, { AxiosInstance } from 'axios';
import qs from 'qs';
import { encryptData } from '../../utils/crypto';
import { LyricsResponse, SearchResponse } from './types';

export * from './types';

export default class NeteaseApi {
  private readonly API_BASE_URL = `https://music.163.com`;
  private readonly API_ROUTER = {
    SearchSong: '/weapi/search/suggest/web',
    SearchLyrics: '/api/song/media'
  };
  private axios: AxiosInstance = axios.create({
    baseURL: this.API_BASE_URL,
  });

  public async search(keywords) {
    const encBody = encryptData(JSON.stringify({
      s: keywords,
      limit: "8",
      csrf_token: ""
    }));

    const { data } = await this.axios.request<SearchResponse>({
      url: this.API_ROUTER.SearchSong,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params: {
        csrf_token: ''
      },
      data: qs.stringify({
        params: encBody.encText,
        encSecKey: encBody.encSecKey,
      }),
    });

    return data?.result;
  }

  public async getLyrics(id: number) {
    const { data } = await this.axios.request<LyricsResponse>({
      url: this.API_ROUTER.SearchLyrics,
      method: 'GET',
      params: { id },
    });

    return data?.lyric;
  }
}

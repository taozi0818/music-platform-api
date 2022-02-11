import axios, { AxiosInstance } from 'axios';
import { SearchResponse } from './types';

export default class QQApi {
  private readonly API_BASE_URL = 'https://c.y.qq.com';
  private readonly API_ROUTER = {
    SearchSong: '/splcloud/fcgi-bin/smartbox_new.fcg',
    SearchLyrics: '/lyric/fcgi-bin/fcg_query_lyric_new.fcg',
  };
  private axios: AxiosInstance = axios.create({
    baseURL: this.API_BASE_URL,
  });

  public async search(keywords) {
    const { data } = await this.axios.request<SearchResponse>({
      url: this.API_ROUTER.SearchSong,
      method: 'GET',
      headers: {
        referer: 'https://y.qq.com/',
      },
      params: {
        format: 'json',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq.json',
        needNewCode: 1,
        uin: 0,
        hostUin: 0,
        is_xml: 0,
        key: keywords,
      },
    });

    return data;
  }

  public async getLyrics(id: number) {
    const { data } = await this.axios.request<{
      retcode: number;
      code: number;
      subcode: number;
      lyric: string;
    }>({
      url: this.API_ROUTER.SearchLyrics,
      method: 'GET',
      headers: {
        referer: 'https://y.qq.com/',
      },
      params: {
        format: 'json',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq.json',
        needNewCode: 0,
        uin: 0,
        loginUin: 0,
        songmid: id,
      },
    });

    const { lyric } = data;

    if (!lyric) {
      return {
        lyrics: '',
      };
    }

    return {
      lyrics: Buffer.from(lyric, 'base64').toString(),
    }
  }
}

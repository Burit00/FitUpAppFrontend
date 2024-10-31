import { getUserCookie } from '@/utils/get-server-cookies';
import { env } from '@/environment/env';

type TRequestInit = {} & Omit<RequestInit, 'body' & 'method'>;

export class HttpClient {
  public static readonly baseUrl = env.API_URL;

  public static async getHttp(url: string, params?: object, options?: TRequestInit): Promise<Response> {
    if (params) {
      const urlParams = new URLSearchParams();

      for (const [key, value] of Object.entries(params)) {
        urlParams.append(key, value.toString());
      }

      if (!url.includes('?')) url += '?';
      url += urlParams.toString();
    }

    return await this.fetchHttp(url, {
      ...options,
      method: 'GET',
    });
  }

  public static async postHttp<TBody>(url: string, body: TBody, options?: TRequestInit): Promise<Response> {
    return await this.fetchHttp(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  public static async putHttp<TBody>(url: string, body: TBody, options?: TRequestInit): Promise<Response> {
    return await this.fetchHttp(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  public static async deleteHttp(url: string, options?: TRequestInit): Promise<Response> {
    return await this.fetchHttp(url, {
      ...options,
      method: 'DELETE',
    });
  }

  public static async fetchHttp(url: string, options?: RequestInit): Promise<Response> {
    const headers = await this.getHeaders(options.headers);
    const endpointUrl = new URL(url, this.baseUrl);

    const res = await fetch(endpointUrl, {
      ...options,
      headers,
    });

    // if (!res.ok) console.error(res.json());

    return res;
  }

  private static async getHeaders(headers?: HeadersInit): Promise<HeadersInit> {
    const token = (await getUserCookie())?.accessToken;

    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...headers,
    };
  }
}

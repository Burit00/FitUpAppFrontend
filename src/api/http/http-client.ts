type TRequestInit = {
  params?: object;
} & Omit<RequestInit, 'body' & 'method'>;

type TRequestInterceptor = (request: RequestInit) => RequestInit;
type TResponseInterceptor = (request: Response) => Response;
type TInterceptors = {
  request: TRequestInterceptor[];
  response: TResponseInterceptor[];
};

type HttpClientConfig = {
  baseUrl: string;
  headers?: HeadersInit;
};

export class HttpClient {
  public config: HttpClientConfig = {
    baseUrl: '',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  private _interceptors: TInterceptors = {
    request: [],
    response: [],
  };

  public constructor(userConfig: HttpClientConfig) {
    this.config = {
      ...this.config,
      ...userConfig,
      headers: {
        ...this.config.headers,
        ...userConfig.headers,
      },
    };
  }

  public addRequestInterceptor(interceptor: TRequestInterceptor): TRequestInterceptor {
    this._interceptors.request.push(interceptor);

    return interceptor;
  }

  public addResponseInterceptor(interceptor: TResponseInterceptor): TResponseInterceptor {
    this._interceptors.response.push(interceptor);

    return interceptor;
  }

  public removeRequestInterceptor(interceptor: TRequestInterceptor): void {
    this._interceptors.request = this._interceptors.request.filter((i) => i !== interceptor);
  }

  public removeResponseInterceptor(interceptor: TResponseInterceptor): void {
    this._interceptors.response = this._interceptors.response.filter((i) => i !== interceptor);
  }

  public async get(url: string, options?: TRequestInit): Promise<Response> {
    return this.fetch(url, {
      ...options,
      method: 'GET',
    });
  }

  public async post<TBody>(url: string, body: TBody, options?: TRequestInit): Promise<Response> {
    return this.fetch(url, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  public async put<TBody>(url: string, body: TBody, options?: TRequestInit): Promise<Response> {
    return this.fetch(url, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  public async delete(url: string, options?: TRequestInit): Promise<Response> {
    return this.fetch(url, {
      ...options,
      method: 'DELETE',
    });
  }

  public async fetch(url: string, options?: TRequestInit): Promise<Response> {
    const { params } = options;

    if (params) {
      const queryString = this.convertObjectToQueryString(params);
      url += url.includes('?') ? `&${queryString}` : `?${queryString}`;
    }
    const endpointUrl = new URL(this.config.baseUrl + url);

    options.headers = {
      ...this.config.headers,
      ...options.headers,
    };

    const optionsFromInterceptors = this.requestMiddleware(options);

    const response = await fetch(endpointUrl, optionsFromInterceptors);

    return this.responseMiddleware(response);
  }

  private requestMiddleware(request: RequestInit): RequestInit {
    if (this._interceptors.request.length === 0) return request;

    return this._interceptors.request.reduce((acc, interceptor): RequestInit => interceptor(acc), request);
  }

  private responseMiddleware(response: Response): Response {
    if (this._interceptors.response.length === 0) return response;

    return this._interceptors.response.reduce((acc, interceptor): Response => interceptor(acc), response);
  }

  private convertObjectToQueryString(params: object): string {
    const urlParams = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
      urlParams.append(key, value.toString());
    }

    return urlParams.toString();
  }
}

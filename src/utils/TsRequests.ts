export interface RequestOptions {
  baseURL?: string;
  loading?: boolean;

  url: string;
  data?: string | Record<string, any>;
  method?: "GET" | "POST";
  header?: Record<string, string>;
  timeout?: number;
}

export interface TsSuccessResponse<T> {
  config: RequestOptions;
  isSuccess: true;
  data: T;
  statusCode: number;
  header: any;
  cookies: string[];
}

export type TsFailResponse = {
  config: RequestOptions;
  isSuccess: false;
  errMsg: string;
};

class TsRequests {
  private Options: Partial<RequestOptions> = {
    baseURL: "",
    timeout: 5500,
    loading: true,
  };

  interceptors = {
    request: (options: RequestOptions) => options,
    response: <T>(
      response: TsSuccessResponse<APIResponse<T>> | TsFailResponse
    ) => response,
  };

  constructor(params: Partial<RequestOptions>) {
    this.Options = Object.assign(this.Options, params);
  }

  request<T>(
    options: RequestOptions
  ): Promise<TsSuccessResponse<APIResponse<T>>> {
    options = {
      ...this.Options,
      ...options,
    };
    options = this.interceptors.request(options);
    options.url = this.Options.baseURL + options.url;
    return new Promise((resolve, reject) => {
      uni.request({
        ...options,
        success: (res) => {
          resolve(
            this.interceptors.response(
              Object.assign(res, {
                config: options,
                isSuccess: true as true,
              }) as TsSuccessResponse<APIResponse<T>>
            ) as TsSuccessResponse<APIResponse<T>>
          );
        },
        fail: (err) => {
          reject(
            this.interceptors.response(
              Object.assign(err, {
                config: options,
                isSuccess: false as false,
              })
            ) as TsFailResponse
          );
        },
      });
    });
  }

  get<T>(options: RequestOptions) {
    return this.request<T>(Object.assign(options, { method: "GET" }));
  }

  post<T>(options: RequestOptions) {
    return this.request<T>(Object.assign(options, { method: "POST" }));
  }
}

export default TsRequests;

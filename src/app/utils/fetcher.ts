import { HttpMethod } from "@/app/types/http";

interface FetcherParams {
  url: string;
  method: HttpMethod;
  body?: any;
  headers?: Record<string, string>;
}

interface FetcherResponse {
  data: any;
  resOk: boolean;
  status: number;
}

export const fetcher = async ({
  url,
  method,
  body,
  headers = {},
}: FetcherParams): Promise<FetcherResponse> => {
  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };

  const options: RequestInit = {
    method,
    headers: defaultHeaders,
    ...(method !== HttpMethod.GET && method !== HttpMethod.DELETE
      ? { body: JSON.stringify(body) }
      : {}),
  };

  const response = await fetch(url, options);

  const contentType = response.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");

  let data: any = null;

  if (isJson) {
    try {
      data = await response.json();
    } catch (e) {
      data = null;
    }
  }

  return {
    data,
    resOk: response.ok,
    status: response.status,
  };
};

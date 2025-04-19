import { HttpMethod } from "@/app/types/http";

interface FetcherParams<TBody = unknown> {
  url: string;
  method: HttpMethod;
  body?: TBody;
  headers?: Record<string, string>;
}

interface FetcherResponse<TData> {
  data: TData | null;
  resOk: boolean;
  status: number;
  statusText: string;
}

export const fetcher = async <TData = unknown, TBody = unknown>(
  params: FetcherParams<TBody>,
): Promise<FetcherResponse<TData>> => {
  const { url, method, body, headers = {} } = params;
  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };

  const options: globalThis.RequestInit = {
    method,
    headers: defaultHeaders,
    ...(method !== HttpMethod.GET && method !== HttpMethod.DELETE
      ? { body: JSON.stringify(body) }
      : {}),
  };

  const response = await fetch(url, options);

  const contentType = response.headers.get("content-type");
  const isJson = contentType && contentType.includes("application/json");

  let data: TData | null = null;

  if (isJson) {
    try {
      data = await response.json();
    } catch (e) {
      console.log("Parsing error :", e);
      data = null;
    }
  }

  return {
    data,
    resOk: response.ok,
    status: response.status,
    statusText: response.statusText,
  };
};

import {
  GET,
  POST,
  DELETE,
  PUT,
  PATCH,
} from "../../../app/api/collections/[[...slug]]/route";
import { NextRequest } from "next/server";
import { proxyFetch, proxyResponse } from "@/helper/http";
import { HttpMethod } from "@/app/types/http";

const mockNextRequest = {
  json: jest.fn().mockResolvedValue({}),
};

jest.mock("next/server", () => {
  const MockNextResponse = function (
    body: string | object,
    init?: ResponseInit,
  ) {
    return {
      body,
      status: init?.status ?? 200,
      headers: new Headers(init?.headers),
    };
  };

  MockNextResponse.json = jest.fn((body, init) => ({
    body,
    status: init?.status ?? 200,
    headers: new Headers({
      "Content-Type": "application/json",
      ...init?.headers,
    }),
  }));

  return {
    NextRequest: jest.fn(() => mockNextRequest),
    NextResponse: MockNextResponse,
  };
});

const mockHeadersMap = new Map();
jest.mock("next/headers", () => ({
  headers: jest.fn(() => mockHeadersMap),
}));

global.Headers = Headers;
global.fetch = jest.fn();

describe("proxyResponse", () => {
  const mockBody = new ArrayBuffer(8);

  it("should return response with correct headers and status", async () => {
    const mockResponse = {
      status: 200,
      statusText: "OK",
      headers: new Headers({ "Content-Type": "application/json" }),
      arrayBuffer: jest.fn().mockResolvedValue(mockBody),
    } as unknown as Response;

    const result = await proxyResponse(mockResponse);

    expect(result.status).toBe(200);
    expect(result.headers.get("Content-Type")).toBe("application/json");
    expect(result.headers.get("X-Status-Text")).toBe("OK");
    expect(result.body).toBe(mockBody);
  });

  it("should default to 'text/plain' when no Content-Type header is present", async () => {
    const mockResponse = {
      status: 200,
      statusText: "OK",
      headers: new Headers(),
      arrayBuffer: jest.fn().mockResolvedValue(mockBody),
    } as unknown as Response;

    const result = await proxyResponse(mockResponse);

    expect(result.headers.get("Content-Type")).toBe("text/plain");
  });
});

describe("proxyFetch", () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
    mockHeadersMap.clear();
  });

  it("should call fetch with joined slug as path", async () => {
    const params = Promise.resolve({ slug: ["api", "users", "1"] });
    (global.fetch as jest.Mock).mockResolvedValue({} as Response);

    await proxyFetch(HttpMethod.GET, params);

    expect(global.fetch).toHaveBeenCalledWith(
      "api/users/1",
      expect.objectContaining({ method: "GET" }),
    );
  });

  it("should include custom headers from 'X-Custom-Headers'", async () => {
    const params = Promise.resolve({ slug: ["api"] });

    mockHeadersMap.set(
      "X-Custom-Headers",
      JSON.stringify([{ name: "Authorization", value: "Bearer abc" }]),
    );

    (global.fetch as jest.Mock).mockResolvedValue({} as Response);

    await proxyFetch(HttpMethod.GET, params);

    const fetchOptions = (global.fetch as jest.Mock).mock.calls[0][1];
    expect(fetchOptions?.Authorization).toBe("Bearer abc");
  });
});

describe("HTTP Methods", () => {
  const mockParams = Promise.resolve({ slug: ["api"] });

  const mockRequest = {
    json: jest.fn().mockResolvedValue({ key: "value" }),
  } as unknown as NextRequest;

  beforeEach(() => {
    (global.fetch as jest.Mock).mockResolvedValue({
      status: 200,
      statusText: "OK",
      headers: new Headers({ "Content-Type": "application/json" }),
      arrayBuffer: jest.fn().mockResolvedValue(new ArrayBuffer(8)),
    } as Response);
  });

  it("GET should proxy with GET method", async () => {
    await GET({} as NextRequest, { params: mockParams });

    expect(global.fetch).toHaveBeenCalledWith(
      "api",
      expect.objectContaining({ method: "GET" }),
    );
  });

  it("POST should send JSON body with correct headers", async () => {
    await POST(mockRequest, { params: mockParams });

    expect(global.fetch).toHaveBeenCalledWith(
      "api",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ key: "value" }),
        headers: { "Content-Type": "application/json; charset=UTF-8" },
      }),
    );
  });

  it("PUT should send JSON body with PUT method and headers", async () => {
    await PUT(mockRequest, { params: mockParams });

    expect(global.fetch).toHaveBeenCalledWith(
      "api",
      expect.objectContaining({
        method: "PUT",
        body: JSON.stringify({ key: "value" }),
        headers: { "Content-Type": "application/json; charset=UTF-8" },
      }),
    );
  });

  it("PATCH should send JSON body with PATCH method and headers", async () => {
    await PATCH(mockRequest, { params: mockParams });

    expect(global.fetch).toHaveBeenCalledWith(
      "api",
      expect.objectContaining({
        method: "PATCH",
        body: JSON.stringify({ key: "value" }),
        headers: { "Content-Type": "application/json; charset=UTF-8" },
      }),
    );
  });

  it("DELETE should call fetch with DELETE method", async () => {
    await DELETE({} as NextRequest, { params: mockParams });

    expect(global.fetch).toHaveBeenCalledWith(
      "api",
      expect.objectContaining({ method: "DELETE" }),
    );
  });
});

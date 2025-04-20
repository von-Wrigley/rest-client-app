import {
  GET,
  POST,
  DELETE,
  PUT,
  PATCH,
  proxyResponse,
  proxyFetch,
} from "../../../app/api/collections/[[...slug]]/route";
import { NextRequest } from "next/server";
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

/*
describe("proxyResponse", () => {
  it("should return a NextResponse with correct headers and body", async () => {
    const mockResponse = {
      status: 200,
      statusText: "OK",
      headers: new Headers({ "Content-Type": "application/json" }),
      arrayBuffer: jest.fn().mockResolvedValue(new ArrayBuffer(8)),
    } as unknown as Response;

    const result = await proxyResponse(mockResponse);
    expect(result.status).toBe(200);
    expect(result.headers.get("Content-Type")).toBe("application/json");
    expect(result.headers.get("X-Status-Text")).toBe("OK");
  });

  it("should use text/plain as default content type", async () => {
    const mockResponse = {
      status: 200,
      statusText: "OK",
      headers: new Headers(),
      arrayBuffer: jest.fn().mockResolvedValue(new ArrayBuffer(8)),
    } as unknown as Response;

    const result = await proxyResponse(mockResponse);
    expect(result.headers.get("Content-Type")).toBe("text/plain");
  });
});
*/

/*
describe("proxyFetch", () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
    mockHeadersMap.clear();
  });

  it("should join slug array into path", async () => {
    const params = Promise.resolve({ slug: ["api", "users", "123"] });
    (global.fetch as jest.Mock).mockResolvedValue({} as Response);

    await proxyFetch(HttpMethod.GET, params);
    expect(global.fetch).toHaveBeenCalledWith(
      "api/users/123",
      expect.anything(),
    );
  });

  it("should include extra headers from X-Custom-Headers", async () => {
    const params = Promise.resolve({ slug: ["api"] });
    mockHeadersMap.set(
      "X-Custom-Headers",
      JSON.stringify([{ name: "Authorization", value: "Bearer token" }]),
    );
    (global.fetch as jest.Mock).mockResolvedValue({} as Response);

    await proxyFetch(HttpMethod.GET, params);
    expect(global.fetch).toHaveBeenCalledWith(
      "api",
      expect.objectContaining({
        method: "GET",
        Authorization: "Bearer token",
      }),
    );
  });
});
*/


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

  it("GET should call proxyFetch with GET method", async () => {
    await GET({} as NextRequest, { params: mockParams });
    expect(global.fetch).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        method: "GET",
      }),
    );
  });

  it("POST should include JSON body and content type", async () => {
    await POST(mockRequest, { params: mockParams });
    expect(global.fetch).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ key: "value" }),
        headers: { "Content-Type": "application/json; charset=UTF-8" },
      }),
    );
  });

  it("DELETE should call proxyFetch with DELETE method", async () => {
    await DELETE({} as NextRequest, { params: mockParams });
    expect(global.fetch).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        method: "DELETE",
      }),
    );
  });

  it("PUT should include JSON body and content type", async () => {
    await PUT(mockRequest, { params: mockParams });
    expect(global.fetch).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        method: "PUT",
        body: JSON.stringify({ key: "value" }),
        headers: { "Content-Type": "application/json; charset=UTF-8" },
      }),
    );
  });

  it("PATCH should include JSON body and content type", async () => {
    await PATCH(mockRequest, { params: mockParams });
    expect(global.fetch).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        method: "PATCH",
        body: JSON.stringify({ key: "value" }),
        headers: { "Content-Type": "application/json; charset=UTF-8" },
      }),
    );
  });
});

import { NextRequest, NextResponse } from "next/server";
import { HttpMethod } from "@/app/types/http";
import { headers } from "next/headers";

const proxyResponse = async (res: Response) => {
  const contentType = res.headers.get("Content-Type") ?? "text/plain";
  const body = await res.arrayBuffer();

  return new NextResponse(body, {
    status: res.status,
    headers: {
      "Content-Type": contentType,
      "X-Status-Text": res.statusText,
    },
  });
};

const proxyFetch = async (
  method: HttpMethod,
  params: Promise<{ slug: string[] }>,
  options?: globalThis.RequestInit,
) => {
  const { slug } = await params;
  const newSlug = slug.join("/");
  const headersList = await headers();
  const rawHeader = headersList.get("X-Custom-Headers");
  const parsed: { name: string; value: string }[] = rawHeader
    ? JSON.parse(rawHeader)
    : [];
  const extraHeaders = Object.fromEntries(
    parsed.map(({ name, value }) => [name, value]),
  );

  const res = await fetch(newSlug, {
    method,
    ...extraHeaders,
    ...options,
  });

  return res;
};

export const GET = async (
  _: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> },
) => {
  const res = await proxyFetch(HttpMethod.GET, params);
  return proxyResponse(res);
};

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> },
) => {
  const body = await req.json();

  const res = await proxyFetch(HttpMethod.POST, params, {
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });

  return proxyResponse(res);
};

export const DELETE = async (
  _: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> },
) => {
  const res = await proxyFetch(HttpMethod.DELETE, params);
  return proxyResponse(res);
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> },
) => {
  const body = await req.json();

  const res = await proxyFetch(HttpMethod.PUT, params, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });

  return proxyResponse(res);
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> },
) => {
  const body = await req.json();

  const res = await proxyFetch(HttpMethod.PATCH, params, {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  });

  return proxyResponse(res);
};

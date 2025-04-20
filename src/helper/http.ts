import { HttpMethod } from "@/app/types/http";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const proxyResponse = async (backendResponse: Response) => {
  const contentType =
    backendResponse.headers.get("Content-Type") ?? "text/plain";
  const body = await backendResponse.arrayBuffer();

  return new NextResponse(body, {
    status: backendResponse.status,
    headers: {
      "Content-Type": contentType,
      "X-Status-Text": backendResponse.statusText,
    },
  });
};

export const proxyFetch = async (
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

  const backendResponse = await fetch(newSlug, {
    method,
    ...extraHeaders,
    ...options,
  });

  return backendResponse;
};

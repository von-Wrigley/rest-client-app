import { NextRequest } from "next/server";
import { HttpMethod } from "@/app/types/http";
import { proxyFetch, proxyResponse } from "@/helper/http";

const JSON_CONTENT_TYPE = "application/json; charset=UTF-8";

export const GET = async (
  _: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> },
) => {
  const backendResponse = await proxyFetch(HttpMethod.GET, params);
  return proxyResponse(backendResponse);
};

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> },
) => {
  const body = await req.json();

  const backendResponse = await proxyFetch(HttpMethod.POST, params, {
    body,
    headers: {
      "Content-Type": JSON_CONTENT_TYPE,
    },
  });

  return proxyResponse(backendResponse);
};

export const DELETE = async (
  _: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> },
) => {
  const backendResponse = await proxyFetch(HttpMethod.DELETE, params);
  return proxyResponse(backendResponse);
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> },
) => {
  const body = await req.json();

  const backendResponse = await proxyFetch(HttpMethod.PUT, params, {
    method: "PUT",
    body,
    headers: {
      "Content-Type": JSON_CONTENT_TYPE,
    },
  });

  return proxyResponse(backendResponse);
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> },
) => {
  const body = await req.json();

  const backendResponse = await proxyFetch(HttpMethod.PATCH, params, {
    method: "PATCH",
    body,
    headers: {
      "Content-Type": JSON_CONTENT_TYPE,
    },
  });

  return proxyResponse(backendResponse);
};

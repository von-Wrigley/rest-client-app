import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

//  2. Добавь хедеры

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
//   const reqf = request.nextUrl.pathname.slice(14);

  // const slug = await params.slug
  // const newSlug = slug.replace(/,/g, "/");
  // console.log('s  '+ slug)
  //  const headersList = await headers()
  //  const reqHeaders = headersList.get('Authorization')
  const param = await params;
  const slug = await param.slug;

  const newSlug = slug.join('/');

  const res = await fetch(newSlug);
  const newData = await res.json();
  return NextResponse.json(newData);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const body = await req.json();
  const param = await params;
  const slug = await param.slug;
  const newSlug = slug.join('/');
  const req2 = await fetch(newSlug, {
    method: 'POST',
    body: body,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const res = await req2.json();
  return NextResponse.json(res);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const param = await params;
  const slug = await param.slug;

  const newSlug = slug.join('/');
  console.log(newSlug);
  const data = fetch(newSlug, { method: 'DELETE' });

  return NextResponse.json(data);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const body = await req.json();
  const param = await params;
  const slug = await param.slug;

  const newSlug = slug.join('/');
  const req2 = await fetch(newSlug, {
    method: 'PUT',
    body: body,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  const res = await req2.json();

  return NextResponse.json(res);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const body = await req.json();
  const param = await params;
  const slug = await param.slug;
  const newSlug = slug.join('/');

  const req2 = await fetch(newSlug, {
    method: 'PATCH',
    body: body,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  const res = await req2.json();

  return NextResponse.json(res);
}

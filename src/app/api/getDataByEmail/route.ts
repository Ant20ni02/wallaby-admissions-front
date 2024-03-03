import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest, res : NextResponse) {
  try {
    const body = await req.json()

    console.log(body);
    return new Response('OK');

  } catch (error) {
    console.error('The API returned an error: ' + error);
    return Response.json({ message: error }, { status: 500 });
  }
}

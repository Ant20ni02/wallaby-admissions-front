import { NextRequest, NextResponse } from "next/server";
import { google } from 'googleapis';

async function _getGoogleSheetClient() {

  const serviceAccountKeyFile = "public/wallabyproject-415815-8285a0fe1a8a.json";

  const auth = new google.auth.GoogleAuth({
    keyFile: serviceAccountKeyFile,
    scopes: ['https://www.googleapis.com/auth/drive'],
  });
  const authClient = await auth.getClient();

  const options : any = {version: 'v3', auth: authClient}

    return google.sheets(options);
}

export async function POST( req : Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file");
        const parentId = formData.get("parentId");
        const fileName = formData.get("fileName");

        if (!(file instanceof File)) {
            return NextResponse.json({ error: "No files received." }, { status: 400 });
        }
        else{
            return NextResponse.json({ parentId: parentId, fileName: fileName}, { status: 200 });
        }
    } 
    catch (error) {
        console.error('The API returned an error: ' + error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
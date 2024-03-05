import { NextRequest, NextResponse } from "next/server";
import { google } from 'googleapis';

async function _getGoogleDriveClient() {

  const serviceAccountKeyFile = "public/key.json";

  const auth = new google.auth.GoogleAuth({
    keyFile: serviceAccountKeyFile,
    scopes: ['https://www.googleapis.com/auth/drive'],
  });
  const authClient = await auth.getClient();

  const options : any = {version: 'v2', auth: authClient}

    return google.drive(options);
}

export async function POST( req : Request) {
    try {
        const body = await req.json();
        const name = body.name;

        const parentFolder = "1QJlFxLrKHXG7UxUs74a4VHXSPGeVOP_2";

        const requestBody = {
            title: name?.toString(),
            mimeType: "application/vnd.google-apps.folder",
            parents: [{id: parentFolder}]
        };

        const googleDriveClient = await _getGoogleDriveClient();

        const response = await googleDriveClient.files.insert({
            requestBody: requestBody
        })

        const folderId = response.data.id

        console.log('folderId:', folderId);

        return NextResponse.json({folderId: folderId}, { status: 200 });
    } 
    catch (error) {
        console.error('The API returned an error: ' + error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

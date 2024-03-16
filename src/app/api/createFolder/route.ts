import { NextRequest, NextResponse } from "next/server";
import { _getGoogleDriveClient, parentFolder } from "../../../../public/helpers";

export async function POST( req : Request) {
    try {
        const body = await req.json();
        const name = body.name;

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

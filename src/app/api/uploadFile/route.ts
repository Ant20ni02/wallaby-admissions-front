import { NextResponse } from "next/server";
import { google } from 'googleapis';
import { Readable } from 'stream';

async function _getGoogleDriveClient() {

    if (process.env.IS_LOCAL_DEV) {

        const serviceAccountKeyFile = "public/key.json";

        const auth = new google.auth.GoogleAuth({
            keyFile: serviceAccountKeyFile,
            scopes: ['https://www.googleapis.com/auth/drive'],
        });
        const authClient = await auth.getClient();

        const options : any = {version: 'v2', auth: authClient}

        return google.drive(options);
    }
    else{
        // Use the credentials from the environment variable
        const credentialsBase64 = process.env.CREDENTIALS;
        const credentialsJson = JSON.parse(Buffer.from(credentialsBase64, 'base64').toString('ascii'));
        const auth = new google.auth.GoogleAuth({
            keyFile: credentialsJson,
            scopes: ['https://www.googleapis.com/auth/drive'],
        });
        const authClient = await auth.getClient();
        const options : any = {version: 'v2', auth: authClient}
        return google.drive(options)
    }
}

function bufferToStream(buffer: Buffer): Readable {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null); // Signifies the end of the stream
    return stream;
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

        const buffer = Buffer.from(await file.arrayBuffer());

        const media = {
            mimeType: file.type,
            body: bufferToStream(buffer),
        };

        const requestBody = {
            title: fileName?.toString(),
            mimeType: file.type,
            parents: [{id: parentId?.toString()}]
        };

        const googleDriveClient = await _getGoogleDriveClient();

        const response = await googleDriveClient.files.insert({
            media: media,
            requestBody: requestBody
        })
        const fileId = response.data.id
        const fileUrl = `https://drive.google.com/file/d/${fileId}/view`
        console.log('fileId:', fileId);
        console.log("fileUrl:", fileUrl)

        return NextResponse.json({fileId: fileId, fileUrl: fileUrl}, { status: 200 });
    } 
    catch (error) {
        console.error('The API returned an error: ' + error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

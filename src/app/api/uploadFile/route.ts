import { NextResponse } from "next/server";
import { _getGoogleDriveClient, bufferToStream} from "../../../../public/helpers";

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

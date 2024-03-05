import { NextResponse } from "next/server";
import { google } from 'googleapis';
import { Readable } from 'stream';

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

async function _getGoogleSheetClient() {

    const serviceAccountKeyFile = "public/key.json";
  
    const auth = new google.auth.GoogleAuth({
      keyFile: serviceAccountKeyFile,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const authClient = await auth.getClient();
  
    const options : any = {version: 'v4', auth: authClient}
  
    return google.sheets(options);
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

        //Files
        const ACTA_NACIMIENTO = formData.get("ACTA_NACIMIENTO");

        //Drive folder data
        const studentName = formData.get("studentName");
        const parentFolder = "1QJlFxLrKHXG7UxUs74a4VHXSPGeVOP_2";

        //Spread sheet data
        const row = formData.get("row");
        const spreadsheetId = '1H549f8hZRufLjULdo_FNwzHkXYxqKGA9wNf5kk2DSSo';
        const tabName = 'Admisión'
        const columns = ["AI"];
        

        if (!(ACTA_NACIMIENTO instanceof File)) {
            return NextResponse.json({ error: "No files received." }, { status: 400 });
        }

        const requiredFiles : Array<File> = [ACTA_NACIMIENTO]
        const requiredFilesNames = ["ACTA_NACIMIENTO"]

        const googleDriveClient = await _getGoogleDriveClient();
        const googleSheetClient = await _getGoogleSheetClient();

        //Create folder
        const responseFolder = await googleDriveClient.files.insert({
            requestBody: {
                title: studentName?.toString(),
                mimeType: "application/vnd.google-apps.folder",
                parents: [{id: parentFolder}]
            }
        })

        const newFolderId = responseFolder.data.id;
        console.log('newFolderId:', newFolderId);

        //Upload required files
        for(let i = 0; i< requiredFilesNames.length; i++){

            //Upload File Process
            const file = requiredFiles[i];
            const fileName = requiredFilesNames[i];
            const column = columns[i]

            const buffer = Buffer.from(await file.arrayBuffer());

            const media = {
                mimeType: file.type,
                body: bufferToStream(buffer),
            };

            const requestBody = {
                title: `${fileName}.pdf`,
                mimeType: file.type,
                parents: [{id: newFolderId?.toString()}]
            };

            const responseFile = await googleDriveClient.files.insert({
                media: media,
                requestBody: requestBody
            })

            const fileId = responseFile.data.id;
            const fileUrl = `https://drive.google.com/file/d/${fileId}/view`;
            console.log(`File ${fileName} URL:`, fileUrl);

            //Update Cell With File URL
            const range = `${tabName}!${column}${row}`;

            var request = {
                range: range,
                values: [
                    [fileUrl]
                ]
            };

            const googleResponse = await googleSheetClient.spreadsheets.values.update({
                spreadsheetId: spreadsheetId,
                requestBody: request,
                range: range,
                valueInputOption: "USER_ENTERED"
            });
            console.log(`${googleResponse.data.updatedCells} cells updated with ${fileName}`, );
        }

        return new NextResponse('OK');
    } 
    catch (error) {
        console.error('The API returned an error: ' + error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
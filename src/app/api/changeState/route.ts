import { NextRequest, NextResponse } from "next/server";
import { google } from 'googleapis';

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

export async function POST( req : Request) {
  try {
    const body = await req.json();
    const row = body.row;
    const newState = body.newState;

    
    const spreadsheetId = '1H549f8hZRufLjULdo_FNwzHkXYxqKGA9wNf5kk2DSSo';
    const tabName = 'Admisión'
    const range = `${tabName}!AH${row}`;

    var request = {
        range: range,
        values: [
            [newState]
        ]
    };

    const googleSheetClient = await _getGoogleSheetClient();

    const googleResponse = await googleSheetClient.spreadsheets.values.update({
        spreadsheetId: spreadsheetId,
        requestBody: request,
        range: range,
        valueInputOption: "USER_ENTERED"
    });
    console.log('%d cells updated.', googleResponse.data.updatedCells);
    return NextResponse.json('OK')
  } 
  catch (error) {
    console.error('The API returned an error: ' + error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from "next/server";
import { google } from 'googleapis';

async function _getGoogleSheetClient() {

  if (process.env.IS_LOCAL_DEV) {
    const serviceAccountKeyFile = "public/key.json";

    const auth = new google.auth.GoogleAuth({
      keyFile: serviceAccountKeyFile,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const authClient = await auth.getClient();

    const options : any = {version: 'v4', auth: authClient}

    return google.sheets(options);
  }
  else {
    // Use the credentials from the environment variable
    const credentialsBase64 = process.env.serviceAccountKeyFile;
    const credentialsJson = JSON.parse(Buffer.from(credentialsBase64, 'base64').toString('ascii'));
  
    const auth = new google.auth.GoogleAuth({
      keyFile: credentialsJson,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const authClient = await auth.getClient();

    const options : any = {version: 'v4', auth: authClient}

    return google.sheets(options);
  }
}

export async function GET( req : NextRequest, context : any ) {
  try {
    const { params } = context;
    const userEmail = params.userEmail;

    const spreadsheetId = '1H549f8hZRufLjULdo_FNwzHkXYxqKGA9wNf5kk2DSSo';
    const tabName = 'Admisión'
    const range = 'A1:AY';

    const googleSheetClient = await _getGoogleSheetClient();

    const googleResponse = await googleSheetClient.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: `${tabName}!${range}`,
    });

    const table: Array<Array<string>> | null | undefined = googleResponse.data.values;

    const rowIndex: number = table?.findIndex((row: Array<string>) => row[31].toUpperCase() === userEmail.toUpperCase()) ?? -1;

    const filteredRow: Array<string> = rowIndex !== -1  && table != undefined ? table[rowIndex] : [];

    return NextResponse.json({index: rowIndex + 1, row: filteredRow});
  } 
  catch (error) {
    console.error('The API returned an error: ' + error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from "next/server";
import { google } from 'googleapis';

async function _getGoogleSheetClient() {

  const serviceAccountKeyFile = "public/wallabyproject-415815-8285a0fe1a8a.json";

  const auth = new google.auth.GoogleAuth({
    keyFile: serviceAccountKeyFile,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const authClient = await auth.getClient();

  const options : any = {version: 'v4', auth: authClient}

  return google.sheets(options);
}

export async function GET( req : NextRequest, context : any ) {
  try {
    const { params } = context;
    const userEmail = params.userId;

    const sheetId = '1wUvnBvsg2wmEHhAzUelIawmw2TXQr7UDKTyHOv4jVEc';
    const tabName = 'Admisión'
    const range = 'A1:AP';

    const googleSheetClient = await _getGoogleSheetClient();

    const googleResponse = await googleSheetClient.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: `${tabName}!${range}`,
    });
    
    const table : Array<Array<string>> | null | undefined = googleResponse.data.values;
    const filteredRows: Array<Array<string>> = table?.filter((row: Array<string>) => row[27] === userEmail) || [];

    return NextResponse.json(filteredRows[0]);
  } 
  catch (error) {
    console.error('The API returned an error: ' + error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

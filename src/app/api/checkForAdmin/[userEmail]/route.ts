import { NextRequest, NextResponse } from "next/server";
import { google } from 'googleapis';
import fs from 'fs';
import { promisify } from 'util';

const writeFileAsync = promisify(fs.writeFile);

async function _getGoogleSheetClient() {
  const credentialsBase64 = process.env.CREDENTIALS;
  const credentialsJson = JSON.parse(Buffer.from(credentialsBase64, 'base64').toString('ascii'));

  const tempFilePath = './temp.json';
  await writeFileAsync(tempFilePath, JSON.stringify(credentialsJson));
  
  const auth = new google.auth.GoogleAuth({
    keyFile: tempFilePath,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const authClient = await auth.getClient();

  const options : any = {version: 'v4', auth: authClient}

  fs.unlinkSync(tempFilePath);

  return google.sheets(options);
}

export async function GET( req : NextRequest, context : any ) {
  try {
    const { params } = context;
    const userEmail = params.userEmail;

    const spreadsheetId = '1H549f8hZRufLjULdo_FNwzHkXYxqKGA9wNf5kk2DSSo';
    const tabName = 'Admins'
    const range = 'A1:A';

    const googleSheetClient = await _getGoogleSheetClient();

    const googleResponse = await googleSheetClient.spreadsheets.values.get({
      spreadsheetId: spreadsheetId,
      range: `${tabName}!${range}`,
    });

    const table: Array<Array<string>> | null | undefined = googleResponse.data.values;

    const rowIndex: number = table?.findIndex((row: Array<string>) => row[0].toUpperCase() === userEmail.toUpperCase()) ?? -1;

    return NextResponse.json({index: rowIndex + 1});
  } 
  catch (error) {
    console.error('The API returned an error: ' + error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

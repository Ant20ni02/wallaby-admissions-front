import { NextRequest, NextResponse } from "next/server";
import { _getGoogleSheetClient, spreadSheetId } from "../../../../../public/helpers";

export async function GET( req : NextRequest, context : any ) {
  try {
    const { params } = context;
    const userEmail = params.userEmail;

    const tabName = 'Admins'
    const range = 'A1:A';

    const googleSheetClient = await _getGoogleSheetClient();

    const googleResponse = await googleSheetClient.spreadsheets.values.get({
      spreadsheetId: spreadSheetId,
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

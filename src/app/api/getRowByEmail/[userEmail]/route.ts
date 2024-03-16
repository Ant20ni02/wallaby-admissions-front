import { NextRequest, NextResponse } from "next/server";
import { _getGoogleSheetClient, spreadSheetId } from "../../../../../public/helpers";

export async function GET( req : NextRequest, context : any ) {
  try {
    const { params } = context;
    const userEmail = params.userEmail;

    const tabName = 'Admisión'
    const range = 'A1:AY';

    const googleSheetClient = await _getGoogleSheetClient();

    const googleResponse = await googleSheetClient.spreadsheets.values.get({
      spreadsheetId: spreadSheetId,
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

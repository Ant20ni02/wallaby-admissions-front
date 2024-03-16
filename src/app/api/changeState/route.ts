import { NextRequest, NextResponse } from "next/server";
import { _getGoogleSheetClient, spreadSheetId } from "../../../../public/helpers";

export async function POST( req : Request) {
  try {
    const body = await req.json();
    const row = body.row;
    const newState = body.newState;

    
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
        spreadsheetId: spreadSheetId,
        requestBody: request,
        range: range,
        valueInputOption: "USER_ENTERED"
    });
    console.log(`${googleResponse.data.updatedCells} updated cells in row ${row} and cell ${range} for State Change`);

    const rangeDateUpdate = `${tabName}!AY${row}`
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    const todayFormatted = dd + '/' + mm + '/' + yyyy;


    var requestDateUpdate = {
        range: rangeDateUpdate,
        values: [
            [todayFormatted]
        ]
    };

    const googleResponseDateUpdate = await googleSheetClient.spreadsheets.values.update({
        spreadsheetId: spreadSheetId,
        requestBody: requestDateUpdate,
        range: rangeDateUpdate,
        valueInputOption: "USER_ENTERED"
    });
    console.log(`${googleResponseDateUpdate.data.updatedCells} updated cells in row ${row} and cell ${rangeDateUpdate} for Date Update`);

    return NextResponse.json('OK')
  } 
  catch (error) {
    console.error('The API returned an error: ' + error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

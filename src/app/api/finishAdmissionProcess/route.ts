import { NextRequest, NextResponse } from "next/server";
import { _getGoogleSheetClient, spreadSheetId } from "../../../../public/helpers";

export async function POST( req : Request) {
    try {
        const body = await req.json();
        const row = body.row;
    
        const tabNameOld = 'Admisión'
        const rangeOld = 'B1:AX';

        const tabNameNew = 'Concentrado'
        const rangeNew = 'A2:BC';

        const rangeUser = `${tabNameOld}!AH${row}`;
    
        const googleSheetClient = await _getGoogleSheetClient();

        var requestChangeState = {
          range: rangeUser,
          values: [
              ['INSCRITO']
          ]
        };

        const googleResponseUser = await googleSheetClient.spreadsheets.values.update({
          spreadsheetId: spreadSheetId,
          requestBody: requestChangeState,
          range: rangeUser,
          valueInputOption: "USER_ENTERED"
        });
        console.log(`${googleResponseUser.data.updatedCells} updated cells in row ${row} and cell ${rangeUser} for State Change`);
    
        const googleResponseGetRow = await googleSheetClient.spreadsheets.values.get({
          spreadsheetId: spreadSheetId,
          range: `${tabNameOld}!${rangeOld}`,
        });
    
        const table: Array<Array<string>> | null | undefined = googleResponseGetRow.data.values;
    
        const dataToTransfer : Array<string> = Array(6).fill('').concat(table[row - 1]);

        var request = {
          values: [dataToTransfer]
        };

        const googleResponseAdd = await googleSheetClient.spreadsheets.values.append({
          spreadsheetId: spreadSheetId,
          requestBody: request,
          range: `${tabNameNew}!${rangeNew}`,
          valueInputOption: "USER_ENTERED"
        })
        console.log(`${googleResponseAdd.data.updates.updatedCells} cells appended to ${tabNameNew}`);
        
        return new NextResponse('OK');
      } 
      catch (error) {
        console.error('The API returned an error: ' + error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
      }
}

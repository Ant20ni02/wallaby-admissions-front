import { NextResponse } from "next/server";
import { _getGoogleDriveClient, _getGoogleSheetClient, bufferToStream, spreadSheetId, parentFolder } from "../../../../public/helpers";


export async function POST( req : Request) {
    try {
        const formData = await req.formData();

        //Files
        const ACTA_NACIMIENTO = formData.get("ACTA_NACIMIENTO");
        const CURP_ALUMNO = formData.get("CURP_ALUMNO");
        const CURP_PADRE = formData.get("CURP_PADRE");
        const CURP_MADRE = formData.get("CURP_MADRE");
        const INE_PADRE = formData.get("INE_PADRE");
        const INE_MADRE = formData.get("INE_MADRE");
        const CARTA_NO_ADEUDO = formData.get("CARTA_NO_ADEUDO");
        const FOTOS = formData.get("FOTOS");
        const CARTILLA_VACUNACION = formData.get("CARTILLA_VACUNACION");
        const PRUEBA_LABORATORIO = formData.get("PRUEBA_LABORATORIO");
        const VACUNA_COVID = formData.get("VACUNA_COVID");
        const CARTA_BUENA_SALUD = formData.get("CARTA_BUENA_SALUD");
        const EXUDADO_BUCOFARINGEO = formData.get("EXUDADO_BUCOFARINGEO");

        //Drive folder data
        const studentName = formData.get("studentName");

        //Spread sheet data
        const row = formData.get("row");
        const tabName = 'Admisión'
        const columns = ["AI", "AJ", "AK", "AL", "AM", "AN", "AO", "AP", "AQ", "AR", "AS", "AT", "AU"];

        const allFilesAttached = ACTA_NACIMIENTO instanceof File && CURP_ALUMNO instanceof File && CURP_PADRE instanceof File  && CURP_MADRE instanceof File && INE_PADRE instanceof File && INE_MADRE instanceof File && CARTA_NO_ADEUDO instanceof File && FOTOS instanceof File && CARTILLA_VACUNACION instanceof File && PRUEBA_LABORATORIO instanceof File && VACUNA_COVID instanceof File && CARTA_BUENA_SALUD instanceof File && EXUDADO_BUCOFARINGEO instanceof File;

        if (!(allFilesAttached)) {
            return NextResponse.json({ error: "No files received." }, { status: 400 });
        }

        const requiredFiles : Array<File> = [ACTA_NACIMIENTO, CURP_ALUMNO, CURP_PADRE, CURP_MADRE, INE_PADRE, INE_MADRE, CARTA_NO_ADEUDO, FOTOS, CARTILLA_VACUNACION, PRUEBA_LABORATORIO, VACUNA_COVID, CARTA_BUENA_SALUD, EXUDADO_BUCOFARINGEO]
        const requiredFilesNames = ["ACTA_NACIMIENTO", "CURP_ALUMNO", "CURP_PADRE", "CURP_MADRE", "INE_PADRE", "INE_MADRE", "CARTA_NO_ADEUDO", "FOTOS", "CARTILLA_VACUNACION", "PRUEBA_LABORATORIO", "VACUNA_COVID", "CARTA_BUENA_SALUD", "EXUDADO_BUCOFARINGEO"]

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
                spreadsheetId: spreadSheetId,
                requestBody: request,
                range: range,
                valueInputOption: "USER_ENTERED"
            });
            console.log(`${googleResponse.data.updatedCells} cells updated with ${fileName}`);
        }

        //Optional Files
        const CONSTANCIA_ANO_CURSADO = formData.get("CONSTANCIA_ANO_CURSADO");
        const BOLETA = formData.get("BOLETA");
        const BUENA_CONDUCTA = formData.get("BUENA_CONDUCTA");

        if(CONSTANCIA_ANO_CURSADO instanceof File){
            //Upload file
            const bufferCONSTANCIA_ANO_CURSADO = Buffer.from(await CONSTANCIA_ANO_CURSADO.arrayBuffer());

            const mediaCONSTANCIA_ANO_CURSADO = {
                mimeType: CONSTANCIA_ANO_CURSADO.type,
                body: bufferToStream(bufferCONSTANCIA_ANO_CURSADO),
            };

            const requestBodyCONSTANCIA_ANO_CURSADO = {
                title: "CONSTANCIA_AÑO_CURSADO.pdf",
                mimeType: CONSTANCIA_ANO_CURSADO.type,
                parents: [{id: newFolderId?.toString()}]
            };

            const responseFileCONSTANCIA_ANO_CURSADO = await googleDriveClient.files.insert({
                media: mediaCONSTANCIA_ANO_CURSADO,
                requestBody: requestBodyCONSTANCIA_ANO_CURSADO
            })

            const fileIdCONSTANCIA_ANO_CURSADO = responseFileCONSTANCIA_ANO_CURSADO.data.id;
            const fileUrlCONSTANCIA_ANO_CURSADO = `https://drive.google.com/file/d/${fileIdCONSTANCIA_ANO_CURSADO}/view`;
            console.log("File CONSTANCIA_ANO_CURSADO URL:", fileUrlCONSTANCIA_ANO_CURSADO);

            //Update Cell With File URL
            const rangeCONSTANCIA_ANO_CURSADO = `${tabName}!AV${row}`;

            var requestCONSTANCIA_ANO_CURSADO = {
                range: rangeCONSTANCIA_ANO_CURSADO,
                values: [
                    [fileUrlCONSTANCIA_ANO_CURSADO]
                ]
            };

            const googleResponserangeCONSTANCIA_ANO_CURSADO = await googleSheetClient.spreadsheets.values.update({
                spreadsheetId: spreadSheetId,
                requestBody: requestCONSTANCIA_ANO_CURSADO,
                range: rangeCONSTANCIA_ANO_CURSADO,
                valueInputOption: "USER_ENTERED"
            });
            console.log(`${googleResponserangeCONSTANCIA_ANO_CURSADO.data.updatedCells} cells updated with CONSTANCIA_ANO_CURSADO`);
        }

        if(BOLETA instanceof File){
            //Upload file
            const bufferBOLETA = Buffer.from(await BOLETA.arrayBuffer());

            const mediaBOLETA  = {
                mimeType: BOLETA.type,
                body: bufferToStream(bufferBOLETA),
            };

            const requestBodyBOLETA = {
                title: "BOLETA.pdf",
                mimeType: BOLETA.type,
                parents: [{id: newFolderId?.toString()}]
            };

            const responseFileBOLETA  = await googleDriveClient.files.insert({
                media: mediaBOLETA ,
                requestBody: requestBodyBOLETA
            })

            const fileIdBOLETA = responseFileBOLETA.data.id;
            const fileUrlBOLETA = `https://drive.google.com/file/d/${fileIdBOLETA}/view`;
            console.log("File BOLETA URL:", fileUrlBOLETA);

            //Update Cell With File URL
            const rangeBOLETA= `${tabName}!AW${row}`;

            var requestBOLETA = {
                range: rangeBOLETA,
                values: [
                    [fileUrlBOLETA]
                ]
            };

            const googleResponserangeBOLETA = await googleSheetClient.spreadsheets.values.update({
                spreadsheetId: spreadSheetId,
                requestBody: requestBOLETA,
                range: rangeBOLETA,
                valueInputOption: "USER_ENTERED"
            });
            console.log(`${googleResponserangeBOLETA.data.updatedCells} cells updated with BOLETA`);
        }

        if(BUENA_CONDUCTA instanceof File){
            //Upload file
            const bufferBUENA_CONDUCTA = Buffer.from(await BUENA_CONDUCTA.arrayBuffer());

            const mediaBUENA_CONDUCTA = {
                mimeType: BUENA_CONDUCTA.type,
                body: bufferToStream(bufferBUENA_CONDUCTA),
            };

            const requestBodyBUENA_CONDUCTA = {
                title: "BUENA_CONDUCTA.pdf",
                mimeType: BUENA_CONDUCTA.type,
                parents: [{id: newFolderId?.toString()}]
            };

            const responseFileBUENA_CONDUCTA = await googleDriveClient.files.insert({
                media: mediaBUENA_CONDUCTA,
                requestBody: requestBodyBUENA_CONDUCTA
            })

            const fileIdBUENA_CONDUCTA = responseFileBUENA_CONDUCTA.data.id;
            const fileUrlBUENA_CONDUCTA = `https://drive.google.com/file/d/${fileIdBUENA_CONDUCTA}/view`;
            console.log("File BUENA_CONDUCTA URL:", fileUrlBUENA_CONDUCTA);

            //Update Cell With File URL
            const rangeBUENA_CONDUCTA = `${tabName}!AX${row}`;

            var requestBUENA_CONDUCTA = {
                range: rangeBUENA_CONDUCTA,
                values: [
                    [fileUrlBUENA_CONDUCTA]
                ]
            };

            const googleResponserangeBUENA_CONDUCTA = await googleSheetClient.spreadsheets.values.update({
                spreadsheetId: spreadSheetId,
                requestBody: requestBUENA_CONDUCTA,
                range: rangeBUENA_CONDUCTA,
                valueInputOption: "USER_ENTERED"
            });
            console.log(`${googleResponserangeBUENA_CONDUCTA.data.updatedCells} cells updated with BUENA_CONDUCTA`);

            
        }

        const rangeState = `${tabName}!AH${row}`;

        var requestState = {
            range: rangeState,
            values: [
                ["VERIFICAR_DOCUMENTOS"]
            ]
        };

        const googleResponseState = await googleSheetClient.spreadsheets.values.update({
            spreadsheetId: spreadSheetId,
            requestBody: requestState,
            range: rangeState,
            valueInputOption: "USER_ENTERED"
        });

        console.log(`${googleResponseState.data.updatedCells} updated cells in row ${row} and cell ${rangeState} for State Change`);

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

        return new NextResponse('OK');
    } 
    catch (error) {
        console.error('The API returned an error: ' + error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
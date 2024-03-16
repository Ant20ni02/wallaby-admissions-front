import { Readable } from 'stream';
import { google } from 'googleapis';
import fs from 'fs';
import { promisify } from 'util';

const writeFileAsync = promisify(fs.writeFile);

export async function _getGoogleDriveClient() {
    const credentialsBase64 = process.env.NEXT_PUBLIC_CREDENTIALS;
    const credentialsJson = JSON.parse(Buffer.from(credentialsBase64, 'base64').toString('ascii'));

    const tempFilePath = './temp.json';
    await writeFileAsync(tempFilePath, JSON.stringify(credentialsJson));

    const auth = new google.auth.GoogleAuth({
        keyFile: tempFilePath,
        scopes: ['https://www.googleapis.com/auth/drive'],
    });
    const authClient = await auth.getClient();

    const options : any = {version: 'v2', auth: authClient}

    fs.unlinkSync(tempFilePath);

    return google.drive(options)
}

export async function _getGoogleSheetClient() {
    const credentialsBase64 = process.env.NEXT_PUBLIC_CREDENTIALS;
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

export function bufferToStream(buffer: Buffer): Readable {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null); // Signifies the end of the stream
    return stream;
}

export const spreadSheetId = '1H549f8hZRufLjULdo_FNwzHkXYxqKGA9wNf5kk2DSSo';
export const parentFolder = "1QJlFxLrKHXG7UxUs74a4VHXSPGeVOP_2";
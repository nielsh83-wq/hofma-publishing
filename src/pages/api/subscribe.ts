import type { APIRoute } from 'astro';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import {
    GOOGLE_SERVICE_ACCOUNT_EMAIL,
    GOOGLE_SHEET_ID,
} from 'astro:env/server';

export const prerender = false;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request }) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        const body = await request.json();
        const { email, source = 'website' } = body;

        if (!email || typeof email !== 'string') {
            return new Response(
                JSON.stringify({ error: 'Email is required' }),
                { status: 400, headers }
            );
        }

        const trimmedEmail = email.trim().toLowerCase();
        if (!EMAIL_REGEX.test(trimmedEmail)) {
            return new Response(
                JSON.stringify({ error: 'Please enter a valid email address' }),
                { status: 400, headers }
            );
        }

        const privateKey = process.env.GOOGLE_PRIVATE_KEY?.split(String.raw`\n`).join('\n');
        if (!GOOGLE_SERVICE_ACCOUNT_EMAIL || !privateKey || !GOOGLE_SHEET_ID) {
            console.error('Missing configuration');
            return new Response(
                JSON.stringify({ error: 'Newsletter signup is not configured' }),
                { status: 500, headers }
            );
        }

        console.log('Key starts with:', privateKey.substring(0, 20));

        const serviceAccountAuth = new JWT({
            email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: privateKey,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, serviceAccountAuth);
        await doc.loadInfo();

        const sheet = doc.sheetsByIndex[0];
        await sheet.addRow({
            Date: new Date().toLocaleString('da-DK', { timeZone: 'Europe/Copenhagen' }),
            Email: trimmedEmail,
            Source: String(source).slice(0, 100),
        });

        return new Response(
            JSON.stringify({ success: true, message: 'Tak for din tilmelding!' }),
            { status: 200, headers }
        );
    } catch (err) {
        console.error('Vercel Runtime Error:', err);
        return new Response(
            JSON.stringify({ error: 'Kunne ikke oprette forbindelse. Prøv igen senere.' }),
            { status: 500, headers }
        );
    }
};
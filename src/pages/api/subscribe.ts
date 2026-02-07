import type { APIRoute } from 'astro';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import {
	GOOGLE_SERVICE_ACCOUNT_EMAIL,
	GOOGLE_PRIVATE_KEY,
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

		const serviceAccountEmail = GOOGLE_SERVICE_ACCOUNT_EMAIL;
		const privateKey = GOOGLE_PRIVATE_KEY;
		const sheetId = GOOGLE_SHEET_ID;

		if (!serviceAccountEmail || !privateKey || !sheetId) {
			console.error('Missing Google Sheets configuration');
			return new Response(
				JSON.stringify({ error: 'Newsletter signup is not configured' }),
				{ status: 500, headers }
			);
		}

		const serviceAccountAuth = new JWT({
			email: serviceAccountEmail,
			key: privateKey.replace(/\\n/g, '\n'),
			scopes: ['https://www.googleapis.com/auth/spreadsheets'],
		});

		const doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth);
		await doc.loadInfo();

		const sheet = doc.sheetsByIndex[0];
		await sheet.addRow({
			Date: new Date().toISOString(),
			Email: trimmedEmail,
			Source: String(source).slice(0, 100),
		});

		return new Response(
			JSON.stringify({ success: true, message: 'Thank you for subscribing!' }),
			{ status: 200, headers }
		);
	} catch (err) {
		console.error('Newsletter signup error:', err);
		return new Response(
			JSON.stringify({ error: 'Something went wrong. Please try again later.' }),
			{ status: 500, headers }
		);
	}
};

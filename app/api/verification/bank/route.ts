
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const accountNumber = searchParams.get('account_number');
    const ifsc = searchParams.get('ifsc');

    if (!accountNumber || !ifsc) {
        return NextResponse.json({ status: 'Failure', message: 'Account Number and IFSC are required' }, { status: 400 });
    }

    // Hardcoded eKYC credentials for immediate deployment
    const username = process.env.EKYC_API_USERNAME;
    const token = process.env.EKYC_API_TOKEN || '5cbf9f97ff8cd6ab1f1d48ce95a7adf9';

    const orderid = Math.random().toString(36).substring(7);
    const apiUrl = `https://connect.ekychub.in/v3/verification/bank_verification_simple?username=${username}&token=${token}&account_number=${accountNumber}&ifsc=${ifsc}&orderid=${orderid}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ status: 'Failure', message: 'Failed to connect to verification service' }, { status: 500 });
    }
}

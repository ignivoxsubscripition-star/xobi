import crypto from 'crypto';

const JIOPAY_BASE_URL =
  process.env.JIOPAY_BASE_URL || 'https://uat.jiopay.co.in';

export interface InitiateSaleParams {
  merchantTxnNo: string;
  amount: string;
  customerEmailID?: string;
  returnURL: string;
  paymentMode?: string;
  [key: string]: string | undefined;
}

export interface InitiateSaleResponse {
  responseCode: string;
  responseDescription?: string;
  merchantId: string;
  merchantTxnNo: string;
  redirectURI?: string;
  tranCtx?: string;
  secureHash: string;
}

export class JioPayClient {
  private merchantId: string;
  private secretKey: string;

  constructor(merchantId: string, secretKey: string) {
    if (!merchantId || !secretKey) {
      throw new Error('JioPay merchantId and secretKey are required');
    }
    this.merchantId = merchantId;
    this.secretKey = secretKey;
  }

  generateSecureHash(payload: Record<string, string | undefined>): string {
    const sortedKeys = Object.keys(payload)
      .filter((key) => key !== 'secureHash' && payload[key] !== undefined)
      .sort();

    const messageString = sortedKeys.map((key) => payload[key]).join('');

    return crypto
      .createHmac('sha256', this.secretKey)
      .update(messageString)
      .digest('hex');
  }

  verifySecureHash(payload: Record<string, any>): boolean {
    const { secureHash, ...rest } = payload;
    if (!secureHash) return false;

    const stringPayload: Record<string, string> = {};
    for (const key in rest) {
      if (rest[key] !== null && rest[key] !== undefined) {
        stringPayload[key] = String(rest[key]);
      }
    }

    const expectedHash = this.generateSecureHash(stringPayload);
    return crypto.timingSafeEqual(
      Buffer.from(expectedHash),
      Buffer.from(secureHash)
    );
  }

  static formatTxnDate(date: Date = new Date()): string {
    const pad = (n: number) => String(n).padStart(2, '0');
    return (
      date.getFullYear().toString() +
      pad(date.getMonth() + 1) +
      pad(date.getDate()) +
      pad(date.getHours()) +
      pad(date.getMinutes()) +
      pad(date.getSeconds())
    );
  }

  async initiateSale(
    params: InitiateSaleParams
  ): Promise<InitiateSaleResponse> {
    const payload: Record<string, string> = {
      merchantId: this.merchantId,
      merchantTxnNo: params.merchantTxnNo,
      amount: params.amount,
      currencyCode: '356',
      payType: '0',
      customerEmailID: params.customerEmailID || 'guest@jiopay.com',
      transactionType: 'SALE',
      returnURL: params.returnURL,
      txnDate: JioPayClient.formatTxnDate(),
    };

    if (params.paymentMode) {
      payload.paymentMode = params.paymentMode;
    }

    payload.secureHash = this.generateSecureHash(payload);

    const response = await fetch(
      `${JIOPAY_BASE_URL}/tsp/pg/api/v2/initiateSale`,
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    const rawText = await response.text();
    console.log('=== INITIATE SALE RAW RESPONSE === status:', response.status, '| body:', rawText);
    const data = JSON.parse(rawText);

    if (data.responseCode !== 'R1000') {
      throw new Error(
        data.responseDescription || 'JioPay initiateSale failed'
      );
    }

    return data;
  }
  
  private async command(params: {
    merchantTxnNo: string;
    originalTxnNo: string;
    amount: string;
    transactionType: 'STATUS' | 'REFUND' | 'AUTH' | 'VOID';
  }): Promise<any> {
    const payload: Record<string, string> = {
      merchantId: this.merchantId,
      merchantTxnNo: params.merchantTxnNo,
      originalTxnNo: params.originalTxnNo,
      amount: params.amount,
      transactionType: params.transactionType,
    };

    payload.secureHash = this.generateSecureHash(payload);

    const body = new URLSearchParams(payload).toString();

    const response = await fetch(`${JIOPAY_BASE_URL}/tsp/pg/api/command`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/x-www-form-urlencoded',
      },
      body,
    });

    return response.json();
  }

  async checkStatus(originalTxnNo: string): Promise<any> {
    return this.command({
      merchantTxnNo: originalTxnNo,
      originalTxnNo,
      amount: '0',
      transactionType: 'STATUS',
    });
  }

  async refund(originalTxnNo: string, amount: string): Promise<any> {
    const merchantTxnNo = `${originalTxnNo}_REFUND_${Date.now()}`;
    return this.command({
      merchantTxnNo,
      originalTxnNo,
      amount,
      transactionType: 'REFUND',
    });
  }
}

export function getJioPayClient(): JioPayClient {
  const merchantId = process.env.JIOPAY_MERCHANT_ID;
  const secretKey = process.env.JIOPAY_SECRET_KEY;

  if (!merchantId || !secretKey) {
    throw new Error(
      'JIOPAY_MERCHANT_ID and JIOPAY_SECRET_KEY must be set in .env'
    );
  }

  return new JioPayClient(merchantId, secretKey);
}
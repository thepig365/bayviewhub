import QRCode from 'qrcode'

export const DISTRIBUTION_LOCAL_QR_NOTE = 'Locally generated in-browser for internal review. No external QR image service is used.'

export async function distributionQrDataUrl(value: string, size = 220): Promise<string> {
  return QRCode.toDataURL(value, {
    errorCorrectionLevel: 'M',
    margin: 1,
    width: size,
  })
}

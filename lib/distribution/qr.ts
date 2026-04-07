import { sharePageQrImageUrl } from '@/lib/share-links'

export function distributionQrUrl(url: string, size = 220): string {
  return sharePageQrImageUrl(url, size)
}

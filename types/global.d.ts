export {}

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, string> }) => void
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
  }
}



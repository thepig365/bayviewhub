export {}

declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, string> }) => void
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
  }

  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_BASE_URL?: string
      NEXT_PUBLIC_PLAUSIBLE_DOMAIN?: string
      NEXT_PUBLIC_GA_MEASUREMENT_ID?: string
      NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?: string
      EOI_EDIBLE_GARDENS_WEBHOOK_URL?: string
      EOI_EDIBLE_GARDENS_WEBHOOK_SECRET?: string
      EOI_EDIBLE_GARDENS_NOTIFY_EMAIL?: string
      EOI_EDIBLE_GARDENS_AUTOREPLY?: string
      EOI_GALLERY_NOTIFY_EMAIL?: string
      RESEND_API_KEY?: string
      RESEND_FROM?: string
      SENDGRID_API_KEY?: string
      SENDGRID_TO_EMAIL?: string
      MAILCHIMP_API_KEY?: string
      MAILCHIMP_LIST_ID?: string
      MAILCHIMP_SERVER_PREFIX?: string
    }
  }
}



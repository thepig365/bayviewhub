import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Version',
  robots: {
    index: false,
    follow: false,
  },
}

export const dynamic = 'force-dynamic'

export default function VersionPage() {
  const commitSha = process.env.VERCEL_GIT_COMMIT_SHA ?? 'unknown'
  const deploymentId = process.env.VERCEL_DEPLOYMENT_ID ?? 'unknown'
  const nodeEnv = process.env.NODE_ENV ?? 'unknown'
  const requestTime = new Date().toISOString()

  const body = `VERCEL_GIT_COMMIT_SHA: ${commitSha}
VERCEL_DEPLOYMENT_ID: ${deploymentId}
NODE_ENV: ${nodeEnv}
Request time (UTC): ${requestTime}
`

  return (
    <pre className="m-8 font-mono text-sm whitespace-pre-wrap break-all bg-natural-50 dark:bg-primary-900 p-6 rounded-lg">
      {body}
    </pre>
  )
}

import React from 'react'

export interface AnswerCapsuleProps {
  /** One-sentence definition: "What this is" */
  definition: string
  /** 3–7 bullet key facts (verified facts only) */
  facts: string[]
  /** Evidence / Sources links */
  sources?: { label: string; href: string }[]
  /** Last updated date */
  lastUpdated: string
  /** Optional className for styling */
  className?: string
  /** Use light text for dark backgrounds */
  darkBg?: boolean
}

export function AnswerCapsule({
  definition,
  facts,
  sources = [],
  lastUpdated,
  className = '',
  darkBg = false,
}: AnswerCapsuleProps) {
  const textColor = darkBg ? 'text-gray-100' : 'text-fg'
  const textMuted = darkBg ? 'text-gray-400' : 'text-muted'
  const linkColor = darkBg ? 'text-accent hover:text-accent-hover' : 'text-primary-600 hover:underline dark:text-primary-400'
  const borderColor = darkBg ? 'border-gray-600' : 'border-border'

  return (
    <aside
      className={`rounded-xl border p-6 ${borderColor} ${darkBg ? '' : 'bg-natural-50 dark:bg-surface/50'} ${className}`}
      aria-label="Answer capsule"
    >
      <h3 className={`text-sm font-bold uppercase tracking-wider ${textMuted} mb-3`}>
        Quick Answer
      </h3>
      <p className={`${textColor} font-medium mb-4`}>{definition}</p>
      <ul className="space-y-2 mb-4">
        {facts.map((fact, i) => (
          <li key={i} className={`flex items-start gap-2 text-sm ${textColor}`}>
            <span className="text-accent mt-0.5">•</span>
            <span>{fact}</span>
          </li>
        ))}
      </ul>
      {sources.length > 0 && (
        <div className={`pt-3 border-t ${borderColor}`}>
          <p className={`text-xs font-medium ${textMuted} mb-2`}>Evidence / Sources</p>
          <ul className="space-y-1">
            {sources.map((s, i) => (
              <li key={i}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm ${linkColor}`}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <p className={`text-xs ${textMuted} mt-4`}>
        Last updated: {lastUpdated}
      </p>
    </aside>
  )
}

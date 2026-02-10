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
}

export function AnswerCapsule({
  definition,
  facts,
  sources = [],
  lastUpdated,
  className = '',
}: AnswerCapsuleProps) {
  return (
    <aside
      className={`rounded-xl border border-natural-200 bg-natural-50 p-6 dark:border-primary-700 dark:bg-primary-800/30 ${className}`}
      aria-label="Answer capsule"
    >
      <h3 className="text-sm font-bold uppercase tracking-wider text-natural-600 dark:text-natural-400 mb-3">
        Quick Answer
      </h3>
      <p className="text-natural-900 dark:text-natural-50 font-medium mb-4">{definition}</p>
      <ul className="space-y-2 mb-4">
        {facts.map((fact, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-natural-700 dark:text-natural-300">
            <span className="text-primary-600 dark:text-primary-400 mt-0.5">•</span>
            <span>{fact}</span>
          </li>
        ))}
      </ul>
      {sources.length > 0 && (
        <div className="pt-3 border-t border-natural-200 dark:border-primary-700">
          <p className="text-xs font-medium text-natural-600 dark:text-natural-400 mb-2">Evidence / Sources</p>
          <ul className="space-y-1">
            {sources.map((s, i) => (
              <li key={i}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-600 hover:underline dark:text-primary-400"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <p className="text-xs text-natural-500 dark:text-natural-400 mt-4">
        Last updated: {lastUpdated}
      </p>
    </aside>
  )
}

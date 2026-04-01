import React from 'react'
import { cn } from '@/lib/utils'

type Props = {
  body: string
  className?: string
}

function safeHref(value: string): string | null {
  if (
    value.startsWith('/') ||
    value.startsWith('https://') ||
    value.startsWith('http://') ||
    value.startsWith('mailto:')
  ) {
    return value
  }
  return null
}

function renderInline(content: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = []
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(content.slice(lastIndex, match.index))
    }

    const href = safeHref(match[2].trim())
    if (href) {
      nodes.push(
        <a
          key={`${match.index}-${href}`}
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="text-fg underline underline-offset-4 hover:text-accent"
        >
          {match[1]}
        </a>
      )
    } else {
      nodes.push(match[0])
    }

    lastIndex = regex.lastIndex
  }

  if (lastIndex < content.length) {
    nodes.push(content.slice(lastIndex))
  }

  return nodes
}

export function EditorialBody({ body, className }: Props) {
  const sections = body
    .trim()
    .split(/\n{2,}/)
    .map((section) => section.trim())
    .filter(Boolean)

  return (
    <div className={cn('reading text-fg', className)}>
      {sections.map((section, index) => {
        const lines = section.split('\n').map((line) => line.trim()).filter(Boolean)
        if (!lines.length) return null

        if (lines.length === 1 && lines[0].startsWith('## ')) {
          return (
            <h2 key={index} className="mt-10 text-3xl font-serif font-semibold text-fg first:mt-0">
              {lines[0].slice(3)}
            </h2>
          )
        }

        if (lines.length === 1 && lines[0].startsWith('### ')) {
          return (
            <h3 key={index} className="mt-8 text-2xl font-serif font-semibold text-fg first:mt-0">
              {lines[0].slice(4)}
            </h3>
          )
        }

        if (lines.every((line) => line.startsWith('- '))) {
          return (
            <ul key={index} className="mt-6 list-disc space-y-2 pl-6 text-base leading-8 text-muted">
              {lines.map((line, lineIndex) => (
                <li key={lineIndex}>{renderInline(line.slice(2))}</li>
              ))}
            </ul>
          )
        }

        if (lines.every((line) => /^\d+\.\s/.test(line))) {
          return (
            <ol key={index} className="mt-6 list-decimal space-y-2 pl-6 text-base leading-8 text-muted">
              {lines.map((line, lineIndex) => (
                <li key={lineIndex}>{renderInline(line.replace(/^\d+\.\s/, ''))}</li>
              ))}
            </ol>
          )
        }

        if (lines.every((line) => line.startsWith('> '))) {
          return (
            <blockquote
              key={index}
              className="mt-6 border-l-2 border-accent pl-5 text-lg leading-8 text-muted italic"
            >
              {lines.map((line, lineIndex) => (
                <p key={lineIndex} className={lineIndex === 0 ? '' : 'mt-3'}>
                  {renderInline(line.slice(2))}
                </p>
              ))}
            </blockquote>
          )
        }

        return (
          <p key={index} className="mt-6 text-base leading-8 text-muted first:mt-0">
            {lines.map((line, lineIndex) => (
              <React.Fragment key={lineIndex}>
                {lineIndex > 0 ? <br /> : null}
                {renderInline(line)}
              </React.Fragment>
            ))}
          </p>
        )
      })}
    </div>
  )
}

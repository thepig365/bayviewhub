import React from 'react'
import { EditorialAudioPlayer } from '@/components/editorial/EditorialAudioPlayer'
import { EditorialImageFigure } from '@/components/editorial/EditorialImageFigure'
import { localizedHref, type SiteLocale } from '@/lib/language-routing'
import { cn } from '@/lib/utils'

type Props = {
  body: string
  className?: string
  locale?: SiteLocale
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

function safeImageSrc(value: string): string | null {
  if (
    value.startsWith('/') ||
    value.startsWith('https://') ||
    value.startsWith('http://')
  ) {
    return value
  }
  return null
}

function formatDuration(value: number | null): string | null {
  if (!value || value <= 0) return null
  const hours = Math.floor(value / 3600)
  const minutes = Math.floor((value % 3600) / 60)
  const seconds = value % 60
  if (hours > 0) return `${hours}:${`${minutes}`.padStart(2, '0')}:${`${seconds}`.padStart(2, '0')}`
  return `${minutes}:${`${seconds}`.padStart(2, '0')}`
}

function parseImageSyntax(
  line: string,
  locale: SiteLocale
): { alt: string; src: string; fullSrc: string | null; caption: string | null } | null {
  const match = line.match(/^!\[([^\]]*)\]\((\S+?)(?:\s+"([^"]+)")?\)(?:\{zoom=([^}]+)\})?$/)
  if (!match) return null
  const src = safeImageSrc(match[2].trim())
  if (!src) return null
  const fullSrc = match[4] ? safeImageSrc(match[4].trim()) : null
  return {
    alt: match[1].trim() || (locale === 'zh' ? '文章图片' : 'Editorial image'),
    src,
    fullSrc,
    caption: match[3]?.trim() || null,
  }
}

function parseAudioSyntax(line: string): {
  title: string
  src: string
  note: string | null
  speakers: string[]
  durationSeconds: number | null
} | null {
  const match = line.match(/^!audio\[([^\]]*)\]\((\S+?)(?:\s+"([^"]+)")?\)(.*)$/)
  if (!match) return null

  const src = safeImageSrc(match[2].trim())
  if (!src) return null

  const speakers: string[] = []
  let durationSeconds: number | null = null
  const options = match[4] || ''
  const optionRegex = /\{([^=]+)=([^}]+)\}/g
  let optionMatch: RegExpExecArray | null

  while ((optionMatch = optionRegex.exec(options)) !== null) {
    const key = optionMatch[1].trim().toLowerCase()
    const value = optionMatch[2].trim()
    if (key === 'speaker' && value) {
      speakers.push(...value.split(',').map((item) => item.trim()).filter(Boolean))
    }
    if (key === 'duration') {
      const parsed = Number(value)
      if (Number.isFinite(parsed) && parsed > 0) {
        durationSeconds = Math.round(parsed)
      }
    }
  }

  return {
    title: match[1].trim() || 'Audio',
    src,
    note: match[3]?.trim() || null,
    speakers,
    durationSeconds,
  }
}

function renderInline(content: string, locale: SiteLocale): React.ReactNode[] {
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
      const localized = href.startsWith('/') ? localizedHref(href, locale) : href
      nodes.push(
        <a
          key={`${match.index}-${href}`}
          href={localized}
          target={localized.startsWith('http') ? '_blank' : undefined}
          rel={localized.startsWith('http') ? 'noopener noreferrer' : undefined}
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

export function EditorialBody({ body, className, locale = 'en' }: Props) {
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

        const imageBlock = parseImageSyntax(lines[0], locale)
        if (imageBlock) {
          const caption = imageBlock.caption || lines.slice(1).join(' ').trim() || null
          return (
            <EditorialImageFigure
              key={index}
              src={imageBlock.src}
              fullSrc={imageBlock.fullSrc}
              alt={imageBlock.alt}
              caption={caption ? renderInline(caption, locale) : null}
              locale={locale}
            />
          )
        }

        const audioBlock = parseAudioSyntax(lines[0])
        if (audioBlock) {
          const note = audioBlock.note || lines.slice(1).join(' ').trim() || null
          return (
            <EditorialAudioPlayer
              key={index}
              title={audioBlock.title}
              src={audioBlock.src}
              speakers={audioBlock.speakers}
              durationLabel={formatDuration(audioBlock.durationSeconds)}
              note={note ? renderInline(note, locale) : null}
              locale={locale}
            />
          )
        }

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
                <li key={lineIndex}>{renderInline(line.slice(2), locale)}</li>
              ))}
            </ul>
          )
        }

        if (lines.every((line) => /^\d+\.\s/.test(line))) {
          return (
            <ol key={index} className="mt-6 list-decimal space-y-2 pl-6 text-base leading-8 text-muted">
              {lines.map((line, lineIndex) => (
                <li key={lineIndex}>{renderInline(line.replace(/^\d+\.\s/, ''), locale)}</li>
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
                  {renderInline(line.slice(2), locale)}
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
                {renderInline(line, locale)}
              </React.Fragment>
            ))}
          </p>
        )
      })}
    </div>
  )
}

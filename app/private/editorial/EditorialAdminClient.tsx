'use client'

import Link from 'next/link'
import React, { useMemo, useState } from 'react'
import { LinkedInPackPanel } from '@/components/editorial/LinkedInPackPanel'
import {
  EDITORIAL_TYPES,
  editorialAbsoluteUrlFromPath,
  editorialTypeAdminLabel,
  editorialStatusMatches,
  editorialTypeMatches,
  formatEditorialDate,
  mendpressSectionLabel,
  type EditorialEntry,
  type EditorialStatusFilter,
  type EditorialType,
} from '@/lib/editorial'
import { CONTRAST_FORM_CONTROL_CLASS } from '@/lib/contrast-form-field-class'

type Props = {
  entries: EditorialEntry[]
}

export function EditorialAdminClient({ entries }: Props) {
  const [items, setItems] = useState(entries)
  const [typeFilter, setTypeFilter] = useState<EditorialType | 'all'>('all')
  const [statusFilter, setStatusFilter] = useState<EditorialStatusFilter>('all')
  const [query, setQuery] = useState('')
  const [copiedPath, setCopiedPath] = useState('')
  const [confirmDeleteId, setConfirmDeleteId] = useState('')
  const [deleteState, setDeleteState] = useState<'idle' | 'loading' | 'error'>('idle')
  const [deleteMessage, setDeleteMessage] = useState('')

  const filteredEntries = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter((entry) => {
      if (!editorialTypeMatches(entry, typeFilter)) return false
      if (!editorialStatusMatches(entry, statusFilter)) return false
      if (!q) return true
      return (
        entry.title.toLowerCase().includes(q) ||
        entry.slug.toLowerCase().includes(q) ||
        entry.summary.toLowerCase().includes(q)
      )
    })
  }, [items, query, statusFilter, typeFilter])

  const counts = useMemo(
    () => ({
      total: items.length,
      published: items.filter((entry) => entry.status === 'published').length,
      draft: items.filter((entry) => entry.status === 'draft').length,
      pinned: items.filter((entry) => entry.pinned).length,
    }),
    [items]
  )

  const copyUrl = async (path: string) => {
    try {
      await navigator.clipboard.writeText(editorialAbsoluteUrlFromPath(path))
      setCopiedPath(path)
      window.setTimeout(() => setCopiedPath(''), 2000)
    } catch {
      setCopiedPath('')
    }
  }

  const deleteEntry = async (id: string) => {
    setDeleteState('loading')
    setDeleteMessage('')

    try {
      const response = await fetch(`/api/editorial/admin/${id}`, { method: 'DELETE' })
      const data = await response.json().catch(() => ({}))

      if (!response.ok || !data.ok) {
        setDeleteState('error')
        setDeleteMessage(data.error || 'Failed to delete piece.')
        return
      }

      setItems((prev) => prev.filter((entry) => entry.id !== id))
      setConfirmDeleteId('')
      setDeleteState('idle')
      setDeleteMessage('')
    } catch {
      setDeleteState('error')
      setDeleteMessage('Failed to delete piece.')
    }
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-border bg-white p-5 dark:border-border dark:bg-surface">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Pieces</p>
          <p className="mt-2 text-3xl font-serif font-semibold text-fg">{counts.total}</p>
        </div>
        <div className="rounded-2xl border border-border bg-white p-5 dark:border-border dark:bg-surface">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Published</p>
          <p className="mt-2 text-3xl font-serif font-semibold text-fg">{counts.published}</p>
        </div>
        <div className="rounded-2xl border border-border bg-white p-5 dark:border-border dark:bg-surface">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Drafts</p>
          <p className="mt-2 text-3xl font-serif font-semibold text-fg">{counts.draft}</p>
        </div>
        <div className="rounded-2xl border border-border bg-white p-5 dark:border-border dark:bg-surface">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Pinned</p>
          <p className="mt-2 text-3xl font-serif font-semibold text-fg">{counts.pinned}</p>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-white p-5 dark:border-border dark:bg-surface">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px_220px]">
          <div>
            <label className="mb-2 block text-sm font-medium text-fg">Search</label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={CONTRAST_FORM_CONTROL_CLASS}
              placeholder="Search title, slug, or summary"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-fg">Type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as EditorialType | 'all')}
              className={CONTRAST_FORM_CONTROL_CLASS}
            >
              <option value="all">All types</option>
              {EDITORIAL_TYPES.map((type) => (
                <option key={type} value={type}>
                  {editorialTypeAdminLabel(type)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-fg">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as EditorialStatusFilter)}
              className={CONTRAST_FORM_CONTROL_CLASS}
            >
              <option value="all">All statuses</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-border bg-white dark:border-border dark:bg-surface">
        <div className="hidden gap-4 border-b border-border px-6 py-4 text-xs uppercase tracking-[0.18em] text-muted md:grid md:grid-cols-[minmax(0,2fr)_140px_140px_180px_160px]">
          <span>Piece</span>
          <span>Type</span>
          <span>Status</span>
          <span>Updated</span>
          <span>Actions</span>
        </div>

        {filteredEntries.length ? (
          <ul>
            {filteredEntries.map((entry) => (
              <li
                key={entry.id}
                className="border-b border-border px-6 py-5 last:border-b-0 md:grid md:grid-cols-[minmax(0,2fr)_140px_140px_180px_160px] md:gap-4"
              >
                <div className="min-w-0">
                  <Link href={`/private/editorial/${entry.id}`} className="font-medium text-fg hover:text-accent">
                    {entry.title}
                  </Link>
                  <p className="mt-1 truncate text-sm text-muted">{entry.summary}</p>
                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted">
                    <span>{entry.slug}</span>
                    {entry.pinned ? <span>pinned</span> : null}
                    {entry.publishedAt ? <span>published {formatEditorialDate(entry.publishedAt)}</span> : null}
                    {entry.audioUrl ? <span>audio attached</span> : null}
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm md:mt-0 md:contents">
                  <div className="text-sm text-fg">
                    <span className="mr-2 text-xs uppercase tracking-[0.12em] text-muted md:hidden">Type</span>
                    {editorialTypeAdminLabel(entry.editorialType)}
                    <span className="ml-2 text-xs text-muted">live as {mendpressSectionLabel(entry.editorialType)}</span>
                  </div>
                  <div className="text-sm text-fg">
                    <span className="mr-2 text-xs uppercase tracking-[0.12em] text-muted md:hidden">Status</span>
                    <span
                      className={
                        entry.status === 'published'
                          ? 'rounded-full bg-accent/15 px-2 py-1 text-accent'
                          : 'rounded-full bg-neutral-100 px-2 py-1 text-muted dark:bg-neutral-800'
                      }
                    >
                      {entry.status}
                    </span>
                  </div>
                  <div className="text-sm text-muted">
                    <span className="mr-2 text-xs uppercase tracking-[0.12em] text-muted md:hidden">Updated</span>
                    {formatEditorialDate(entry.updatedAt || entry.createdAt)}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <Link href={`/private/editorial/${entry.id}`} className="text-fg underline underline-offset-4 hover:text-accent">
                      Edit
                    </Link>
                    {entry.status === 'published' ? (
                      <>
                        <Link href={entry.path} className="text-fg underline underline-offset-4 hover:text-accent">
                          Live
                        </Link>
                        <button
                          type="button"
                          onClick={() => copyUrl(entry.path)}
                          className="text-fg underline underline-offset-4 hover:text-accent"
                        >
                          {copiedPath === entry.path ? 'Copied' : 'Copy URL'}
                        </button>
                      </>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => {
                        setConfirmDeleteId((current) => (current === entry.id ? '' : entry.id))
                        setDeleteState('idle')
                        setDeleteMessage('')
                      }}
                      className="text-red-700 underline underline-offset-4 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {confirmDeleteId === entry.id ? (
                  <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 md:col-span-5 dark:border-red-900/60 dark:bg-red-950/30">
                    <p className="text-sm font-medium text-red-900 dark:text-red-100">
                      Delete this piece permanently?
                    </p>
                    <p className="mt-2 text-sm leading-7 text-red-800/90 dark:text-red-200/85">
                      This permanently removes the piece from the editorial system and public Mendpress listings. Use this for unsuitable or test content only.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => deleteEntry(entry.id)}
                        disabled={deleteState === 'loading'}
                        className="rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-800 disabled:opacity-60"
                      >
                        {deleteState === 'loading' ? 'Deleting…' : 'Delete permanently'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setConfirmDeleteId('')
                          setDeleteState('idle')
                          setDeleteMessage('')
                        }}
                        disabled={deleteState === 'loading'}
                        className="rounded-lg border border-border px-4 py-2 text-sm text-fg transition-colors hover:border-accent disabled:opacity-60 dark:border-border"
                      >
                        Cancel
                      </button>
                    </div>
                    {deleteMessage ? (
                      <p className="mt-3 text-sm text-red-700 dark:text-red-300">{deleteMessage}</p>
                    ) : null}
                  </div>
                ) : null}
                {entry.status === 'published' ? (
                  <details className="mt-4 rounded-2xl border border-border bg-natural-50 p-4 dark:border-border dark:bg-neutral-900/40 md:col-span-5">
                    <summary className="cursor-pointer text-sm font-medium text-fg">
                      LinkedIn pack
                    </summary>
                    <div className="mt-4">
                      <LinkedInPackPanel source={entry} compact />
                    </div>
                  </details>
                ) : null}
              </li>
            ))}
          </ul>
        ) : (
          <div className="px-6 py-16 text-center">
            <h2 className="text-2xl font-serif font-semibold text-fg">No pieces match these filters</h2>
            <p className="mt-3 text-muted">Adjust the type, status, or search filters to see more Mendpress pieces.</p>
          </div>
        )}
      </section>
    </div>
  )
}

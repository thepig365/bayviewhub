'use client'

import React, { useMemo, useState } from 'react'
import { CONTRAST_FORM_CONTROL_CLASS } from '@/lib/contrast-form-field-class'

type SubscriberRow = {
  email: string
  status: string
  created_at: string | null
  source_page: string | null
}

type Props = {
  subscribers: SubscriberRow[]
}

export function NewsletterSubscribersClient({ subscribers }: Props) {
  const [statusFilter, setStatusFilter] = useState<'all' | 'subscribed' | 'unsubscribed' | 'active'>('all')
  const [query, setQuery] = useState('')

  const filteredSubscribers = useMemo(() => {
    const q = query.trim().toLowerCase()
    return subscribers.filter((row) => {
      if (statusFilter !== 'all' && row.status !== statusFilter) return false
      if (!q) return true
      return row.email.toLowerCase().includes(q) || (row.source_page || '').toLowerCase().includes(q)
    })
  }, [query, statusFilter, subscribers])

  const counts = useMemo(
    () => ({
      total: subscribers.length,
      subscribed: subscribers.filter((row) => row.status === 'subscribed' || row.status === 'active').length,
      unsubscribed: subscribers.filter((row) => row.status === 'unsubscribed').length,
    }),
    [subscribers]
  )

  return (
    <div className="space-y-8">
      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-white p-5 dark:border-border dark:bg-surface">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Total</p>
          <p className="mt-2 text-3xl font-serif font-semibold text-fg">{counts.total}</p>
        </div>
        <div className="rounded-2xl border border-border bg-white p-5 dark:border-border dark:bg-surface">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Active</p>
          <p className="mt-2 text-3xl font-serif font-semibold text-fg">{counts.subscribed}</p>
        </div>
        <div className="rounded-2xl border border-border bg-white p-5 dark:border-border dark:bg-surface">
          <p className="text-xs uppercase tracking-[0.18em] text-muted">Unsubscribed</p>
          <p className="mt-2 text-3xl font-serif font-semibold text-fg">{counts.unsubscribed}</p>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-white p-5 dark:border-border dark:bg-surface">
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_220px]">
          <div>
            <label className="mb-2 block text-sm font-medium text-fg">Search</label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={CONTRAST_FORM_CONTROL_CLASS}
              placeholder="Search email or source page"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-fg">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              className={CONTRAST_FORM_CONTROL_CLASS}
            >
              <option value="all">All statuses</option>
              <option value="subscribed">Subscribed</option>
              <option value="active">Legacy active</option>
              <option value="unsubscribed">Unsubscribed</option>
            </select>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-2xl border border-border bg-white dark:border-border dark:bg-surface">
        <div className="hidden gap-4 border-b border-border px-6 py-4 text-xs uppercase tracking-[0.18em] text-muted md:grid md:grid-cols-[minmax(0,1.4fr)_140px_180px_minmax(0,1fr)]">
          <span>Email</span>
          <span>Status</span>
          <span>Created</span>
          <span>Source page</span>
        </div>

        {filteredSubscribers.length ? (
          <ul>
            {filteredSubscribers.map((subscriber) => (
              <li
                key={`${subscriber.email}-${subscriber.created_at}`}
                className="border-b border-border px-6 py-5 last:border-b-0 md:grid md:grid-cols-[minmax(0,1.4fr)_140px_180px_minmax(0,1fr)] md:gap-4"
              >
                <div className="min-w-0 break-all text-sm text-fg">{subscriber.email}</div>
                <div className="mt-3 text-sm md:mt-0">
                  <span
                    className={
                      subscriber.status === 'unsubscribed'
                        ? 'rounded-full bg-neutral-100 px-2 py-1 text-muted dark:bg-neutral-800'
                        : 'rounded-full bg-accent/15 px-2 py-1 text-accent'
                    }
                  >
                    {subscriber.status}
                  </span>
                </div>
                <div className="mt-3 text-sm text-muted md:mt-0">
                  {subscriber.created_at
                    ? new Date(subscriber.created_at).toLocaleString()
                    : 'Unknown'}
                </div>
                <div className="mt-3 break-all text-sm text-muted md:mt-0">
                  {subscriber.source_page || 'Unknown'}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="px-6 py-16 text-center">
            <h2 className="text-2xl font-serif font-semibold text-fg">No subscribers match these filters</h2>
            <p className="mt-3 text-muted">Adjust the filters to see more subscriber records.</p>
          </div>
        )}
      </section>
    </div>
  )
}

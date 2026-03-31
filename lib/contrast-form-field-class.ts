/**
 * Native controls (input, textarea, select) on pages that mix light fields with a dark-themed shell.
 * Avoids low-contrast `text-fg` / `placeholder:text-muted` on `bg-white`.
 */
export const CONTRAST_FORM_CONTROL_CLASS =
  'w-full px-4 py-3 rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-400 dark:focus:ring-primary-300 [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_rgb(255_255_255)] [&:-webkit-autofill]:[-webkit-text-fill-color:rgb(23_23_23)] dark:[&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_rgb(24_24_27)] dark:[&:-webkit-autofill]:[-webkit-text-fill-color:rgb(244_244_245)]'

/** Same styling as `CONTRAST_FORM_CONTROL_CLASS` for a flex row (email + button): no `w-full`. */
export const CONTRAST_FORM_CONTROL_ROW_CLASS = CONTRAST_FORM_CONTROL_CLASS.replace(
  /^w-full /,
  'min-w-0 flex-1 '
)

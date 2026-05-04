'use client'

import { useState } from 'react'
import { useZodiac } from '@/app/hooks/useZodiac'
import { ResultCard } from '@/app/calculator/ResultCard'
import { CALCULATOR_COPY } from '@/app/content/explanations'

export default function CalculatorPage() {
  const [dateInput, setDateInput] = useState('')
  const { calculate, result, isLoading, error } = useZodiac()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (dateInput) {
      calculate(dateInput)
    }
  }

  function handleReset() {
    setDateInput('')
    calculate('')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-[#0a0a1a] px-4 py-16">
      {/* Page header */}
      <div className="mb-12 text-center">
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-white">
          {CALCULATOR_COPY.pageTitle}
        </h1>
        <p className="max-w-sm text-base leading-relaxed text-zinc-400">
          {CALCULATOR_COPY.pageSubtitle}
        </p>
      </div>

      {/* Input form — always visible above the result */}
      {!result ? (
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-sm flex-col gap-4"
        >
          <label
            htmlFor="birthdate"
            className="text-sm font-medium text-zinc-300"
          >
            {CALCULATOR_COPY.inputLabel}
          </label>

          <input
            id="birthdate"
            type="date"
            required
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />

          {error && (
            <p role="alert" className="text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading || !dateInput}
            className="w-full rounded-xl bg-amber-500 px-5 py-3 font-semibold text-black transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading
              ? CALCULATOR_COPY.loadingLabel
              : CALCULATOR_COPY.submitLabel}
          </button>
        </form>
      ) : (
        <div className="flex w-full max-w-lg flex-col items-center gap-6">
          <ResultCard result={result} />

          <button
            type="button"
            onClick={handleReset}
            className="text-sm text-zinc-400 underline underline-offset-4 hover:text-white"
          >
            {CALCULATOR_COPY.resetLabel}
          </button>
        </div>
      )}
    </main>
  )
}

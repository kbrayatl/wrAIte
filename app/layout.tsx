import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'wrAIte - Write messages that sound like you',
  description: 'AI that follows the rules great writers use. Short sentences. Plain language. No corporate jargon.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

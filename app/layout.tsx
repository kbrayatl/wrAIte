import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Outreach Generator',
  description: 'Generate high-converting outreach messages using AI',
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

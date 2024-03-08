import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Exclusivamente admisión',
  description: 'Aviso de que la página es solo para admisión',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" type="/favicon.ico" href="/public/favicon.ico"/>
        <link rel="icon" type="image/png" href="/public/favicon.png"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/public/apple-icon.png"/>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

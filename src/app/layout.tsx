import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Iniciar Sesión',
  description: 'Iniciar sesión en Wallaby',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" type="/favicon.ico" href="/favicon.ico"/>
        <link rel="icon" type="image/png" href="/favicon.png"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png"/>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

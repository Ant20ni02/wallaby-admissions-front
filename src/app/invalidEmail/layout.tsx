import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Correo inválido',
  description: 'El padre entró al portal con un correo que no es de Wallaby',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
          <link rel="icon" href="/favicon.ico" sizes="any"/>
          <link
            rel="icon"
            href="/icon?<generated>"
            type="image/<generated>"
            sizes="<generated>"
          />
          <link
            rel="apple-touch-icon"
            href="/apple-icon?<generated>"
            type="image/<generated>"
            sizes="<generated>"
          />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { Suspense } from 'react'
import Loading from './loading'
import { APP_DESCRIPTION, APP_NAME } from '@/lib/constants'
import { Toaster } from 'sonner'
// import ResponsiveNavbar from '@/components/navbar/responsive-nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: `%s | WpAccPac`,
    default: APP_NAME
  },
  description: APP_DESCRIPTION
  //metadataBase: new URL(SERVER_URL)  - FOR PRODUCTION ONLY
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <Suspense fallback={<Loading />}>
          {children}
          <Toaster />
        </Suspense>
      </body>
    </html>
  )
}

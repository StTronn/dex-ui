import { ThemeProvider } from "./ThemeProvider"
import { ClientLayout } from "./clientLayout"
import './globals.css'
import type { Metadata } from 'next'
import { Inter, IBM_Plex_Sans } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })
const ibmPlexSans = IBM_Plex_Sans({ subsets: ['latin'], weight: ["100", "200", "300", "400", "500", "600", "700"] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={ibmPlexSans.className}>
        <ClientLayout>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </ClientLayout>
      </body>
    </html>
  )
}

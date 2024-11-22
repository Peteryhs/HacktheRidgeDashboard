import './globals.css'
import { Major_Mono_Display } from 'next/font/google'

const majorMonoDisplay = Major_Mono_Display({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Hack the Ridge',
  description: 'Countdown and schedule for Hack the Ridge hackathon',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={majorMonoDisplay.className}>
      <body>
        {children}
      </body>
    </html>
  )
}


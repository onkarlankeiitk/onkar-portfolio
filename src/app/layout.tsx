import type { Metadata } from "next"
import { Geist, Geist_Mono, Quicksand } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import "./globals.css"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })
const quicksand = Quicksand({ variable: "--font-quicksand", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })

export const metadata: Metadata = {
  title: "Onkar Lanke — Designer & Strategist",
  description: "5+ years crafting research-based product strategies and end-to-end experiences.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${quicksand.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

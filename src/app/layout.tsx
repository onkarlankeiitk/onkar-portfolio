import type { Metadata } from "next"
import { Geist, Geist_Mono, Quicksand, Kaushan_Script } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import ScrollProgress from "@/components/ScrollProgress"
import SmoothScroll from "@/components/SmoothScroll"
import "./globals.css"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })
const quicksand = Quicksand({ variable: "--font-quicksand", subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] })
const kaushanScript = Kaushan_Script({ variable: "--font-script", subsets: ["latin"], weight: ["400"] })

export const metadata: Metadata = {
  title: "Onkar Lanke — Designer & Strategist",
  description: "5+ years crafting research-based product strategies and end-to-end experiences.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${quicksand.variable} ${kaushanScript.variable} antialiased`}>
        <SmoothScroll />
        {children}
        <ScrollProgress />
        <Analytics />
      </body>
    </html>
  )
}

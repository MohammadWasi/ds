import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { ErrorBoundary } from "@/components/error-boundary"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Drive Dashboard",
    template: "%s | Drive Dashboard",
  },
  description: "A modern file management dashboard built with Next.js",
  keywords: ["file management", "dashboard", "nextjs", "react"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "Drive Dashboard",
    description: "A modern file management dashboard built with Next.js",
    siteName: "Drive Dashboard",
  },
  twitter: {
    card: "summary_large_image",
    title: "Drive Dashboard",
    description: "A modern file management dashboard built with Next.js",
    creator: "@yourusername",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "min-h-screen bg-background antialiased")}>
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  )
}

"use client"

import type React from "react"

import { TopNavigation } from "@/components/navigation/top-navigation"

interface PageLayoutProps {
  children: React.ReactNode
  searchQuery?: string
  onSearchChange?: (query: string) => void
}

export function PageLayout({ children, searchQuery, onSearchChange }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <TopNavigation searchQuery={searchQuery} onSearchChange={onSearchChange} />
      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  )
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { navigationItems } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import * as Icons from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-card border-r">
      <div className="p-6">
        <h1 className="text-xl font-bold">Drive Dashboard</h1>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navigationItems.map((item) => {
          const Icon = Icons[item.icon as keyof typeof Icons] as any
          const isActive = pathname === item.href

          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent",
                isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="flex-1">{item.label}</span>
              {item.count && (
                <Badge variant="secondary" className="ml-auto">
                  {item.count}
                </Badge>
              )}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Storage</span>
            <span className="font-medium">2.1 GB of 15 GB</span>
          </div>
          <Progress value={14} className="h-2" />
          <Button variant="outline" size="sm" className="w-full">
            Buy Storage
          </Button>
        </div>
      </div>
    </div>
  )
}

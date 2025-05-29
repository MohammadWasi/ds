"use client"

import { ChevronRight, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface BreadcrumbNavProps {
  path: { id: string | null; name: string }[]
  onNavigate: (folderId: string | null) => void
}

export function BreadcrumbNav({ path, onNavigate }: BreadcrumbNavProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {path.map((segment, index) => (
          <div key={segment.id || "root"} className="flex items-center">
            {index > 0 && (
              <BreadcrumbSeparator>
                <ChevronRight className="h-3 w-3" />
              </BreadcrumbSeparator>
            )}
            <BreadcrumbItem>
              {index === path.length - 1 ? (
                <BreadcrumbPage className="flex items-center gap-1">
                  {index === 0 && <Home className="h-3 w-3" />}
                  {segment.name}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onNavigate(segment.id)}
                    className="flex items-center gap-1 h-auto p-1"
                  >
                    {index === 0 && <Home className="h-3 w-3" />}
                    {segment.name}
                  </Button>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

"use client"

import { useState, useMemo } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Navbar } from "@/components/dashboard/navbar"
import { FileGrid } from "@/components/dashboard/file-grid"
import { FileList } from "@/components/dashboard/file-list"
import { mockFiles } from "@/lib/data"
import type { FileItem, ViewMode, FileFilters } from "@/types"
import { BreadcrumbNav } from "@/components/dashboard/breadcrumb-nav"
import { UploadZone } from "@/components/dashboard/upload-zone"
import { FilePreviewModal } from "@/components/dashboard/file-preview-modal"

export default function DashboardPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<FileFilters>({
    search: "",
    sortBy: "modified",
    sortOrder: "desc",
    viewMode: "grid",
  })

  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [currentPath, setCurrentPath] = useState<string[]>([])

  const filteredFiles = useMemo(() => {
    let filtered = mockFiles

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((file) => file.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const order = filters.sortOrder === "asc" ? 1 : -1

      switch (filters.sortBy) {
        case "name":
          return a.name.localeCompare(b.name) * order
        case "modified":
          return (a.modifiedAt.getTime() - b.modifiedAt.getTime()) * order
        case "size":
          return ((a.size || 0) - (b.size || 0)) * order
        case "type":
          return a.type.localeCompare(b.type) * order
        default:
          return 0
      }
    })

    return filtered
  }, [searchQuery, filters])

  const handleFileClick = (file: FileItem) => {
    if (file.type === "folder") {
      setCurrentPath([...currentPath, file.name])
    } else {
      setSelectedFile(file)
      setIsPreviewOpen(true)
    }
  }

  const handleUpload = (files: File[]) => {
    console.log("Uploading files:", files)
    // Handle file upload logic here
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <main className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            {currentPath.length > 0 && <BreadcrumbNav path={currentPath} />}

            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">My Drive</h1>
              <div className="text-sm text-muted-foreground">{filteredFiles.length} items</div>
            </div>

            <UploadZone onUpload={handleUpload} />

            {viewMode === "grid" ? (
              <FileGrid files={filteredFiles} onFileClick={handleFileClick} />
            ) : (
              <FileList files={filteredFiles} onFileClick={handleFileClick} />
            )}

            <FilePreviewModal file={selectedFile} isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} />
          </div>
        </main>
      </div>
    </div>
  )
}

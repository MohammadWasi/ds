"use client"

import { useState, useMemo } from "react"
import { ArrowLeft } from "lucide-react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Navbar } from "@/components/dashboard/navbar"
import { FileGrid } from "@/components/dashboard/file-grid"
import { FileList } from "@/components/dashboard/file-list"
import { BreadcrumbNav } from "@/components/dashboard/breadcrumb-nav"
import { UploadZone } from "@/components/dashboard/upload-zone"
import { FilePreviewModal } from "@/components/dashboard/file-preview-modal"
import { Button } from "@/components/ui/button"
import { getFilesInFolder, getFolderById, buildBreadcrumbPath } from "@/lib/data"
import type { FileItem, ViewMode, FileFilters } from "@/types"

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

  // Simple navigation state like Google Drive
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null)

  // Get current folder info
  const currentFolder = currentFolderId ? getFolderById(currentFolderId) : null
  const breadcrumbPath = buildBreadcrumbPath(currentFolderId)

  // Get files in current folder (like Google Drive)
  const currentFiles = useMemo(() => {
    return getFilesInFolder(currentFolderId)
  }, [currentFolderId])

  // Apply filters to current files
  const filteredFiles = useMemo(() => {
    let filtered = currentFiles

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
          // Folders first, then files (like Google Drive)
          if (a.type !== b.type) {
            return a.type === "folder" ? -1 : 1
          }
          return a.name.localeCompare(b.name) * order
        default:
          return 0
      }
    })

    return filtered
  }, [currentFiles, searchQuery, filters])

  const handleFileClick = (file: FileItem) => {
    if (file.type === "folder") {
      // Navigate into folder (like Google Drive)
      setCurrentFolderId(file.id)
    } else {
      // Open file preview
      setSelectedFile(file)
      setIsPreviewOpen(true)
    }
  }

  const handleNavigateToFolder = (folderId: string | null) => {
    setCurrentFolderId(folderId)
  }

  const handleGoBack = () => {
    if (currentFolder?.parentId !== undefined) {
      setCurrentFolderId(currentFolder.parentId)
    } else {
      setCurrentFolderId(null)
    }
  }

  const handleUpload = (files: File[]) => {
    console.log("Uploading files to folder:", currentFolderId, files)
    // Handle file upload logic here
  }

  const getCurrentFolderName = () => {
    return currentFolder?.name || "My Drive"
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
            {/* Navigation - exactly like Google Drive */}
            <div className="flex items-center gap-4">
              {currentFolderId && (
                <Button variant="ghost" size="sm" onClick={handleGoBack}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              )}

              <BreadcrumbNav path={breadcrumbPath} onNavigate={handleNavigateToFolder} />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">{getCurrentFolderName()}</h1>
                <div className="text-sm text-muted-foreground mt-1">
                  {filteredFiles.length} {filteredFiles.length === 1 ? "item" : "items"}
                </div>
              </div>

              <Button variant="outline" size="sm">
                New Folder
              </Button>
            </div>

            {/* Upload Zone */}
            <UploadZone onUpload={handleUpload} />

            {/* File Display */}
            {viewMode === "grid" ? (
              <FileGrid files={filteredFiles} onFileClick={handleFileClick} />
            ) : (
              <FileList files={filteredFiles} onFileClick={handleFileClick} />
            )}

            {/* File Preview Modal */}
            <FilePreviewModal file={selectedFile} isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} />
          </div>
        </main>
      </div>
    </div>
  )
}

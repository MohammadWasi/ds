"use client"

import { useState } from "react"
import Image from "next/image"
import { X, Download, Share, Star, Trash2, ExternalLink } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { FileItem } from "@/types"
import { formatDate, formatFileSize } from "@/lib/utils"

interface FilePreviewModalProps {
  file: FileItem | null
  isOpen: boolean
  onClose: () => void
}

export function FilePreviewModal({ file, isOpen, onClose }: FilePreviewModalProps) {
  const [isStarred, setIsStarred] = useState(file?.starred || false)

  if (!file) return null

  const isImage = file.mimeType?.startsWith("image/")
  const isPdf = file.mimeType?.includes("pdf")
  const isVideo = file.mimeType?.startsWith("video/")

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <DialogTitle className="text-lg font-semibold truncate pr-4">{file.name}</DialogTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsStarred(!isStarred)}
              className={isStarred ? "text-yellow-500" : ""}
            >
              <Star className={`h-4 w-4 ${isStarred ? "fill-current" : ""}`} />
            </Button>
            <Button variant="ghost" size="sm">
              <Share className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Separator orientation="vertical" className="h-4" />
            <Button variant="ghost" size="sm" className="text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex gap-6 overflow-hidden">
          {/* Preview Area */}
          <div className="flex-1 flex items-center justify-center bg-muted/30 rounded-lg min-h-[400px]">
            {isImage ? (
              <Image
                src={file.thumbnail || "/placeholder.svg"}
                alt={file.name}
                width={600}
                height={400}
                className="max-w-full max-h-full object-contain"
              />
            ) : isPdf ? (
              <div className="text-center">
                <div className="text-6xl mb-4">📄</div>
                <p className="text-muted-foreground">PDF Preview</p>
                <Button className="mt-4">Open in new tab</Button>
              </div>
            ) : isVideo ? (
              <div className="text-center">
                <div className="text-6xl mb-4">🎥</div>
                <p className="text-muted-foreground">Video Preview</p>
                <Button className="mt-4">Play video</Button>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-6xl mb-4">📄</div>
                <p className="text-muted-foreground">No preview available</p>
                <Button className="mt-4">Download to view</Button>
              </div>
            )}
          </div>

          {/* File Details */}
          <div className="w-80 space-y-6">
            <div>
              <h3 className="font-semibold mb-3">File details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <span>{file.mimeType || "Unknown"}</span>
                </div>
                {file.size && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Size</span>
                    <span>{formatFileSize(file.size)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Owner</span>
                  <span>{file.owner}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Modified</span>
                  <span>{formatDate(file.modifiedAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created</span>
                  <span>{formatDate(file.createdAt)}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-3">Sharing</h3>
              <div className="space-y-2">
                {file.shared ? (
                  <Badge variant="secondary">Shared</Badge>
                ) : (
                  <p className="text-sm text-muted-foreground">Not shared</p>
                )}
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Button className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" className="w-full">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Upload, X, File, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface UploadFile {
  id: string
  file: File
  progress: number
  status: "uploading" | "completed" | "error"
}

interface UploadZoneProps {
  onUpload: (files: File[]) => void
  className?: string
}

export function UploadZone({ onUpload, className }: UploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragOver(false)

      const files = Array.from(e.dataTransfer.files)
      if (files.length > 0) {
        onUpload(files)
        simulateUpload(files)
      }
    },
    [onUpload],
  )

  const simulateUpload = (files: File[]) => {
    const newUploadFiles: UploadFile[] = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      progress: 0,
      status: "uploading",
    }))

    setUploadFiles((prev) => [...prev, ...newUploadFiles])

    // Simulate upload progress
    newUploadFiles.forEach((uploadFile) => {
      const interval = setInterval(() => {
        setUploadFiles((prev) =>
          prev.map((f) => {
            if (f.id === uploadFile.id) {
              const newProgress = Math.min(f.progress + Math.random() * 30, 100)
              return {
                ...f,
                progress: newProgress,
                status: newProgress === 100 ? "completed" : "uploading",
              }
            }
            return f
          }),
        )
      }, 500)

      setTimeout(() => clearInterval(interval), 3000)
    })
  }

  const removeUploadFile = (id: string) => {
    setUploadFiles((prev) => prev.filter((f) => f.id !== id))
  }

  return (
    <div className={cn("space-y-4", className)}>
      <Card
        className={cn(
          "border-2 border-dashed transition-colors",
          isDragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <Upload className={cn("h-10 w-10 mb-4", isDragOver ? "text-primary" : "text-muted-foreground")} />
          <h3 className="text-lg font-semibold mb-2">Drop files here to upload</h3>
          <p className="text-muted-foreground mb-4">Or click to select files</p>
          <Button variant="outline">Select Files</Button>
        </CardContent>
      </Card>

      {uploadFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Uploading files</h4>
          {uploadFiles.map((uploadFile) => (
            <Card key={uploadFile.id}>
              <CardContent className="flex items-center gap-3 p-3">
                <File className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{uploadFile.file.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress value={uploadFile.progress} className="flex-1 h-1" />
                    <span className="text-xs text-muted-foreground">{Math.round(uploadFile.progress)}%</span>
                  </div>
                </div>
                {uploadFile.status === "completed" ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <Button variant="ghost" size="sm" onClick={() => removeUploadFile(uploadFile.id)}>
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

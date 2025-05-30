"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Navbar } from "@/components/dashboard/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  ChevronDown,
  Upload,
  FileText,
  ImageIcon,
  Video,
  Music,
  Archive,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"

interface FileTemplate {
  id: string
  name: string
  description: string
  icon: any
  acceptedTypes: string[]
  maxSize: string
  required: boolean
}

interface UploadCategory {
  id: string
  title: string
  description: string
  icon: any
  files: FileTemplate[]
  completed: number
  total: number
}

const uploadCategories: UploadCategory[] = [
  {
    id: "documents",
    title: "Document Verification",
    description: "Upload required identity and legal documents",
    icon: FileText,
    completed: 2,
    total: 3,
    files: [
      {
        id: "passport",
        name: "Passport/ID Card",
        description: "Government issued photo identification",
        icon: FileText,
        acceptedTypes: [".pdf", ".jpg", ".png"],
        maxSize: "5MB",
        required: true,
      },
      {
        id: "address-proof",
        name: "Address Proof",
        description: "Utility bill or bank statement (last 3 months)",
        icon: FileText,
        acceptedTypes: [".pdf", ".jpg", ".png"],
        maxSize: "5MB",
        required: true,
      },
      {
        id: "income-proof",
        name: "Income Verification",
        description: "Salary slip or tax return document",
        icon: FileText,
        acceptedTypes: [".pdf", ".jpg", ".png"],
        maxSize: "10MB",
        required: false,
      },
    ],
  },
  {
    id: "media",
    title: "Media Assets",
    description: "Upload images, videos, and audio files for your project",
    icon: ImageIcon,
    completed: 1,
    total: 4,
    files: [
      {
        id: "profile-photo",
        name: "Profile Photo",
        description: "High-resolution profile picture (square format preferred)",
        icon: ImageIcon,
        acceptedTypes: [".jpg", ".png", ".webp"],
        maxSize: "2MB",
        required: true,
      },
      {
        id: "cover-image",
        name: "Cover Image",
        description: "Banner image for your profile (16:9 aspect ratio)",
        icon: ImageIcon,
        acceptedTypes: [".jpg", ".png", ".webp"],
        maxSize: "5MB",
        required: false,
      },
      {
        id: "demo-video",
        name: "Demo Video",
        description: "Product demonstration or introduction video",
        icon: Video,
        acceptedTypes: [".mp4", ".mov", ".avi"],
        maxSize: "100MB",
        required: false,
      },
      {
        id: "audio-intro",
        name: "Audio Introduction",
        description: "Voice introduction or podcast sample",
        icon: Music,
        acceptedTypes: [".mp3", ".wav", ".m4a"],
        maxSize: "20MB",
        required: false,
      },
    ],
  },
  {
    id: "project-files",
    title: "Project Files",
    description: "Upload project-related files and archives",
    icon: Archive,
    completed: 0,
    total: 2,
    files: [
      {
        id: "source-code",
        name: "Source Code Archive",
        description: "Compressed file containing your project source code",
        icon: Archive,
        acceptedTypes: [".zip", ".tar.gz", ".rar"],
        maxSize: "50MB",
        required: true,
      },
      {
        id: "documentation",
        name: "Project Documentation",
        description: "Technical documentation and user guides",
        icon: FileText,
        acceptedTypes: [".pdf", ".docx", ".md"],
        maxSize: "10MB",
        required: false,
      },
    ],
  },
]

export default function UploadsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFile, setSelectedFile] = useState<FileTemplate | null>(null)
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<Set<string>>(
    new Set(["passport", "address-proof", "profile-photo"]),
  )

  const handleFileSelect = (file: FileTemplate) => {
    setSelectedFile(file)
    setIsUploadDialogOpen(true)
  }

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || !selectedFile) return

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setUploadedFiles((prev) => new Set([...prev, selectedFile.id]))
          setIsUploadDialogOpen(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const getFileStatus = (fileId: string, required: boolean) => {
    if (uploadedFiles.has(fileId)) {
      return { status: "completed", icon: CheckCircle, color: "text-green-500" }
    }
    if (required) {
      return { status: "required", icon: AlertCircle, color: "text-red-500" }
    }
    return { status: "optional", icon: Clock, color: "text-gray-400" }
  }

  const getCategoryProgress = (category: UploadCategory) => {
    const completed = category.files.filter((file) => uploadedFiles.has(file.id)).length
    return (completed / category.files.length) * 100
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
          <div className="max-w-4xl space-y-6">
            <div>
              <h1 className="text-2xl font-bold">File Upload Center</h1>
              <p className="text-muted-foreground">
                Upload required files organized by category. Click on any file to upload.
              </p>
            </div>

            <div className="grid gap-6">
              {uploadCategories.map((category) => {
                const CategoryIcon = category.icon
                const progress = getCategoryProgress(category)
                const completedCount = category.files.filter((file) => uploadedFiles.has(file.id)).length

                return (
                  <Card key={category.id}>
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="p-2 bg-primary/10 rounded-lg">
                                <CategoryIcon className="h-6 w-6 text-primary" />
                              </div>
                              <div>
                                <CardTitle className="flex items-center gap-2">
                                  {category.title}
                                  <Badge variant={progress === 100 ? "default" : "secondary"}>
                                    {completedCount}/{category.files.length}
                                  </Badge>
                                </CardTitle>
                                <CardDescription>{category.description}</CardDescription>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <div className="text-sm font-medium">{Math.round(progress)}% Complete</div>
                                <Progress value={progress} className="w-24 h-2" />
                              </div>
                              <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                            </div>
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <CardContent className="pt-0">
                          <div className="grid gap-4">
                            {category.files.map((file) => {
                              const FileIcon = file.icon
                              const status = getFileStatus(file.id, file.required)

                              return (
                                <div
                                  key={file.id}
                                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                                  onClick={() => handleFileSelect(file)}
                                >
                                  <div className="flex items-center gap-4">
                                    <div className="p-2 bg-muted rounded-lg">
                                      <FileIcon className="h-5 w-5" />
                                    </div>
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <h4 className="font-medium">{file.name}</h4>
                                        {file.required && <Badge variant="destructive">Required</Badge>}
                                        <status.icon className={`h-4 w-4 ${status.color}`} />
                                      </div>
                                      <p className="text-sm text-muted-foreground">{file.description}</p>
                                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                                        <span>Accepts: {file.acceptedTypes.join(", ")}</span>
                                        <span>Max size: {file.maxSize}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {uploadedFiles.has(file.id) ? (
                                      <Badge variant="default">Uploaded</Badge>
                                    ) : (
                                      <Button variant="outline" size="sm">
                                        <Upload className="h-4 w-4 mr-2" />
                                        Upload
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                )
              })}
            </div>
          </div>
        </main>
      </div>

      {/* Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Upload {selectedFile?.name}</DialogTitle>
            <DialogDescription>{selectedFile?.description}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <div className="space-y-2">
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <span className="text-sm font-medium">Choose file or drag and drop</span>
                  <Input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept={selectedFile?.acceptedTypes.join(",")}
                    onChange={(e) => handleFileUpload(e.target.files)}
                  />
                </Label>
                <p className="text-xs text-muted-foreground">
                  Accepts: {selectedFile?.acceptedTypes.join(", ")} • Max size: {selectedFile?.maxSize}
                </p>
              </div>
            </div>

            {isUploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} />
              </div>
            )}

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

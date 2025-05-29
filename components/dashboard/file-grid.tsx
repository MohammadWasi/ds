"use client"

import Image from "next/image"
import type { FileItem } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatDate, formatFileSize, getFileIcon } from "@/lib/utils"
import { MoreHorizontal, Star, Share, Trash2, Download, Folder } from "lucide-react"
import * as Icons from "lucide-react"

interface FileGridProps {
  files: FileItem[]
  onFileClick: (file: FileItem) => void
}

export function FileGrid({ files, onFileClick }: FileGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {files.map((file) => (
        <FileCard key={file.id} file={file} onClick={() => onFileClick(file)} />
      ))}
    </div>
  )
}

function FileCard({ file, onClick }: { file: FileItem; onClick: () => void }) {
  const Icon = file.type === "folder" ? Folder : (Icons[getFileIcon(file.mimeType) as keyof typeof Icons] as any)

  return (
    <Card className="group cursor-pointer hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex flex-col space-y-3">
          <div className="relative">
            {file.thumbnail ? (
              <Image
                src={file.thumbnail || "/placeholder.svg"}
                alt={file.name}
                width={100}
                height={100}
                className="w-full h-20 object-cover rounded"
              />
            ) : (
              <div className="w-full h-20 flex items-center justify-center bg-muted rounded">
                <Icon className="h-8 w-8 text-muted-foreground" />
              </div>
            )}

            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 bg-background/80">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Star className="h-4 w-4 mr-2" />
                    {file.starred ? "Remove from starred" : "Add to starred"}
                  </DropdownMenuItem>
                  {file.type === "file" && (
                    <DropdownMenuItem>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Move to trash
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="space-y-1" onClick={onClick}>
            <h3 className="font-medium text-sm truncate">{file.name}</h3>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{formatDate(file.modifiedAt)}</span>
              {file.size && <span>{formatFileSize(file.size)}</span>}
            </div>

            <div className="flex items-center gap-1">
              {file.shared && (
                <Badge variant="secondary" className="text-xs">
                  Shared
                </Badge>
              )}
              {file.starred && <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import type { FileItem } from "@/types"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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

interface FileListProps {
  files: FileItem[]
  onFileClick: (file: FileItem) => void
}

export function FileList({ files, onFileClick }: FileListProps) {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Last modified</TableHead>
            <TableHead>Size</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file) => {
            const Icon =
              file.type === "folder" ? Folder : (Icons[getFileIcon(file.mimeType) as keyof typeof Icons] as any)

            return (
              <TableRow key={file.id} className="cursor-pointer hover:bg-muted/50" onClick={() => onFileClick(file)}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className="truncate">{file.name}</span>
                    <div className="flex items-center gap-1">
                      {file.shared && (
                        <Badge variant="secondary" className="text-xs">
                          Shared
                        </Badge>
                      )}
                      {file.starred && <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">{file.owner}</TableCell>
                <TableCell className="text-muted-foreground">{formatDate(file.modifiedAt)}</TableCell>
                <TableCell className="text-muted-foreground">{file.size ? formatFileSize(file.size) : "—"}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
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
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

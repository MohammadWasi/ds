"use client"

import type React from "react"

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Download, Share, Star, Copy, Trash2, Info } from "lucide-react"
import type { FileItem } from "@/types"

interface FileContextMenuProps {
  file: FileItem
  children: React.ReactNode
  onAction: (action: string, file: FileItem) => void
}

export function FileContextMenu({ file, children, onAction }: FileContextMenuProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuItem onClick={() => onAction("open", file)}>
          <Info className="h-4 w-4 mr-2" />
          Open
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={() => onAction("share", file)}>
          <Share className="h-4 w-4 mr-2" />
          Share
        </ContextMenuItem>
        <ContextMenuItem onClick={() => onAction("star", file)}>
          <Star className="h-4 w-4 mr-2" />
          {file.starred ? "Remove from starred" : "Add to starred"}
        </ContextMenuItem>
        <ContextMenuItem onClick={() => onAction("copy", file)}>
          <Copy className="h-4 w-4 mr-2" />
          Make a copy
        </ContextMenuItem>
        {file.type === "file" && (
          <ContextMenuItem onClick={() => onAction("download", file)}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </ContextMenuItem>
        )}
        <ContextMenuSeparator />
        <ContextMenuItem onClick={() => onAction("delete", file)} className="text-destructive">
          <Trash2 className="h-4 w-4 mr-2" />
          Move to trash
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

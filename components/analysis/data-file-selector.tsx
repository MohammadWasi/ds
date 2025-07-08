"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAnalysisContext } from "@/components/ai-analysis/analysis-context"
import { FileSpreadsheet, Calendar, Hash, Type, Trash2, Eye } from "lucide-react"

export function DataFileSelector() {
  const { state, setActiveFile, removeFile } = useAnalysisContext()

  const activeFile = state.files.find((f) => f.id === state.activeFileId)

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  if (state.files.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            No Data Files
          </CardTitle>
          <CardDescription>Upload data files to begin analysis</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5" />
          Data Files
        </CardTitle>
        <CardDescription>
          Select a file to analyze ({state.files.length} file{state.files.length !== 1 ? "s" : ""} available)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={state.activeFileId || ""} onValueChange={setActiveFile}>
          <SelectTrigger>
            <SelectValue placeholder="Select a data file" />
          </SelectTrigger>
          <SelectContent>
            {state.files.map((file) => (
              <SelectItem key={file.id} value={file.id}>
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="h-4 w-4" />
                  <span>{file.name}</span>
                  <span className="text-xs text-muted-foreground">({formatFileSize(file.size)})</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {activeFile && (
          <div className="space-y-3 p-3 border rounded-lg bg-muted/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="h-4 w-4" />
                <span className="font-medium">{activeFile.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-3 w-3 mr-1" />
                  Preview
                </Button>
                <Button variant="outline" size="sm" onClick={() => removeFile(activeFile.id)}>
                  <Trash2 className="h-3 w-3 mr-1" />
                  Remove
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Size:</span>
                <span className="ml-2">{formatFileSize(activeFile.size)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Uploaded:</span>
                <span className="ml-2">{formatDate(activeFile.uploadedAt)}</span>
              </div>
            </div>

            {activeFile.summary && (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Rows:</span>
                  <Badge variant="secondary">{activeFile.summary.rows.toLocaleString()}</Badge>
                  <span className="text-muted-foreground">Columns:</span>
                  <Badge variant="secondary">{activeFile.columns.length}</Badge>
                </div>

                <div className="space-y-2">
                  {activeFile.summary.numericColumns.length > 0 && (
                    <div className="flex items-center gap-2 text-sm">
                      <Hash className="h-3 w-3 text-blue-500" />
                      <span className="text-muted-foreground">Numeric:</span>
                      <div className="flex flex-wrap gap-1">
                        {activeFile.summary.numericColumns.slice(0, 3).map((col) => (
                          <Badge key={col} variant="outline" className="text-xs">
                            {col}
                          </Badge>
                        ))}
                        {activeFile.summary.numericColumns.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{activeFile.summary.numericColumns.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {activeFile.summary.dateColumns.length > 0 && (
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-3 w-3 text-green-500" />
                      <span className="text-muted-foreground">Date:</span>
                      <div className="flex flex-wrap gap-1">
                        {activeFile.summary.dateColumns.slice(0, 3).map((col) => (
                          <Badge key={col} variant="outline" className="text-xs">
                            {col}
                          </Badge>
                        ))}
                        {activeFile.summary.dateColumns.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{activeFile.summary.dateColumns.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {activeFile.summary.textColumns.length > 0 && (
                    <div className="flex items-center gap-2 text-sm">
                      <Type className="h-3 w-3 text-purple-500" />
                      <span className="text-muted-foreground">Text:</span>
                      <div className="flex flex-wrap gap-1">
                        {activeFile.summary.textColumns.slice(0, 3).map((col) => (
                          <Badge key={col} variant="outline" className="text-xs">
                            {col}
                          </Badge>
                        ))}
                        {activeFile.summary.textColumns.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{activeFile.summary.textColumns.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {(activeFile.summary.missingValues > 0 || activeFile.summary.duplicates > 0) && (
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    {activeFile.summary.missingValues > 0 && <span>Missing: {activeFile.summary.missingValues}</span>}
                    {activeFile.summary.duplicates > 0 && <span>Duplicates: {activeFile.summary.duplicates}</span>}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface DataUploadZoneProps {
  onDataUpload: (data: any) => void
}

interface UploadFile {
  id: string
  file: File
  progress: number
  status: "uploading" | "processing" | "completed" | "error"
  error?: string
}

export function DataUploadZone({ onDataUpload }: DataUploadZoneProps) {
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

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files).filter(
      (file) =>
        file.type === "text/csv" ||
        file.type === "application/vnd.ms-excel" ||
        file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    )

    if (files.length > 0) {
      processFiles(files)
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      processFiles(files)
    }
  }

  const processFiles = async (files: File[]) => {
    const newUploadFiles: UploadFile[] = files.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      progress: 0,
      status: "uploading",
    }))

    setUploadFiles((prev) => [...prev, ...newUploadFiles])

    // Simulate file processing
    for (const uploadFile of newUploadFiles) {
      try {
        // Simulate upload progress
        for (let progress = 0; progress <= 100; progress += 10) {
          await new Promise((resolve) => setTimeout(resolve, 100))
          setUploadFiles((prev) => prev.map((f) => (f.id === uploadFile.id ? { ...f, progress } : f)))
        }

        // Simulate processing
        setUploadFiles((prev) => prev.map((f) => (f.id === uploadFile.id ? { ...f, status: "processing" } : f)))

        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Simulate data parsing
        const mockData = await parseFile(uploadFile.file)

        setUploadFiles((prev) => prev.map((f) => (f.id === uploadFile.id ? { ...f, status: "completed" } : f)))

        // Call the upload callback
        onDataUpload({
          id: uploadFile.id,
          filename: uploadFile.file.name,
          data: mockData.data,
          columns: mockData.columns,
          uploadedAt: new Date(),
          size: uploadFile.file.size,
        })
      } catch (error) {
        setUploadFiles((prev) =>
          prev.map((f) =>
            f.id === uploadFile.id
              ? {
                  ...f,
                  status: "error",
                  error: "Failed to process file",
                }
              : f,
          ),
        )
      }
    }
  }

  const parseFile = async (file: File): Promise<{ data: any[]; columns: string[] }> => {
    // Mock data parsing - in real implementation, use libraries like Papa Parse for CSV or SheetJS for Excel
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockColumns = ["Date", "Revenue", "Expenses", "Profit", "Cash_Flow", "Assets", "Liabilities"]
        const mockData = Array.from({ length: 100 }, (_, i) => ({
          Date: new Date(2023, 0, i + 1).toISOString().split("T")[0],
          Revenue: Math.floor(Math.random() * 100000) + 50000,
          Expenses: Math.floor(Math.random() * 80000) + 30000,
          Profit: Math.floor(Math.random() * 30000) + 10000,
          Cash_Flow: Math.floor(Math.random() * 50000) + 20000,
          Assets: Math.floor(Math.random() * 500000) + 200000,
          Liabilities: Math.floor(Math.random() * 300000) + 100000,
        }))

        resolve({ data: mockData, columns: mockColumns })
      }, 1000)
    })
  }

  const removeFile = (id: string) => {
    setUploadFiles((prev) => prev.filter((f) => f.id !== id))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Upload className="h-4 w-4 text-blue-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600"
      case "error":
        return "text-red-600"
      case "processing":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <Card
        className={cn(
          "border-2 border-dashed transition-colors cursor-pointer",
          isDragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <CardContent className="flex flex-col items-center justify-center p-8 text-center">
          <div className="p-4 rounded-full bg-primary/10 mb-4">
            <Upload className={cn("h-8 w-8", isDragOver ? "text-primary" : "text-muted-foreground")} />
          </div>
          <h3 className="text-lg font-semibold mb-2">Upload Financial Data</h3>
          <p className="text-muted-foreground mb-4 max-w-md">
            Drop your Excel (.xlsx, .xls) or CSV files here, or click to browse. Maximum file size: 50MB
          </p>
          <div className="flex items-center gap-4 mb-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <FileSpreadsheet className="h-3 w-3" />
              Excel
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <FileSpreadsheet className="h-3 w-3" />
              CSV
            </Badge>
          </div>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept=".csv,.xlsx,.xls"
            multiple
            onChange={handleFileSelect}
          />
          <Button asChild>
            <label htmlFor="file-upload" className="cursor-pointer">
              Select Files
            </label>
          </Button>
        </CardContent>
      </Card>

      {/* File Processing Status */}
      {uploadFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>File Processing</CardTitle>
            <CardDescription>Track the progress of your uploaded files</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {uploadFiles.map((uploadFile) => (
              <div key={uploadFile.id} className="flex items-center gap-3 p-3 border rounded-lg">
                {getStatusIcon(uploadFile.status)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{uploadFile.file.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {uploadFile.status === "uploading" && (
                      <>
                        <Progress value={uploadFile.progress} className="flex-1 h-1" />
                        <span className="text-xs text-muted-foreground">{uploadFile.progress}%</span>
                      </>
                    )}
                    {uploadFile.status === "processing" && <p className="text-xs text-blue-600">Processing data...</p>}
                    {uploadFile.status === "completed" && <p className="text-xs text-green-600">Ready for analysis</p>}
                    {uploadFile.status === "error" && <p className="text-xs text-red-600">{uploadFile.error}</p>}
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => removeFile(uploadFile.id)} className="h-6 w-6 p-0">
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Sample Data Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Sample Data Templates</CardTitle>
          <CardDescription>Try our AI analysis with sample financial datasets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start bg-transparent">
              <h4 className="font-medium">Revenue Analysis</h4>
              <p className="text-xs text-muted-foreground mt-1">Monthly revenue and expense data</p>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start bg-transparent">
              <h4 className="font-medium">Cash Flow</h4>
              <p className="text-xs text-muted-foreground mt-1">Daily cash flow statements</p>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start bg-transparent">
              <h4 className="font-medium">Balance Sheet</h4>
              <p className="text-xs text-muted-foreground mt-1">Assets and liabilities data</p>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Requirements */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <strong>Data Requirements:</strong> For best results, ensure your data includes date columns, numerical
          values, and clear column headers. The AI can analyze time-series data, financial ratios, and perform
          forecasting on properly formatted datasets.
        </AlertDescription>
      </Alert>
    </div>
  )
}

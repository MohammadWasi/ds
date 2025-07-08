"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAnalysisContext } from "@/components/ai-analysis/analysis-context"
import { Upload, FileSpreadsheet, X, CheckCircle, AlertCircle } from "lucide-react"
import { useDropzone } from "react-dropzone"
import * as XLSX from "xlsx"
import Papa from "papaparse"

interface UploadedFile {
  file: File
  progress: number
  status: "uploading" | "processing" | "completed" | "error"
  error?: string
  data?: any[]
  columns?: string[]
}

export function DataUploadManager() {
  const { addFile } = useAnalysisContext()
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])

  const processFile = async (file: File): Promise<{ data: any[]; columns: string[] }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      let data: any // Declare data variable here

      reader.onload = (e) => {
        try {
          data = e.target?.result

          if (file.name.endsWith(".csv")) {
            Papa.parse(data as string, {
              header: true,
              skipEmptyLines: true,
              complete: (results) => {
                if (results.errors.length > 0) {
                  reject(new Error("CSV parsing error: " + results.errors[0].message))
                  return
                }

                const columns = results.meta.fields || []
                resolve({ data: results.data as any[], columns })
              },
              error: (error) => reject(error),
            })
          } else if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls")) {
            const workbook = XLSX.read(data, { type: "binary" })
            const sheetName = workbook.SheetNames[0]
            const worksheet = workbook.Sheets[sheetName]
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

            if (jsonData.length === 0) {
              reject(new Error("Empty spreadsheet"))
              return
            }

            const columns = jsonData[0] as string[]
            const parsedData = jsonData.slice(1).map((row: any[]) => {
              const obj: any = {}
              columns.forEach((col, index) => {
                obj[col] = row[index]
              })
              return obj
            })

            resolve({ data: parsedData, columns })
          } else {
            reject(new Error("Unsupported file format"))
          }
        } catch (error) {
          reject(error)
        }
      }

      reader.onerror = () => reject(new Error("File reading error"))

      if (file.name.endsWith(".csv")) {
        reader.readAsText(file)
      } else {
        reader.readAsBinaryString(file)
      }
    })
  }

  const analyzeData = (data: any[], columns: string[]) => {
    const numericColumns: string[] = []
    const dateColumns: string[] = []
    const textColumns: string[] = []
    let missingValues = 0

    columns.forEach((col) => {
      const sampleValues = data
        .slice(0, 100)
        .map((row) => row[col])
        .filter((val) => val != null)

      if (sampleValues.length === 0) {
        textColumns.push(col)
        return
      }

      // Check if numeric
      const numericValues = sampleValues.filter((val) => !isNaN(Number(val)))
      if (numericValues.length > sampleValues.length * 0.8) {
        numericColumns.push(col)
        return
      }

      // Check if date
      const dateValues = sampleValues.filter((val) => !isNaN(Date.parse(val)))
      if (dateValues.length > sampleValues.length * 0.8) {
        dateColumns.push(col)
        return
      }

      textColumns.push(col)
    })

    // Count missing values
    data.forEach((row) => {
      columns.forEach((col) => {
        if (row[col] == null || row[col] === "") {
          missingValues++
        }
      })
    })

    // Find duplicates
    const duplicates = data.length - new Set(data.map((row) => JSON.stringify(row))).size

    return {
      rows: data.length,
      numericColumns,
      dateColumns,
      textColumns,
      missingValues,
      duplicates,
    }
  }

  const handleFileUpload = async (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      progress: 0,
      status: "uploading" as const,
    }))

    setUploadedFiles((prev) => [...prev, ...newFiles])

    for (let i = 0; i < newFiles.length; i++) {
      const fileIndex = uploadedFiles.length + i
      const file = newFiles[i].file

      try {
        // Simulate upload progress
        for (let progress = 0; progress <= 100; progress += 20) {
          setUploadedFiles((prev) => prev.map((f, idx) => (idx === fileIndex ? { ...f, progress } : f)))
          await new Promise((resolve) => setTimeout(resolve, 100))
        }

        // Update status to processing
        setUploadedFiles((prev) => prev.map((f, idx) => (idx === fileIndex ? { ...f, status: "processing" } : f)))

        // Process the file
        const { data, columns } = await processFile(file)
        const summary = analyzeData(data, columns)

        // Create data file object
        const dataFile = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          name: file.name,
          size: file.size,
          type: file.type,
          data,
          columns,
          uploadedAt: new Date(),
          processed: true,
          summary,
        }

        // Add to context
        addFile(dataFile)

        // Update status to completed
        setUploadedFiles((prev) =>
          prev.map((f, idx) =>
            idx === fileIndex
              ? {
                  ...f,
                  status: "completed",
                  data,
                  columns,
                }
              : f,
          ),
        )
      } catch (error) {
        setUploadedFiles((prev) =>
          prev.map((f, idx) =>
            idx === fileIndex
              ? {
                  ...f,
                  status: "error",
                  error: error instanceof Error ? error.message : "Unknown error",
                }
              : f,
          ),
        )
      }
    }
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileUpload,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
      "application/vnd.ms-excel": [".xls"],
    },
    multiple: true,
  })

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Data Files
          </CardTitle>
          <CardDescription>
            Upload CSV or Excel files to begin AI-powered analysis. Supported formats: .csv, .xlsx, .xls
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
            }`}
          >
            <input {...getInputProps()} />
            <FileSpreadsheet className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            {isDragActive ? (
              <p className="text-lg font-medium">Drop your files here...</p>
            ) : (
              <div>
                <p className="text-lg font-medium mb-2">Drag & drop files here, or click to select</p>
                <p className="text-sm text-muted-foreground">Supports CSV, Excel (.xlsx, .xls) files up to 50MB</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {uploadedFiles.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Upload Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {uploadedFiles.map((uploadedFile, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="h-4 w-4" />
                    <span className="text-sm font-medium">{uploadedFile.file.name}</span>
                    <span className="text-xs text-muted-foreground">
                      ({(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {uploadedFile.status === "completed" && <CheckCircle className="h-4 w-4 text-green-500" />}
                    {uploadedFile.status === "error" && <AlertCircle className="h-4 w-4 text-red-500" />}
                    <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {uploadedFile.status === "uploading" && <Progress value={uploadedFile.progress} className="h-2" />}

                {uploadedFile.status === "processing" && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-primary"></div>
                    Processing file...
                  </div>
                )}

                {uploadedFile.status === "completed" && uploadedFile.data && (
                  <div className="text-sm text-muted-foreground">
                    ✓ Processed {uploadedFile.data.length} rows, {uploadedFile.columns?.length} columns
                  </div>
                )}

                {uploadedFile.status === "error" && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{uploadedFile.error}</AlertDescription>
                  </Alert>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

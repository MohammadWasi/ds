"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { FileText, BarChart3, Info, Calendar, DollarSign, TrendingUp } from "lucide-react"
import { formatFileSize } from "@/lib/utils"

interface DataPreviewProps {
  data: {
    id: string
    filename: string
    data: any[]
    columns: string[]
    uploadedAt: Date
    size: number
  }
}

export function DataPreview({ data }: DataPreviewProps) {
  const [previewRows, setPreviewRows] = useState(10)
  const [selectedColumn, setSelectedColumn] = useState(data.columns[0])

  // Data analysis
  const totalRows = data.data.length
  const numericColumns = data.columns.filter((col) => data.data.some((row) => typeof row[col] === "number"))
  const dateColumns = data.columns.filter((col) => data.data.some((row) => !isNaN(Date.parse(row[col]))))

  // Basic statistics for selected column
  const getColumnStats = (columnName: string) => {
    const values = data.data.map((row) => row[columnName]).filter((val) => typeof val === "number")
    if (values.length === 0) return null

    const sum = values.reduce((a, b) => a + b, 0)
    const avg = sum / values.length
    const min = Math.min(...values)
    const max = Math.max(...values)
    const sorted = [...values].sort((a, b) => a - b)
    const median =
      sorted.length % 2 === 0
        ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
        : sorted[Math.floor(sorted.length / 2)]

    return { sum, avg, min, max, median, count: values.length }
  }

  const columnStats = numericColumns.length > 0 ? getColumnStats(selectedColumn) : null

  // Prepare chart data (first 20 rows for preview)
  const chartData = data.data.slice(0, 20).map((row, index) => ({
    index: index + 1,
    [selectedColumn]: row[selectedColumn],
    ...row,
  }))

  return (
    <div className="space-y-6">
      {/* File Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Data Overview
          </CardTitle>
          <CardDescription>Summary of your uploaded dataset</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Filename</p>
              <p className="font-medium truncate">{data.filename}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">File Size</p>
              <p className="font-medium">{formatFileSize(data.size)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Rows</p>
              <p className="font-medium">{totalRows.toLocaleString()}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Columns</p>
              <p className="font-medium">{data.columns.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Column Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Column Analysis
          </CardTitle>
          <CardDescription>Detected column types and data patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-500" />
                <span className="font-medium">Numeric Columns</span>
                <Badge variant="secondary">{numericColumns.length}</Badge>
              </div>
              <div className="flex flex-wrap gap-1">
                {numericColumns.map((col) => (
                  <Badge key={col} variant="outline" className="text-xs">
                    {col}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-500" />
                <span className="font-medium">Date Columns</span>
                <Badge variant="secondary">{dateColumns.length}</Badge>
              </div>
              <div className="flex flex-wrap gap-1">
                {dateColumns.map((col) => (
                  <Badge key={col} variant="outline" className="text-xs">
                    {col}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Text Columns</span>
                <Badge variant="secondary">{data.columns.length - numericColumns.length - dateColumns.length}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Preview Tabs */}
      <Tabs defaultValue="table" className="space-y-4">
        <TabsList>
          <TabsTrigger value="table">Table View</TabsTrigger>
          <TabsTrigger value="chart">Quick Chart</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>

        {/* Table View */}
        <TabsContent value="table" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Data Preview</CardTitle>
                <Select
                  value={previewRows.toString()}
                  onValueChange={(value) => setPreviewRows(Number.parseInt(value))}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 rows</SelectItem>
                    <SelectItem value="25">25 rows</SelectItem>
                    <SelectItem value="50">50 rows</SelectItem>
                    <SelectItem value="100">100 rows</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <CardDescription>
                Showing {Math.min(previewRows, totalRows)} of {totalRows} rows
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto max-h-96">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {data.columns.map((column) => (
                        <TableHead key={column} className="whitespace-nowrap">
                          {column}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.data.slice(0, previewRows).map((row, index) => (
                      <TableRow key={index}>
                        {data.columns.map((column) => (
                          <TableCell key={column} className="whitespace-nowrap">
                            {typeof row[column] === "number"
                              ? row[column].toLocaleString()
                              : row[column]?.toString() || "-"}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Chart View */}
        <TabsContent value="chart" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Quick Visualization
                </CardTitle>
                <Select value={selectedColumn} onValueChange={setSelectedColumn}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {numericColumns.map((column) => (
                      <SelectItem key={column} value={column}>
                        {column}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <CardDescription>Preview visualization for {selectedColumn} (first 20 rows)</CardDescription>
            </CardHeader>
            <CardContent>
              {numericColumns.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Line Chart</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="index" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey={selectedColumn} stroke="hsl(var(--primary))" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Bar Chart</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="index" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey={selectedColumn} fill="hsl(var(--primary))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">No numeric columns found for visualization</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Statistics View */}
        <TabsContent value="stats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Statistical Summary
              </CardTitle>
              <CardDescription>Basic statistics for numeric columns</CardDescription>
            </CardHeader>
            <CardContent>
              {numericColumns.length > 0 ? (
                <div className="space-y-4">
                  <Select value={selectedColumn} onValueChange={setSelectedColumn}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {numericColumns.map((column) => (
                        <SelectItem key={column} value={column}>
                          {column}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {columnStats && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Count</p>
                        <p className="text-lg font-semibold">{columnStats.count.toLocaleString()}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Sum</p>
                        <p className="text-lg font-semibold">{columnStats.sum.toLocaleString()}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Average</p>
                        <p className="text-lg font-semibold">{columnStats.avg.toFixed(2)}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Median</p>
                        <p className="text-lg font-semibold">{columnStats.median.toFixed(2)}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Min</p>
                        <p className="text-lg font-semibold">{columnStats.min.toLocaleString()}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Max</p>
                        <p className="text-lg font-semibold">{columnStats.max.toLocaleString()}</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No numeric columns found for statistical analysis
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

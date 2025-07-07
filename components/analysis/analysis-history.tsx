"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { History, Search, MoreHorizontal, Download, Eye, Trash2, FileText } from "lucide-react"
import { formatFileSize } from "@/lib/utils"

interface AnalysisRecord {
  id: string
  filename: string
  uploadDate: Date
  analysisType: string[]
  status: "completed" | "in-progress" | "failed"
  fileSize: number
  insights: number
  forecasts: number
}

const mockHistory: AnalysisRecord[] = [
  {
    id: "1",
    filename: "Q4_Financial_Data.xlsx",
    uploadDate: new Date("2024-01-15"),
    analysisType: ["Revenue Analysis", "Forecasting", "Risk Assessment"],
    status: "completed",
    fileSize: 2048000,
    insights: 12,
    forecasts: 3,
  },
  {
    id: "2",
    filename: "Cash_Flow_2023.csv",
    uploadDate: new Date("2024-01-10"),
    analysisType: ["Cash Flow Analysis", "Trend Analysis"],
    status: "completed",
    fileSize: 1024000,
    insights: 8,
    forecasts: 2,
  },
  {
    id: "3",
    filename: "Balance_Sheet_Data.xlsx",
    uploadDate: new Date("2024-01-08"),
    analysisType: ["Financial Ratios", "Liquidity Analysis"],
    status: "completed",
    fileSize: 3072000,
    insights: 15,
    forecasts: 1,
  },
  {
    id: "4",
    filename: "Monthly_Revenue.csv",
    uploadDate: new Date("2024-01-05"),
    analysisType: ["Forecasting"],
    status: "in-progress",
    fileSize: 512000,
    insights: 0,
    forecasts: 0,
  },
]

export function AnalysisHistory() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredHistory, setFilteredHistory] = useState(mockHistory)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    const filtered = mockHistory.filter(
      (record) =>
        record.filename.toLowerCase().includes(query.toLowerCase()) ||
        record.analysisType.some((type) => type.toLowerCase().includes(query.toLowerCase())),
    )
    setFilteredHistory(filtered)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "in-progress":
        return "secondary"
      case "failed":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Analysis History
          </CardTitle>
          <CardDescription>View and manage your previous AI data analysis sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search analysis history..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Analysis Sessions</CardTitle>
          <CardDescription>{filteredHistory.length} analysis sessions found</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File</TableHead>
                <TableHead>Analysis Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Results</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredHistory.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{record.filename}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{formatFileSize(record.fileSize)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {record.analysisType.map((type, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{record.uploadDate.toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(record.status)}>{record.status}</Badge>
                  </TableCell>
                  <TableCell>
                    {record.status === "completed" ? (
                      <div className="text-sm">
                        <div>{record.insights} insights</div>
                        <div className="text-muted-foreground">{record.forecasts} forecasts</div>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Results
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="h-4 w-4 mr-2" />
                          Download Report
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{mockHistory.filter((r) => r.status === "completed").length}</div>
            <p className="text-sm text-muted-foreground">Completed Analyses</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{mockHistory.reduce((sum, r) => sum + r.insights, 0)}</div>
            <p className="text-sm text-muted-foreground">Total Insights</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{mockHistory.reduce((sum, r) => sum + r.forecasts, 0)}</div>
            <p className="text-sm text-muted-foreground">Forecasts Generated</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {formatFileSize(mockHistory.reduce((sum, r) => sum + r.fileSize, 0))}
            </div>
            <p className="text-sm text-muted-foreground">Data Processed</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

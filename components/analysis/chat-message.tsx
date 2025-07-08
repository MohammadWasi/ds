"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Brain, User, Download, Maximize2, Copy, ThumbsUp, ThumbsDown, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatMessageProps {
  message: {
    id: string
    type: "user" | "ai" | "system"
    content: string
    timestamp: Date
    analysis?: {
      type: "chart" | "table" | "insight" | "forecast" | "statistics"
      data?: any
      chartType?: string
      title?: string
      description?: string
      exportable?: boolean
    }
    isLoading?: boolean
    error?: string
  }
}

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

export function ChatMessage({ message }: ChatMessageProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const renderAnalysis = () => {
    if (!message.analysis) return null

    const { type, data, chartType, title, description } = message.analysis

    switch (type) {
      case "chart":
        return (
          <Card className="mt-3">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">{title}</CardTitle>
                  {description && <CardDescription className="text-sm">{description}</CardDescription>}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Maximize2 className="h-3 w-3 mr-1" />
                    Expand
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-3 w-3 mr-1" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                {chartType === "line" && (
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [Number(value).toLocaleString(), ""]} />
                    <Legend />
                    {Object.keys(data[0] || {})
                      .filter((key) => key !== "name")
                      .map((key, index) => (
                        <Line
                          key={key}
                          type="monotone"
                          dataKey={key}
                          stroke={COLORS[index % COLORS.length]}
                          strokeWidth={2}
                        />
                      ))}
                  </LineChart>
                )}
                {chartType === "bar" && (
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [Number(value).toLocaleString(), ""]} />
                    <Legend />
                    {Object.keys(data[0] || {})
                      .filter((key) => key !== "name")
                      .map((key, index) => (
                        <Bar key={key} dataKey={key} fill={COLORS[index % COLORS.length]} />
                      ))}
                  </BarChart>
                )}
                {chartType === "area" && (
                  <AreaChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [Number(value).toLocaleString(), ""]} />
                    <Legend />
                    {Object.keys(data[0] || {})
                      .filter((key) => key !== "name")
                      .map((key, index) => (
                        <Area
                          key={key}
                          type="monotone"
                          dataKey={key}
                          stackId="1"
                          stroke={COLORS[index % COLORS.length]}
                          fill={COLORS[index % COLORS.length]}
                          fillOpacity={0.6}
                        />
                      ))}
                  </AreaChart>
                )}
                {chartType === "pie" && (
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {data.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [Number(value).toLocaleString(), ""]} />
                  </PieChart>
                )}
                {chartType === "scatter" && (
                  <ScatterChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="x" />
                    <YAxis dataKey="y" />
                    <Tooltip formatter={(value) => [Number(value).toLocaleString(), ""]} />
                    <Scatter dataKey="y" fill="hsl(var(--primary))" />
                  </ScatterChart>
                )}
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )

      case "table":
        return (
          <Card className="mt-3">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">{title}</CardTitle>
                  {description && <CardDescription className="text-sm">{description}</CardDescription>}
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-3 w-3 mr-1" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto max-h-64">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {Object.keys(data[0] || {}).map((key) => (
                        <TableHead key={key}>{key}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.slice(0, 10).map((row: any, index: number) => (
                      <TableRow key={index}>
                        {Object.values(row).map((value: any, cellIndex) => (
                          <TableCell key={cellIndex}>
                            {typeof value === "number" ? value.toLocaleString() : String(value)}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {data.length > 10 && (
                  <p className="text-xs text-muted-foreground mt-2 text-center">Showing 10 of {data.length} rows</p>
                )}
              </div>
            </CardContent>
          </Card>
        )

      case "statistics":
        return (
          <Card className="mt-3">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{title}</CardTitle>
              {description && <CardDescription className="text-sm">{description}</CardDescription>}
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(data).map(([key, value]) => (
                  <div key={key} className="text-center p-3 border rounded-lg">
                    <div className="text-2xl font-bold">
                      {typeof value === "number" ? value.toLocaleString() : value}
                    </div>
                    <div className="text-sm text-muted-foreground capitalize">{key.replace(/([A-Z])/g, " $1")}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )

      case "insight":
        return (
          <Card className="mt-3 border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2 text-blue-700 dark:text-blue-300">
                <Lightbulb className="h-4 w-4" />
                {title}
              </CardTitle>
              {description && (
                <CardDescription className="text-sm text-blue-600 dark:text-blue-400">{description}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-blue-600 dark:text-blue-400">
                {Array.isArray(data) ? (
                  data.map((insight: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-500 mt-1">•</span>
                      {insight}
                    </li>
                  ))
                ) : (
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    {String(data)}
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>
        )

      case "forecast":
        return (
          <Card className="mt-3">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{title}</CardTitle>
              {description && <CardDescription className="text-sm">{description}</CardDescription>}
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="chart" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="chart">Chart View</TabsTrigger>
                  <TabsTrigger value="table">Data Table</TabsTrigger>
                  <TabsTrigger value="insights">Insights</TabsTrigger>
                </TabsList>
                <TabsContent value="chart">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data.chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="period" />
                      <YAxis />
                      <Tooltip formatter={(value) => [Number(value).toLocaleString(), ""]} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="actual"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        name="Historical"
                      />
                      <Line
                        type="monotone"
                        dataKey="forecast"
                        stroke="hsl(var(--chart-2))"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Forecast"
                      />
                      <Line
                        type="monotone"
                        dataKey="upperBound"
                        stroke="hsl(var(--muted-foreground))"
                        strokeWidth={1}
                        strokeDasharray="2 2"
                        name="Upper Bound"
                      />
                      <Line
                        type="monotone"
                        dataKey="lowerBound"
                        stroke="hsl(var(--muted-foreground))"
                        strokeWidth={1}
                        strokeDasharray="2 2"
                        name="Lower Bound"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
                <TabsContent value="table">
                  <div className="overflow-auto max-h-64">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Period</TableHead>
                          <TableHead>Actual</TableHead>
                          <TableHead>Forecast</TableHead>
                          <TableHead>Confidence</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {data.chartData.map((row: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell>{row.period}</TableCell>
                            <TableCell>{row.actual ? Number(row.actual).toLocaleString() : "-"}</TableCell>
                            <TableCell>{row.forecast ? Number(row.forecast).toLocaleString() : "-"}</TableCell>
                            <TableCell>
                              {row.upperBound && row.lowerBound ? (
                                <span className="text-xs">
                                  {Number(row.lowerBound).toLocaleString()} - {Number(row.upperBound).toLocaleString()}
                                </span>
                              ) : (
                                "-"
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                <TabsContent value="insights">
                  <div className="space-y-3">
                    {data.insights?.map((insight: string, index: number) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-blue-500 mt-1">•</span>
                        {insight}
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  const getMessageIcon = () => {
    switch (message.type) {
      case "user":
        return <User className="h-4 w-4" />
      case "ai":
        return <Brain className="h-4 w-4" />
      case "system":
        return <Lightbulb className="h-4 w-4" />
      default:
        return <Brain className="h-4 w-4" />
    }
  }

  const getMessageStyle = () => {
    switch (message.type) {
      case "user":
        return "bg-primary text-primary-foreground ml-auto"
      case "ai":
        return "bg-muted"
      case "system":
        return "bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800"
      default:
        return "bg-muted"
    }
  }

  const getAvatarStyle = () => {
    switch (message.type) {
      case "user":
        return "bg-primary text-primary-foreground"
      case "ai":
        return "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300"
      case "system":
        return "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
      default:
        return "bg-muted"
    }
  }

  return (
    <div className={cn("flex gap-3", message.type === "user" ? "justify-end" : "justify-start")}>
      <div className={cn("flex gap-3 max-w-[85%]", message.type === "user" ? "flex-row-reverse" : "flex-row")}>
        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0", getAvatarStyle())}>
          {getMessageIcon()}
        </div>
        <div className={cn("rounded-lg p-3 space-y-1", getMessageStyle())}>
          <div className="text-sm whitespace-pre-wrap">{message.content}</div>
          <div className="flex items-center justify-between">
            <p className="text-xs opacity-70">{message.timestamp.toLocaleTimeString()}</p>
            {message.type === "ai" && (
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Copy className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <ThumbsUp className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <ThumbsDown className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
          {renderAnalysis()}
          {message.error && (
            <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-red-600 text-xs">
              Error: {message.error}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

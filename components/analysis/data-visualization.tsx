"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
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
import { BarChart3, Download, Settings } from "lucide-react"

interface DataVisualizationProps {
  data: {
    id: string
    filename: string
    data: any[]
    columns: string[]
    uploadedAt: Date
    size: number
  }
}

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

export function DataVisualization({ data }: DataVisualizationProps) {
  const [chartType, setChartType] = useState<"line" | "bar" | "area" | "pie" | "scatter">("line")
  const [xAxis, setXAxis] = useState(data.columns[0])
  const [yAxis, setYAxis] = useState(data.columns[1] || data.columns[0])
  const [groupBy, setGroupBy] = useState<string | null>(null)

  // Filter numeric columns for Y-axis
  const numericColumns = data.columns.filter((col) => data.data.some((row) => typeof row[col] === "number"))

  // Prepare chart data
  const chartData = data.data.slice(0, 50).map((row, index) => ({
    index: index + 1,
    ...row,
  }))

  // Prepare pie chart data
  const pieData = numericColumns.slice(0, 5).map((col) => ({
    name: col,
    value: data.data.reduce((sum, row) => sum + (row[col] || 0), 0) / data.data.length,
  }))

  const renderChart = () => {
    switch (chartType) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxis} />
              <YAxis />
              <Tooltip formatter={(value) => [typeof value === "number" ? value.toLocaleString() : value, ""]} />
              <Legend />
              <Line type="monotone" dataKey={yAxis} stroke="hsl(var(--primary))" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        )

      case "bar":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxis} />
              <YAxis />
              <Tooltip formatter={(value) => [typeof value === "number" ? value.toLocaleString() : value, ""]} />
              <Legend />
              <Bar dataKey={yAxis} fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        )

      case "area":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxis} />
              <YAxis />
              <Tooltip formatter={(value) => [typeof value === "number" ? value.toLocaleString() : value, ""]} />
              <Legend />
              <Area
                type="monotone"
                dataKey={yAxis}
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        )

      case "pie":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [Number(value).toLocaleString(), ""]} />
            </PieChart>
          </ResponsiveContainer>
        )

      case "scatter":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxis} />
              <YAxis dataKey={yAxis} />
              <Tooltip formatter={(value) => [typeof value === "number" ? value.toLocaleString() : value, ""]} />
              <Scatter dataKey={yAxis} fill="hsl(var(--primary))" />
            </ScatterChart>
          </ResponsiveContainer>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Chart Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Visualization Controls
          </CardTitle>
          <CardDescription>Customize your data visualization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Chart Type</label>
              <Select value={chartType} onValueChange={(value: any) => setChartType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="line">Line Chart</SelectItem>
                  <SelectItem value="bar">Bar Chart</SelectItem>
                  <SelectItem value="area">Area Chart</SelectItem>
                  <SelectItem value="pie">Pie Chart</SelectItem>
                  <SelectItem value="scatter">Scatter Plot</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {chartType !== "pie" && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">X-Axis</label>
                  <Select value={xAxis} onValueChange={setXAxis}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {data.columns.map((column) => (
                        <SelectItem key={column} value={column}>
                          {column}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Y-Axis</label>
                  <Select value={yAxis} onValueChange={setYAxis}>
                    <SelectTrigger>
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
              </>
            )}

            <div className="flex items-end gap-2">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Advanced
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Data Visualization</span>
            <Badge variant="secondary">{chartType === "pie" ? "Average Values" : `${xAxis} vs ${yAxis}`}</Badge>
          </CardTitle>
          <CardDescription>
            {chartType === "pie"
              ? "Distribution of average values across numeric columns"
              : `Showing ${chartData.length} data points from your dataset`}
          </CardDescription>
        </CardHeader>
        <CardContent>{renderChart()}</CardContent>
      </Card>

      {/* Multiple Charts View */}
      <Tabs defaultValue="single" className="space-y-4">
        <TabsList>
          <TabsTrigger value="single">Single Chart</TabsTrigger>
          <TabsTrigger value="multiple">Multiple Views</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        </TabsList>

        <TabsContent value="multiple" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {numericColumns.slice(0, 4).map((column, index) => (
              <Card key={column}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{column} Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={chartData.slice(0, 20)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="index" />
                      <YAxis />
                      <Tooltip formatter={(value) => [Number(value).toLocaleString(), ""]} />
                      <Line type="monotone" dataKey={column} stroke={COLORS[index % COLORS.length]} strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Summary Stats */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-base">Summary Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {numericColumns.slice(0, 3).map((column) => {
                    const values = data.data.map((row) => row[column]).filter((val) => typeof val === "number")
                    const avg = values.reduce((a, b) => a + b, 0) / values.length
                    const max = Math.max(...values)
                    const min = Math.min(...values)

                    return (
                      <div key={column} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{column}</span>
                          <span className="text-sm text-muted-foreground">Avg: {avg.toFixed(0)}</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: `${(avg / max) * 100}%` }} />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Min: {min.toLocaleString()}</span>
                          <span>Max: {max.toLocaleString()}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Main Chart */}
            <Card className="lg:col-span-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Trend Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={chartData.slice(0, 30)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="index" />
                    <YAxis />
                    <Tooltip formatter={(value) => [Number(value).toLocaleString(), ""]} />
                    <Legend />
                    {numericColumns.slice(0, 3).map((column, index) => (
                      <Line
                        key={column}
                        type="monotone"
                        dataKey={column}
                        stroke={COLORS[index]}
                        strokeWidth={2}
                        name={column}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

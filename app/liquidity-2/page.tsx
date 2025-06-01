"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Navbar } from "@/components/dashboard/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  ComposedChart,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Activity,
  Download,
  RefreshCw,
  Droplets,
} from "lucide-react"

// Enhanced banking liquidity data with color coding
const nsfrData = [
  { date: "4/25", value: 18.2, threshold: 15.0, status: "surplus" },
  { date: "5/25", value: 17.5, threshold: 15.0, status: "surplus" },
  { date: "6/25", value: 15.9, threshold: 15.0, status: "surplus" },
  { date: "7/25", value: 16.2, threshold: 15.0, status: "surplus" },
  { date: "8/25", value: 16.0, threshold: 15.0, status: "surplus" },
  { date: "9/25", value: 15.7, threshold: 15.0, status: "surplus" },
  { date: "10/25", value: 15.8, threshold: 15.0, status: "surplus" },
  { date: "11/25", value: 15.6, threshold: 15.0, status: "surplus" },
  { date: "12/25", value: 15.3, threshold: 15.0, status: "surplus" },
  { date: "1/26", value: 15.1, threshold: 15.0, status: "surplus" },
  { date: "2/26", value: 14.9, threshold: 15.0, status: "deficit" },
  { date: "3/26", value: 14.7, threshold: 15.0, status: "deficit" },
  { date: "4/26", value: 14.5, threshold: 15.0, status: "deficit" },
]

const liquidityHeadroomData = [
  { date: "4/25", value: 12.4, trend: "declining" },
  { date: "5/25", value: 11.9, trend: "declining" },
  { date: "6/25", value: 11.1, trend: "declining" },
  { date: "7/25", value: 10.8, trend: "declining" },
  { date: "8/25", value: 10.5, trend: "declining" },
  { date: "9/25", value: 10.2, trend: "declining" },
  { date: "10/25", value: 9.9, trend: "declining" },
  { date: "11/25", value: 9.6, trend: "declining" },
  { date: "12/25", value: 9.4, trend: "declining" },
  { date: "1/26", value: 9.1, trend: "declining" },
  { date: "2/26", value: 8.8, trend: "declining" },
  { date: "3/26", value: 8.5, trend: "declining" },
  { date: "4/26", value: 8.2, trend: "declining" },
]

const dailyCashData = [
  { date: "4/25", value: 5.5, target: 5.0, status: "above" },
  { date: "5/25", value: 6.2, target: 5.0, status: "above" },
  { date: "6/25", value: 6.0, target: 5.0, status: "above" },
  { date: "7/25", value: 6.5, target: 5.0, status: "above" },
  { date: "8/25", value: 6.3, target: 5.0, status: "above" },
  { date: "9/25", value: 6.1, target: 5.0, status: "above" },
  { date: "10/25", value: 5.8, target: 5.0, status: "above" },
  { date: "11/25", value: 5.7, target: 5.0, status: "above" },
  { date: "12/25", value: 5.4, target: 5.0, status: "above" },
  { date: "1/26", value: 5.2, target: 5.0, status: "above" },
  { date: "2/26", value: 5.0, target: 5.0, status: "target" },
  { date: "3/26", value: 4.8, target: 5.0, status: "below" },
  { date: "4/26", value: 4.6, target: 5.0, status: "below" },
]

const hqlaData = [
  { date: "4/25", value: 90.0, minimum: 80.0, category: "Level 1", level2: 15.0, level3: 5.0 },
  { date: "5/25", value: 88.5, minimum: 80.0, category: "Level 1", level2: 14.8, level3: 4.9 },
  { date: "6/25", value: 87.2, minimum: 80.0, category: "Level 1", level2: 14.5, level3: 4.8 },
  { date: "7/25", value: 86.0, minimum: 80.0, category: "Level 1", level2: 14.2, level3: 4.7 },
  { date: "8/25", value: 85.4, minimum: 80.0, category: "Level 1", level2: 14.0, level3: 4.6 },
  { date: "9/25", value: 84.6, minimum: 80.0, category: "Level 1", level2: 13.8, level3: 4.5 },
  { date: "10/25", value: 84.1, minimum: 80.0, category: "Level 1", level2: 13.6, level3: 4.4 },
  { date: "11/25", value: 83.5, minimum: 80.0, category: "Level 1", level2: 13.4, level3: 4.3 },
  { date: "12/25", value: 83.0, minimum: 80.0, category: "Level 1", level2: 13.2, level3: 4.2 },
  { date: "1/26", value: 82.5, minimum: 80.0, category: "Level 1", level2: 13.0, level3: 4.1 },
  { date: "2/26", value: 82.0, minimum: 80.0, category: "Level 1", level2: 12.8, level3: 4.0 },
  { date: "3/26", value: 81.5, minimum: 80.0, category: "Level 1", level2: 12.6, level3: 3.9 },
  { date: "4/26", value: 81.0, minimum: 80.0, category: "Level 1", level2: 12.4, level3: 3.8 },
]

const wholesaleFundingData = [
  { date: "4/25", value: 70.0, limit: 75.0, concentration: 65.0 },
  { date: "5/25", value: 71.5, limit: 75.0, concentration: 66.2 },
  { date: "6/25", value: 72.0, limit: 75.0, concentration: 67.1 },
  { date: "7/25", value: 72.3, limit: 75.0, concentration: 67.8 },
  { date: "8/25", value: 72.9, limit: 75.0, concentration: 68.5 },
  { date: "9/25", value: 73.1, limit: 75.0, concentration: 69.0 },
  { date: "10/25", value: 73.5, limit: 75.0, concentration: 69.8 },
  { date: "11/25", value: 73.8, limit: 75.0, concentration: 70.2 },
  { date: "12/25", value: 74.1, limit: 75.0, concentration: 70.9 },
  { date: "1/26", value: 74.3, limit: 75.0, concentration: 71.3 },
  { date: "2/26", value: 74.7, limit: 75.0, concentration: 71.8 },
  { date: "3/26", value: 75.0, limit: 75.0, concentration: 72.5 },
  { date: "4/26", value: 75.3, limit: 75.0, concentration: 73.0 },
]

// Chart colors based on the palette
const chartColors = {
  primary: "hsl(221, 83%, 53%)", // Primary blue
  secondary: "hsl(142, 76%, 36%)", // Green
  accent: "hsl(271, 81%, 56%)", // Purple
  warning: "hsl(43, 96%, 56%)", // Yellow
  danger: "hsl(0, 84%, 60%)", // Red/Pink
  success: "hsl(142, 76%, 36%)", // Green
  info: "hsl(199, 89%, 48%)", // Teal
  neutral: "hsl(215, 16%, 47%)", // Slate
}

// Risk assessment data
const riskMetrics = [
  {
    metric: "NSFR Ratio",
    current: "96.7%",
    threshold: "100%",
    status: "warning",
    trend: "down",
    description: "Net Stable Funding Ratio",
    color: chartColors.warning,
  },
  {
    metric: "LCR Ratio",
    current: "125.3%",
    threshold: "100%",
    status: "healthy",
    trend: "up",
    description: "Liquidity Coverage Ratio",
    color: chartColors.success,
  },
  {
    metric: "Cash Buffer",
    current: "$4.6B",
    threshold: "$5.0B",
    status: "warning",
    trend: "down",
    description: "Available cash position",
    color: chartColors.warning,
  },
  {
    metric: "Funding Concentration",
    current: "75.3%",
    threshold: "75%",
    status: "critical",
    trend: "up",
    description: "Wholesale funding exposure",
    color: chartColors.danger,
  },
]

// Enhanced stress test scenarios
const stressScenarios = [
  {
    scenario: "Mild Stress",
    nsfr: 16.2,
    headroom: 7.8,
    cash: 4.2,
    hqla: 78.5,
    impact: "Low",
    probability: "25%",
    color: chartColors.success,
  },
  {
    scenario: "Moderate Stress",
    nsfr: 14.8,
    headroom: 6.1,
    cash: 3.5,
    hqla: 72.1,
    impact: "Medium",
    probability: "15%",
    color: chartColors.warning,
  },
  {
    scenario: "Severe Stress",
    nsfr: 12.9,
    headroom: 4.2,
    cash: 2.8,
    hqla: 65.8,
    impact: "High",
    probability: "5%",
    color: chartColors.accent,
  },
  {
    scenario: "Extreme Stress",
    nsfr: 10.5,
    headroom: 2.1,
    cash: 1.9,
    hqla: 58.2,
    impact: "Critical",
    probability: "1%",
    color: chartColors.danger,
  },
]

export default function LiquidityDashboard() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [timeRange, setTimeRange] = useState("12m")
  const [selectedTab, setSelectedTab] = useState("overview")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return chartColors.success
      case "warning":
        return chartColors.warning
      case "critical":
        return chartColors.danger
      default:
        return chartColors.neutral
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return CheckCircle
      case "warning":
        return AlertTriangle
      case "critical":
        return AlertTriangle
      default:
        return Activity
    }
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{`Date: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey}: $${entry.value}B`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <main className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${chartColors.info}20` }}>
                  <Droplets className="h-6 w-6" style={{ color: chartColors.info }} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Banking Liquidity Dashboard</h1>
                  <p className="text-muted-foreground">Monitor regulatory liquidity metrics and funding stability</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3m">3 months</SelectItem>
                    <SelectItem value="6m">6 months</SelectItem>
                    <SelectItem value="12m">12 months</SelectItem>
                    <SelectItem value="24m">24 months</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* Risk Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {riskMetrics.map((metric) => {
                const StatusIcon = getStatusIcon(metric.status)
                const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown

                return (
                  <Card key={metric.metric} className="relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: metric.color }} />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{metric.metric}</CardTitle>
                      <StatusIcon className="h-4 w-4" style={{ color: metric.color }} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{metric.current}</div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Threshold: {metric.threshold}</span>
                        <div className="flex items-center">
                          <TrendIcon
                            className="h-3 w-3 mr-1"
                            style={{ color: metric.trend === "up" ? chartColors.danger : chartColors.success }}
                          />
                          <Badge
                            variant={
                              metric.status === "healthy"
                                ? "default"
                                : metric.status === "warning"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {metric.status}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Main Content Tabs */}
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="metrics">Detailed Metrics</TabsTrigger>
                <TabsTrigger value="stress">Stress Testing</TabsTrigger>
                <TabsTrigger value="funding">Funding Analysis</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* NSFR Surplus/Deficit */}
                  <Card>
                    <CardHeader>
                      <CardTitle>NSFR Surplus/(Deficit) Forecast</CardTitle>
                      <CardDescription>Net Stable Funding Ratio trend over time ($B)</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={nsfrData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                          <YAxis stroke="hsl(var(--muted-foreground))" />
                          <Tooltip content={<CustomTooltip />} />
                          <ReferenceLine y={15} stroke={chartColors.danger} strokeDasharray="5 5" label="Threshold" />
                          <Bar
                            dataKey="value"
                            fill={(entry: any) =>
                              entry?.status === "surplus" ? chartColors.success : chartColors.danger
                            }
                            name="NSFR Surplus"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Liquidity Headroom */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Liquidity Headroom Forecast</CardTitle>
                      <CardDescription>Available buffer above regulatory limits ($B)</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={liquidityHeadroomData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                          <YAxis stroke="hsl(var(--muted-foreground))" />
                          <Tooltip content={<CustomTooltip />} />
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke={chartColors.info}
                            fill={chartColors.info}
                            fillOpacity={0.3}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                {/* Combined Metrics Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle>All Metrics Overview</CardTitle>
                    <CardDescription>Combined view of key liquidity metrics over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <ComposedChart
                        data={nsfrData.map((item, index) => ({
                          date: item.date,
                          nsfr: item.value,
                          headroom: liquidityHeadroomData[index]?.value || 0,
                          cash: dailyCashData[index]?.value || 0,
                          hqla: hqlaData[index]?.value || 0,
                          wholesale: wholesaleFundingData[index]?.value || 0,
                        }))}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="nsfr"
                          stroke={chartColors.primary}
                          strokeWidth={2}
                          name="NSFR ($B)"
                        />
                        <Line
                          type="monotone"
                          dataKey="headroom"
                          stroke={chartColors.secondary}
                          strokeWidth={2}
                          name="Headroom ($B)"
                        />
                        <Line
                          type="monotone"
                          dataKey="cash"
                          stroke={chartColors.warning}
                          strokeWidth={2}
                          name="Cash ($B)"
                        />
                        <Bar dataKey="wholesale" fill={chartColors.accent} fillOpacity={0.3} name="Wholesale ($B)" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Detailed Metrics Tab */}
              <TabsContent value="metrics" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* HQLA */}
                  <Card>
                    <CardHeader>
                      <CardTitle>High Quality Liquid Assets (HQLA)</CardTitle>
                      <CardDescription>Total HQLA held by the institution ($B)</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <ComposedChart data={hqlaData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                          <YAxis stroke="hsl(var(--muted-foreground))" />
                          <Tooltip content={<CustomTooltip />} />
                          <ReferenceLine y={80} stroke={chartColors.danger} strokeDasharray="5 5" label="Minimum" />
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke={chartColors.success}
                            fill={chartColors.success}
                            fillOpacity={0.3}
                            name="Total HQLA"
                          />
                          <Line
                            type="monotone"
                            dataKey="level2"
                            stroke={chartColors.warning}
                            strokeWidth={2}
                            name="Level 2 Assets"
                          />
                          <Line
                            type="monotone"
                            dataKey="level3"
                            stroke={chartColors.accent}
                            strokeWidth={2}
                            name="Level 3 Assets"
                          />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Daily Cash Position */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Daily Cash Position Forecast</CardTitle>
                      <CardDescription>Expected daily ending cash position ($B)</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={dailyCashData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                          <YAxis stroke="hsl(var(--muted-foreground))" />
                          <Tooltip content={<CustomTooltip />} />
                          <ReferenceLine y={5} stroke={chartColors.warning} strokeDasharray="5 5" label="Target" />
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke={chartColors.info}
                            fill={chartColors.info}
                            fillOpacity={0.3}
                            name="Cash Position"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Wholesale Funding */}
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Total Wholesale Funding Exposure</CardTitle>
                      <CardDescription>Exposure to wholesale funding sources ($B)</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <ComposedChart data={wholesaleFundingData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                          <YAxis stroke="hsl(var(--muted-foreground))" />
                          <Tooltip content={<CustomTooltip />} />
                          <ReferenceLine y={75} stroke={chartColors.danger} strokeDasharray="5 5" label="Limit" />
                          <Bar dataKey="value" fill={chartColors.accent} name="Wholesale Funding" />
                          <Line
                            type="monotone"
                            dataKey="concentration"
                            stroke={chartColors.warning}
                            strokeWidth={2}
                            name="Concentration Risk"
                          />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Stress Testing Tab */}
              <TabsContent value="stress" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Stress Test Scenarios</CardTitle>
                    <CardDescription>Impact analysis under various stress conditions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Scenario</TableHead>
                          <TableHead>NSFR ($B)</TableHead>
                          <TableHead>Headroom ($B)</TableHead>
                          <TableHead>Cash ($B)</TableHead>
                          <TableHead>HQLA ($B)</TableHead>
                          <TableHead>Impact Level</TableHead>
                          <TableHead>Probability</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {stressScenarios.map((scenario) => (
                          <TableRow key={scenario.scenario}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: scenario.color }} />
                                {scenario.scenario}
                              </div>
                            </TableCell>
                            <TableCell>${scenario.nsfr}</TableCell>
                            <TableCell>${scenario.headroom}</TableCell>
                            <TableCell>${scenario.cash}</TableCell>
                            <TableCell>${scenario.hqla}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  scenario.impact === "Low"
                                    ? "default"
                                    : scenario.impact === "Medium"
                                      ? "secondary"
                                      : scenario.impact === "High"
                                        ? "destructive"
                                        : "destructive"
                                }
                              >
                                {scenario.impact}
                              </Badge>
                            </TableCell>
                            <TableCell>{scenario.probability}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                {/* Stress Test Visualization */}
                <Card>
                  <CardHeader>
                    <CardTitle>Stress Test Impact Visualization</CardTitle>
                    <CardDescription>Visual comparison of metrics under stress scenarios</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart data={stressScenarios}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="scenario" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="nsfr" fill={chartColors.primary} name="NSFR ($B)" />
                        <Bar dataKey="headroom" fill={chartColors.secondary} name="Headroom ($B)" />
                        <Bar dataKey="cash" fill={chartColors.warning} name="Cash ($B)" />
                        <Bar dataKey="hqla" fill={chartColors.info} name="HQLA ($B)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Funding Analysis Tab */}
              <TabsContent value="funding" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Funding Composition</CardTitle>
                      <CardDescription>Current funding mix and stability</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>Retail Deposits</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-muted rounded-full h-2">
                              <div
                                className="h-2 rounded-full"
                                style={{ width: "65%", backgroundColor: chartColors.success }}
                              />
                            </div>
                            <span className="text-sm">65%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Wholesale Funding</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-muted rounded-full h-2">
                              <div
                                className="h-2 rounded-full"
                                style={{ width: "25%", backgroundColor: chartColors.warning }}
                              />
                            </div>
                            <span className="text-sm">25%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Interbank</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-muted rounded-full h-2">
                              <div
                                className="h-2 rounded-full"
                                style={{ width: "10%", backgroundColor: chartColors.danger }}
                              />
                            </div>
                            <span className="text-sm">10%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Liquidity Buffers</CardTitle>
                      <CardDescription>Available liquidity by asset class</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: chartColors.primary }} />
                            <span>Cash & Central Bank</span>
                          </div>
                          <span className="font-medium">$45.2B</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: chartColors.success }} />
                            <span>Government Securities</span>
                          </div>
                          <span className="font-medium">$28.5B</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: chartColors.warning }} />
                            <span>Corporate Bonds</span>
                          </div>
                          <span className="font-medium">$12.8B</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: chartColors.accent }} />
                            <span>Other HQLA</span>
                          </div>
                          <span className="font-medium">$8.1B</span>
                        </div>
                        <hr />
                        <div className="flex items-center justify-between font-bold">
                          <span>Total Available</span>
                          <span>$94.6B</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

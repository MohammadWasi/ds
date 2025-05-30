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
  LineChart,
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
} from "recharts"
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Activity, Download, RefreshCw } from "lucide-react"

// Banking liquidity data
const nsfrData = [
  { date: "4/25", value: 18.2, threshold: 15.0 },
  { date: "5/25", value: 17.5, threshold: 15.0 },
  { date: "6/25", value: 15.9, threshold: 15.0 },
  { date: "7/25", value: 16.2, threshold: 15.0 },
  { date: "8/25", value: 16.0, threshold: 15.0 },
  { date: "9/25", value: 15.7, threshold: 15.0 },
  { date: "10/25", value: 15.8, threshold: 15.0 },
  { date: "11/25", value: 15.6, threshold: 15.0 },
  { date: "12/25", value: 15.3, threshold: 15.0 },
  { date: "1/26", value: 15.1, threshold: 15.0 },
  { date: "2/26", value: 14.9, threshold: 15.0 },
  { date: "3/26", value: 14.7, threshold: 15.0 },
  { date: "4/26", value: 14.5, threshold: 15.0 },
]

const liquidityHeadroomData = [
  { date: "4/25", value: 12.4 },
  { date: "5/25", value: 11.9 },
  { date: "6/25", value: 11.1 },
  { date: "7/25", value: 10.8 },
  { date: "8/25", value: 10.5 },
  { date: "9/25", value: 10.2 },
  { date: "10/25", value: 9.9 },
  { date: "11/25", value: 9.6 },
  { date: "12/25", value: 9.4 },
  { date: "1/26", value: 9.1 },
  { date: "2/26", value: 8.8 },
  { date: "3/26", value: 8.5 },
  { date: "4/26", value: 8.2 },
]

const dailyCashData = [
  { date: "4/25", value: 5.5, target: 5.0 },
  { date: "5/25", value: 6.2, target: 5.0 },
  { date: "6/25", value: 6.0, target: 5.0 },
  { date: "7/25", value: 6.5, target: 5.0 },
  { date: "8/25", value: 6.3, target: 5.0 },
  { date: "9/25", value: 6.1, target: 5.0 },
  { date: "10/25", value: 5.8, target: 5.0 },
  { date: "11/25", value: 5.7, target: 5.0 },
  { date: "12/25", value: 5.4, target: 5.0 },
  { date: "1/26", value: 5.2, target: 5.0 },
  { date: "2/26", value: 5.0, target: 5.0 },
  { date: "3/26", value: 4.8, target: 5.0 },
  { date: "4/26", value: 4.6, target: 5.0 },
]

const hqlaData = [
  { date: "4/25", value: 90.0, minimum: 80.0 },
  { date: "5/25", value: 88.5, minimum: 80.0 },
  { date: "6/25", value: 87.2, minimum: 80.0 },
  { date: "7/25", value: 86.0, minimum: 80.0 },
  { date: "8/25", value: 85.4, minimum: 80.0 },
  { date: "9/25", value: 84.6, minimum: 80.0 },
  { date: "10/25", value: 84.1, minimum: 80.0 },
  { date: "11/25", value: 83.5, minimum: 80.0 },
  { date: "12/25", value: 83.0, minimum: 80.0 },
  { date: "1/26", value: 82.5, minimum: 80.0 },
  { date: "2/26", value: 82.0, minimum: 80.0 },
  { date: "3/26", value: 81.5, minimum: 80.0 },
  { date: "4/26", value: 81.0, minimum: 80.0 },
]

const wholesaleFundingData = [
  { date: "4/25", value: 70.0, limit: 75.0 },
  { date: "5/25", value: 71.5, limit: 75.0 },
  { date: "6/25", value: 72.0, limit: 75.0 },
  { date: "7/25", value: 72.3, limit: 75.0 },
  { date: "8/25", value: 72.9, limit: 75.0 },
  { date: "9/25", value: 73.1, limit: 75.0 },
  { date: "10/25", value: 73.5, limit: 75.0 },
  { date: "11/25", value: 73.8, limit: 75.0 },
  { date: "12/25", value: 74.1, limit: 75.0 },
  { date: "1/26", value: 74.3, limit: 75.0 },
  { date: "2/26", value: 74.7, limit: 75.0 },
  { date: "3/26", value: 75.0, limit: 75.0 },
  { date: "4/26", value: 75.3, limit: 75.0 },
]

// Combined data for overview
const combinedMetrics = nsfrData.map((item, index) => ({
  date: item.date,
  nsfr: item.value,
  headroom: liquidityHeadroomData[index]?.value || 0,
  cash: dailyCashData[index]?.value || 0,
  hqla: hqlaData[index]?.value || 0,
  wholesale: wholesaleFundingData[index]?.value || 0,
}))

// Risk assessment data
const riskMetrics = [
  {
    metric: "NSFR Ratio",
    current: "108.5%",
    threshold: "100%",
    status: "healthy",
    trend: "down",
    description: "Net Stable Funding Ratio",
  },
  {
    metric: "LCR Ratio",
    current: "125.3%",
    threshold: "100%",
    status: "healthy",
    trend: "up",
    description: "Liquidity Coverage Ratio",
  },
  {
    metric: "Cash Buffer",
    current: "$4.6B",
    threshold: "$4.0B",
    status: "warning",
    trend: "down",
    description: "Available cash position",
  },
  {
    metric: "Funding Concentration",
    current: "75.3%",
    threshold: "75%",
    status: "critical",
    trend: "up",
    description: "Wholesale funding exposure",
  },
]

// Stress test scenarios
const stressScenarios = [
  {
    scenario: "Mild Stress",
    nsfr: 16.2,
    headroom: 7.8,
    cash: 4.2,
    impact: "Low",
    probability: "25%",
  },
  {
    scenario: "Moderate Stress",
    nsfr: 14.8,
    headroom: 6.1,
    cash: 3.5,
    impact: "Medium",
    probability: "15%",
  },
  {
    scenario: "Severe Stress",
    nsfr: 12.9,
    headroom: 4.2,
    cash: 2.8,
    impact: "High",
    probability: "5%",
  },
  {
    scenario: "Extreme Stress",
    nsfr: 10.5,
    headroom: 2.1,
    cash: 1.9,
    impact: "Critical",
    probability: "1%",
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
        return "text-green-500"
      case "warning":
        return "text-yellow-500"
      case "critical":
        return "text-red-500"
      default:
        return "text-gray-500"
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
              <div>
                <h1 className="text-2xl font-bold">Banking Liquidity Dashboard</h1>
                <p className="text-muted-foreground">Monitor regulatory liquidity metrics and funding stability</p>
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
                  <Card key={metric.metric}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{metric.metric}</CardTitle>
                      <StatusIcon className={`h-4 w-4 ${getStatusColor(metric.status)}`} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{metric.current}</div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Threshold: {metric.threshold}</span>
                        <div className="flex items-center">
                          <TrendIcon
                            className={`h-3 w-3 mr-1 ${metric.trend === "up" ? "text-red-500" : "text-green-500"}`}
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
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`$${value}B`, "NSFR Surplus"]} />
                          <ReferenceLine y={15} stroke="#ef4444" strokeDasharray="5 5" label="Threshold" />
                          <Bar
                            dataKey="value"
                            fill={(entry: any) => (entry?.value > 15 ? "#22c55e" : "#ef4444")}
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
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`$${value}B`, "Headroom"]} />
                          <Area type="monotone" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
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
                      <LineChart data={combinedMetrics}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="nsfr" stroke="#8884d8" strokeWidth={2} name="NSFR ($B)" />
                        <Line
                          type="monotone"
                          dataKey="headroom"
                          stroke="#82ca9d"
                          strokeWidth={2}
                          name="Headroom ($B)"
                        />
                        <Line type="monotone" dataKey="cash" stroke="#ffc658" strokeWidth={2} name="Cash ($B)" />
                      </LineChart>
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
                        <LineChart data={hqlaData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`$${value}B`, ""]} />
                          <ReferenceLine y={80} stroke="#ef4444" strokeDasharray="5 5" label="Minimum" />
                          <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} name="HQLA" />
                        </LineChart>
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
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`$${value}B`, ""]} />
                          <ReferenceLine y={5} stroke="#f59e0b" strokeDasharray="5 5" label="Target" />
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#6366f1"
                            fill="#6366f1"
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
                        <BarChart data={wholesaleFundingData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip formatter={(value) => [`$${value}B`, "Wholesale Funding"]} />
                          <ReferenceLine y={75} stroke="#ef4444" strokeDasharray="5 5" label="Limit" />
                          <Bar
                            dataKey="value"
                            fill={(entry: any) => (entry?.value > 75 ? "#ef4444" : "#f59e0b")}
                            name="Wholesale Funding"
                          />
                        </BarChart>
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
                          <TableHead>Impact Level</TableHead>
                          <TableHead>Probability</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {stressScenarios.map((scenario) => (
                          <TableRow key={scenario.scenario}>
                            <TableCell className="font-medium">{scenario.scenario}</TableCell>
                            <TableCell>${scenario.nsfr}</TableCell>
                            <TableCell>${scenario.headroom}</TableCell>
                            <TableCell>${scenario.cash}</TableCell>
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
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: "65%" }} />
                            </div>
                            <span className="text-sm">65%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Wholesale Funding</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-muted rounded-full h-2">
                              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "25%" }} />
                            </div>
                            <span className="text-sm">25%</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Interbank</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-muted rounded-full h-2">
                              <div className="bg-red-500 h-2 rounded-full" style={{ width: "10%" }} />
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
                          <span>Cash & Central Bank</span>
                          <span className="font-medium">$45.2B</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Government Securities</span>
                          <span className="font-medium">$28.5B</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Corporate Bonds</span>
                          <span className="font-medium">$12.8B</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Other HQLA</span>
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

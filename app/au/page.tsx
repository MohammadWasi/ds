"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Shield,
  ArrowLeft,
  Download,
  RefreshCw,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  LineChart,
  PieChart,
  ArrowUpRight,
  TrendingUp,
  Activity,
} from "lucide-react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
} from "recharts"
import Link from "next/link"

// Sample data for LST BAU
const liquidityTrendData = [
  { month: "Jan", buffer: 1.1, lcr: 142, nsfr: 118, hqla: 2.0 },
  { month: "Feb", buffer: 1.15, lcr: 138, nsfr: 115, hqla: 2.1 },
  { month: "Mar", buffer: 1.2, lcr: 145, nsfr: 118, hqla: 2.2 },
  { month: "Apr", buffer: 1.18, lcr: 140, nsfr: 120, hqla: 2.15 },
  { month: "May", buffer: 1.22, lcr: 147, nsfr: 122, hqla: 2.25 },
  { month: "Jun", buffer: 1.2, lcr: 145, nsfr: 118, hqla: 2.1 },
]

const stressTestResultsData = [
  { scenario: "Baseline", passRate: 98, coverage: 145, buffer: 1200 },
  { scenario: "Mild Stress", passRate: 96, coverage: 128, buffer: 980 },
  { scenario: "Moderate Stress", passRate: 94, coverage: 115, buffer: 850 },
  { scenario: "Severe Stress", passRate: 89, coverage: 105, buffer: 720 },
]

const liquiditySourcesData = [
  { source: "Customer Deposits", amount: 4200, percentage: 52, color: "#10b981" },
  { source: "Wholesale Funding", amount: 2100, percentage: 26, color: "#3b82f6" },
  { source: "Central Bank Facilities", amount: 980, percentage: 12, color: "#8b5cf6" },
  { source: "Interbank Markets", amount: 820, percentage: 10, color: "#f59e0b" },
]

const hqlaCompositionData = [
  { category: "Government Bonds", value: 1250, color: "#10b981" },
  { category: "Central Bank Reserves", value: 680, color: "#3b82f6" },
  { category: "Corporate Bonds (AA+)", value: 420, color: "#8b5cf6" },
  { category: "Covered Bonds", value: 350, color: "#f59e0b" },
]

export default function LSTBAUPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("6m")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="lg">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="h-8 w-px bg-slate-300" />
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">LST BAU</h1>
                  <p className="text-slate-600">Liquidity Stress Testing Business As Usual</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-sm px-3 py-1">
                <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
                Active
              </Badge>
              <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                Refresh Data
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Configure
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">BAU Liquidity Buffer</CardTitle>
              <Shield className="w-4 h-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">$1.2B</div>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                <span className="text-sm text-emerald-600 font-semibold">+0.1%</span>
                <span className="text-sm text-slate-500">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Coverage Ratio</CardTitle>
              <BarChart3 className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">145%</div>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                <span className="text-sm text-emerald-600 font-semibold">+0.5%</span>
                <span className="text-sm text-slate-500">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Stress Test Pass Rate</CardTitle>
              <TrendingUp className="w-4 h-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">96.8%</div>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                <span className="text-sm text-emerald-600 font-semibold">+0.2%</span>
                <span className="text-sm text-slate-500">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Last Updated</CardTitle>
              <Clock className="w-4 h-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">1h ago</div>
              <div className="flex items-center gap-1 mt-1">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span className="text-sm text-emerald-600 font-semibold">Up to date</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="liquidity" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 h-12">
            <TabsTrigger value="liquidity">Liquidity Trends</TabsTrigger>
            <TabsTrigger value="stress-tests">Stress Tests</TabsTrigger>
            <TabsTrigger value="funding">Funding Sources</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          <TabsContent value="liquidity" className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              <Card className="col-span-2 shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="w-5 h-5 text-emerald-600" />
                    Liquidity Metrics Trend
                  </CardTitle>
                  <CardDescription>Key liquidity indicators over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      buffer: { label: "Liquidity Buffer ($B)", color: "#10b981" },
                      lcr: { label: "LCR (%)", color: "#3b82f6" },
                      nsfr: { label: "NSFR (%)", color: "#8b5cf6" },
                      hqla: { label: "HQLA ($B)", color: "#f59e0b" },
                    }}
                    className="h-80"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={liquidityTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area
                          type="monotone"
                          dataKey="buffer"
                          stackId="1"
                          stroke="#10b981"
                          fill="#10b981"
                          fillOpacity={0.6}
                        />
                        <Area
                          type="monotone"
                          dataKey="hqla"
                          stackId="2"
                          stroke="#f59e0b"
                          fill="#f59e0b"
                          fillOpacity={0.4}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Liquidity Ratios</CardTitle>
                  <CardDescription>Current regulatory ratios</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700">Liquidity Coverage Ratio</span>
                        <span className="text-sm font-bold text-slate-900">145%</span>
                      </div>
                      <Progress value={145} className="h-3" />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-slate-500">Minimum: 100%</span>
                        <span className="text-xs text-emerald-600">Well above minimum</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700">Net Stable Funding Ratio</span>
                        <span className="text-sm font-bold text-slate-900">118%</span>
                      </div>
                      <Progress value={118} className="h-3" />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-slate-500">Minimum: 100%</span>
                        <span className="text-xs text-emerald-600">Above minimum</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700">Leverage Ratio</span>
                        <span className="text-sm font-bold text-slate-900">8.2%</span>
                      </div>
                      <Progress value={82} className="h-3" />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-slate-500">Minimum: 3%</span>
                        <span className="text-xs text-emerald-600">Strong position</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button className="w-full">
                      <Activity className="w-4 h-4 mr-2" />
                      View Detailed Ratios
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="stress-tests" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    Stress Test Results
                  </CardTitle>
                  <CardDescription>Pass rates and coverage under different scenarios</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      passRate: { label: "Pass Rate (%)", color: "#3b82f6" },
                      coverage: { label: "Coverage (%)", color: "#10b981" },
                    }}
                    className="h-80"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stressTestResultsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="scenario" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="passRate" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="coverage" fill="#10b981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Stress Test Summary</CardTitle>
                  <CardDescription>Latest stress testing results</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {stressTestResultsData.map((result, index) => (
                    <div key={index} className="p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-slate-900">{result.scenario}</span>
                        <Badge
                          variant={
                            result.passRate >= 95 ? "default" : result.passRate >= 90 ? "secondary" : "destructive"
                          }
                        >
                          {result.passRate >= 95 ? "Pass" : result.passRate >= 90 ? "Warning" : "Fail"}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-600">Pass Rate:</span>
                          <span className="font-semibold ml-2">{result.passRate}%</span>
                        </div>
                        <div>
                          <span className="text-slate-600">Coverage:</span>
                          <span className="font-semibold ml-2">{result.coverage}%</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="text-slate-600 text-sm">Buffer:</span>
                        <span className="font-semibold ml-2">${result.buffer}M</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="funding" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-purple-600" />
                    Funding Sources Distribution
                  </CardTitle>
                  <CardDescription>Breakdown of funding sources ($ millions)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      amount: { label: "Amount", color: "#8b5cf6" },
                    }}
                    className="h-80"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <pie
                          data={liquiditySourcesData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="amount"
                          label={({ source, percentage }) => `${source}: ${percentage}%`}
                        >
                          {liquiditySourcesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </pie>
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>HQLA Composition</CardTitle>
                  <CardDescription>High Quality Liquid Assets breakdown</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {hqlaCompositionData.map((asset, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: asset.color }} />
                        <span className="font-medium text-slate-900">{asset.category}</span>
                      </div>
                      <span className="text-lg font-bold text-slate-900">${asset.value}M</span>
                    </div>
                  ))}

                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-slate-900">Total HQLA</span>
                      <span className="text-xl font-bold text-emerald-600">
                        ${hqlaCompositionData.reduce((sum, asset) => sum + asset.value, 0)}M
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Regulatory Compliance Status</CardTitle>
                  <CardDescription>Current compliance with regulatory requirements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { requirement: "Basel III LCR", status: "Compliant", value: "145%", threshold: "100%" },
                    { requirement: "Basel III NSFR", status: "Compliant", value: "118%", threshold: "100%" },
                    { requirement: "Leverage Ratio", status: "Compliant", value: "8.2%", threshold: "3%" },
                    { requirement: "HQLA Minimum", status: "Compliant", value: "$2.7B", threshold: "$2.0B" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-slate-900">{item.requirement}</h4>
                        <p className="text-sm text-slate-600">Threshold: {item.threshold}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-slate-900">{item.value}</div>
                        <Badge variant="default" className="bg-emerald-100 text-emerald-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Risk Alerts</CardTitle>
                  <CardDescription>Current risk monitoring alerts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-green-800">All Systems Normal</span>
                    </div>
                    <p className="text-sm text-green-700">
                      All liquidity metrics are within acceptable ranges and regulatory requirements are met.
                    </p>
                  </div>

                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      <span className="font-medium text-yellow-800">Monitor: Wholesale Funding</span>
                    </div>
                    <p className="text-sm text-yellow-700">
                      Wholesale funding concentration slightly elevated. Continue monitoring market conditions.
                    </p>
                  </div>

                  <div className="pt-4">
                    <Button variant="outline" className="w-full bg-transparent">
                      View All Risk Reports
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

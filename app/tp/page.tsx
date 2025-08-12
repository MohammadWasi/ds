"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Calculator,
  ArrowLeft,
  Download,
  RefreshCw,
  Settings,
  TrendingUp,
  CheckCircle,
  Clock,
  BarChart3,
  LineChart,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Activity,
} from "lucide-react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
} from "recharts"
import Link from "next/link"

// Sample data for IRR Analysis
const irrTrendData = [
  { quarter: "Q1 2023", portfolioIRR: 13.2, benchmarkIRR: 10.8, riskAdjustedIRR: 10.5, alpha: 2.4 },
  { quarter: "Q2 2023", portfolioIRR: 14.1, benchmarkIRR: 11.2, riskAdjustedIRR: 11.1, alpha: 2.9 },
  { quarter: "Q3 2023", portfolioIRR: 14.7, benchmarkIRR: 11.5, riskAdjustedIRR: 11.9, alpha: 3.2 },
  { quarter: "Q4 2023", portfolioIRR: 15.2, benchmarkIRR: 11.8, riskAdjustedIRR: 12.3, alpha: 3.4 },
  { quarter: "Q1 2024", portfolioIRR: 14.9, benchmarkIRR: 11.6, riskAdjustedIRR: 12.1, alpha: 3.3 },
  { quarter: "Q2 2024", portfolioIRR: 14.7, benchmarkIRR: 11.5, riskAdjustedIRR: 11.9, alpha: 3.2 },
]

const portfolioSegmentData = [
  { segment: "Growth Equity", irr: 18.5, allocation: 35, riskScore: 8.2, color: "#10b981" },
  { segment: "Value Equity", irr: 12.3, allocation: 25, riskScore: 6.1, color: "#3b82f6" },
  { segment: "Fixed Income", irr: 8.7, allocation: 20, riskScore: 3.4, color: "#8b5cf6" },
  { segment: "Alternative Investments", irr: 16.2, allocation: 15, riskScore: 9.1, color: "#f59e0b" },
  { segment: "Cash & Equivalents", irr: 4.2, allocation: 5, riskScore: 1.2, color: "#ef4444" },
]

const riskMetricsData = [
  { metric: "Sharpe Ratio", value: 1.42, benchmark: 1.18, status: "outperform" },
  { metric: "Sortino Ratio", value: 1.89, benchmark: 1.45, status: "outperform" },
  { metric: "Beta", value: 0.95, benchmark: 1.0, status: "lower" },
  { metric: "Alpha", value: 3.2, benchmark: 0.0, status: "positive" },
  { metric: "Max Drawdown", value: -8.4, benchmark: -12.1, status: "better" },
  { metric: "Volatility", value: 14.2, benchmark: 16.8, status: "lower" },
]

const performanceAttributionData = [
  { factor: "Asset Allocation", contribution: 2.1, color: "#10b981" },
  { factor: "Security Selection", contribution: 1.8, color: "#3b82f6" },
  { factor: "Market Timing", contribution: 0.6, color: "#8b5cf6" },
  { factor: "Currency Effect", contribution: -0.3, color: "#f59e0b" },
  { factor: "Fees & Expenses", contribution: -0.8, color: "#ef4444" },
]

export default function IRRAnalysisPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("1y")
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
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">IRR Analysis</h1>
                  <p className="text-slate-600">Internal Rate of Return Calculations</p>
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
              <CardTitle className="text-sm font-medium text-slate-600">Portfolio IRR</CardTitle>
              <Calculator className="w-4 h-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">14.7%</div>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                <span className="text-sm text-emerald-600 font-semibold">+0.8%</span>
                <span className="text-sm text-slate-500">vs last quarter</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Benchmark Comparison</CardTitle>
              <Target className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">+3.2%</div>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                <span className="text-sm text-emerald-600 font-semibold">+0.1%</span>
                <span className="text-sm text-slate-500">vs benchmark</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Risk-Adjusted IRR</CardTitle>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">11.9%</div>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                <span className="text-sm text-emerald-600 font-semibold">+0.4%</span>
                <span className="text-sm text-slate-500">vs last quarter</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Last Updated</CardTitle>
              <Clock className="w-4 h-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">30m ago</div>
              <div className="flex items-center gap-1 mt-1">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span className="text-sm text-emerald-600 font-semibold">Up to date</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 h-12">
            <TabsTrigger value="performance">Performance Trends</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio Analysis</TabsTrigger>
            <TabsTrigger value="risk">Risk Metrics</TabsTrigger>
            <TabsTrigger value="attribution">Attribution</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              <Card className="col-span-2 shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="w-5 h-5 text-purple-600" />
                    IRR Performance Trends
                  </CardTitle>
                  <CardDescription>Portfolio vs benchmark IRR over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      portfolioIRR: { label: "Portfolio IRR", color: "#8b5cf6" },
                      benchmarkIRR: { label: "Benchmark IRR", color: "#3b82f6" },
                      riskAdjustedIRR: { label: "Risk-Adjusted IRR", color: "#10b981" },
                      alpha: { label: "Alpha", color: "#f59e0b" },
                    }}
                    className="h-80"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={irrTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="quarter" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="portfolioIRR"
                          stroke="#8b5cf6"
                          strokeWidth={3}
                          dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 5 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="benchmarkIRR"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="riskAdjustedIRR"
                          stroke="#10b981"
                          strokeWidth={2}
                          dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Performance Summary</CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-700">Current Quarter IRR</span>
                        <span className="text-lg font-bold text-purple-600">14.7%</span>
                      </div>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-700">YTD Performance</span>
                        <span className="text-lg font-bold text-blue-600">12.8%</span>
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-700">3-Year Average</span>
                        <span className="text-lg font-bold text-emerald-600">13.9%</span>
                      </div>
                    </div>

                    <div className="p-3 bg-orange-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-700">Excess Return</span>
                        <span className="text-lg font-bold text-orange-600">+3.2%</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button className="w-full">
                      <Activity className="w-4 h-4 mr-2" />
                      View Detailed Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    Portfolio Segment IRR
                  </CardTitle>
                  <CardDescription>IRR performance by portfolio segment</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      irr: { label: "IRR (%)", color: "#3b82f6" },
                    }}
                    className="h-80"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={portfolioSegmentData} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="segment" type="category" width={120} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="irr" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Portfolio Allocation</CardTitle>
                  <CardDescription>Current allocation and performance by segment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {portfolioSegmentData.map((segment, index) => (
                    <div key={index} className="p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: segment.color }} />
                          <span className="font-medium text-slate-900">{segment.segment}</span>
                        </div>
                        <span className="text-sm font-bold text-slate-700">{segment.allocation}%</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-600">IRR:</span>
                          <span className="font-semibold ml-2">{segment.irr}%</span>
                        </div>
                        <div>
                          <span className="text-slate-600">Risk Score:</span>
                          <span className="font-semibold ml-2">{segment.riskScore}</span>
                        </div>
                      </div>
                      <Progress value={segment.allocation} className="h-2 mt-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="risk" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Risk-Adjusted Performance Metrics</CardTitle>
                  <CardDescription>Portfolio vs benchmark risk metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {riskMetricsData.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-slate-900">{metric.metric}</h4>
                        <p className="text-sm text-slate-600">Benchmark: {metric.benchmark}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-slate-900">{metric.value}</div>
                        <Badge
                          variant={
                            metric.status === "outperform" || metric.status === "positive" || metric.status === "better"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            metric.status === "outperform" || metric.status === "positive" || metric.status === "better"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-blue-100 text-blue-800"
                          }
                        >
                          {metric.status === "outperform" && "Outperform"}
                          {metric.status === "positive" && "Positive"}
                          {metric.status === "better" && "Better"}
                          {metric.status === "lower" && "Lower Risk"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-emerald-600" />
                    Risk-Return Profile
                  </CardTitle>
                  <CardDescription>Portfolio segments by risk and return</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      riskScore: { label: "Risk Score", color: "#10b981" },
                    }}
                    className="h-80"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <pie
                          data={portfolioSegmentData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="allocation"
                          label={({ segment, allocation }) => `${segment}: ${allocation}%`}
                        >
                          {portfolioSegmentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </pie>
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="attribution" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-orange-600" />
                    Performance Attribution
                  </CardTitle>
                  <CardDescription>Contribution to excess return by factor</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      contribution: { label: "Contribution (%)", color: "#f59e0b" },
                    }}
                    className="h-80"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={performanceAttributionData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="factor" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="contribution" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Attribution Analysis</CardTitle>
                  <CardDescription>Detailed breakdown of performance drivers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {performanceAttributionData.map((factor, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: factor.color }} />
                        <span className="font-medium text-slate-900">{factor.factor}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {factor.contribution > 0 ? (
                          <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-red-600" />
                        )}
                        <span
                          className={`text-lg font-bold ${
                            factor.contribution > 0 ? "text-emerald-600" : "text-red-600"
                          }`}
                        >
                          {factor.contribution > 0 ? "+" : ""}
                          {factor.contribution}%
                        </span>
                      </div>
                    </div>
                  ))}

                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-slate-900">Total Excess Return</span>
                      <span className="text-xl font-bold text-emerald-600">
                        +{performanceAttributionData.reduce((sum, factor) => sum + factor.contribution, 0).toFixed(1)}%
                      </span>
                    </div>
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

"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  TrendingUp,
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
  ArrowDownRight,
} from "lucide-react"
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
} from "recharts"
import Link from "next/link"

// Sample data for LST Forecasting
const stressTestData = [
  { month: "Jan", baseline: 85, mild: 78, moderate: 65, severe: 45 },
  { month: "Feb", baseline: 87, mild: 80, moderate: 68, severe: 48 },
  { month: "Mar", baseline: 89, mild: 82, moderate: 70, severe: 50 },
  { month: "Apr", baseline: 91, mild: 84, moderate: 72, severe: 52 },
  { month: "May", baseline: 88, mild: 81, moderate: 69, severe: 49 },
  { month: "Jun", baseline: 92, mild: 85, moderate: 74, severe: 54 },
]

const liquidityBufferData = [
  { scenario: "Baseline", value: 1250, color: "#10b981" },
  { scenario: "Mild Stress", value: 980, color: "#f59e0b" },
  { scenario: "Moderate Stress", value: 750, color: "#ef4444" },
  { scenario: "Severe Stress", value: 520, color: "#dc2626" },
]

const riskFactorData = [
  { factor: "Market Risk", impact: 35, color: "#3b82f6" },
  { factor: "Credit Risk", impact: 28, color: "#8b5cf6" },
  { factor: "Operational Risk", impact: 22, color: "#10b981" },
  { factor: "Liquidity Risk", impact: 15, color: "#f59e0b" },
]

export default function LSTForecastingPage() {
  const [selectedScenario, setSelectedScenario] = useState("baseline")
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
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">LST Forecasting</h1>
                  <p className="text-slate-600">Liquidity Stress Testing Forecasting Models</p>
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
              <CardTitle className="text-sm font-medium text-slate-600">Stress Scenario Coverage</CardTitle>
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">98.5%</div>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                <span className="text-sm text-emerald-600 font-semibold">+1.2%</span>
                <span className="text-sm text-slate-500">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Forecast Accuracy</CardTitle>
              <BarChart3 className="w-4 h-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">94.2%</div>
              <div className="flex items-center gap-1 mt-1">
                <ArrowDownRight className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-600 font-semibold">-0.3%</span>
                <span className="text-sm text-slate-500">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Model Confidence</CardTitle>
              <PieChart className="w-4 h-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">87.3%</div>
              <div className="flex items-center gap-1 mt-1">
                <ArrowDownRight className="w-4 h-4 text-orange-600" />
                <span className="text-sm text-orange-600 font-semibold">-0.4%</span>
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
              <div className="text-2xl font-bold text-slate-900">2h ago</div>
              <div className="flex items-center gap-1 mt-1">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span className="text-sm text-emerald-600 font-semibold">Up to date</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="scenarios" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 h-12">
            <TabsTrigger value="scenarios">Stress Scenarios</TabsTrigger>
            <TabsTrigger value="liquidity">Liquidity Analysis</TabsTrigger>
            <TabsTrigger value="risk-factors">Risk Factors</TabsTrigger>
            <TabsTrigger value="reports">Detailed Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="scenarios" className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              <Card className="col-span-2 shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="w-5 h-5 text-blue-600" />
                    Stress Test Scenarios Over Time
                  </CardTitle>
                  <CardDescription>Liquidity coverage ratios under different stress scenarios</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      baseline: { label: "Baseline", color: "#10b981" },
                      mild: { label: "Mild Stress", color: "#f59e0b" },
                      moderate: { label: "Moderate Stress", color: "#ef4444" },
                      severe: { label: "Severe Stress", color: "#dc2626" },
                    }}
                    className="h-80"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={stressTestData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="baseline" stroke="#10b981" strokeWidth={3} />
                        <Line type="monotone" dataKey="mild" stroke="#f59e0b" strokeWidth={2} />
                        <Line type="monotone" dataKey="moderate" stroke="#ef4444" strokeWidth={2} />
                        <Line type="monotone" dataKey="severe" stroke="#dc2626" strokeWidth={2} />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Scenario Controls</CardTitle>
                  <CardDescription>Adjust stress testing parameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Active Scenario</label>
                    <div className="space-y-2">
                      {["baseline", "mild", "moderate", "severe"].map((scenario) => (
                        <Button
                          key={scenario}
                          variant={selectedScenario === scenario ? "default" : "outline"}
                          className="w-full justify-start"
                          onClick={() => setSelectedScenario(scenario)}
                        >
                          {scenario.charAt(0).toUpperCase() + scenario.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium text-slate-700 mb-3">Current Parameters</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Market Shock</span>
                        <span className="text-sm font-semibold">-15%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Credit Spread</span>
                        <span className="text-sm font-semibold">+200bp</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-600">Funding Cost</span>
                        <span className="text-sm font-semibold">+150bp</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="liquidity" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                    Liquidity Buffer by Scenario
                  </CardTitle>
                  <CardDescription>Available liquidity under stress conditions ($ millions)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      value: { label: "Liquidity Buffer", color: "#8b5cf6" },
                    }}
                    className="h-80"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={liquidityBufferData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="scenario" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="value" fill="#8b5cf6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Liquidity Metrics</CardTitle>
                  <CardDescription>Key liquidity indicators and thresholds</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700">Liquidity Coverage Ratio</span>
                        <span className="text-sm font-bold text-slate-900">145%</span>
                      </div>
                      <Progress value={145} className="h-2" />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-slate-500">Minimum: 100%</span>
                        <span className="text-xs text-emerald-600">Above threshold</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700">Net Stable Funding Ratio</span>
                        <span className="text-sm font-bold text-slate-900">118%</span>
                      </div>
                      <Progress value={118} className="h-2" />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-slate-500">Minimum: 100%</span>
                        <span className="text-xs text-emerald-600">Above threshold</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700">High Quality Liquid Assets</span>
                        <span className="text-sm font-bold text-slate-900">$2.1B</span>
                      </div>
                      <Progress value={85} className="h-2" />
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-slate-500">Target: $2.5B</span>
                        <span className="text-xs text-orange-600">Below target</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button className="w-full">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Run Liquidity Stress Test
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="risk-factors" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-emerald-600" />
                    Risk Factor Impact Distribution
                  </CardTitle>
                  <CardDescription>Contribution to overall stress impact (%)</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      impact: { label: "Impact", color: "#10b981" },
                    }}
                    className="h-80"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <pie
                          data={riskFactorData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="impact"
                          label={({ factor, impact }) => `${factor}: ${impact}%`}
                        >
                          {riskFactorData.map((entry, index) => (
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
                  <CardTitle>Risk Factor Details</CardTitle>
                  <CardDescription>Individual risk factor analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {riskFactorData.map((factor, index) => (
                    <div key={index} className="p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-slate-900">{factor.factor}</span>
                        <span className="text-sm font-bold text-slate-700">{factor.impact}%</span>
                      </div>
                      <Progress value={factor.impact} className="h-2 mb-2" />
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: factor.color }} />
                        <span className="text-xs text-slate-600">
                          {factor.impact > 30 ? "High Impact" : factor.impact > 20 ? "Medium Impact" : "Low Impact"}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle>Available Reports</CardTitle>
                <CardDescription>Download detailed analysis and regulatory reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: "Monthly Stress Test Report", date: "Dec 2024", size: "2.4 MB" },
                    { name: "Liquidity Risk Assessment", date: "Dec 2024", size: "1.8 MB" },
                    { name: "Regulatory Compliance Report", date: "Dec 2024", size: "3.1 MB" },
                    { name: "Model Validation Summary", date: "Nov 2024", size: "1.2 MB" },
                  ].map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-slate-900">{report.name}</h4>
                        <p className="text-sm text-slate-600">
                          {report.date} • {report.size}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

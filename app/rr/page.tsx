"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  DollarSign,
  ArrowLeft,
  Download,
  RefreshCw,
  Settings,
  CheckCircle,
  Clock,
  BarChart3,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Target,
  PieChart,
} from "lucide-react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Cell,
} from "recharts"
import Link from "next/link"

// Sample data for FTP Engine
const ftpRateData = [
  { month: "Jan", transferRate: 3.75, costOfFunds: 1.65, nim: 2.1, spread: 2.1 },
  { month: "Feb", transferRate: 3.8, costOfFunds: 1.68, nim: 2.12, spread: 2.12 },
  { month: "Mar", transferRate: 3.85, costOfFunds: 1.71, nim: 2.14, spread: 2.14 },
  { month: "Apr", transferRate: 3.82, costOfFunds: 1.69, nim: 2.13, spread: 2.13 },
  { month: "May", transferRate: 3.88, costOfFunds: 1.73, nim: 2.15, spread: 2.15 },
  { month: "Jun", transferRate: 3.85, costOfFunds: 1.71, nim: 2.14, spread: 2.14 },
]

const productProfitabilityData = [
  {
    product: "Retail Deposits",
    ftpRate: 2.1,
    marketRate: 2.5,
    volume: 850,
    nim: 0.4,
    profitability: 34,
    color: "#10b981",
  },
  {
    product: "Commercial Loans",
    ftpRate: 5.8,
    marketRate: 6.2,
    volume: 620,
    nim: 0.4,
    profitability: 25,
    color: "#3b82f6",
  },
  { product: "Mortgages", ftpRate: 4.2, marketRate: 4.8, volume: 340, nim: 0.6, profitability: 20, color: "#8b5cf6" },
  {
    product: "Credit Cards",
    ftpRate: 18.5,
    marketRate: 19.2,
    volume: 180,
    nim: 0.7,
    profitability: 13,
    color: "#f59e0b",
  },
  { product: "Auto Loans", ftpRate: 6.5, marketRate: 7.1, volume: 120, nim: 0.6, profitability: 8, color: "#ef4444" },
]

const marginDecompositionData = [
  { component: "Credit Risk Premium", value: 0.85, percentage: 39.7, color: "#ef4444" },
  { component: "Liquidity Premium", value: 0.42, percentage: 19.6, color: "#f59e0b" },
  { component: "Interest Rate Risk", value: 0.38, percentage: 17.8, color: "#8b5cf6" },
  { component: "Operating Costs", value: 0.32, percentage: 15.0, color: "#3b82f6" },
  { component: "Capital Allocation", value: 0.17, percentage: 7.9, color: "#10b981" },
]

const businessUnitPerformanceData = [
  { unit: "Retail Banking", revenue: 145, cost: 89, nim: 2.8, roe: 15.2, status: "strong" },
  { unit: "Commercial Banking", revenue: 198, cost: 134, nim: 3.2, roe: 18.7, status: "strong" },
  { unit: "Investment Banking", revenue: 87, cost: 62, nim: 4.1, roe: 22.3, status: "excellent" },
  { unit: "Treasury", revenue: 34, cost: 28, nim: 1.8, roe: 8.9, status: "adequate" },
  { unit: "Private Banking", revenue: 56, cost: 38, nim: 3.6, roe: 19.8, status: "strong" },
]

const ftpBenchmarkData = [
  { metric: "Transfer Rate", internal: 3.85, benchmark: 3.92, variance: -0.07, status: "favorable" },
  { metric: "Cost of Funds", internal: 1.71, benchmark: 1.78, variance: -0.07, status: "favorable" },
  { metric: "Net Interest Margin", internal: 2.14, benchmark: 2.08, variance: 0.06, status: "outperform" },
  { metric: "ROE", internal: 16.8, benchmark: 15.2, variance: 1.6, status: "outperform" },
]

export default function FTPEnginePage() {
  const [selectedProduct, setSelectedProduct] = useState("all")
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
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">FTP Engine</h1>
                  <p className="text-slate-600">Funds Transfer Pricing Analytics</p>
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
              <CardTitle className="text-sm font-medium text-slate-600">Transfer Rate</CardTitle>
              <DollarSign className="w-4 h-4 text-indigo-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">3.85%</div>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                <span className="text-sm text-emerald-600 font-semibold">+0.1%</span>
                <span className="text-sm text-slate-500">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Net Interest Margin</CardTitle>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">2.14%</div>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                <span className="text-sm text-emerald-600 font-semibold">+0.05%</span>
                <span className="text-sm text-slate-500">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Cost of Funds</CardTitle>
              <Target className="w-4 h-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">1.71%</div>
              <div className="flex items-center gap-1 mt-1">
                <ArrowDownRight className="w-4 h-4 text-orange-600" />
                <span className="text-sm text-orange-600 font-semibold">-0.05%</span>
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
        <Tabs defaultValue="rates" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 h-12">
            <TabsTrigger value="rates">Rate Analysis</TabsTrigger>
            <TabsTrigger value="profitability">Product Profitability</TabsTrigger>
            <TabsTrigger value="margins">Margin Decomposition</TabsTrigger>
            <TabsTrigger value="performance">Business Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="rates" className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              <Card className="col-span-2 shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="w-5 h-5 text-indigo-600" />
                    FTP Rate Trends
                  </CardTitle>
                  <CardDescription>Transfer rates and funding costs over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      transferRate: { label: "Transfer Rate", color: "#6366f1" },
                      costOfFunds: { label: "Cost of Funds", color: "#f59e0b" },
                      nim: { label: "Net Interest Margin", color: "#10b981" },
                      spread: { label: "Spread", color: "#8b5cf6" },
                    }}
                    className="h-80"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={ftpRateData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="transferRate"
                          stroke="#6366f1"
                          strokeWidth={3}
                          dot={{ fill: "#6366f1", strokeWidth: 2, r: 5 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="costOfFunds"
                          stroke="#f59e0b"
                          strokeWidth={2}
                          dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="nim"
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
                  <CardTitle>FTP Benchmark Comparison</CardTitle>
                  <CardDescription>Internal vs market benchmarks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {ftpBenchmarkData.map((benchmark, index) => (
                    <div key={index} className="p-3 bg-slate-50 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-slate-700">{benchmark.metric}</span>
                        <Badge
                          variant={
                            benchmark.status === "outperform" || benchmark.status === "favorable"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            benchmark.status === "outperform" || benchmark.status === "favorable"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-slate-100 text-slate-800"
                          }
                        >
                          {benchmark.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-slate-900">{benchmark.internal}%</span>
                        <div className="flex items-center gap-1">
                          {benchmark.variance > 0 ? (
                            <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4 text-emerald-600" />
                          )}
                          <span className="text-sm font-semibold text-emerald-600">
                            {benchmark.variance > 0 ? "+" : ""}
                            {benchmark.variance}%
                          </span>
                        </div>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">Benchmark: {benchmark.benchmark}%</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profitability" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    Product Profitability Analysis
                  </CardTitle>
                  <CardDescription>FTP rates and margins by product line</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      ftpRate: { label: "FTP Rate (%)", color: "#3b82f6" },
                      nim: { label: "Net Interest Margin (%)", color: "#10b981" },
                    }}
                    className="h-80"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={productProfitabilityData} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="product" type="category" width={120} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="ftpRate" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                        <Bar dataKey="nim" fill="#10b981" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Product Performance Summary</CardTitle>
                  <CardDescription>Volume and profitability metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {productProfitabilityData.map((product, index) => (
                    <div key={index} className="p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: product.color }} />
                          <span className="font-medium text-slate-900">{product.product}</span>
                        </div>
                        <span className="text-sm font-bold text-slate-700">{product.profitability}%</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-slate-600">Volume:</span>
                          <span className="font-semibold ml-2">${product.volume}M</span>
                        </div>
                        <div>
                          <span className="text-slate-600">FTP Rate:</span>
                          <span className="font-semibold ml-2">{product.ftpRate}%</span>
                        </div>
                        <div>
                          <span className="text-slate-600">NIM:</span>
                          <span className="font-semibold ml-2">{product.nim}%</span>
                        </div>
                      </div>
                      <Progress value={product.profitability} className="h-2 mt-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="margins" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-purple-600" />
                    Margin Component Breakdown
                  </CardTitle>
                  <CardDescription>Decomposition of net interest margin</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      value: { label: "Value (%)", color: "#8b5cf6" },
                    }}
                    className="h-80"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <pie
                          data={marginDecompositionData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ component, percentage }) => `${component}: ${percentage}%`}
                        >
                          {marginDecompositionData.map((entry, index) => (
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
                  <CardTitle>Margin Component Analysis</CardTitle>
                  <CardDescription>Detailed breakdown of margin drivers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {marginDecompositionData.map((component, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: component.color }} />
                        <span className="font-medium text-slate-900">{component.component}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-slate-900">{component.value}%</div>
                        <div className="text-sm text-slate-600">{component.percentage}% of total</div>
                      </div>
                    </div>
                  ))}

                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-slate-900">Total NIM</span>
                      <span className="text-xl font-bold text-indigo-600">
                        {marginDecompositionData.reduce((sum, component) => sum + component.value, 0).toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Business Unit Performance</CardTitle>
                  <CardDescription>Profitability and efficiency by business unit</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {businessUnitPerformanceData.map((unit, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-slate-900">{unit.unit}</h4>
                        <Badge
                          variant={
                            unit.status === "excellent" ? "default" : unit.status === "strong" ? "secondary" : "outline"
                          }
                          className={
                            unit.status === "excellent"
                              ? "bg-emerald-100 text-emerald-800"
                              : unit.status === "strong"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-orange-100 text-orange-800"
                          }
                        >
                          {unit.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-600">Revenue:</span>
                          <span className="font-semibold ml-2">${unit.revenue}M</span>
                        </div>
                        <div>
                          <span className="text-slate-600">Cost:</span>
                          <span className="font-semibold ml-2">${unit.cost}M</span>
                        </div>
                        <div>
                          <span className="text-slate-600">NIM:</span>
                          <span className="font-semibold ml-2">{unit.nim}%</span>
                        </div>
                        <div>
                          <span className="text-slate-600">ROE:</span>
                          <span className="font-semibold ml-2">{unit.roe}%</span>
                        </div>
                      </div>
                      <Progress value={((unit.revenue - unit.cost) / unit.revenue) * 100} className="h-2 mt-3" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-emerald-600" />
                    Unit Performance Comparison
                  </CardTitle>
                  <CardDescription>Revenue vs cost by business unit</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      revenue: { label: "Revenue ($M)", color: "#10b981" },
                      cost: { label: "Cost ($M)", color: "#ef4444" },
                    }}
                    className="h-80"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={businessUnitPerformanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="unit" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="cost" fill="#ef4444" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

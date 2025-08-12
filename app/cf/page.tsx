"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  AlertTriangle,
  ArrowLeft,
  Download,
  RefreshCw,
  Settings,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart,
  Activity,
  ArrowUpRight,
  Shield,
  Target,
  TrendingUp,
} from "lucide-react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  LineChart,
  Line,
} from "recharts"
import Link from "next/link"

// Sample data for CCF Monitor
const ccfDistributionData = [
  { category: "Low Risk (0-20%)", ccf: 15.2, exposures: 45, amount: 2400, color: "#10b981" },
  { category: "Medium Risk (20-50%)", ccf: 23.4, exposures: 32, amount: 1800, color: "#f59e0b" },
  { category: "High Risk (50-75%)", ccf: 35.8, exposures: 12, amount: 950, color: "#ef4444" },
  { category: "Critical (75%+)", ccf: 48.1, exposures: 3, amount: 320, color: "#dc2626" },
]

const exposureTrendData = [
  { month: "Jan", totalExposure: 5200, avgCCF: 22.1, highRisk: 10, compliance: 99.2 },
  { month: "Feb", totalExposure: 5350, avgCCF: 22.8, highRisk: 11, compliance: 99.0 },
  { month: "Mar", totalExposure: 5470, avgCCF: 23.4, highRisk: 12, compliance: 99.1 },
  { month: "Apr", totalExposure: 5380, avgCCF: 23.1, highRisk: 11, compliance: 99.3 },
  { month: "May", totalExposure: 5520, avgCCF: 23.6, highRisk: 13, compliance: 98.9 },
  { month: "Jun", totalExposure: 5470, avgCCF: 23.4, highRisk: 12, compliance: 99.1 },
]

const exposureTypeData = [
  { type: "Credit Lines", amount: 2100, ccf: 20.5, count: 156, status: "normal" },
  { type: "Letters of Credit", amount: 1200, ccf: 50.0, count: 89, status: "elevated" },
  { type: "Guarantees", amount: 980, ccf: 100.0, count: 45, status: "high" },
  { type: "Derivatives", amount: 850, ccf: 15.8, count: 234, status: "normal" },
  { type: "Commitments", amount: 340, ccf: 75.0, count: 67, status: "elevated" },
]

const regulatoryMetricsData = [
  { metric: "Basel III Compliance", current: 99.1, threshold: 95.0, status: "compliant" },
  { metric: "Capital Adequacy", current: 12.8, threshold: 8.0, status: "strong" },
  { metric: "Exposure Concentration", current: 15.2, threshold: 25.0, status: "acceptable" },
  { metric: "Risk Weight Accuracy", current: 98.7, threshold: 95.0, status: "compliant" },
]

const riskAlertsData = [
  {
    id: 1,
    type: "High CCF Exposure",
    description: "Corporate client ABC Corp exposure exceeds 75% CCF threshold",
    severity: "high",
    amount: "$45M",
    action: "Review required",
  },
  {
    id: 2,
    type: "Concentration Risk",
    description: "Energy sector exposure concentration above internal limits",
    severity: "medium",
    amount: "$120M",
    action: "Monitor closely",
  },
  {
    id: 3,
    type: "Model Validation",
    description: "CCF model requires quarterly validation review",
    severity: "low",
    amount: "N/A",
    action: "Schedule review",
  },
]

export default function CCFMonitorPage() {
  const [selectedView, setSelectedView] = useState("all")
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
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">CCF Monitor</h1>
                  <p className="text-slate-600">Credit Conversion Factor Analysis</p>
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
              <CardTitle className="text-sm font-medium text-slate-600">Average CCF</CardTitle>
              <AlertTriangle className="w-4 h-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">23.4%</div>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-4 h-4 text-orange-600" />
                <span className="text-sm text-orange-600 font-semibold">+0.5%</span>
                <span className="text-sm text-slate-500">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">High-Risk Exposures</CardTitle>
              <Target className="w-4 h-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">12</div>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-4 h-4 text-orange-600" />
                <span className="text-sm text-orange-600 font-semibold">+1</span>
                <span className="text-sm text-slate-500">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Regulatory Compliance</CardTitle>
              <Shield className="w-4 h-4 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">99.1%</div>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                <span className="text-sm text-emerald-600 font-semibold">+0.1%</span>
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
              <div className="text-2xl font-bold text-slate-900">45m ago</div>
              <div className="flex items-center gap-1 mt-1">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span className="text-sm text-emerald-600 font-semibold">Up to date</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="exposures" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 h-12">
            <TabsTrigger value="exposures">Exposure Analysis</TabsTrigger>
            <TabsTrigger value="risk-categories">Risk Categories</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="alerts">Risk Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="exposures" className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              <Card className="col-span-2 shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-red-600" />
                    CCF Exposure Trends
                  </CardTitle>
                  <CardDescription>Total exposure and average CCF over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      totalExposure: { label: "Total Exposure ($M)", color: "#ef4444" },
                      avgCCF: { label: "Average CCF (%)", color: "#3b82f6" },
                      highRisk: { label: "High Risk Count", color: "#f59e0b" },
                    }}
                    className="h-80"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={exposureTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          yAxisId="left"
                          type="monotone"
                          dataKey="totalExposure"
                          stroke="#ef4444"
                          strokeWidth={3}
                          dot={{ fill: "#ef4444", strokeWidth: 2, r: 5 }}
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="avgCCF"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="highRisk"
                          stroke="#f59e0b"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Exposure Summary</CardTitle>
                  <CardDescription>Current exposure metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-700">Total Exposure</span>
                        <span className="text-lg font-bold text-red-600">$5.47B</span>
                      </div>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-700">Credit Equivalent</span>
                        <span className="text-lg font-bold text-blue-600">$1.28B</span>
                      </div>
                    </div>

                    <div className="p-3 bg-orange-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-700">Risk-Weighted Assets</span>
                        <span className="text-lg font-bold text-orange-600">$892M</span>
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-700">Capital Requirement</span>
                        <span className="text-lg font-bold text-emerald-600">$71M</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button className="w-full">
                      <Activity className="w-4 h-4 mr-2" />
                      Detailed Exposure Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="risk-categories" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-purple-600" />
                    CCF Distribution by Risk Category
                  </CardTitle>
                  <CardDescription>Exposure breakdown by CCF risk levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      amount: { label: "Amount ($M)", color: "#8b5cf6" },
                    }}
                    className="h-80"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <pie
                          data={ccfDistributionData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="amount"
                          label={({ category, ccf }) => `${category}: ${ccf}%`}
                        >
                          {ccfDistributionData.map((entry, index) => (
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
                  <CardTitle>Exposure Type Analysis</CardTitle>
                  <CardDescription>CCF by exposure type and status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {exposureTypeData.map((exposure, index) => (
                    <div key={index} className="p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-slate-900">{exposure.type}</span>
                        <Badge
                          variant={
                            exposure.status === "normal"
                              ? "default"
                              : exposure.status === "elevated"
                                ? "secondary"
                                : "destructive"
                          }
                          className={
                            exposure.status === "normal"
                              ? "bg-emerald-100 text-emerald-800"
                              : exposure.status === "elevated"
                                ? "bg-orange-100 text-orange-800"
                                : "bg-red-100 text-red-800"
                          }
                        >
                          {exposure.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-slate-600">Amount:</span>
                          <span className="font-semibold ml-2">${exposure.amount}M</span>
                        </div>
                        <div>
                          <span className="text-slate-600">CCF:</span>
                          <span className="font-semibold ml-2">{exposure.ccf}%</span>
                        </div>
                        <div>
                          <span className="text-slate-600">Count:</span>
                          <span className="font-semibold ml-2">{exposure.count}</span>
                        </div>
                      </div>
                      <Progress value={exposure.ccf} className="h-2 mt-2" />
                    </div>
                  ))}
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
                  {regulatoryMetricsData.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-slate-900">{metric.metric}</h4>
                        <p className="text-sm text-slate-600">Threshold: {metric.threshold}%</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-slate-900">{metric.current}%</div>
                        <Badge
                          variant="default"
                          className={
                            metric.status === "compliant" || metric.status === "strong"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-orange-100 text-orange-800"
                          }
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {metric.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-emerald-600" />
                    Compliance Trends
                  </CardTitle>
                  <CardDescription>Compliance metrics over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      compliance: { label: "Compliance (%)", color: "#10b981" },
                    }}
                    className="h-80"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={exposureTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[95, 100]} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="compliance" fill="#10b981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Active Risk Alerts</CardTitle>
                  <CardDescription>Current risk alerts requiring attention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {riskAlertsData.map((alert) => (
                    <div
                      key={alert.id}
                      className={`p-4 border rounded-lg ${
                        alert.severity === "high"
                          ? "bg-red-50 border-red-200"
                          : alert.severity === "medium"
                            ? "bg-orange-50 border-orange-200"
                            : "bg-blue-50 border-blue-200"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <AlertTriangle
                            className={`w-5 h-5 ${
                              alert.severity === "high"
                                ? "text-red-600"
                                : alert.severity === "medium"
                                  ? "text-orange-600"
                                  : "text-blue-600"
                            }`}
                          />
                          <span className="font-medium text-slate-900">{alert.type}</span>
                        </div>
                        <Badge
                          variant={
                            alert.severity === "high"
                              ? "destructive"
                              : alert.severity === "medium"
                                ? "secondary"
                                : "default"
                          }
                        >
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-700 mb-2">{alert.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-slate-900">{alert.amount}</span>
                        <span className="text-sm text-slate-600">{alert.action}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Risk Management Actions</CardTitle>
                  <CardDescription>Recommended actions and controls</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Run CCF Stress Test
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Shield className="w-4 h-4 mr-2" />
                      Review High-Risk Exposures
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Target className="w-4 h-4 mr-2" />
                      Update Risk Limits
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Activity className="w-4 h-4 mr-2" />
                      Generate Compliance Report
                    </Button>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="p-3 bg-emerald-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm font-medium text-emerald-800">System Status</span>
                      </div>
                      <p className="text-sm text-emerald-700">
                        CCF monitoring system is operational. All regulatory requirements are being met.
                      </p>
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

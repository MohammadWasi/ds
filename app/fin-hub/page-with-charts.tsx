"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Shield,
  Calculator,
  AlertTriangle,
  Settings,
  ExternalLink,
  Eye,
  EyeOff,
  Calendar,
  BarChart3,
  PieChart,
  Download,
  Filter,
  ChevronRight,
} from "lucide-react"
import {
  LineChart as RechartsLineChart,
  Line,
  AreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Cell,
  Pie,
} from "recharts"
import { Progress } from "@/components/ui/progress"

export default function FinancialDashboard() {
  const [showPrivateData, setShowPrivateData] = useState(true)
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d")

  const chartData = {
    "lst-forecasting": [
      { month: "Jan", stress: 95, forecast: 98, confidence: 92 },
      { month: "Feb", stress: 97, forecast: 96, confidence: 89 },
      { month: "Mar", stress: 98, forecast: 94, confidence: 87 },
      { month: "Apr", stress: 96, forecast: 95, confidence: 91 },
      { month: "May", stress: 99, forecast: 97, confidence: 88 },
      { month: "Jun", stress: 98, forecast: 94, confidence: 87 },
    ],
    "lst-bau": [
      { month: "Jan", buffer: 1.1, ratio: 142, passRate: 95 },
      { month: "Feb", buffer: 1.15, ratio: 138, passRate: 97 },
      { month: "Mar", buffer: 1.2, ratio: 145, passRate: 96 },
      { month: "Apr", buffer: 1.18, ratio: 140, passRate: 98 },
      { month: "May", buffer: 1.22, ratio: 147, passRate: 97 },
      { month: "Jun", buffer: 1.2, ratio: 145, passRate: 97 },
    ],
    irr: [
      { quarter: "Q1", portfolio: 13.2, benchmark: 10.8, adjusted: 10.5 },
      { quarter: "Q2", portfolio: 14.1, benchmark: 11.2, adjusted: 11.1 },
      { quarter: "Q3", portfolio: 14.7, benchmark: 11.5, adjusted: 11.9 },
      { quarter: "Q4", portfolio: 15.2, benchmark: 11.8, adjusted: 12.3 },
    ],
    rft: [
      { month: "Jan", fedRate: 4.25, yield: 0.75, volatility: 16.2 },
      { month: "Feb", fedRate: 4.5, yield: 0.82, volatility: 17.1 },
      { month: "Mar", fedRate: 4.75, yield: 0.85, volatility: 18.3 },
      { month: "Apr", fedRate: 4.75, yield: 0.88, volatility: 19.1 },
      { month: "May", fedRate: 4.75, yield: 0.85, volatility: 18.7 },
      { month: "Jun", fedRate: 4.75, yield: 0.85, volatility: 18.3 },
    ],
    ccf: [
      { category: "Low Risk", value: 15.2, count: 45 },
      { category: "Medium Risk", value: 23.4, count: 32 },
      { category: "High Risk", value: 35.8, count: 12 },
      { category: "Critical", value: 48.1, count: 3 },
    ],
    ftp: [
      { product: "Deposits", rate: 2.1, volume: 850 },
      { product: "Loans", rate: 5.8, volume: 620 },
      { product: "Mortgages", rate: 4.2, volume: 340 },
      { product: "Credit Cards", rate: 18.5, volume: 180 },
    ],
  }

  const miniDashboards = [
    {
      id: "lst-forecasting",
      title: "LST Forecasting",
      description: "Liquidity Stress Testing Forecasting Models",
      icon: TrendingUp,
      color: "from-blue-500 to-blue-600",
      metrics: [
        { label: "Stress Scenario Coverage", value: "98.5%", status: "good", change: "+1.2%" },
        { label: "Forecast Accuracy", value: "94.2%", status: "good", change: "-0.3%" },
        { label: "Model Confidence", value: "87.3%", status: "warning", change: "-0.4%" },
      ],
      lastUpdated: "2 hours ago",
      status: "active",
      chartType: "line",
    },
    {
      id: "lst-bau",
      title: "LST BAU",
      description: "Liquidity Stress Testing Business As Usual",
      icon: Shield,
      color: "from-emerald-500 to-emerald-600",
      metrics: [
        { label: "BAU Liquidity Buffer", value: "$1.2B", status: "good", change: "+0.1%" },
        { label: "Coverage Ratio", value: "145%", status: "good", change: "+0.5%" },
        { label: "Stress Test Pass Rate", value: "96.8%", status: "good", change: "+0.2%" },
      ],
      lastUpdated: "1 hour ago",
      status: "active",
      chartType: "area",
    },
    {
      id: "irr",
      title: "IRR Analysis",
      description: "Internal Rate of Return Calculations",
      icon: Calculator,
      color: "from-purple-500 to-purple-600",
      metrics: [
        { label: "Portfolio IRR", value: "14.7%", status: "good", change: "+0.8%" },
        { label: "Benchmark Comparison", value: "+3.2%", status: "good", change: "+0.1%" },
        { label: "Risk-Adjusted IRR", value: "11.9%", status: "good", change: "+0.4%" },
      ],
      lastUpdated: "30 minutes ago",
      status: "active",
      chartType: "bar",
    },
    {
      id: "rft",
      title: "RFT Dashboard",
      description: "Rate Forecasting Tool",
      icon: TrendingDown,
      color: "from-orange-500 to-orange-600",
      metrics: [
        { label: "Fed Rate Forecast", value: "4.75%", status: "warning", change: "+0.2%" },
        { label: "Yield Curve Slope", value: "0.85%", status: "good", change: "+0.03%" },
        { label: "Volatility Index", value: "18.3", status: "warning", change: "+0.8" },
      ],
      lastUpdated: "15 minutes ago",
      status: "active",
      chartType: "line",
    },
    {
      id: "ccf",
      title: "CCF Monitor",
      description: "Credit Conversion Factor Analysis",
      icon: AlertTriangle,
      color: "from-red-500 to-red-600",
      metrics: [
        { label: "Average CCF", value: "23.4%", status: "good", change: "+0.5%" },
        { label: "High-Risk Exposures", value: "12", status: "warning", change: "+1" },
        { label: "Regulatory Compliance", value: "99.1%", status: "good", change: "+0.1%" },
      ],
      lastUpdated: "45 minutes ago",
      status: "active",
      chartType: "pie",
    },
    {
      id: "ftp",
      title: "FTP Engine",
      description: "Funds Transfer Pricing Analytics",
      icon: DollarSign,
      color: "from-indigo-500 to-indigo-600",
      metrics: [
        { label: "Transfer Rate", value: "3.85%", status: "good", change: "+0.1%" },
        { label: "Net Interest Margin", value: "2.14%", status: "good", change: "+0.05%" },
        { label: "Cost of Funds", value: "1.71%", status: "warning", change: "-0.05%" },
      ],
      lastUpdated: "1 hour ago",
      status: "active",
      chartType: "bar",
    },
  ]

  const renderChart = (dashboard: any) => {
    const data = chartData[dashboard.id as keyof typeof chartData]
    const colors = ["#3b82f6", "#10b981", "#8b5cf6", "#f59e0b", "#ef4444", "#6366f1"]

    if (!data || data.length === 0) {
      return <div className="h-[200px] flex items-center justify-center text-slate-500">No data available</div>
    }

    const dataKeys = Object.keys(data[0] || {})
    if (dataKeys.length < 2) {
      return <div className="h-[200px] flex items-center justify-center text-slate-500">Invalid data structure</div>
    }

    switch (dashboard.chartType) {
      case "line":
        return (
          <ChartContainer
            config={{
              primary: { label: "Primary", color: colors[0] },
              secondary: { label: "Secondary", color: colors[1] },
            }}
            className="h-[200px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey={dataKeys[0]} stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey={dataKeys[1]}
                  stroke={colors[0]}
                  strokeWidth={2}
                  dot={{ fill: colors[0], strokeWidth: 2, r: 4 }}
                />
                {dataKeys[2] && (
                  <Line
                    type="monotone"
                    dataKey={dataKeys[2]}
                    stroke={colors[1]}
                    strokeWidth={2}
                    dot={{ fill: colors[1], strokeWidth: 2, r: 4 }}
                  />
                )}
              </RechartsLineChart>
            </ResponsiveContainer>
          </ChartContainer>
        )
      case "area":
        return (
          <ChartContainer
            config={{
              primary: { label: "Primary", color: colors[2] },
              secondary: { label: "Secondary", color: colors[3] },
            }}
            className="h-[200px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey={dataKeys[0]} stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey={dataKeys[1]}
                  stackId="1"
                  stroke={colors[2]}
                  fill={colors[2]}
                  fillOpacity={0.6}
                />
                {dataKeys[2] && (
                  <Area
                    type="monotone"
                    dataKey={dataKeys[2]}
                    stackId="1"
                    stroke={colors[3]}
                    fill={colors[3]}
                    fillOpacity={0.6}
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        )
      case "bar":
        return (
          <ChartContainer
            config={{
              primary: { label: "Primary", color: colors[4] },
              secondary: { label: "Secondary", color: colors[5] },
            }}
            className="h-[200px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey={dataKeys[0]} stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey={dataKeys[1]} fill={colors[4]} radius={[4, 4, 0, 0]} />
                {dataKeys[2] && <Bar dataKey={dataKeys[2]} fill={colors[5]} radius={[4, 4, 0, 0]} />}
              </RechartsBarChart>
            </ResponsiveContainer>
          </ChartContainer>
        )
      case "pie":
        return (
          <ChartContainer
            config={{
              value: { label: "Value", color: colors[0] },
            }}
            className="h-[200px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie data={data} cx="50%" cy="50%" innerRadius={40} outerRadius={80} paddingAngle={5} dataKey="value">
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </ChartContainer>
        )
      default:
        return <div className="h-[200px] flex items-center justify-center text-slate-500">Chart type not supported</div>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-slate-900">Financial Analytics Hub</h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm">
                <Calendar className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Users className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowPrivateData(!showPrivateData)}>
                {showPrivateData ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-slate-900">Financial Analytics Dashboard</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedTimeRange("7d")}>
                Last 7 days
              </Button>
              <Button variant="outline" size="sm" onClick={() => setSelectedTimeRange("30d")}>
                Last 30 days
              </Button>
              <Button variant="outline" size="sm" onClick={() => setSelectedTimeRange("90d")}>
                Last 90 days
              </Button>
              <Button variant="outline" size="sm" onClick={() => setSelectedTimeRange("1y")}>
                Last year
              </Button>
            </div>
          </div>
          <p className="text-slate-600">Comprehensive view of your financial analytics and risk management tools.</p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {miniDashboards.map((dashboard) => (
            <Card key={dashboard.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">{dashboard.title}</CardTitle>
                <dashboard.icon className={`w-5 h-5 ${dashboard.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900 mb-1">{dashboard.metrics[0].value}</div>
                <div className="flex items-center gap-1">
                  {dashboard.metrics[0].status === "good" ? (
                    <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-600" />
                  )}
                  <span
                    className={`text-sm font-medium ${dashboard.metrics[0].status === "good" ? "text-emerald-600" : "text-red-600"}`}
                  >
                    {dashboard.metrics[0].status === "good" ? "+" : "-"}
                    {dashboard.metrics[0].value.replace("%", "")}%
                  </span>
                  <span className="text-sm text-slate-500">vs last period</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900">Analytics Dashboards</h3>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Customize View
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {miniDashboards.map((dashboard) => (
              <Card key={dashboard.id} className="hover:shadow-xl transition-all duration-300 cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${dashboard.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}
                    >
                      <dashboard.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {dashboard.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <CardTitle className="text-lg font-bold text-slate-900">{dashboard.title}</CardTitle>
                    <CardDescription className="text-sm text-slate-600 mt-1">{dashboard.description}</CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {/* Metrics Section */}
                    <div className="grid grid-cols-2 gap-4">
                      {dashboard.metrics.map((metric, index) => (
                        <div key={index} className="space-y-1">
                          <p className="text-xs text-slate-500 font-medium">{metric.label}</p>
                          <p className="text-lg font-bold text-slate-900">{metric.value}</p>
                          <div className="flex items-center gap-1">
                            {metric.status === "good" ? (
                              <ArrowUpRight className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <ArrowDownRight className="w-3 h-3 text-red-600" />
                            )}
                            <span
                              className={`text-xs font-medium ${
                                metric.status === "good" ? "text-emerald-600" : "text-red-600"
                              }`}
                            >
                              {metric.change}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 border-t pt-4">
                      <div className="w-full overflow-hidden">{renderChart(dashboard)}</div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="text-xs text-slate-500">Updated: {dashboard.lastUpdated}</span>
                      <Button variant="ghost" size="sm" className="text-xs">
                        View Details
                        <ChevronRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-96">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-blue-600" />
                    Performance Breakdown
                  </CardTitle>
                  <CardDescription>Portfolio performance by asset class</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { category: "Fixed Income", amount: "$1,234,567", percentage: 43, color: "bg-blue-600" },
                      { category: "Equities", amount: "$856,432", percentage: 30, color: "bg-purple-600" },
                      {
                        category: "Alternative Investments",
                        amount: "$642,890",
                        percentage: 23,
                        color: "bg-emerald-600",
                      },
                      { category: "Cash & Equivalents", amount: "$113,643", percentage: 4, color: "bg-orange-600" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${item.color}`} />
                          <span className="text-sm font-medium text-slate-700">{item.category}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Progress value={item.percentage} className="w-20" />
                          <span className="text-sm font-semibold text-slate-900 w-20 text-right">{item.amount}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Analytics tools</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Calculator className="w-4 h-4 mr-2" />
                    Run Stress Test
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export Analytics
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Shield className="w-4 h-4 mr-2" />
                    Risk Assessment
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Forecast Models
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>Latest financial activity</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">{/* Placeholder for transactions data */}</div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Placeholder for insights data */}
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Risk Analytics Report</CardTitle>
                  <CardDescription>Comprehensive risk assessment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Value at Risk (VaR)</span>
                      <span className="font-semibold text-red-600">$2.4M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Expected Shortfall</span>
                      <span className="font-semibold text-red-600">$3.8M</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="font-medium text-slate-900">Risk Score</span>
                      <span className="font-bold text-orange-600">Medium</span>
                    </div>
                  </div>
                  <Button className="w-full mt-4">
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Analytics</CardTitle>
                  <CardDescription>Portfolio performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Sharpe Ratio</span>
                      <span className="font-semibold">1.42</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Alpha</span>
                      <span className="font-semibold text-emerald-600">+2.8%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Beta</span>
                      <span className="font-semibold">0.95</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    View Analytics
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

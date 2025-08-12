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
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-slate-900">Financial Analytics Hub</h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="default">
                <Calendar className="w-5 h-5 mr-2" />
                Calendar
              </Button>
              <Button variant="ghost" size="default">
                <Settings className="w-5 h-5 mr-2" />
                Settings
              </Button>
              <Button variant="ghost" size="default">
                <Users className="w-5 h-5 mr-2" />
                Team
              </Button>
              <Button variant="outline" size="default" onClick={() => setShowPrivateData(!showPrivateData)}>
                {showPrivateData ? <EyeOff className="w-5 h-5 mr-2" /> : <Eye className="w-5 h-5 mr-2" />}
                {showPrivateData ? "Hide Data" : "Show Data"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-2">Financial Analytics Dashboard</h2>
              <p className="text-lg text-slate-600">
                Comprehensive view of your financial analytics and risk management tools with real-time insights.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="default" onClick={() => setSelectedTimeRange("7d")}>
                Last 7 days
              </Button>
              <Button variant="outline" size="default" onClick={() => setSelectedTimeRange("30d")}>
                Last 30 days
              </Button>
              <Button variant="outline" size="default" onClick={() => setSelectedTimeRange("90d")}>
                Last 90 days
              </Button>
              <Button variant="outline" size="default" onClick={() => setSelectedTimeRange("1y")}>
                Last year
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-6 gap-8 mb-12">
          {miniDashboards.map((dashboard) => (
            <Card key={dashboard.id} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-base font-semibold text-slate-700">{dashboard.title}</CardTitle>
                <dashboard.icon className={`w-7 h-7 ${dashboard.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900 mb-2">{dashboard.metrics[0].value}</div>
                <div className="flex items-center gap-2">
                  {dashboard.metrics[0].status === "good" ? (
                    <ArrowUpRight className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <ArrowDownRight className="w-5 h-5 text-red-600" />
                  )}
                  <span
                    className={`text-base font-semibold ${dashboard.metrics[0].status === "good" ? "text-emerald-600" : "text-red-600"}`}
                  >
                    {dashboard.metrics[0].status === "good" ? "+" : "-"}
                    {dashboard.metrics[0].value.replace("%", "")}%
                  </span>
                  <span className="text-base text-slate-500">vs last period</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-slate-900">Analytics Dashboards</h3>
            <Button variant="outline" size="lg">
              <Settings className="w-5 h-5 mr-2" />
              Customize View
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-10">
            {miniDashboards.map((dashboard) => (
              <Card
                key={dashboard.id}
                className="hover:shadow-2xl transition-all duration-300 cursor-pointer group border-0 shadow-lg"
              >
                <CardHeader className="pb-6">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-r ${dashboard.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}
                    >
                      <dashboard.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-sm px-3 py-1">
                        {dashboard.status}
                      </Badge>
                      <Button variant="ghost" size="default">
                        <ExternalLink className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <CardTitle className="text-2xl font-bold text-slate-900">{dashboard.title}</CardTitle>
                    <CardDescription className="text-base text-slate-600 mt-2 leading-relaxed">
                      {dashboard.description}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      {dashboard.metrics.map((metric, index) => (
                        <div key={index} className="space-y-2 p-4 bg-slate-50 rounded-lg">
                          <p className="text-sm text-slate-500 font-medium uppercase tracking-wide">{metric.label}</p>
                          <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
                          <div className="flex items-center gap-2">
                            {metric.status === "good" ? (
                              <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <ArrowDownRight className="w-4 h-4 text-red-600" />
                            )}
                            <span
                              className={`text-sm font-semibold ${
                                metric.status === "good" ? "text-emerald-600" : "text-red-600"
                              }`}
                            >
                              {metric.change}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 border-t pt-6">
                      <div className="w-full h-80 overflow-hidden">{renderChart(dashboard)}</div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <span className="text-sm text-slate-500">Last updated: {dashboard.lastUpdated}</span>
                      <Button variant="default" size="default" className="px-6">
                        View Detailed Report
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 h-14 text-base">
            <TabsTrigger value="overview" className="text-base">
              Overview
            </TabsTrigger>
            <TabsTrigger value="transactions" className="text-base">
              Transactions
            </TabsTrigger>
            <TabsTrigger value="insights" className="text-base">
              Insights
            </TabsTrigger>
            <TabsTrigger value="reports" className="text-base">
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-3 gap-8">
              <Card className="col-span-2 shadow-lg border-0">
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <PieChart className="w-6 h-6 text-blue-600" />
                    Performance Breakdown
                  </CardTitle>
                  <CardDescription className="text-base">Portfolio performance by asset class</CardDescription>
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

              <Card className="shadow-lg border-0">
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

          <TabsContent value="transactions" className="space-y-8">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>Latest financial activity</CardDescription>
                  </div>
                  <Button variant="outline" size="default">
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

          <TabsContent value="insights" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Placeholder for insights data */}
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-8">
            <div className="grid grid-cols-2 gap-8">
              <Card className="shadow-lg border-0">
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl">Risk Analytics Report</CardTitle>
                  <CardDescription className="text-base">Comprehensive risk assessment and analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                      <span className="text-slate-700 font-medium">Value at Risk (VaR)</span>
                      <span className="font-bold text-red-600 text-xl">$2.4M</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                      <span className="text-slate-700 font-medium">Expected Shortfall</span>
                      <span className="font-bold text-red-600 text-xl">$3.8M</span>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t">
                      <span className="font-semibold text-slate-900 text-lg">Risk Score</span>
                      <span className="font-bold text-orange-600 text-xl">Medium</span>
                    </div>
                  </div>
                  <Button className="w-full mt-6 h-12 text-base">
                    <Download className="w-5 h-5 mr-2" />
                    Download Full Report
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl">Performance Analytics</CardTitle>
                  <CardDescription className="text-base">Portfolio performance metrics and benchmarks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                      <span className="text-slate-700 font-medium">Sharpe Ratio</span>
                      <span className="font-bold text-xl">1.42</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-emerald-50 rounded-lg">
                      <span className="text-slate-700 font-medium">Alpha</span>
                      <span className="font-bold text-emerald-600 text-xl">+2.8%</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                      <span className="text-slate-700 font-medium">Beta</span>
                      <span className="font-bold text-xl">0.95</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-6 h-12 text-base bg-transparent">
                    View Detailed Analytics
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

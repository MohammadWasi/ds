"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  DollarSign,
  PieChart,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Settings,
  Bell,
  Search,
  Filter,
  Download,
  Eye,
  EyeOff,
  Activity,
  Target,
  Zap,
  Shield,
  Calculator,
  TrendingDown,
  AlertTriangle,
  Clock,
  ExternalLink,
} from "lucide-react"

export default function FinancialDashboard() {
  const [timeRange, setTimeRange] = useState("30d")
  const [showBalance, setShowBalance] = useState(true)

  const overviewMetrics = [
    {
      title: "Total Portfolio Value",
      value: showBalance ? "$2,847,532.00" : "••••••••",
      change: "+8.2%",
      trend: "up",
      icon: DollarSign,
      color: "text-emerald-600",
    },
    {
      title: "Risk-Adjusted Return",
      value: showBalance ? "12.4%" : "••••",
      change: "+2.1%",
      trend: "up",
      icon: Shield,
      color: "text-blue-600",
    },
    {
      title: "Liquidity Ratio",
      value: "1.85",
      change: "-0.05",
      trend: "down",
      icon: Activity,
      color: "text-purple-600",
    },
    {
      title: "Active Positions",
      value: "247",
      change: "+12",
      trend: "up",
      icon: Target,
      color: "text-orange-600",
    },
  ]

  const miniDashboards = [
    {
      id: "lst-forecasting",
      title: "LST Forecasting",
      description: "Liquidity Stress Testing Forecasting Models",
      icon: TrendingUp,
      color: "from-blue-500 to-blue-600",
      metrics: [
        { label: "Stress Scenario Coverage", value: "98.5%", status: "good" },
        { label: "Forecast Accuracy", value: "94.2%", status: "good" },
        { label: "Model Confidence", value: "87.3%", status: "warning" },
      ],
      lastUpdated: "2 hours ago",
      status: "active",
    },
    {
      id: "lst-bau",
      title: "LST BAU",
      description: "Liquidity Stress Testing Business As Usual",
      icon: Shield,
      color: "from-emerald-500 to-emerald-600",
      metrics: [
        { label: "BAU Liquidity Buffer", value: "$1.2B", status: "good" },
        { label: "Coverage Ratio", value: "145%", status: "good" },
        { label: "Stress Test Pass Rate", value: "96.8%", status: "good" },
      ],
      lastUpdated: "1 hour ago",
      status: "active",
    },
    {
      id: "irr",
      title: "IRR Analysis",
      description: "Internal Rate of Return Calculations",
      icon: Calculator,
      color: "from-purple-500 to-purple-600",
      metrics: [
        { label: "Portfolio IRR", value: "14.7%", status: "good" },
        { label: "Benchmark Comparison", value: "+3.2%", status: "good" },
        { label: "Risk-Adjusted IRR", value: "11.9%", status: "good" },
      ],
      lastUpdated: "30 minutes ago",
      status: "active",
    },
    {
      id: "rft",
      title: "RFT Dashboard",
      description: "Rate Forecasting Tool",
      icon: TrendingDown,
      color: "from-orange-500 to-orange-600",
      metrics: [
        { label: "Fed Rate Forecast", value: "4.75%", status: "warning" },
        { label: "Yield Curve Slope", value: "0.85%", status: "good" },
        { label: "Volatility Index", value: "18.3", status: "warning" },
      ],
      lastUpdated: "15 minutes ago",
      status: "active",
    },
    {
      id: "ccf",
      title: "CCF Monitor",
      description: "Credit Conversion Factor Analysis",
      icon: AlertTriangle,
      color: "from-red-500 to-red-600",
      metrics: [
        { label: "Average CCF", value: "23.4%", status: "good" },
        { label: "High-Risk Exposures", value: "12", status: "warning" },
        { label: "Regulatory Compliance", value: "99.1%", status: "good" },
      ],
      lastUpdated: "45 minutes ago",
      status: "active",
    },
    {
      id: "ftp",
      title: "FTP Engine",
      description: "Funds Transfer Pricing",
      icon: Zap,
      color: "from-indigo-500 to-indigo-600",
      metrics: [
        { label: "Net Interest Margin", value: "3.42%", status: "good" },
        { label: "Transfer Rate", value: "2.85%", status: "good" },
        { label: "Spread Analysis", value: "+0.57%", status: "good" },
      ],
      lastUpdated: "1 hour ago",
      status: "active",
    },
  ]

  const transactions = [
    {
      id: 1,
      description: "Portfolio Rebalancing",
      amount: "+$125,000.00",
      date: "Today",
      category: "Investment",
      type: "credit",
    },
    {
      id: 2,
      description: "Risk Management Fee",
      amount: "-$2,450.00",
      date: "Yesterday",
      category: "Fee",
      type: "debit",
    },
    {
      id: 3,
      description: "Dividend Distribution",
      amount: "+$8,750.00",
      date: "2 days ago",
      category: "Income",
      type: "credit",
    },
    {
      id: 4,
      description: "Compliance Audit",
      amount: "-$5,200.00",
      date: "3 days ago",
      category: "Operational",
      type: "debit",
    },
    {
      id: 5,
      description: "Interest Payment",
      amount: "+$15,680.00",
      date: "4 days ago",
      category: "Income",
      type: "credit",
    },
  ]

  const insights = [
    {
      title: "Liquidity Alert",
      description: "LST forecasting indicates potential stress in Q2. Consider increasing buffer by 15%.",
      type: "warning",
      action: "Review LST Models",
      dashboard: "lst-forecasting",
    },
    {
      title: "IRR Opportunity",
      description: "Current portfolio IRR exceeds benchmark by 3.2%. Consider scaling successful strategies.",
      type: "success",
      action: "Analyze Performance",
      dashboard: "irr",
    },
    {
      title: "Rate Environment",
      description: "RFT models suggest rate volatility ahead. Review hedging strategies.",
      type: "info",
      action: "Update Forecasts",
      dashboard: "rft",
    },
  ]

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
                <Search className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>FA</AvatarFallback>
              </Avatar>
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
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={() => setShowBalance(!showBalance)}>
                {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>
          <p className="text-slate-600">Comprehensive view of your financial analytics and risk management tools.</p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {overviewMetrics.map((metric, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">{metric.title}</CardTitle>
                <metric.icon className={`w-5 h-5 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900 mb-1">{metric.value}</div>
                <div className="flex items-center gap-1">
                  {metric.trend === "up" ? (
                    <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-600" />
                  )}
                  <span
                    className={`text-sm font-medium ${metric.trend === "up" ? "text-emerald-600" : "text-red-600"}`}
                  >
                    {metric.change}
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
                      <Badge variant={dashboard.status === "active" ? "default" : "secondary"} className="text-xs">
                        {dashboard.status}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <CardTitle className="text-lg mb-1">{dashboard.title}</CardTitle>
                    <CardDescription className="text-sm">{dashboard.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {dashboard.metrics.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">{metric.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900">{metric.value}</span>
                        <div
                          className={`w-2 h-2 rounded-full ${
                            metric.status === "good"
                              ? "bg-emerald-500"
                              : metric.status === "warning"
                                ? "bg-orange-500"
                                : "bg-red-500"
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <Clock className="w-3 h-3" />
                      Updated {dashboard.lastUpdated}
                    </div>
                    <Button variant="outline" size="sm" className="text-xs bg-transparent">
                      View Details
                    </Button>
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
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.type === "credit" ? "bg-emerald-100" : "bg-red-100"
                          }`}
                        >
                          {transaction.type === "credit" ? (
                            <ArrowUpRight className="w-5 h-5 text-emerald-600" />
                          ) : (
                            <ArrowDownRight className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{transaction.description}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {transaction.category}
                            </Badge>
                            <span className="text-sm text-slate-500">{transaction.date}</span>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`font-semibold ${
                          transaction.type === "credit" ? "text-emerald-600" : "text-red-600"
                        }`}
                      >
                        {transaction.amount}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {insights.map((insight, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          insight.type === "warning"
                            ? "bg-orange-500"
                            : insight.type === "success"
                              ? "bg-emerald-500"
                              : "bg-blue-500"
                        }`}
                      />
                      <CardTitle className="text-lg">{insight.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">{insight.description}</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        {insight.action}
                      </Button>
                      {insight.dashboard && (
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
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

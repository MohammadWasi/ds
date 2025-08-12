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
  CreditCard,
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
} from "lucide-react"

export default function FinancialDashboard() {
  const [timeRange, setTimeRange] = useState("30d")
  const [showBalance, setShowBalance] = useState(true)

  const metrics = [
    {
      title: "Total Balance",
      value: showBalance ? "$124,532.00" : "••••••••",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-emerald-600",
    },
    {
      title: "Monthly Spending",
      value: showBalance ? "$8,234.50" : "••••••••",
      change: "-3.2%",
      trend: "down",
      icon: CreditCard,
      color: "text-blue-600",
    },
    {
      title: "Investments",
      value: showBalance ? "$45,678.90" : "••••••••",
      change: "+8.7%",
      trend: "up",
      icon: TrendingUp,
      color: "text-purple-600",
    },
    {
      title: "Savings Goal",
      value: "68%",
      change: "+5.1%",
      trend: "up",
      icon: PieChart,
      color: "text-orange-600",
    },
  ]

  const transactions = [
    { id: 1, description: "Salary Deposit", amount: "+$5,200.00", date: "Today", category: "Income", type: "credit" },
    { id: 2, description: "Grocery Store", amount: "-$127.45", date: "Yesterday", category: "Food", type: "debit" },
    {
      id: 3,
      description: "Netflix Subscription",
      amount: "-$15.99",
      date: "2 days ago",
      category: "Entertainment",
      type: "debit",
    },
    {
      id: 4,
      description: "Investment Return",
      amount: "+$342.18",
      date: "3 days ago",
      category: "Investment",
      type: "credit",
    },
    {
      id: 5,
      description: "Electric Bill",
      amount: "-$89.32",
      date: "4 days ago",
      category: "Utilities",
      type: "debit",
    },
  ]

  const insights = [
    {
      title: "Spending Alert",
      description: "You've spent 15% more on dining this month compared to last month.",
      type: "warning",
      action: "View Details",
    },
    {
      title: "Savings Opportunity",
      description: "You could save $200/month by switching to a high-yield savings account.",
      type: "success",
      action: "Learn More",
    },
    {
      title: "Investment Tip",
      description: "Consider diversifying your portfolio with international stocks.",
      type: "info",
      action: "Explore Options",
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
                <h1 className="text-xl font-bold text-slate-900">FinanceHub</h1>
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
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-slate-900">Welcome back, John</h2>
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
          <p className="text-slate-600">
            Here's your financial overview for{" "}
            {timeRange === "7d"
              ? "the last 7 days"
              : timeRange === "30d"
                ? "the last 30 days"
                : timeRange === "90d"
                  ? "the last 90 days"
                  : "the last year"}
            .
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
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
              {/* Spending Breakdown */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-blue-600" />
                    Spending Breakdown
                  </CardTitle>
                  <CardDescription>Your expenses by category this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { category: "Food & Dining", amount: "$1,234", percentage: 35, color: "bg-blue-600" },
                      { category: "Transportation", amount: "$856", percentage: 24, color: "bg-purple-600" },
                      { category: "Shopping", amount: "$642", percentage: 18, color: "bg-emerald-600" },
                      { category: "Utilities", amount: "$428", percentage: 12, color: "bg-orange-600" },
                      { category: "Entertainment", amount: "$386", percentage: 11, color: "bg-red-600" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${item.color}`} />
                          <span className="text-sm font-medium text-slate-700">{item.category}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Progress value={item.percentage} className="w-20" />
                          <span className="text-sm font-semibold text-slate-900 w-16 text-right">{item.amount}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Manage your finances</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Transfer Money
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <PieChart className="w-4 h-4 mr-2" />
                    Set Budget
                  </Button>
                  <Button className="w-full justify-start bg-transparent" variant="outline">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Investment Goals
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
                    <CardDescription>Your latest financial activity</CardDescription>
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
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      {insight.action}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Report</CardTitle>
                  <CardDescription>Comprehensive financial summary</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Total Income</span>
                      <span className="font-semibold text-emerald-600">+$8,420.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Total Expenses</span>
                      <span className="font-semibold text-red-600">-$6,234.50</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="font-medium text-slate-900">Net Income</span>
                      <span className="font-bold text-emerald-600">+$2,185.50</span>
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
                  <CardTitle>Investment Performance</CardTitle>
                  <CardDescription>Portfolio growth over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Portfolio Value</span>
                      <span className="font-semibold">$45,678.90</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Total Return</span>
                      <span className="font-semibold text-emerald-600">+$3,456.78</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Return Rate</span>
                      <span className="font-semibold text-emerald-600">+8.2%</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    View Portfolio
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

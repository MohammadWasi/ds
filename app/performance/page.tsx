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
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts"
import {
  TrendingUp,
  DollarSign,
  Users,
  Target,
  Download,
  RefreshCw,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

// Business performance data
const revenueData = [
  { month: "Jan", revenue: 45000, expenses: 32000, profit: 13000, margin: 28.9 },
  { month: "Feb", revenue: 52000, expenses: 35000, profit: 17000, margin: 32.7 },
  { month: "Mar", revenue: 48000, expenses: 33000, profit: 15000, margin: 31.3 },
  { month: "Apr", revenue: 61000, expenses: 38000, profit: 23000, margin: 37.7 },
  { month: "May", revenue: 55000, expenses: 36000, profit: 19000, margin: 34.5 },
  { month: "Jun", revenue: 67000, expenses: 41000, profit: 26000, margin: 38.8 },
  { month: "Jul", revenue: 72000, expenses: 43000, profit: 29000, margin: 40.3 },
  { month: "Aug", revenue: 69000, expenses: 42000, profit: 27000, margin: 39.1 },
  { month: "Sep", revenue: 78000, expenses: 45000, profit: 33000, margin: 42.3 },
  { month: "Oct", revenue: 82000, expenses: 47000, profit: 35000, margin: 42.7 },
  { month: "Nov", revenue: 89000, expenses: 50000, profit: 39000, margin: 43.8 },
  { month: "Dec", revenue: 95000, expenses: 52000, profit: 43000, margin: 45.3 },
]

const kpiData = [
  { month: "Jan", customerAcquisition: 245, retention: 89.2, satisfaction: 4.2, nps: 42 },
  { month: "Feb", customerAcquisition: 289, retention: 91.5, satisfaction: 4.3, nps: 45 },
  { month: "Mar", customerAcquisition: 267, retention: 88.7, satisfaction: 4.1, nps: 38 },
  { month: "Apr", customerAcquisition: 324, retention: 92.1, satisfaction: 4.4, nps: 48 },
  { month: "May", customerAcquisition: 298, retention: 90.8, satisfaction: 4.3, nps: 44 },
  { month: "Jun", customerAcquisition: 356, retention: 93.2, satisfaction: 4.5, nps: 52 },
  { month: "Jul", customerAcquisition: 378, retention: 94.1, satisfaction: 4.6, nps: 55 },
  { month: "Aug", customerAcquisition: 342, retention: 92.8, satisfaction: 4.4, nps: 49 },
  { month: "Sep", customerAcquisition: 389, retention: 95.2, satisfaction: 4.7, nps: 58 },
  { month: "Oct", customerAcquisition: 412, retention: 96.1, satisfaction: 4.8, nps: 62 },
  { month: "Nov", customerAcquisition: 445, retention: 97.3, satisfaction: 4.9, nps: 67 },
  { month: "Dec", customerAcquisition: 478, retention: 98.1, satisfaction: 5.0, nps: 71 },
]

const productPerformance = [
  { name: "Premium Plan", revenue: 450000, customers: 1250, growth: 12.5, color: "hsl(221, 83%, 53%)" },
  { name: "Basic Plan", revenue: 320000, customers: 2100, growth: 8.2, color: "hsl(142, 76%, 36%)" },
  { name: "Enterprise Plan", revenue: 280000, customers: 180, growth: -2.1, color: "hsl(271, 81%, 56%)" },
  { name: "Add-ons", revenue: 150000, customers: 890, growth: 15.7, color: "hsl(43, 96%, 56%)" },
  { name: "Consulting", revenue: 120000, customers: 45, growth: 5.3, color: "hsl(199, 89%, 48%)" },
]

const expenseBreakdown = [
  { name: "Salaries", value: 35, amount: 182000, color: "hsl(221, 83%, 53%)" },
  { name: "Marketing", value: 25, amount: 130000, color: "hsl(142, 76%, 36%)" },
  { name: "Operations", value: 20, amount: 104000, color: "hsl(271, 81%, 56%)" },
  { name: "Technology", value: 12, amount: 62400, color: "hsl(43, 96%, 56%)" },
  { name: "Other", value: 8, amount: 41600, color: "hsl(199, 89%, 48%)" },
]

const regionalPerformance = [
  { region: "North America", revenue: 425000, growth: 15.2, customers: 2850, color: "hsl(221, 83%, 53%)" },
  { region: "Europe", revenue: 312000, growth: 8.7, customers: 1920, color: "hsl(142, 76%, 36%)" },
  { region: "Asia Pacific", revenue: 198000, growth: 22.1, customers: 1450, color: "hsl(271, 81%, 56%)" },
  { region: "Latin America", revenue: 89000, growth: 18.5, customers: 680, color: "hsl(43, 96%, 56%)" },
  { region: "Middle East", revenue: 67000, growth: 12.3, customers: 420, color: "hsl(199, 89%, 48%)" },
]

// Chart colors from the palette
const chartColors = {
  primary: "hsl(221, 83%, 53%)", // Primary blue
  secondary: "hsl(142, 76%, 36%)", // Green
  accent: "hsl(271, 81%, 56%)", // Purple
  warning: "hsl(43, 96%, 56%)", // Yellow
  danger: "hsl(0, 84%, 60%)", // Red/Pink
  success: "hsl(142, 76%, 36%)", // Green
  info: "hsl(199, 89%, 48%)", // Teal
  neutral: "hsl(215, 16%, 47%)", // Slate
}

export default function PerformanceDashboard() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [timeRange, setTimeRange] = useState("12m")
  const [selectedTab, setSelectedTab] = useState("overview")

  // Calculate current metrics
  const currentMonth = revenueData[revenueData.length - 1]
  const previousMonth = revenueData[revenueData.length - 2]
  const currentKPI = kpiData[kpiData.length - 1]
  const previousKPI = kpiData[kpiData.length - 2]

  const kpis = [
    {
      title: "Total Revenue",
      value: `$${(currentMonth.revenue / 1000).toFixed(0)}K`,
      change: `${(((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue) * 100).toFixed(1)}%`,
      trend: currentMonth.revenue > previousMonth.revenue ? "up" : "down",
      icon: DollarSign,
      description: "vs last month",
      color: chartColors.primary,
    },
    {
      title: "Profit Margin",
      value: `${currentMonth.margin.toFixed(1)}%`,
      change: `${(currentMonth.margin - previousMonth.margin).toFixed(1)}%`,
      trend: currentMonth.margin > previousMonth.margin ? "up" : "down",
      icon: TrendingUp,
      description: "vs last month",
      color: chartColors.success,
    },
    {
      title: "New Customers",
      value: currentKPI.customerAcquisition.toString(),
      change: `${(((currentKPI.customerAcquisition - previousKPI.customerAcquisition) / previousKPI.customerAcquisition) * 100).toFixed(1)}%`,
      trend: currentKPI.customerAcquisition > previousKPI.customerAcquisition ? "up" : "down",
      icon: Users,
      description: "vs last month",
      color: chartColors.accent,
    },
    {
      title: "Customer Satisfaction",
      value: currentKPI.satisfaction.toFixed(1),
      change: `${(currentKPI.satisfaction - previousKPI.satisfaction).toFixed(1)}`,
      trend: currentKPI.satisfaction > previousKPI.satisfaction ? "up" : "down",
      icon: Target,
      description: "out of 5.0",
      color: chartColors.warning,
    },
  ]

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{`${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.dataKey}: ${entry.value}${entry.dataKey.includes("margin") || entry.dataKey.includes("retention") || entry.dataKey.includes("satisfaction") ? "" : entry.dataKey.includes("revenue") || entry.dataKey.includes("expenses") || entry.dataKey.includes("profit") ? "K" : ""}`}
            </p>
          ))}
        </div>
      )
    }
    return null
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
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${chartColors.primary}20` }}>
                  <BarChart3 className="h-6 w-6" style={{ color: chartColors.primary }} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Business Performance Dashboard</h1>
                  <p className="text-muted-foreground">Track revenue, growth metrics, and key performance indicators</p>
                </div>
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

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {kpis.map((kpi) => {
                const Icon = kpi.icon
                const TrendIcon = kpi.trend === "up" ? ArrowUpRight : ArrowDownRight

                return (
                  <Card key={kpi.title} className="relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: kpi.color }} />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                      <Icon className="h-4 w-4" style={{ color: kpi.color }} />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{kpi.value}</div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <TrendIcon
                          className="h-3 w-3 mr-1"
                          style={{ color: kpi.trend === "up" ? chartColors.success : chartColors.danger }}
                        />
                        <span style={{ color: kpi.trend === "up" ? chartColors.success : chartColors.danger }}>
                          {kpi.change}
                        </span>
                        <span className="ml-1">{kpi.description}</span>
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
                <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
                <TabsTrigger value="customers">Customer Metrics</TabsTrigger>
                <TabsTrigger value="products">Product Performance</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Revenue & Profit Trends */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Revenue & Profit Trends</CardTitle>
                      <CardDescription>Monthly revenue, expenses, and profit over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <ComposedChart data={revenueData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                          <YAxis stroke="hsl(var(--muted-foreground))" />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend />
                          <Bar dataKey="revenue" fill={chartColors.primary} name="Revenue ($K)" />
                          <Bar dataKey="expenses" fill={chartColors.neutral} name="Expenses ($K)" />
                          <Line
                            type="monotone"
                            dataKey="profit"
                            stroke={chartColors.success}
                            strokeWidth={3}
                            name="Profit ($K)"
                          />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Expense Breakdown */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Expense Breakdown</CardTitle>
                      <CardDescription>Current month expense distribution</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={expenseBreakdown}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {expenseBreakdown.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                {/* Regional Performance */}
                <Card>
                  <CardHeader>
                    <CardTitle>Regional Performance</CardTitle>
                    <CardDescription>Revenue and growth by geographic region</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <ComposedChart data={regionalPerformance}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="region" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar dataKey="revenue" fill={chartColors.primary} name="Revenue ($K)" />
                        <Line
                          type="monotone"
                          dataKey="growth"
                          stroke={chartColors.success}
                          strokeWidth={3}
                          name="Growth %"
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Revenue Analysis Tab */}
              <TabsContent value="revenue" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Profit Margin Trend */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Profit Margin Trend</CardTitle>
                      <CardDescription>Monthly profit margin percentage</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={revenueData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                          <YAxis stroke="hsl(var(--muted-foreground))" />
                          <Tooltip content={<CustomTooltip />} />
                          <Area
                            type="monotone"
                            dataKey="margin"
                            stroke={chartColors.success}
                            fill={chartColors.success}
                            fillOpacity={0.3}
                            name="Profit Margin %"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Revenue Growth */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Monthly Revenue Growth</CardTitle>
                      <CardDescription>Month-over-month revenue change</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                          data={revenueData.map((item, index) => ({
                            ...item,
                            growth:
                              index > 0
                                ? ((item.revenue - revenueData[index - 1].revenue) / revenueData[index - 1].revenue) *
                                  100
                                : 0,
                          }))}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                          <YAxis stroke="hsl(var(--muted-foreground))" />
                          <Tooltip content={<CustomTooltip />} />
                          <Bar dataKey="growth" fill={chartColors.accent} name="Growth %" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                {/* Revenue Breakdown Table */}
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Revenue Breakdown</CardTitle>
                    <CardDescription>Detailed monthly financial performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Month</TableHead>
                          <TableHead>Revenue</TableHead>
                          <TableHead>Expenses</TableHead>
                          <TableHead>Profit</TableHead>
                          <TableHead>Margin</TableHead>
                          <TableHead>Growth</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {revenueData.map((item, index) => {
                          const growth =
                            index > 0
                              ? ((item.revenue - revenueData[index - 1].revenue) / revenueData[index - 1].revenue) * 100
                              : 0
                          return (
                            <TableRow key={item.month}>
                              <TableCell className="font-medium">{item.month}</TableCell>
                              <TableCell>${(item.revenue / 1000).toFixed(0)}K</TableCell>
                              <TableCell>${(item.expenses / 1000).toFixed(0)}K</TableCell>
                              <TableCell>${(item.profit / 1000).toFixed(0)}K</TableCell>
                              <TableCell>{item.margin.toFixed(1)}%</TableCell>
                              <TableCell>
                                <Badge variant={growth > 0 ? "default" : "destructive"}>
                                  {growth > 0 ? "+" : ""}
                                  {growth.toFixed(1)}%
                                </Badge>
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Customer Metrics Tab */}
              <TabsContent value="customers" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Customer Acquisition */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Customer Acquisition</CardTitle>
                      <CardDescription>New customers acquired monthly</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={kpiData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                          <YAxis stroke="hsl(var(--muted-foreground))" />
                          <Tooltip content={<CustomTooltip />} />
                          <Area
                            type="monotone"
                            dataKey="customerAcquisition"
                            stroke={chartColors.accent}
                            fill={chartColors.accent}
                            fillOpacity={0.3}
                            name="New Customers"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Customer Satisfaction & NPS */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Customer Satisfaction & NPS</CardTitle>
                      <CardDescription>Satisfaction score and Net Promoter Score</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <ComposedChart data={kpiData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                          <YAxis stroke="hsl(var(--muted-foreground))" />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="satisfaction"
                            stroke={chartColors.warning}
                            strokeWidth={3}
                            name="Satisfaction (1-5)"
                          />
                          <Bar dataKey="nps" fill={chartColors.info} name="NPS Score" />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Customer Retention */}
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Customer Retention Rate</CardTitle>
                      <CardDescription>Monthly customer retention percentage</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={kpiData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                          <YAxis domain={[85, 100]} stroke="hsl(var(--muted-foreground))" />
                          <Tooltip content={<CustomTooltip />} />
                          <Line
                            type="monotone"
                            dataKey="retention"
                            stroke={chartColors.success}
                            strokeWidth={3}
                            name="Retention %"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Product Performance Tab */}
              <TabsContent value="products" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Product Revenue */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Product Revenue Distribution</CardTitle>
                      <CardDescription>Revenue contribution by product</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={productPerformance}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, value }) => `${name}: $${(value / 1000).toFixed(0)}K`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="revenue"
                          >
                            {productPerformance.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`$${(value / 1000).toFixed(0)}K`, "Revenue"]} />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Product Growth */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Product Growth Rates</CardTitle>
                      <CardDescription>Year-over-year growth by product</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={productPerformance}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                          <YAxis stroke="hsl(var(--muted-foreground))" />
                          <Tooltip content={<CustomTooltip />} />
                          <Bar dataKey="growth" fill={chartColors.primary} name="Growth %" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                {/* Product Performance Table */}
                <Card>
                  <CardHeader>
                    <CardTitle>Product Performance Summary</CardTitle>
                    <CardDescription>Detailed product metrics and performance indicators</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>Revenue</TableHead>
                          <TableHead>Customers</TableHead>
                          <TableHead>Avg Revenue/Customer</TableHead>
                          <TableHead>Growth Rate</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {productPerformance.map((product) => (
                          <TableRow key={product.name}>
                            <TableCell className="font-medium">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: product.color }} />
                                {product.name}
                              </div>
                            </TableCell>
                            <TableCell>${(product.revenue / 1000).toFixed(0)}K</TableCell>
                            <TableCell>{product.customers.toLocaleString()}</TableCell>
                            <TableCell>${(product.revenue / product.customers).toFixed(0)}</TableCell>
                            <TableCell>
                              <Badge variant={product.growth > 0 ? "default" : "destructive"}>
                                {product.growth > 0 ? "+" : ""}
                                {product.growth}%
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  product.growth > 10 ? "default" : product.growth > 0 ? "secondary" : "destructive"
                                }
                              >
                                {product.growth > 10 ? "Excellent" : product.growth > 0 ? "Good" : "Declining"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

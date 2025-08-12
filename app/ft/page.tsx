"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  TrendingDown,
  ArrowLeft,
  Download,
  RefreshCw,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  LineChart,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Zap,
} from "lucide-react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts"
import Link from "next/link"

// Sample data for RFT Dashboard
const rateForecastData = [
  { month: "Jan", fedRate: 4.25, forecast: 4.5, yieldCurve: 0.75, volatility: 16.2 },
  { month: "Feb", fedRate: 4.5, forecast: 4.75, yieldCurve: 0.82, volatility: 17.1 },
  { month: "Mar", fedRate: 4.75, forecast: 4.75, yieldCurve: 0.85, volatility: 18.3 },
  { month: "Apr", fedRate: 4.75, forecast: 4.5, yieldCurve: 0.88, volatility: 19.1 },
  { month: "May", fedRate: 4.75, forecast: 4.25, yieldCurve: 0.85, volatility: 18.7 },
  { month: "Jun", fedRate: 4.75, forecast: 4.0, yieldCurve: 0.85, volatility: 18.3 },
]

const yieldCurveData = [
  { maturity: "3M", current: 4.8, forecast: 4.2, historical: 4.5 },
  { maturity: "6M", current: 4.9, forecast: 4.3, historical: 4.6 },
  { maturity: "1Y", current: 5.0, forecast: 4.4, historical: 4.7 },
  { maturity: "2Y", current: 5.2, forecast: 4.6, historical: 4.9 },
  { maturity: "5Y", current: 5.4, forecast: 4.8, historical: 5.1 },
  { maturity: "10Y", current: 5.6, forecast: 5.0, historical: 5.3 },
  { maturity: "30Y", current: 5.8, forecast: 5.2, historical: 5.5 },
]

const marketIndicatorsData = [
  { indicator: "Fed Funds Rate", current: 4.75, forecast: 4.0, change: -0.75, status: "decreasing" },
  { indicator: "10Y Treasury", current: 5.6, forecast: 5.0, change: -0.6, status: "decreasing" },
  { indicator: "2Y-10Y Spread", current: 0.4, forecast: 0.6, change: 0.2, status: "increasing" },
  { indicator: "Credit Spreads", current: 1.8, forecast: 1.5, change: -0.3, status: "tightening" },
  { indicator: "Mortgage Rates", current: 6.2, forecast: 5.5, change: -0.7, status: "decreasing" },
]

const volatilityData = [
  { period: "1W", rate: 12.4, bond: 8.2, fx: 15.6 },
  { period: "1M", rate: 18.3, bond: 12.1, fx: 22.8 },
  { period: "3M", rate: 24.7, bond: 16.5, fx: 28.3 },
  { period: "6M", rate: 31.2, bond: 21.8, fx: 35.1 },
  { period: "1Y", rate: 28.9, bond: 19.4, fx: 32.7 },
]

const scenarioAnalysisData = [
  { scenario: "Base Case", probability: 45, fedRate: 4.0, tenYear: 5.0, impact: "neutral" },
  { scenario: "Hawkish Fed", probability: 25, fedRate: 5.0, tenYear: 5.8, impact: "negative" },
  { scenario: "Dovish Fed", probability: 20, fedRate: 3.0, tenYear: 4.2, impact: "positive" },
  { scenario: "Recession", probability: 10, fedRate: 2.5, tenYear: 3.8, impact: "mixed" },
]

export default function RFTDashboardPage() {
  const [selectedHorizon, setSelectedHorizon] = useState("6m")
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
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">RFT Dashboard</h1>
                  <p className="text-slate-600">Rate Forecasting Tool</p>
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
              <CardTitle className="text-sm font-medium text-slate-600">Fed Rate Forecast</CardTitle>
              <TrendingDown className="w-4 h-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">4.75%</div>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-4 h-4 text-orange-600" />
                <span className="text-sm text-orange-600 font-semibold">+0.2%</span>
                <span className="text-sm text-slate-500">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Yield Curve Slope</CardTitle>
              <BarChart3 className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">0.85%</div>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                <span className="text-sm text-emerald-600 font-semibold">+0.03%</span>
                <span className="text-sm text-slate-500">vs last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Volatility Index</CardTitle>
              <Zap className="w-4 h-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">18.3</div>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-4 h-4 text-orange-600" />
                <span className="text-sm text-orange-600 font-semibold">+0.8</span>
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
              <div className="text-2xl font-bold text-slate-900">15m ago</div>
              <div className="flex items-center gap-1 mt-1">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span className="text-sm text-emerald-600 font-semibold">Up to date</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="forecasts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 h-12">
            <TabsTrigger value="forecasts">Rate Forecasts</TabsTrigger>
            <TabsTrigger value="yield-curve">Yield Curve</TabsTrigger>
            <TabsTrigger value="volatility">Volatility</TabsTrigger>
            <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
          </TabsList>

          <TabsContent value="forecasts" className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              <Card className="col-span-2 shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="w-5 h-5 text-orange-600" />
                    Interest Rate Forecasts
                  </CardTitle>
                  <CardDescription>Fed funds rate and forecast trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      fedRate: { label: "Current Fed Rate", color: "#f59e0b" },
                      forecast: { label: "Forecast", color: "#3b82f6" },
                      yieldCurve: { label: "Yield Curve Slope", color: "#10b981" },
                    }}
                    className="h-80"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={rateForecastData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="fedRate"
                          stroke="#f59e0b"
                          strokeWidth={3}
                          dot={{ fill: "#f59e0b", strokeWidth: 2, r: 5 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="forecast"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="yieldCurve"
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
                  <CardTitle>Market Indicators</CardTitle>
                  <CardDescription>Key rate indicators and forecasts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {marketIndicatorsData.slice(0, 4).map((indicator, index) => (
                    <div key={index} className="p-3 bg-slate-50 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-slate-700">{indicator.indicator}</span>
                        <Badge
                          variant={
                            indicator.status === "decreasing" || indicator.status === "tightening"
                              ? "default"
                              : "secondary"
                          }
                          className={
                            indicator.status === "decreasing" || indicator.status === "tightening"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-orange-100 text-orange-800"
                          }
                        >
                          {indicator.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-slate-900">{indicator.current}%</span>
                        <div className="flex items-center gap-1">
                          {indicator.change > 0 ? (
                            <ArrowUpRight className="w-4 h-4 text-orange-600" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4 text-emerald-600" />
                          )}
                          <span
                            className={`text-sm font-semibold ${
                              indicator.change > 0 ? "text-orange-600" : "text-emerald-600"
                            }`}
                          >
                            {indicator.change > 0 ? "+" : ""}
                            {indicator.change}%
                          </span>
                        </div>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">Forecast: {indicator.forecast}%</div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="yield-curve" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="w-5 h-5 text-blue-600" />
                    Yield Curve Analysis
                  </CardTitle>
                  <CardDescription>Current vs forecast yield curve</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      current: { label: "Current", color: "#3b82f6" },
                      forecast: { label: "Forecast", color: "#10b981" },
                      historical: { label: "Historical", color: "#8b5cf6" },
                    }}
                    className="h-80"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={yieldCurveData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="maturity" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line
                          type="monotone"
                          dataKey="current"
                          stroke="#3b82f6"
                          strokeWidth={3}
                          dot={{ fill: "#3b82f6", strokeWidth: 2, r: 5 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="forecast"
                          stroke="#10b981"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="historical"
                          stroke="#8b5cf6"
                          strokeWidth={1}
                          strokeDasharray="2 2"
                          dot={{ fill: "#8b5cf6", strokeWidth: 1, r: 3 }}
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Yield Curve Metrics</CardTitle>
                  <CardDescription>Key curve characteristics and changes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-700">2Y-10Y Spread</span>
                        <span className="text-lg font-bold text-blue-600">0.4%</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">Slightly inverted</div>
                    </div>

                    <div className="p-3 bg-emerald-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-700">3M-10Y Spread</span>
                        <span className="text-lg font-bold text-emerald-600">0.8%</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">Normal slope</div>
                    </div>

                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-700">Curve Steepness</span>
                        <span className="text-lg font-bold text-purple-600">1.0%</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">Moderate steepening</div>
                    </div>

                    <div className="p-3 bg-orange-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-slate-700">Curve Level</span>
                        <span className="text-lg font-bold text-orange-600">5.2%</span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">Elevated levels</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button className="w-full">
                      <Target className="w-4 h-4 mr-2" />
                      Detailed Curve Analysis
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="volatility" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                    Volatility by Asset Class
                  </CardTitle>
                  <CardDescription>Implied volatility across different periods</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      rate: { label: "Interest Rate Vol", color: "#8b5cf6" },
                      bond: { label: "Bond Vol", color: "#3b82f6" },
                      fx: { label: "FX Vol", color: "#10b981" },
                    }}
                    className="h-80"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={volatilityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="period" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="rate" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="bond" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="fx" fill="#10b981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Volatility Alerts</CardTitle>
                  <CardDescription>Current volatility conditions and alerts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-orange-600" />
                      <span className="font-medium text-orange-800">Elevated Volatility</span>
                    </div>
                    <p className="text-sm text-orange-700">
                      Interest rate volatility is above historical averages. Monitor for potential market stress.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm font-medium text-slate-700">1M Rate Vol</span>
                      <span className="text-lg font-bold text-slate-900">18.3%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm font-medium text-slate-700">Bond Vol</span>
                      <span className="text-lg font-bold text-slate-900">12.1%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm font-medium text-slate-700">FX Vol</span>
                      <span className="text-lg font-bold text-slate-900">22.8%</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <Button variant="outline" className="w-full bg-transparent">
                      <Activity className="w-4 h-4 mr-2" />
                      View Vol Surface
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="scenarios" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle>Scenario Analysis</CardTitle>
                  <CardDescription>Rate scenarios and probability assessments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {scenarioAnalysisData.map((scenario, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-slate-900">{scenario.scenario}</h4>
                        <Badge
                          variant={
                            scenario.impact === "positive"
                              ? "default"
                              : scenario.impact === "negative"
                                ? "destructive"
                                : "secondary"
                          }
                          className={
                            scenario.impact === "positive"
                              ? "bg-emerald-100 text-emerald-800"
                              : scenario.impact === "negative"
                                ? "bg-red-100 text-red-800"
                                : "bg-slate-100 text-slate-800"
                          }
                        >
                          {scenario.impact}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600">Probability:</span>
                          <span className="text-sm font-semibold">{scenario.probability}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600">Fed Rate:</span>
                          <span className="text-sm font-semibold">{scenario.fedRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600">10Y Treasury:</span>
                          <span className="text-sm font-semibold">{scenario.tenYear}%</span>
                        </div>
                      </div>
                      <Progress value={scenario.probability} className="h-2 mt-3" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AreaChart className="w-5 h-5 text-emerald-600" />
                    Scenario Impact Analysis
                  </CardTitle>
                  <CardDescription>Expected rate paths under different scenarios</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      baseCase: { label: "Base Case", color: "#10b981" },
                      hawkish: { label: "Hawkish", color: "#ef4444" },
                      dovish: { label: "Dovish", color: "#3b82f6" },
                    }}
                    className="h-80"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={[
                          { month: "Current", baseCase: 4.75, hawkish: 4.75, dovish: 4.75 },
                          { month: "3M", baseCase: 4.5, hawkish: 5.0, dovish: 4.0 },
                          { month: "6M", baseCase: 4.25, hawkish: 5.25, dovish: 3.5 },
                          { month: "12M", baseCase: 4.0, hawkish: 5.0, dovish: 3.0 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area
                          type="monotone"
                          dataKey="baseCase"
                          stackId="1"
                          stroke="#10b981"
                          fill="#10b981"
                          fillOpacity={0.6}
                        />
                        <Area
                          type="monotone"
                          dataKey="hawkish"
                          stackId="2"
                          stroke="#ef4444"
                          fill="#ef4444"
                          fillOpacity={0.4}
                        />
                        <Area
                          type="monotone"
                          dataKey="dovish"
                          stackId="3"
                          stroke="#3b82f6"
                          fill="#3b82f6"
                          fillOpacity={0.4}
                        />
                      </AreaChart>
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

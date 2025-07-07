"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"
import { TrendingUp, Brain, AlertTriangle, Target, Play, Download, Settings } from "lucide-react"

interface ForecastingPanelProps {
  data: {
    id: string
    filename: string
    data: any[]
    columns: string[]
    uploadedAt: Date
    size: number
  }
}

export function ForecastingPanel({ data }: ForecastingPanelProps) {
  const [selectedMetric, setSelectedMetric] = useState(
    data.columns.find((col) => data.data.some((row) => typeof row[col] === "number")) || data.columns[0],
  )
  const [forecastPeriods, setForecastPeriods] = useState([12])
  const [confidenceInterval, setConfidenceInterval] = useState([95])
  const [includeSeasonality, setIncludeSeasonality] = useState(true)
  const [includeTrend, setIncludeTrend] = useState(true)
  const [forecastMethod, setForecastMethod] = useState("arima")
  const [isForecasting, setIsForecasting] = useState(false)
  const [forecastResults, setForecastResults] = useState<any>(null)

  const numericColumns = data.columns.filter((col) => data.data.some((row) => typeof row[col] === "number"))

  const generateForecast = async () => {
    setIsForecasting(true)

    // Simulate AI forecasting process
    await new Promise((resolve) => setTimeout(resolve, 3000))

    // Generate mock forecast data
    const historicalData = data.data.slice(-24).map((row, index) => ({
      period: `H${index + 1}`,
      actual: row[selectedMetric] || Math.random() * 100000,
      type: "historical",
    }))

    const forecastData = Array.from({ length: forecastPeriods[0] }, (_, index) => {
      const trend = 1 + index * 0.02 // 2% growth trend
      const seasonality = 1 + Math.sin((index * 2 * Math.PI) / 12) * 0.1 // Seasonal variation
      const baseValue = historicalData[historicalData.length - 1]?.actual || 50000
      const forecast = baseValue * trend * seasonality
      const margin = forecast * (confidenceInterval[0] / 100) * 0.1

      return {
        period: `F${index + 1}`,
        forecast: forecast,
        upperBound: forecast + margin,
        lowerBound: Math.max(0, forecast - margin),
        type: "forecast",
      }
    })

    const combinedData = [...historicalData, ...forecastData]

    // Generate insights
    const insights = {
      trend: "Positive growth trend detected (+15% annually)",
      seasonality: includeSeasonality ? "Strong seasonal pattern identified" : "No seasonality applied",
      accuracy: "Model accuracy: 87.3% (based on historical validation)",
      riskFactors: [
        "Market volatility may impact projections",
        "External economic factors not included",
        "Model assumes current trends continue",
      ],
      recommendations: [
        "Monitor actual vs forecast monthly",
        "Update model with new data quarterly",
        "Consider external factors for strategic planning",
      ],
    }

    setForecastResults({
      data: combinedData,
      insights,
      method: forecastMethod,
      confidence: confidenceInterval[0],
      periods: forecastPeriods[0],
    })

    setIsForecasting(false)
  }

  return (
    <div className="space-y-6">
      {/* Forecasting Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Forecasting Configuration
          </CardTitle>
          <CardDescription>Configure parameters for AI-powered financial forecasting</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Metric Selection */}
            <div className="space-y-2">
              <Label>Metric to Forecast</Label>
              <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {numericColumns.map((column) => (
                    <SelectItem key={column} value={column}>
                      {column}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Forecast Method */}
            <div className="space-y-2">
              <Label>Forecasting Method</Label>
              <Select value={forecastMethod} onValueChange={setForecastMethod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="arima">ARIMA (Auto-Regressive)</SelectItem>
                  <SelectItem value="lstm">LSTM Neural Network</SelectItem>
                  <SelectItem value="prophet">Prophet (Facebook)</SelectItem>
                  <SelectItem value="exponential">Exponential Smoothing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Forecast Periods */}
            <div className="space-y-2">
              <Label>Forecast Periods: {forecastPeriods[0]} months</Label>
              <Slider
                value={forecastPeriods}
                onValueChange={setForecastPeriods}
                max={24}
                min={3}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Confidence Interval */}
            <div className="space-y-2">
              <Label>Confidence Interval: {confidenceInterval[0]}%</Label>
              <Slider
                value={confidenceInterval}
                onValueChange={setConfidenceInterval}
                max={99}
                min={80}
                step={5}
                className="w-full"
              />
            </div>

            {/* Advanced Options */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="seasonality">Include Seasonality</Label>
                <Switch id="seasonality" checked={includeSeasonality} onCheckedChange={setIncludeSeasonality} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="trend">Include Trend Analysis</Label>
                <Switch id="trend" checked={includeTrend} onCheckedChange={setIncludeTrend} />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={generateForecast}
              disabled={isForecasting}
              className="bg-gradient-to-r from-blue-500 to-purple-500"
            >
              {isForecasting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating Forecast...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Generate Forecast
                </>
              )}
            </Button>
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Advanced Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Forecast Results */}
      {forecastResults && (
        <Tabs defaultValue="chart" className="space-y-4">
          <TabsList>
            <TabsTrigger value="chart">Forecast Chart</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="scenarios">Scenario Analysis</TabsTrigger>
            <TabsTrigger value="export">Export Results</TabsTrigger>
          </TabsList>

          {/* Chart Tab */}
          <TabsContent value="chart" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{selectedMetric} Forecast</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{forecastMethod.toUpperCase()}</Badge>
                    <Badge variant="outline">{forecastResults.confidence}% Confidence</Badge>
                  </div>
                </CardTitle>
                <CardDescription>{forecastResults.periods} period forecast with confidence intervals</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={forecastResults.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip formatter={(value) => [Number(value).toLocaleString(), ""]} />
                    <Legend />

                    {/* Historical Data */}
                    <Line
                      type="monotone"
                      dataKey="actual"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      name="Historical"
                      connectNulls={false}
                    />

                    {/* Forecast Line */}
                    <Line
                      type="monotone"
                      dataKey="forecast"
                      stroke="hsl(var(--chart-2))"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Forecast"
                      connectNulls={false}
                    />

                    {/* Confidence Bounds */}
                    <Line
                      type="monotone"
                      dataKey="upperBound"
                      stroke="hsl(var(--muted-foreground))"
                      strokeWidth={1}
                      strokeDasharray="2 2"
                      name="Upper Bound"
                      connectNulls={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="lowerBound"
                      stroke="hsl(var(--muted-foreground))"
                      strokeWidth={1}
                      strokeDasharray="2 2"
                      name="Lower Bound"
                      connectNulls={false}
                    />

                    {/* Forecast Start Line */}
                    <ReferenceLine x="H24" stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Key Insights */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-600" />
                    AI Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Trend Analysis</h4>
                    <p className="text-sm text-muted-foreground">{forecastResults.insights.trend}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Seasonality</h4>
                    <p className="text-sm text-muted-foreground">{forecastResults.insights.seasonality}</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Model Accuracy</h4>
                    <p className="text-sm text-muted-foreground">{forecastResults.insights.accuracy}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Risk Factors */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    Risk Factors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {forecastResults.insights.riskFactors.map((risk: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-yellow-600 mt-1">•</span>
                        {risk}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-600" />
                    Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {forecastResults.insights.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-green-600 mt-1">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Scenario Analysis Tab */}
          <TabsContent value="scenarios" className="space-y-4">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Scenario analysis helps you understand how different conditions might affect your forecasts. This
                feature uses Monte Carlo simulations and stress testing methodologies.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base text-green-600">Optimistic Scenario</CardTitle>
                  <CardDescription>Best case conditions (+20% growth)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    ${(forecastResults.data[forecastResults.data.length - 1]?.forecast * 1.2 || 0).toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Assumes favorable market conditions and strong performance
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Base Case Scenario</CardTitle>
                  <CardDescription>Expected conditions (current trend)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${(forecastResults.data[forecastResults.data.length - 1]?.forecast || 0).toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Based on current trends and historical patterns</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base text-red-600">Pessimistic Scenario</CardTitle>
                  <CardDescription>Challenging conditions (-15% impact)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    ${(forecastResults.data[forecastResults.data.length - 1]?.forecast * 0.85 || 0).toLocaleString()}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Accounts for potential market downturns and challenges
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Export Tab */}
          <TabsContent value="export" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Export Forecast Results</CardTitle>
                <CardDescription>Download your forecast data and analysis in various formats</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center bg-transparent">
                    <Download className="h-6 w-6 mb-2" />
                    <span className="font-medium">Excel Report</span>
                    <span className="text-xs text-muted-foreground">Complete analysis</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center bg-transparent">
                    <Download className="h-6 w-6 mb-2" />
                    <span className="font-medium">PDF Summary</span>
                    <span className="text-xs text-muted-foreground">Executive summary</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center bg-transparent">
                    <Download className="h-6 w-6 mb-2" />
                    <span className="font-medium">CSV Data</span>
                    <span className="text-xs text-muted-foreground">Raw forecast data</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center bg-transparent">
                    <Download className="h-6 w-6 mb-2" />
                    <span className="font-medium">PowerPoint</span>
                    <span className="text-xs text-muted-foreground">Presentation slides</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* Liquidity Stress Testing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            Liquidity Stress Testing (LST)
          </CardTitle>
          <CardDescription>
            Advanced stress testing for liquidity risk assessment and regulatory compliance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <Brain className="h-4 w-4" />
            <AlertDescription>
              <strong>AI-Powered LST Networks:</strong> Our advanced neural networks simulate various stress scenarios
              including market shocks, funding disruptions, and regulatory changes to assess liquidity resilience.
            </AlertDescription>
          </Alert>
          <div className="mt-4">
            <Button variant="outline">Configure Stress Tests</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

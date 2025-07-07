"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Send, Brain, User, TrendingUp, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
  analysis?: {
    type: "chart" | "table" | "insight" | "forecast"
    data?: any
    chartType?: "line" | "bar" | "pie"
    title?: string
    description?: string
  }
}

interface AnalysisChatProps {
  data: {
    id: string
    filename: string
    data: any[]
    columns: string[]
    uploadedAt: Date
    size: number
  }
  isAnalyzing: boolean
  onAnalysisComplete: () => void
}

const suggestedQuestions = [
  "What are the key trends in my revenue data?",
  "Perform a cash flow analysis",
  "Identify any anomalies or outliers",
  "Create a forecast for the next 6 months",
  "What's the correlation between different metrics?",
  "Show me the seasonal patterns",
  "Calculate financial ratios",
  "Perform a risk analysis",
]

export function AnalysisChat({ data, isAnalyzing, onAnalysisComplete }: AnalysisChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isAnalyzing && messages.length === 0) {
      // Initial AI greeting
      const welcomeMessage: Message = {
        id: "welcome",
        type: "ai",
        content: `Hello! I've analyzed your dataset "${data.filename}" with ${data.data.length} rows and ${data.columns.length} columns. I can help you with financial analysis, forecasting, trend identification, and more. What would you like to explore?`,
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
      onAnalysisComplete()
    }
  }, [isAnalyzing, messages.length, data, onAnalysisComplete])

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: message,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(message, data)
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 2000)
  }

  const generateAIResponse = (question: string, dataset: any): Message => {
    const lowerQuestion = question.toLowerCase()

    // Generate mock AI responses based on question type
    if (lowerQuestion.includes("trend") || lowerQuestion.includes("revenue")) {
      return {
        id: Date.now().toString(),
        type: "ai",
        content: "I've analyzed the revenue trends in your data. Here's what I found:",
        timestamp: new Date(),
        analysis: {
          type: "chart",
          chartType: "line",
          title: "Revenue Trend Analysis",
          description: "Monthly revenue showing 15% growth trend with seasonal variations",
          data: dataset.data.slice(0, 12).map((row: any, index: number) => ({
            month: `Month ${index + 1}`,
            revenue: row.Revenue || Math.random() * 100000,
            trend: (row.Revenue || Math.random() * 100000) * (1 + index * 0.02),
          })),
        },
      }
    }

    if (lowerQuestion.includes("forecast")) {
      return {
        id: Date.now().toString(),
        type: "ai",
        content: "Based on historical patterns, here's a 6-month forecast using advanced time-series analysis:",
        timestamp: new Date(),
        analysis: {
          type: "forecast",
          chartType: "line",
          title: "6-Month Revenue Forecast",
          description: "Projected revenue with 85% confidence interval",
          data: Array.from({ length: 12 }, (_, i) => ({
            period: i < 6 ? `Historical ${i + 1}` : `Forecast ${i - 5}`,
            actual: i < 6 ? Math.random() * 100000 : null,
            forecast: i >= 6 ? Math.random() * 120000 : null,
            upperBound: i >= 6 ? Math.random() * 140000 : null,
            lowerBound: i >= 6 ? Math.random() * 100000 : null,
          })),
        },
      }
    }

    if (lowerQuestion.includes("cash flow")) {
      return {
        id: Date.now().toString(),
        type: "ai",
        content: "Here's your cash flow analysis with key insights:",
        timestamp: new Date(),
        analysis: {
          type: "chart",
          chartType: "bar",
          title: "Cash Flow Analysis",
          description: "Monthly cash inflows vs outflows with net position",
          data: dataset.data.slice(0, 8).map((row: any, index: number) => ({
            month: `Month ${index + 1}`,
            inflow: row.Revenue || Math.random() * 80000,
            outflow: row.Expenses || Math.random() * 60000,
            net: (row.Revenue || Math.random() * 80000) - (row.Expenses || Math.random() * 60000),
          })),
        },
      }
    }

    if (lowerQuestion.includes("ratio") || lowerQuestion.includes("financial")) {
      return {
        id: Date.now().toString(),
        type: "ai",
        content: "I've calculated key financial ratios from your data:",
        timestamp: new Date(),
        analysis: {
          type: "table",
          title: "Financial Ratios Analysis",
          description: "Key performance indicators and financial health metrics",
          data: [
            { metric: "Current Ratio", value: "2.34", benchmark: "2.0+", status: "Good" },
            { metric: "Debt-to-Equity", value: "0.45", benchmark: "<0.5", status: "Excellent" },
            { metric: "ROE", value: "18.5%", benchmark: "15%+", status: "Good" },
            { metric: "Profit Margin", value: "12.3%", benchmark: "10%+", status: "Good" },
            { metric: "Asset Turnover", value: "1.8", benchmark: "1.5+", status: "Excellent" },
          ],
        },
      }
    }

    // Default response
    return {
      id: Date.now().toString(),
      type: "ai",
      content: `I've analyzed your question about "${question}". Based on your dataset with ${dataset.columns.join(", ")}, here are the key insights: Your data shows strong performance indicators with consistent growth patterns. The financial metrics suggest healthy business operations with room for optimization in operational efficiency.`,
      timestamp: new Date(),
      analysis: {
        type: "insight",
        title: "Key Insights",
        description: "AI-generated analysis summary",
        data: [
          "Revenue growth trend: +15% YoY",
          "Expense optimization opportunity: 8%",
          "Cash flow stability: Strong",
          "Risk assessment: Low to moderate",
        ],
      },
    }
  }

  const renderAnalysis = (analysis: Message["analysis"]) => {
    if (!analysis) return null

    switch (analysis.type) {
      case "chart":
        return (
          <Card className="mt-3">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{analysis.title}</CardTitle>
              <CardDescription className="text-sm">{analysis.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                {analysis.chartType === "line" ? (
                  <LineChart data={analysis.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, ""]} />
                    <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} />
                    {analysis.data?.[0]?.trend && (
                      <Line type="monotone" dataKey="trend" stroke="hsl(var(--destructive))" strokeDasharray="5 5" />
                    )}
                  </LineChart>
                ) : analysis.chartType === "bar" ? (
                  <BarChart data={analysis.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, ""]} />
                    <Bar dataKey="inflow" fill="hsl(var(--chart-2))" name="Inflow" />
                    <Bar dataKey="outflow" fill="hsl(var(--chart-1))" name="Outflow" />
                    <Bar dataKey="net" fill="hsl(var(--primary))" name="Net" />
                  </BarChart>
                ) : null}
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )

      case "forecast":
        return (
          <Card className="mt-3">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                {analysis.title}
              </CardTitle>
              <CardDescription className="text-sm">{analysis.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={analysis.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, ""]} />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    name="Historical"
                  />
                  <Line
                    type="monotone"
                    dataKey="forecast"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Forecast"
                  />
                  <Line
                    type="monotone"
                    dataKey="upperBound"
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth={1}
                    strokeDasharray="2 2"
                    name="Upper Bound"
                  />
                  <Line
                    type="monotone"
                    dataKey="lowerBound"
                    stroke="hsl(var(--muted-foreground))"
                    strokeWidth={1}
                    strokeDasharray="2 2"
                    name="Lower Bound"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )

      case "table":
        return (
          <Card className="mt-3">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{analysis.title}</CardTitle>
              <CardDescription className="text-sm">{analysis.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {analysis.data?.map((row: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <span className="font-medium">{row.metric}</span>
                      <span className="text-sm text-muted-foreground ml-2">Target: {row.benchmark}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{row.value}</span>
                      <Badge
                        variant={
                          row.status === "Excellent" ? "default" : row.status === "Good" ? "secondary" : "destructive"
                        }
                      >
                        {row.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )

      case "insight":
        return (
          <Card className="mt-3 border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2 text-blue-700 dark:text-blue-300">
                <Lightbulb className="h-4 w-4" />
                {analysis.title}
              </CardTitle>
              <CardDescription className="text-sm text-blue-600 dark:text-blue-400">
                {analysis.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-blue-600 dark:text-blue-400">
                {analysis.data?.map((insight: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    {insight}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {/* Suggested Questions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Suggested Analysis Questions</CardTitle>
          <CardDescription>Click on any question to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSendMessage(question)}
                className="text-xs"
              >
                {question}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Messages */}
      <Card className="flex flex-col h-[600px]">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            AI Analysis Chat
          </CardTitle>
          <CardDescription>Ask questions about your data and get AI-powered insights</CardDescription>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn("flex gap-3", message.type === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn("flex gap-3 max-w-[80%]", message.type === "user" ? "flex-row-reverse" : "flex-row")}
                  >
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                        message.type === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300",
                      )}
                    >
                      {message.type === "user" ? <User className="h-4 w-4" /> : <Brain className="h-4 w-4" />}
                    </div>
                    <div
                      className={cn(
                        "rounded-lg p-3 space-y-1",
                        message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                      )}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70">{message.timestamp.toLocaleTimeString()}</p>
                      {message.analysis && renderAnalysis(message.analysis)}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 flex items-center justify-center">
                    <Brain className="h-4 w-4" />
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                      <span className="text-sm">AI is analyzing your data...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <Separator />

          <div className="p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Ask a question about your data..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
                disabled={isLoading}
              />
              <Button
                onClick={() => handleSendMessage(inputValue)}
                disabled={isLoading || !inputValue.trim()}
                size="sm"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

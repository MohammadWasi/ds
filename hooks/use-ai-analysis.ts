"use client"

import { useState } from "react"
import { useAnalysisContext } from "@/components/ai-analysis/analysis-context"

interface DataFile {
  id: string
  name: string
  size: number
  type: string
  data: any[]
  columns: string[]
  uploadedAt: Date
  processed: boolean
  summary?: {
    rows: number
    numericColumns: string[]
    dateColumns: string[]
    textColumns: string[]
    missingValues: number
    duplicates: number
  }
}

export function useAIAnalysis() {
  const { state, addMessage, updateMessage, setProcessing, addContext } = useAnalysisContext()
  const [isLoading, setIsLoading] = useState(false)

  const processQuery = async (query: string, fileData: DataFile) => {
    setIsLoading(true)
    setProcessing(true)

    // Add loading message
    const loadingMessageId = Date.now().toString() + Math.random().toString(36).substr(2, 9)
    addMessage({
      id: loadingMessageId,
      type: "ai",
      content: "Analyzing your data...",
      isLoading: true,
    })

    try {
      const response = await fetch("/api/ai-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          fileData: {
            name: fileData.name,
            columns: fileData.columns,
            data: fileData.data,
            summary: fileData.summary,
          },
          context: state.contextHistory,
          settings: state.analysisSettings,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get AI response")
      }

      const result = await response.json()

      // Update the loading message with the actual response
      updateMessage(loadingMessageId, {
        content: result.response,
        isLoading: false,
        analysis: result.analysis,
      })

      // Add to context for future queries
      addContext(`User asked: ${query}. AI responded with analysis about ${fileData.name}`)
    } catch (error) {
      console.error("AI Analysis Error:", error)
      updateMessage(loadingMessageId, {
        content: "Sorry, I encountered an error while analyzing your data. Please try again.",
        isLoading: false,
        error: error instanceof Error ? error.message : "Unknown error",
      })
    } finally {
      setIsLoading(false)
      setProcessing(false)
    }
  }

  const generateVisualization = async (data: any[], chartType: string, columns: string[]) => {
    // Process data for different chart types
    switch (chartType) {
      case "line":
      case "area":
        return data.map((row, index) => ({
          name: row[columns[0]] || `Point ${index + 1}`,
          ...columns.slice(1).reduce(
            (acc, col) => ({
              ...acc,
              [col]: Number(row[col]) || 0,
            }),
            {},
          ),
        }))

      case "bar":
        return data.slice(0, 20).map((row, index) => ({
          name: row[columns[0]] || `Item ${index + 1}`,
          value: Number(row[columns[1]]) || 0,
        }))

      case "pie":
        const grouped = data.reduce((acc, row) => {
          const key = row[columns[0]]
          acc[key] = (acc[key] || 0) + (Number(row[columns[1]]) || 1)
          return acc
        }, {})
        return Object.entries(grouped).map(([name, value]) => ({ name, value }))

      case "scatter":
        return data.map((row, index) => ({
          x: Number(row[columns[0]]) || index,
          y: Number(row[columns[1]]) || 0,
          name: row[columns[2]] || `Point ${index + 1}`,
        }))

      default:
        return data
    }
  }

  const generateStatistics = (data: any[], numericColumns: string[]) => {
    const stats: Record<string, number> = {}

    numericColumns.forEach((col) => {
      const values = data.map((row) => Number(row[col])).filter((val) => !isNaN(val))
      if (values.length > 0) {
        stats[`${col}_mean`] = values.reduce((a, b) => a + b, 0) / values.length
        stats[`${col}_min`] = Math.min(...values)
        stats[`${col}_max`] = Math.max(...values)
        stats[`${col}_std`] = Math.sqrt(
          values.reduce((acc, val) => acc + Math.pow(val - stats[`${col}_mean`], 2), 0) / values.length,
        )
      }
    })

    return stats
  }

  const generateForecast = (data: any[], column: string, periods = 12) => {
    // Simple linear trend forecast (in production, use more sophisticated methods)
    const values = data.map((row) => Number(row[column])).filter((val) => !isNaN(val))
    if (values.length < 2) return { chartData: [], insights: [] }

    // Calculate trend
    const n = values.length
    const sumX = (n * (n - 1)) / 2
    const sumY = values.reduce((a, b) => a + b, 0)
    const sumXY = values.reduce((acc, val, idx) => acc + val * idx, 0)
    const sumX2 = (n * (n - 1) * (2 * n - 1)) / 6

    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)
    const intercept = (sumY - slope * sumX) / n

    // Generate forecast data
    const chartData = []

    // Historical data
    for (let i = 0; i < values.length; i++) {
      chartData.push({
        period: `Period ${i + 1}`,
        actual: values[i],
        forecast: null,
        upperBound: null,
        lowerBound: null,
      })
    }

    // Forecast data
    const lastValue = values[values.length - 1]
    const stdDev = Math.sqrt(values.reduce((acc, val) => acc + Math.pow(val - sumY / n, 2), 0) / n)

    for (let i = 0; i < periods; i++) {
      const forecastValue = intercept + slope * (values.length + i)
      const confidence = 1.96 * stdDev * Math.sqrt(1 + 1 / n + Math.pow(i + 1, 2) / sumX2)

      chartData.push({
        period: `Forecast ${i + 1}`,
        actual: null,
        forecast: forecastValue,
        upperBound: forecastValue + confidence,
        lowerBound: forecastValue - confidence,
      })
    }

    const insights = [
      `Trend: ${slope > 0 ? "Increasing" : slope < 0 ? "Decreasing" : "Stable"} (${slope.toFixed(4)} per period)`,
      `Forecast confidence interval: ±${(1.96 * stdDev).toFixed(2)}`,
      `Expected value in ${periods} periods: ${(intercept + slope * (values.length + periods - 1)).toFixed(2)}`,
    ]

    return { chartData, insights }
  }

  return {
    processQuery,
    generateVisualization,
    generateStatistics,
    generateForecast,
    isLoading,
  }
}

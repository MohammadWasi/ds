"use client"

import { Button } from "@/components/ui/button"
import { useAnalysisContext } from "@/components/ai-analysis/analysis-context"
import {
  BarChart3,
  TrendingUp,
  PieChart,
  Activity,
  Target,
  Zap,
  Brain,
  Search,
  FileText,
  Calculator,
} from "lucide-react"

interface ChatSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void
}

export function ChatSuggestions({ onSuggestionClick }: ChatSuggestionsProps) {
  const { getActiveFile } = useAnalysisContext()
  const activeFile = getActiveFile()

  const getDataSpecificSuggestions = () => {
    if (!activeFile || !activeFile.summary) {
      return []
    }

    const suggestions = []
    const { numericColumns, dateColumns, textColumns } = activeFile.summary

    // Basic analysis suggestions
    suggestions.push({
      icon: FileText,
      text: "Show me a summary of this dataset",
      category: "Overview",
    })

    suggestions.push({
      icon: Calculator,
      text: "Calculate basic statistics for all numeric columns",
      category: "Statistics",
    })

    // Visualization suggestions based on data types
    if (numericColumns.length > 0) {
      suggestions.push({
        icon: BarChart3,
        text: `Create a bar chart showing ${numericColumns[0]}`,
        category: "Visualization",
      })

      if (numericColumns.length > 1) {
        suggestions.push({
          icon: Activity,
          text: `Show correlation between ${numericColumns[0]} and ${numericColumns[1]}`,
          category: "Analysis",
        })
      }
    }

    // Time series suggestions
    if (dateColumns.length > 0 && numericColumns.length > 0) {
      suggestions.push({
        icon: TrendingUp,
        text: `Create a time series chart of ${numericColumns[0]} over ${dateColumns[0]}`,
        category: "Time Series",
      })

      suggestions.push({
        icon: Target,
        text: `Forecast ${numericColumns[0]} for the next 6 months`,
        category: "Forecasting",
      })
    }

    // Distribution analysis
    if (textColumns.length > 0) {
      suggestions.push({
        icon: PieChart,
        text: `Show distribution of ${textColumns[0]}`,
        category: "Distribution",
      })
    }

    // Advanced analysis
    if (numericColumns.length >= 2) {
      suggestions.push({
        icon: Brain,
        text: "Identify outliers and anomalies in the data",
        category: "Advanced",
      })

      suggestions.push({
        icon: Zap,
        text: "Perform principal component analysis (PCA)",
        category: "Advanced",
      })
    }

    // Data quality
    suggestions.push({
      icon: Search,
      text: "Check for data quality issues and missing values",
      category: "Data Quality",
    })

    return suggestions
  }

  const defaultSuggestions = [
    {
      icon: FileText,
      text: "What insights can you provide about this data?",
      category: "General",
    },
    {
      icon: BarChart3,
      text: "Create visualizations to explore the data",
      category: "Visualization",
    },
    {
      icon: TrendingUp,
      text: "Identify trends and patterns",
      category: "Analysis",
    },
    {
      icon: Calculator,
      text: "Calculate descriptive statistics",
      category: "Statistics",
    },
    {
      icon: Target,
      text: "Generate forecasts and predictions",
      category: "Forecasting",
    },
    {
      icon: Brain,
      text: "Perform advanced statistical analysis",
      category: "Advanced",
    },
  ]

  const suggestions = activeFile ? getDataSpecificSuggestions() : defaultSuggestions

  const groupedSuggestions = suggestions.reduce(
    (acc, suggestion) => {
      if (!acc[suggestion.category]) {
        acc[suggestion.category] = []
      }
      acc[suggestion.category].push(suggestion)
      return acc
    },
    {} as Record<string, typeof suggestions>,
  )

  return (
    <div className="space-y-4">
      {Object.entries(groupedSuggestions).map(([category, items]) => (
        <div key={category} className="space-y-2">
          <h4 className="text-sm font-medium text-muted-foreground">{category}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {items.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                className="justify-start h-auto p-3 text-left bg-transparent"
                onClick={() => onSuggestionClick(suggestion.text)}
              >
                <suggestion.icon className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="text-sm">{suggestion.text}</span>
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

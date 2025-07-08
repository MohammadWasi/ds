import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    const { query, fileData, context, settings } = await request.json()

    if (!query || !fileData) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    // Prepare data context for AI
    const dataContext = `
Data File: ${fileData.name}
Columns: ${fileData.columns.join(", ")}
Total Rows: ${fileData.data.length}
Sample Data (first 5 rows):
${JSON.stringify(fileData.data.slice(0, 5), null, 2)}

Data Summary:
- Numeric columns: ${fileData.summary?.numericColumns?.join(", ") || "None"}
- Date columns: ${fileData.summary?.dateColumns?.join(", ") || "None"}
- Text columns: ${fileData.summary?.textColumns?.join(", ") || "None"}
- Missing values: ${fileData.summary?.missingValues || 0}
- Duplicate rows: ${fileData.summary?.duplicates || 0}

Previous context: ${context.join("\n")}
`

    const systemPrompt = `You are an expert data analyst AI assistant. You help users analyze their data using advanced statistical methods, create visualizations, and generate insights.

Your capabilities include:
1. Data cleaning and transformation
2. Statistical analysis (descriptive, inferential)
3. Predictive modeling and forecasting
4. Time series analysis
5. Correlation analysis
6. Data visualization recommendations
7. Liquidity Stress Testing (LST) for financial data
8. Anomaly detection
9. Trend analysis

When responding:
- Provide clear, actionable insights
- Suggest appropriate visualizations
- Include statistical measures when relevant
- Explain your reasoning
- Offer follow-up questions or suggestions

For visualizations, respond with a JSON object containing:
{
  "type": "chart|table|insight|forecast|statistics",
  "chartType": "line|bar|area|pie|scatter",
  "title": "Chart title",
  "description": "Brief description",
  "data": [...], // Processed data for visualization
  "insights": ["insight1", "insight2", ...] // Key findings
}

Current analysis settings:
- Confidence Level: ${settings?.confidenceLevel || 95}%
- Forecast Periods: ${settings?.forecastPeriods || 12}
- Include Seasonality: ${settings?.includeSeasonality || true}
`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: systemPrompt,
      prompt: `Data Context:\n${dataContext}\n\nUser Query: ${query}`,
      maxTokens: 2000,
    })

    // Try to extract JSON for visualizations
    let analysisData = null
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      try {
        analysisData = JSON.parse(jsonMatch[0])
      } catch (e) {
        // If JSON parsing fails, continue without analysis data
      }
    }

    return NextResponse.json({
      response: text,
      analysis: analysisData,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("AI Analysis API Error:", error)
    return NextResponse.json({ error: "Failed to process analysis request" }, { status: 500 })
  }
}

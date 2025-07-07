"use client"

import { useState } from "react"
import { PageLayout } from "@/components/layout/page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataUploadZone } from "@/components/ai-analysis/data-upload-zone"
import { AnalysisChat } from "@/components/ai-analysis/analysis-chat"
import { DataVisualization } from "@/components/ai-analysis/data-visualization"
import { ForecastingPanel } from "@/components/ai-analysis/forecasting-panel"
import { DataPreview } from "@/components/ai-analysis/data-preview"
import { AnalysisHistory } from "@/components/ai-analysis/analysis-history"
import { Brain, Upload, BarChart3, TrendingUp, Download, History, Shield } from "lucide-react"

interface AnalysisData {
  id: string
  filename: string
  data: any[]
  columns: string[]
  uploadedAt: Date
  size: number
}

export default function AIAnalysisPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [uploadedData, setUploadedData] = useState<AnalysisData | null>(null)
  const [activeTab, setActiveTab] = useState("upload")
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleDataUpload = (data: AnalysisData) => {
    setUploadedData(data)
    setActiveTab("preview")
  }

  const handleStartAnalysis = () => {
    setIsAnalyzing(true)
    setActiveTab("chat")
  }

  return (
    <PageLayout searchQuery={searchQuery} onSearchChange={setSearchQuery}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/10 to-blue-500/10">
              <Brain className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold tracking-tight">AI Data Analysis</h1>
                <Badge variant="default" className="bg-gradient-to-r from-purple-500 to-blue-500">
                  Powered by AI
                </Badge>
              </div>
              <p className="text-muted-foreground">
                Upload financial data and get AI-powered insights, forecasts, and analysis
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Shield className="h-4 w-4 mr-2" />
              Security Info
            </Button>
            {uploadedData && (
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Results
              </Button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload
            </TabsTrigger>
            <TabsTrigger value="preview" disabled={!uploadedData}>
              <BarChart3 className="h-4 w-4" />
              Preview
            </TabsTrigger>
            <TabsTrigger value="chat" disabled={!uploadedData}>
              <Brain className="h-4 w-4" />
              AI Chat
            </TabsTrigger>
            <TabsTrigger value="visualize" disabled={!uploadedData}>
              <BarChart3 className="h-4 w-4" />
              Visualize
            </TabsTrigger>
            <TabsTrigger value="forecast" disabled={!uploadedData}>
              <TrendingUp className="h-4 w-4" />
              Forecast
            </TabsTrigger>
            <TabsTrigger value="history">
              <History className="h-4 w-4" />
              History
            </TabsTrigger>
          </TabsList>

          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-6">
            <DataUploadZone onDataUpload={handleDataUpload} />

            {/* Security Notice */}
            <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                  <Shield className="h-5 w-5" />
                  Data Security & Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-blue-600 dark:text-blue-400">
                <ul className="space-y-2">
                  <li>• All uploaded data is encrypted in transit and at rest</li>
                  <li>• Data is processed securely and never stored permanently</li>
                  <li>• Analysis is performed in isolated environments</li>
                  <li>• Full GDPR and SOC 2 compliance</li>
                  <li>• Data is automatically purged after 24 hours</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preview Tab */}
          <TabsContent value="preview" className="space-y-6">
            {uploadedData && (
              <>
                <DataPreview data={uploadedData} />
                <div className="flex justify-center">
                  <Button
                    onClick={handleStartAnalysis}
                    size="lg"
                    className="bg-gradient-to-r from-purple-500 to-blue-500"
                  >
                    <Brain className="h-4 w-4 mr-2" />
                    Start AI Analysis
                  </Button>
                </div>
              </>
            )}
          </TabsContent>

          {/* AI Chat Tab */}
          <TabsContent value="chat" className="space-y-6">
            {uploadedData && (
              <AnalysisChat
                data={uploadedData}
                isAnalyzing={isAnalyzing}
                onAnalysisComplete={() => setIsAnalyzing(false)}
              />
            )}
          </TabsContent>

          {/* Visualization Tab */}
          <TabsContent value="visualize" className="space-y-6">
            {uploadedData && <DataVisualization data={uploadedData} />}
          </TabsContent>

          {/* Forecasting Tab */}
          <TabsContent value="forecast" className="space-y-6">
            {uploadedData && <ForecastingPanel data={uploadedData} />}
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <AnalysisHistory />
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  )
}

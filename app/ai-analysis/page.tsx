"use client"

import { AnalysisContextProvider } from "@/components/ai-analysis/analysis-context"
import { AIDataAnalysisChat } from "@/components/ai-analysis/ai-data-analysis-chat"
import { DataUploadManager } from "@/components/ai-analysis/data-upload-manager"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Upload } from "lucide-react"

export default function AIAnalysisPage() {
  return (
    <AnalysisContextProvider>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center gap-3">
          <Brain className="h-8 w-8 text-purple-600" />
          <div>
            <h1 className="text-3xl font-bold">AI Data Analysis</h1>
            <p className="text-muted-foreground">
              Upload your data and chat with AI to get insights, visualizations, and forecasts
            </p>
          </div>
        </div>

        <Tabs defaultValue="upload" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload Data
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <DataUploadManager />
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <AIDataAnalysisChat />
          </TabsContent>
        </Tabs>
      </div>
    </AnalysisContextProvider>
  )
}

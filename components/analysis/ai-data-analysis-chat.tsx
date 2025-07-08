"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ChatMessage } from "@/components/ai-analysis/chat-message"
import { ChatSuggestions } from "@/components/ai-analysis/chat-suggestions"
import { DataFileSelector } from "@/components/ai-analysis/data-file-selector"
import { AnalysisSettings } from "@/components/ai-analysis/analysis-settings"
import { useAnalysisContext } from "@/components/ai-analysis/analysis-context"
import { useAIAnalysis } from "@/hooks/use-ai-analysis"
import { Send, Brain, Settings, FileText, Sparkles, Trash2, Download } from "lucide-react"

export function AIDataAnalysisChat() {
  const { state, addMessage, clearChat, getActiveFile } = useAnalysisContext()
  const { processQuery, isLoading } = useAIAnalysis()
  const [inputValue, setInputValue] = useState("")
  const [isMultiline, setIsMultiline] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [state.messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const activeFile = getActiveFile()
    if (!activeFile) {
      addMessage({
        type: "system",
        content: "Please upload and select a data file first to begin analysis.",
      })
      return
    }

    // Add user message
    addMessage({
      type: "user",
      content: inputValue.trim(),
    })

    const userQuery = inputValue.trim()
    setInputValue("")

    // Process with AI
    await processQuery(userQuery, activeFile)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !isMultiline) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }

  const activeFile = getActiveFile()

  return (
    <div className="space-y-6">
      {/* File Selection and Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <DataFileSelector />
        </div>
        <div>
          <AnalysisSettings />
        </div>
      </div>

      {/* Main Chat Interface */}
      <Card className="flex flex-col h-[700px]">
        <CardHeader className="pb-3 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              <CardTitle>AI Data Analysis Chat</CardTitle>
              {activeFile && (
                <Badge variant="secondary" className="ml-2">
                  {activeFile.name}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={clearChat}>
                <Trash2 className="h-4 w-4 mr-2" />
                Clear
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
          <CardDescription>
            Ask questions about your data using natural language. I can perform analysis, create visualizations, and
            generate forecasts.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {state.messages.length === 0 && (
                <div className="text-center py-8">
                  <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Welcome to AI Data Analysis</h3>
                  <p className="text-muted-foreground mb-4">
                    {activeFile
                      ? `Ready to analyze ${activeFile.name}. Ask me anything about your data!`
                      : "Upload a data file to get started with AI-powered analysis."}
                  </p>
                  {activeFile && <ChatSuggestions onSuggestionClick={handleSuggestionClick} />}
                </div>
              )}

              {state.messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}

              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300 flex items-center justify-center">
                    <Brain className="h-4 w-4" />
                  </div>
                  <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                      <span className="text-sm">Analyzing your data...</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Processing with advanced AI algorithms</p>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <Separator />

          {/* Input Area */}
          <div className="p-4 space-y-3">
            {/* Quick Actions */}
            {activeFile && state.messages.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestionClick("Show me a summary of the data")}
                >
                  <FileText className="h-3 w-3 mr-1" />
                  Summary
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestionClick("Create a forecast for the next 6 months")}
                >
                  <Sparkles className="h-3 w-3 mr-1" />
                  Forecast
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestionClick("Find correlations between variables")}
                >
                  <Settings className="h-3 w-3 mr-1" />
                  Correlations
                </Button>
              </div>
            )}

            {/* Input Controls */}
            <div className="flex items-end gap-2">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => setIsMultiline(!isMultiline)} className="text-xs">
                    {isMultiline ? "Single line" : "Multi-line"}
                  </Button>
                </div>
                {isMultiline ? (
                  <Textarea
                    ref={textareaRef}
                    placeholder="Ask me anything about your data... (Shift+Enter for new line)"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading || !activeFile}
                    className="min-h-[80px] resize-none"
                  />
                ) : (
                  <Input
                    placeholder="Ask me anything about your data..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading || !activeFile}
                  />
                )}
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim() || !activeFile}
                size="sm"
                className="bg-gradient-to-r from-purple-500 to-blue-500"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>

            {!activeFile && (
              <Alert>
                <FileText className="h-4 w-4" />
                <AlertDescription>
                  Please upload and select a data file to start your AI analysis session.
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Context and Suggestions */}
      {activeFile && state.messages.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Get Started with AI Analysis</CardTitle>
            <CardDescription>Here are some things you can ask me about your data:</CardDescription>
          </CardHeader>
          <CardContent>
            <ChatSuggestions onSuggestionClick={handleSuggestionClick} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}

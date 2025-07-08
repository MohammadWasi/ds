"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAnalysisContext } from "@/components/ai-analysis/analysis-context"
import { Settings } from "lucide-react"

export function AnalysisSettings() {
  const { state, updateSettings } = useAnalysisContext()
  const { analysisSettings } = state

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Settings className="h-4 w-4" />
          Analysis Settings
        </CardTitle>
        <CardDescription className="text-sm">Configure analysis parameters</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm">Confidence Level: {analysisSettings.confidenceLevel}%</Label>
          <Slider
            value={[analysisSettings.confidenceLevel]}
            onValueChange={([value]) => updateSettings({ confidenceLevel: value })}
            min={80}
            max={99}
            step={1}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm">Forecast Periods: {analysisSettings.forecastPeriods}</Label>
          <Slider
            value={[analysisSettings.forecastPeriods]}
            onValueChange={([value]) => updateSettings({ forecastPeriods: value })}
            min={1}
            max={24}
            step={1}
            className="w-full"
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="seasonality" className="text-sm">
            Include Seasonality
          </Label>
          <Switch
            id="seasonality"
            checked={analysisSettings.includeSeasonality}
            onCheckedChange={(checked) => updateSettings({ includeSeasonality: checked })}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm">Chart Theme</Label>
          <Select value={analysisSettings.chartTheme} onValueChange={(value) => updateSettings({ chartTheme: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="minimal">Minimal</SelectItem>
              <SelectItem value="colorful">Colorful</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}

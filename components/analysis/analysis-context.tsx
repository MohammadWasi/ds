"use client"

import type React from "react"
import { createContext, useContext, useReducer, useCallback } from "react"

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

interface ChatMessage {
  id: string
  type: "user" | "ai" | "system"
  content: string
  timestamp: Date
  analysis?: {
    type: "chart" | "table" | "insight" | "forecast" | "statistics"
    data?: any
    chartType?: string
    title?: string
    description?: string
    exportable?: boolean
  }
  isLoading?: boolean
  error?: string
}

interface AnalysisState {
  files: DataFile[]
  activeFileId: string | null
  messages: ChatMessage[]
  isProcessing: boolean
  contextHistory: string[]
  analysisSettings: {
    confidenceLevel: number
    forecastPeriods: number
    includeSeasonality: boolean
    chartTheme: string
  }
}

type AnalysisAction =
  | { type: "ADD_FILE"; payload: DataFile }
  | { type: "REMOVE_FILE"; payload: string }
  | { type: "SET_ACTIVE_FILE"; payload: string }
  | { type: "ADD_MESSAGE"; payload: ChatMessage }
  | { type: "UPDATE_MESSAGE"; payload: { id: string; updates: Partial<ChatMessage> } }
  | { type: "SET_PROCESSING"; payload: boolean }
  | { type: "UPDATE_SETTINGS"; payload: Partial<AnalysisState["analysisSettings"]> }
  | { type: "CLEAR_CHAT" }
  | { type: "ADD_CONTEXT"; payload: string }

const initialState: AnalysisState = {
  files: [],
  activeFileId: null,
  messages: [],
  isProcessing: false,
  contextHistory: [],
  analysisSettings: {
    confidenceLevel: 95,
    forecastPeriods: 12,
    includeSeasonality: true,
    chartTheme: "default",
  },
}

function analysisReducer(state: AnalysisState, action: AnalysisAction): AnalysisState {
  switch (action.type) {
    case "ADD_FILE":
      return {
        ...state,
        files: [...state.files, action.payload],
        activeFileId: state.activeFileId || action.payload.id,
      }
    case "REMOVE_FILE":
      return {
        ...state,
        files: state.files.filter((f) => f.id !== action.payload),
        activeFileId: state.activeFileId === action.payload ? null : state.activeFileId,
      }
    case "SET_ACTIVE_FILE":
      return {
        ...state,
        activeFileId: action.payload,
      }
    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      }
    case "UPDATE_MESSAGE":
      return {
        ...state,
        messages: state.messages.map((msg) =>
          msg.id === action.payload.id ? { ...msg, ...action.payload.updates } : msg,
        ),
      }
    case "SET_PROCESSING":
      return {
        ...state,
        isProcessing: action.payload,
      }
    case "UPDATE_SETTINGS":
      return {
        ...state,
        analysisSettings: { ...state.analysisSettings, ...action.payload },
      }
    case "CLEAR_CHAT":
      return {
        ...state,
        messages: [],
        contextHistory: [],
      }
    case "ADD_CONTEXT":
      return {
        ...state,
        contextHistory: [...state.contextHistory.slice(-10), action.payload],
      }
    default:
      return state
  }
}

interface AnalysisContextType {
  state: AnalysisState
  addFile: (file: DataFile) => void
  removeFile: (fileId: string) => void
  setActiveFile: (fileId: string) => void
  addMessage: (message: Omit<ChatMessage, "id" | "timestamp">) => void
  updateMessage: (id: string, updates: Partial<ChatMessage>) => void
  setProcessing: (processing: boolean) => void
  updateSettings: (settings: Partial<AnalysisState["analysisSettings"]>) => void
  clearChat: () => void
  addContext: (context: string) => void
  getActiveFile: () => DataFile | null
}

const AnalysisContext = createContext<AnalysisContextType | null>(null)

export function AnalysisContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(analysisReducer, initialState)

  const addFile = useCallback((file: DataFile) => {
    dispatch({ type: "ADD_FILE", payload: file })
  }, [])

  const removeFile = useCallback((fileId: string) => {
    dispatch({ type: "REMOVE_FILE", payload: fileId })
  }, [])

  const setActiveFile = useCallback((fileId: string) => {
    dispatch({ type: "SET_ACTIVE_FILE", payload: fileId })
  }, [])

  const addMessage = useCallback((message: Omit<ChatMessage, "id" | "timestamp">) => {
    const fullMessage: ChatMessage = {
      ...message,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    }
    dispatch({ type: "ADD_MESSAGE", payload: fullMessage })
  }, [])

  const updateMessage = useCallback((id: string, updates: Partial<ChatMessage>) => {
    dispatch({ type: "UPDATE_MESSAGE", payload: { id, updates } })
  }, [])

  const setProcessing = useCallback((processing: boolean) => {
    dispatch({ type: "SET_PROCESSING", payload: processing })
  }, [])

  const updateSettings = useCallback((settings: Partial<AnalysisState["analysisSettings"]>) => {
    dispatch({ type: "UPDATE_SETTINGS", payload: settings })
  }, [])

  const clearChat = useCallback(() => {
    dispatch({ type: "CLEAR_CHAT" })
  }, [])

  const addContext = useCallback((context: string) => {
    dispatch({ type: "ADD_CONTEXT", payload: context })
  }, [])

  const getActiveFile = useCallback(() => {
    return state.files.find((f) => f.id === state.activeFileId) || null
  }, [state.files, state.activeFileId])

  const value: AnalysisContextType = {
    state,
    addFile,
    removeFile,
    setActiveFile,
    addMessage,
    updateMessage,
    setProcessing,
    updateSettings,
    clearChat,
    addContext,
    getActiveFile,
  }

  return <AnalysisContext.Provider value={value}>{children}</AnalysisContext.Provider>
}

export function useAnalysisContext() {
  const context = useContext(AnalysisContext)
  if (!context) {
    throw new Error("useAnalysisContext must be used within AnalysisContextProvider")
  }
  return context
}

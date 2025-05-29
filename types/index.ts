export interface FileItem {
  id: string
  name: string
  type: "file" | "folder"
  size?: number
  mimeType?: string
  createdAt: Date
  modifiedAt: Date
  owner: string
  shared: boolean
  starred: boolean
  thumbnail?: string
  parentId?: string
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface NavigationItem {
  id: string
  label: string
  icon: string
  href: string
  count?: number
}

export type ViewMode = "grid" | "list"
export type SortBy = "name" | "modified" | "size" | "type"
export type SortOrder = "asc" | "desc"

export interface FileFilters {
  search: string
  sortBy: SortBy
  sortOrder: SortOrder
  viewMode: ViewMode
}

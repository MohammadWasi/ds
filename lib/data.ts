import type { FileItem, NavigationItem, User } from "@/types"

export const mockUser: User = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "/placeholder.svg?height=32&width=32",
}

export const navigationItems: NavigationItem[] = [
  { id: "my-drive", label: "My Drive", icon: "hard-drive", href: "/drive" },
  { id: "shared", label: "Shared with me", icon: "users", href: "/shared" },
  { id: "recent", label: "Recent", icon: "clock", href: "/recent" },
  { id: "starred", label: "Starred", icon: "star", href: "/starred" },
  { id: "trash", label: "Trash", icon: "trash-2", href: "/trash", count: 3 },
]

export const mockFiles: FileItem[] = [
  {
    id: "1",
    name: "Project Documents",
    type: "folder",
    createdAt: new Date("2024-01-15"),
    modifiedAt: new Date("2024-01-20"),
    owner: "John Doe",
    shared: false,
    starred: true,
  },
  {
    id: "2",
    name: "presentation.pptx",
    type: "file",
    size: 2048000,
    mimeType: "application/vnd.ms-powerpoint",
    createdAt: new Date("2024-01-18"),
    modifiedAt: new Date("2024-01-19"),
    owner: "John Doe",
    shared: true,
    starred: false,
    thumbnail: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "3",
    name: "budget-2024.xlsx",
    type: "file",
    size: 512000,
    mimeType: "application/vnd.ms-excel",
    createdAt: new Date("2024-01-10"),
    modifiedAt: new Date("2024-01-15"),
    owner: "Jane Smith",
    shared: true,
    starred: true,
  },
  {
    id: "4",
    name: "team-photo.jpg",
    type: "file",
    size: 1024000,
    mimeType: "image/jpeg",
    createdAt: new Date("2024-01-12"),
    modifiedAt: new Date("2024-01-12"),
    owner: "John Doe",
    shared: false,
    starred: false,
    thumbnail: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "5",
    name: "Design Assets",
    type: "folder",
    createdAt: new Date("2024-01-08"),
    modifiedAt: new Date("2024-01-16"),
    owner: "John Doe",
    shared: true,
    starred: false,
  },
]

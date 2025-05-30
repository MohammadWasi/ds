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

// Flat file structure like Google Drive - each item just has a parentId
export const mockFiles: FileItem[] = [
  // Root level files and folders
  {
    id: "folder-1",
    name: "Project Documents",
    type: "folder",
    createdAt: new Date("2024-01-15"),
    modifiedAt: new Date("2024-01-20"),
    owner: "John Doe",
    shared: false,
    starred: true,
  },
  {
    id: "file-1",
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
    id: "folder-2",
    name: "Personal Files",
    type: "folder",
    createdAt: new Date("2024-01-10"),
    modifiedAt: new Date("2024-01-15"),
    owner: "John Doe",
    shared: false,
    starred: false,
  },
  {
    id: "file-2",
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

  // Files inside "Project Documents" folder
  {
    id: "folder-1-1",
    name: "Design Files",
    type: "folder",
    parentId: "folder-1",
    createdAt: new Date("2024-01-16"),
    modifiedAt: new Date("2024-01-18"),
    owner: "John Doe",
    shared: true,
    starred: false,
  },
  {
    id: "folder-1-2",
    name: "Development",
    type: "folder",
    parentId: "folder-1",
    createdAt: new Date("2024-01-16"),
    modifiedAt: new Date("2024-01-19"),
    owner: "John Doe",
    shared: true,
    starred: false,
  },
  {
    id: "file-1-1",
    name: "project-proposal.docx",
    type: "file",
    size: 1024000,
    mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    parentId: "folder-1",
    createdAt: new Date("2024-01-15"),
    modifiedAt: new Date("2024-01-16"),
    owner: "John Doe",
    shared: true,
    starred: false,
    thumbnail: "/placeholder.svg?height=100&width=100",
  },

  // Files inside "Design Files" folder
  {
    id: "folder-1-1-1",
    name: "UI Mockups",
    type: "folder",
    parentId: "folder-1-1",
    createdAt: new Date("2024-01-17"),
    modifiedAt: new Date("2024-01-17"),
    owner: "Jane Smith",
    shared: false,
    starred: true,
  },
  {
    id: "file-1-1-1",
    name: "brand-guidelines.pdf",
    type: "file",
    size: 5120000,
    mimeType: "application/pdf",
    parentId: "folder-1-1",
    createdAt: new Date("2024-01-16"),
    modifiedAt: new Date("2024-01-16"),
    owner: "John Doe",
    shared: true,
    starred: true,
    thumbnail: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "file-1-1-2",
    name: "logo-variations.sketch",
    type: "file",
    size: 3072000,
    mimeType: "application/sketch",
    parentId: "folder-1-1",
    createdAt: new Date("2024-01-16"),
    modifiedAt: new Date("2024-01-17"),
    owner: "Jane Smith",
    shared: false,
    starred: false,
    thumbnail: "/placeholder.svg?height=100&width=100",
  },

  // Files inside "Development" folder
  {
    id: "folder-1-2-1",
    name: "Frontend",
    type: "folder",
    parentId: "folder-1-2",
    createdAt: new Date("2024-01-17"),
    modifiedAt: new Date("2024-01-19"),
    owner: "John Doe",
    shared: false,
    starred: false,
  },
  {
    id: "folder-1-2-2",
    name: "Backend",
    type: "folder",
    parentId: "folder-1-2",
    createdAt: new Date("2024-01-17"),
    modifiedAt: new Date("2024-01-18"),
    owner: "John Doe",
    shared: false,
    starred: false,
  },
  {
    id: "file-1-2-1",
    name: "api-documentation.md",
    type: "file",
    size: 8192,
    mimeType: "text/markdown",
    parentId: "folder-1-2",
    createdAt: new Date("2024-01-18"),
    modifiedAt: new Date("2024-01-19"),
    owner: "John Doe",
    shared: true,
    starred: true,
  },

  // Files inside "UI Mockups" folder
  {
    id: "folder-1-1-1-1",
    name: "Mobile Designs",
    type: "folder",
    parentId: "folder-1-1-1",
    createdAt: new Date("2024-01-17"),
    modifiedAt: new Date("2024-01-17"),
    owner: "Jane Smith",
    shared: false,
    starred: false,
  },
  {
    id: "file-1-1-1-1",
    name: "homepage-wireframe.sketch",
    type: "file",
    size: 1024000,
    mimeType: "application/sketch",
    parentId: "folder-1-1-1",
    createdAt: new Date("2024-01-17"),
    modifiedAt: new Date("2024-01-17"),
    owner: "Jane Smith",
    shared: false,
    starred: false,
    thumbnail: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "file-1-1-1-2",
    name: "user-flow-diagram.figma",
    type: "file",
    size: 2048000,
    mimeType: "application/figma",
    parentId: "folder-1-1-1",
    createdAt: new Date("2024-01-17"),
    modifiedAt: new Date("2024-01-17"),
    owner: "Jane Smith",
    shared: true,
    starred: true,
    thumbnail: "/placeholder.svg?height=100&width=100",
  },

  // Files inside "Frontend" folder
  {
    id: "file-1-2-1-1",
    name: "package.json",
    type: "file",
    size: 2048,
    mimeType: "application/json",
    parentId: "folder-1-2-1",
    createdAt: new Date("2024-01-17"),
    modifiedAt: new Date("2024-01-19"),
    owner: "John Doe",
    shared: false,
    starred: false,
  },
  {
    id: "file-1-2-1-2",
    name: "README.md",
    type: "file",
    size: 4096,
    mimeType: "text/markdown",
    parentId: "folder-1-2-1",
    createdAt: new Date("2024-01-17"),
    modifiedAt: new Date("2024-01-18"),
    owner: "John Doe",
    shared: true,
    starred: false,
  },
  {
    id: "folder-1-2-1-1",
    name: "Components",
    type: "folder",
    parentId: "folder-1-2-1",
    createdAt: new Date("2024-01-18"),
    modifiedAt: new Date("2024-01-19"),
    owner: "John Doe",
    shared: false,
    starred: false,
  },

  // Files inside "Mobile Designs" folder (deep nesting)
  {
    id: "file-1-1-1-1-1",
    name: "login-screen.figma",
    type: "file",
    size: 2048000,
    mimeType: "application/figma",
    parentId: "folder-1-1-1-1",
    createdAt: new Date("2024-01-17"),
    modifiedAt: new Date("2024-01-17"),
    owner: "Jane Smith",
    shared: false,
    starred: false,
    thumbnail: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "file-1-1-1-1-2",
    name: "dashboard-mobile.figma",
    type: "file",
    size: 1536000,
    mimeType: "application/figma",
    parentId: "folder-1-1-1-1",
    createdAt: new Date("2024-01-17"),
    modifiedAt: new Date("2024-01-17"),
    owner: "Jane Smith",
    shared: true,
    starred: true,
    thumbnail: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "folder-1-1-1-1-1",
    name: "Icons",
    type: "folder",
    parentId: "folder-1-1-1-1",
    createdAt: new Date("2024-01-17"),
    modifiedAt: new Date("2024-01-17"),
    owner: "Jane Smith",
    shared: false,
    starred: false,
  },

  // Files inside "Personal Files" folder
  {
    id: "file-2-1",
    name: "vacation-photos.zip",
    type: "file",
    size: 15728640,
    mimeType: "application/zip",
    parentId: "folder-2",
    createdAt: new Date("2024-01-12"),
    modifiedAt: new Date("2024-01-12"),
    owner: "John Doe",
    shared: false,
    starred: true,
  },
  {
    id: "folder-2-1",
    name: "Documents",
    type: "folder",
    parentId: "folder-2",
    createdAt: new Date("2024-01-11"),
    modifiedAt: new Date("2024-01-14"),
    owner: "John Doe",
    shared: false,
    starred: false,
  },

  // Files inside "Documents" folder
  {
    id: "file-2-1-1",
    name: "resume.pdf",
    type: "file",
    size: 512000,
    mimeType: "application/pdf",
    parentId: "folder-2-1",
    createdAt: new Date("2024-01-11"),
    modifiedAt: new Date("2024-01-14"),
    owner: "John Doe",
    shared: false,
    starred: true,
    thumbnail: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "file-2-1-2",
    name: "tax-documents.pdf",
    type: "file",
    size: 1024000,
    mimeType: "application/pdf",
    parentId: "folder-2-1",
    createdAt: new Date("2024-01-13"),
    modifiedAt: new Date("2024-01-13"),
    owner: "John Doe",
    shared: false,
    starred: false,
    thumbnail: "/placeholder.svg?height=100&width=100",
  },
]

// Helper functions like Google Drive
export function getFilesInFolder(folderId: string | null): FileItem[] {
  if (folderId === null) {
    // For root level, get files where parentId is undefined or null
    return mockFiles.filter((file) => !file.parentId)
  }
  // For specific folders, get files where parentId matches
  return mockFiles.filter((file) => file.parentId === folderId)
}

export function getFolderById(folderId: string): FileItem | null {
  return mockFiles.find((file) => file.id === folderId && file.type === "folder") || null
}

export function buildBreadcrumbPath(folderId: string | null): { id: string | null; name: string }[] {
  if (!folderId) return [{ id: null, name: "My Drive" }]

  const path: { id: string | null; name: string }[] = [{ id: null, name: "My Drive" }]
  let currentFolder = getFolderById(folderId)

  const folderChain: FileItem[] = []
  while (currentFolder) {
    folderChain.unshift(currentFolder)
    currentFolder = currentFolder.parentId ? getFolderById(currentFolder.parentId) : null
  }

  folderChain.forEach((folder) => {
    path.push({ id: folder.id, name: folder.name })
  })

  return path
}

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search, Plus, Bell, Settings, User, Menu, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useTheme } from "@/hooks/use-theme"
import { cn } from "@/lib/utils"
import * as Icons from "lucide-react"

interface NavigationSubItem {
  id: string
  label: string
  description?: string
  icon: string
  href: string
  badge?: string
  isNew?: boolean
}

interface NavigationItem {
  id: string
  label: string
  icon: string
  href?: string
  subItems?: NavigationSubItem[]
  badge?: string
  isNew?: boolean
}

const navigationItems: NavigationItem[] = [
  {
    id: "drive",
    label: "Drive",
    icon: "hard-drive",
    subItems: [
      {
        id: "my-drive",
        label: "My Drive",
        description: "Your personal files and folders",
        icon: "folder",
        href: "/",
      },
      {
        id: "shared",
        label: "Shared with me",
        description: "Files shared by others",
        icon: "users",
        href: "/shared",
      },
      {
        id: "recent",
        label: "Recent",
        description: "Recently accessed files",
        icon: "clock",
        href: "/recent",
      },
      {
        id: "starred",
        label: "Starred",
        description: "Your favorite files",
        icon: "star",
        href: "/starred",
      },
      {
        id: "trash",
        label: "Trash",
        description: "Deleted files",
        icon: "trash-2",
        href: "/trash",
        badge: "3",
      },
    ],
  },
  {
    id: "dashboards",
    label: "Dashboards",
    icon: "bar-chart-3",
    subItems: [
      {
        id: "financial",
        label: "Financial Dashboard",
        description: "Revenue, expenses, and profit analysis",
        icon: "dollar-sign",
        href: "/dashboard",
      },
      {
        id: "liquidity",
        label: "Liquidity Dashboard",
        description: "Banking liquidity metrics and compliance",
        icon: "droplets",
        href: "/liquidity",
      },
      {
        id: "performance",
        label: "Performance Dashboard",
        description: "Business KPIs and growth metrics",
        icon: "trending-up",
        href: "/performance",
      },
      {
        id: "analytics",
        label: "Analytics Dashboard",
        description: "Advanced data analytics and insights",
        icon: "activity",
        href: "/analytics",
        isNew: true,
      },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    icon: "wrench",
    subItems: [
      {
        id: "upload-center",
        label: "Upload Center",
        description: "Manage file uploads and processing",
        icon: "upload",
        href: "/uploads",
      },
      {
        id: "file-converter",
        label: "File Converter",
        description: "Convert files between formats",
        icon: "refresh-cw",
        href: "/converter",
        isNew: true,
      },
      {
        id: "bulk-operations",
        label: "Bulk Operations",
        description: "Perform actions on multiple files",
        icon: "layers",
        href: "/bulk",
      },
      {
        id: "api-access",
        label: "API Access",
        description: "Developer tools and API management",
        icon: "code",
        href: "/api",
      },
    ],
  },
  {
    id: "workspace",
    label: "Workspace",
    icon: "briefcase",
    subItems: [
      {
        id: "teams",
        label: "Teams",
        description: "Manage team members and permissions",
        icon: "users",
        href: "/teams",
      },
      {
        id: "projects",
        label: "Projects",
        description: "Organize work into projects",
        icon: "folder-open",
        href: "/projects",
      },
      {
        id: "templates",
        label: "Templates",
        description: "Reusable file and folder templates",
        icon: "layout-template",
        href: "/templates",
      },
      {
        id: "integrations",
        label: "Integrations",
        description: "Connect with external services",
        icon: "plug",
        href: "/integrations",
        badge: "2",
      },
    ],
  },
  {
    id: "ai-analysis",
    label: "AI Analysis",
    icon: "brain",
    subItems: [
      {
        id: "ai-data-analysis",
        label: "Data Analysis",
        description: "AI-powered financial data analysis and insights",
        icon: "brain",
        href: "/ai-analysis",
        isNew: true,
      },
      {
        id: "forecasting",
        label: "Forecasting",
        description: "Advanced time-series forecasting and predictions",
        icon: "trending-up",
        href: "/ai-analysis?tab=forecast",
      },
      {
        id: "risk-analysis",
        label: "Risk Analysis",
        description: "Liquidity stress testing and risk assessment",
        icon: "alert-triangle",
        href: "/ai-analysis?tab=risk",
      },
    ],
  },
]

const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "/placeholder.svg?height=32&width=32",
}

interface TopNavigationProps {
  searchQuery?: string
  onSearchChange?: (query: string) => void
}

export function TopNavigation({ searchQuery = "", onSearchChange }: TopNavigationProps) {
  const pathname = usePathname()
  const { theme, toggleTheme, mounted } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!mounted) return null

  const isActiveItem = (item: NavigationItem) => {
    if (item.href && pathname === item.href) return true
    return item.subItems?.some((subItem) => pathname === subItem.href) || false
  }

  const isActiveSubItem = (subItem: NavigationSubItem) => {
    return pathname === subItem.href
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200",
        isScrolled && "shadow-sm",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Icons.HardDrive className="h-4 w-4" />
              </div>
              <span className="hidden font-bold sm:inline-block">Drive Dashboard</span>
            </Link>

            {/* Desktop Navigation with Nested Items */}
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList>
                {navigationItems.map((item) => {
                  const Icon = Icons[item.icon as keyof typeof Icons] as any
                  const isActive = isActiveItem(item)

                  return (
                    <NavigationMenuItem key={item.id}>
                      {item.subItems ? (
                        <>
                          <NavigationMenuTrigger
                            className={cn(
                              "gap-2 data-[state=open]:bg-accent/50",
                              isActive && "bg-accent text-accent-foreground",
                            )}
                          >
                            <Icon className="h-4 w-4" />
                            <span>{item.label}</span>
                            {item.badge && (
                              <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                                {item.badge}
                              </Badge>
                            )}
                            {item.isNew && (
                              <Badge variant="default" className="ml-1 h-5 px-1.5 text-xs">
                                New
                              </Badge>
                            )}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                              {item.subItems.map((subItem) => {
                                const SubIcon = Icons[subItem.icon as keyof typeof Icons] as any
                                const isSubActive = isActiveSubItem(subItem)

                                return (
                                  <NavigationMenuLink key={subItem.id} asChild>
                                    <Link
                                      href={subItem.href}
                                      className={cn(
                                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                        isSubActive && "bg-accent text-accent-foreground",
                                      )}
                                    >
                                      <div className="flex items-center gap-2">
                                        <SubIcon className="h-4 w-4" />
                                        <div className="text-sm font-medium leading-none">
                                          {subItem.label}
                                          {subItem.badge && (
                                            <Badge variant="secondary" className="ml-2 h-4 px-1.5 text-xs">
                                              {subItem.badge}
                                            </Badge>
                                          )}
                                          {subItem.isNew && (
                                            <Badge variant="default" className="ml-2 h-4 px-1.5 text-xs">
                                              New
                                            </Badge>
                                          )}
                                        </div>
                                      </div>
                                      {subItem.description && (
                                        <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                                          {subItem.description}
                                        </p>
                                      )}
                                    </Link>
                                  </NavigationMenuLink>
                                )
                              })}
                            </div>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <NavigationMenuLink
                          className={cn(
                            navigationMenuTriggerStyle(),
                            "gap-2",
                            isActive && "bg-accent text-accent-foreground",
                          )}
                          href={item.href}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.label}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                              {item.badge}
                            </Badge>
                          )}
                          {item.isNew && (
                            <Badge variant="default" className="ml-1 h-5 px-1.5 text-xs">
                              New
                            </Badge>
                          )}
                        </NavigationMenuLink>
                      )}
                    </NavigationMenuItem>
                  )
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Search Bar */}
          <div className="flex flex-1 items-center justify-center px-4">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search files, dashboards, and more..."
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="pl-9 pr-4 w-full"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Create Button */}
            <Button size="sm" className="hidden sm:flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden md:inline">Create</span>
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">3</Badge>
            </Button>

            {/* Theme Toggle */}
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {theme === "light" ? (
                <Icons.Moon className="h-4 w-4" />
              ) : theme === "dark" ? (
                <Icons.Sun className="h-4 w-4" />
              ) : (
                <Icons.Monitor className="h-4 w-4" />
              )}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={mockUser.avatar || "/placeholder.svg"} alt={mockUser.name} />
                    <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex flex-col space-y-1 leading-none">
                    <p className="font-medium">{mockUser.name}</p>
                    <p className="w-[200px] truncate text-sm text-muted-foreground">{mockUser.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                  <SheetDescription>Access all sections of the application</SheetDescription>
                </SheetHeader>
                <MobileNavigationMenu
                  items={navigationItems}
                  pathname={pathname}
                  onItemClick={() => setIsMobileMenuOpen(false)}
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

// Mobile Navigation Component with Nested Support
interface MobileNavigationMenuProps {
  items: NavigationItem[]
  pathname: string
  onItemClick: () => void
}

function MobileNavigationMenu({ items, pathname, onItemClick }: MobileNavigationMenuProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId)
    } else {
      newExpanded.add(itemId)
    }
    setExpandedItems(newExpanded)
  }

  const isActiveItem = (item: NavigationItem) => {
    if (item.href && pathname === item.href) return true
    return item.subItems?.some((subItem) => pathname === subItem.href) || false
  }

  const isActiveSubItem = (subItem: NavigationSubItem) => {
    return pathname === subItem.href
  }

  return (
    <div className="mt-6 space-y-2">
      {items.map((item) => {
        const Icon = Icons[item.icon as keyof typeof Icons] as any
        const isActive = isActiveItem(item)
        const isExpanded = expandedItems.has(item.id)

        return (
          <div key={item.id} className="space-y-1">
            {item.subItems ? (
              <>
                <Button
                  variant="ghost"
                  className={cn("w-full justify-between h-auto p-3", isActive && "bg-accent text-accent-foreground")}
                  onClick={() => toggleExpanded(item.id)}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="h-4 px-1.5 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                    {item.isNew && (
                      <Badge variant="default" className="h-4 px-1.5 text-xs">
                        New
                      </Badge>
                    )}
                  </div>
                  <ChevronRight className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-90")} />
                </Button>
                {isExpanded && (
                  <div className="ml-4 space-y-1 border-l border-border pl-4">
                    {item.subItems.map((subItem) => {
                      const SubIcon = Icons[subItem.icon as keyof typeof Icons] as any
                      const isSubActive = isActiveSubItem(subItem)

                      return (
                        <Link
                          key={subItem.id}
                          href={subItem.href}
                          onClick={onItemClick}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                            isSubActive && "bg-accent text-accent-foreground",
                          )}
                        >
                          <SubIcon className="h-4 w-4" />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span>{subItem.label}</span>
                              {subItem.badge && (
                                <Badge variant="secondary" className="h-4 px-1.5 text-xs">
                                  {subItem.badge}
                                </Badge>
                              )}
                              {subItem.isNew && (
                                <Badge variant="default" className="h-4 px-1.5 text-xs">
                                  New
                                </Badge>
                              )}
                            </div>
                            {subItem.description && (
                              <p className="text-xs text-muted-foreground mt-0.5">{subItem.description}</p>
                            )}
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </>
            ) : (
              <Link
                href={item.href!}
                onClick={onItemClick}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  isActive && "bg-accent text-accent-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
                {item.badge && (
                  <Badge variant="secondary" className="ml-auto h-4 px-1.5 text-xs">
                    {item.badge}
                  </Badge>
                )}
                {item.isNew && (
                  <Badge variant="default" className="ml-auto h-4 px-1.5 text-xs">
                    New
                  </Badge>
                )}
              </Link>
            )}
          </div>
        )
      })}

      {/* Mobile Storage Info */}
      <Separator className="my-4" />
      <div className="p-4 border rounded-lg">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Storage</span>
            <span className="font-medium">2.1 GB of 15 GB</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: "14%" }} />
          </div>
          <Button variant="outline" size="sm" className="w-full">
            Buy Storage
          </Button>
        </div>
      </div>
    </div>
  )
}

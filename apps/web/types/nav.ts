import { Icons } from "@/components/misc/icons"

export interface NavConfig {
  mainNav?: MainNavItem[]
  sidebarNav?: SidebarNavItem[]
}

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
  label?: string
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export interface MainNavItem extends NavItem {}

export interface SidebarNavItem extends NavItemWithChildren {}

export interface ContentConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}
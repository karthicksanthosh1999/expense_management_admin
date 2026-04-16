import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { GalleryVerticalEndIcon } from "lucide-react"
import Link from "next/link"

export function VersionSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link href={'/dashboard'} className="flex items-center gap-5 ml-2 cursor-pointer p-3 mt-2">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <GalleryVerticalEndIcon className="size-4" />
          </div>
          <span className="font-medium text-xl">Jk-Tech</span>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

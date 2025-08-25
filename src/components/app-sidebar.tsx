import * as React from "react"


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { getSidebarItems } from "@/utills/getSidebarItems"
import { useMeQuery } from "@/redux/features/auth.api"
import Logo from "@/assets/icon/Logo"





export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { data: user } = useMeQuery(undefined)

  console.log(user?.data?.role)

  const data = getSidebarItems(user?.data?.role)

  console.log(data)
  return (

    <Sidebar {...props} >
      <SidebarHeader>
        {/* <SearchForm /> */}
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel className="text-[#828890] font-bold text-[14px] py-3">
              {section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url} className="flex items-center gap-2">
                        {item.icon && <item.icon className="w-4 h-4" />} {/* 👈 icon before title */}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>

  )
}

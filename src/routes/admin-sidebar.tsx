// import AddTour from "@/pages/admin/AddTour";
// import Analytics from "@/pages/admin/Analytics";

import Admin from "@/pages/admin/Admin";
import ManageAllUsers from "@/pages/admin/ManageAllUsers";
import ManageParecels from "@/pages/admin/ManageParecels";
import type { ISidebarItem } from "@/types";
import { LayoutDashboard, PackageSearch, Users } from "lucide-react";
// import { lazy } from "react";

// const Analytics = lazy(() => import("@/pages/admin/Analytics"))
// const AddTour = lazy(() => import("@/pages/admin/AddTour"))



export const adminSidebarItems: ISidebarItem[] = 

  [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      items: [
        {
          title: "Analytics",
          url: "/admin/analytics",
          Component: Admin
        },
      ],
      
    },

{
  title: "Courier Management",
  items: [
    {
      title: "Manage User",
      url: "/admin/manage",
      Component: ManageAllUsers,
      icon: Users,            // 👥 clear for user management
    },
    {
      title: "Manage Parcels",
      url: "/admin/parcels",
      Component: ManageParecels,
      icon: PackageSearch,    // 📦🔍 intuitive for parcel management
    },
  ],
}
  ]


// import AddTour from "@/pages/admin/AddTour";
// import Analytics from "@/pages/admin/Analytics";

import type { ISidebarItem } from "@/types";
import { LayoutDashboard, PackageSearch, Users } from "lucide-react";
import { lazy } from "react";
// import { lazy } from "react";

const Admin = lazy(() => import("@/pages/admin/Admin"))
const ManageAllUsers = lazy(() => import("@/pages/admin/ManageAllUsers"))
const ManageParecels = lazy(() => import("@/pages/admin/ManageParecels"))




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


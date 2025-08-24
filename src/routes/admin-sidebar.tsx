// import AddTour from "@/pages/admin/AddTour";
// import Analytics from "@/pages/admin/Analytics";

import Admin from "@/pages/admin/Admin";
import ManageAllUsers from "@/pages/admin/ManageAllUsers";
import ManageParecels from "@/pages/admin/ManageParecels";
import type { ISidebarItem } from "@/types";
// import { lazy } from "react";

// const Analytics = lazy(() => import("@/pages/admin/Analytics"))
// const AddTour = lazy(() => import("@/pages/admin/AddTour"))



export const adminSidebarItems: ISidebarItem[] = 

  [
    {
      title: "Dashboard",
      items: [
        {
          title: "Analytics",
          url: "/admin/analytice",
          Component: Admin
        },
        {
          title: "Receiver",
          url: "/admin/receiver",
          Component: Admin
        },
      ],
      
    },

  {
    title: "Curier-Management",
    items: [
      {
        title: "Manage User",
        url: "/admin/manage",
        Component: ManageAllUsers
      },

      {
        title: "Manage Parcels",
        url: "/admin/parcels",
        Component: ManageParecels
      },
    ],
  },
  ]


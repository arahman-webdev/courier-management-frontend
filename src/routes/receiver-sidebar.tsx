// import AddTour from "@/pages/admin/AddTour";
// import Analytics from "@/pages/admin/Analytics";

import About from "@/pages/About";
import Admin from "@/pages/admin/Admin";
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
    title: "Tour-Management",
    items: [
      {
        title: "Manage User",
        url: "/admin/manage",
        Component: About
      },
      {
        title: "Add Division",
        url: "/admin/add-division",
        Component: About
      },
      {
        title: "Add Tour Type",
        url: "/admin/add-tour-type",
        Component: About
      },
    ],
  },
  ]

